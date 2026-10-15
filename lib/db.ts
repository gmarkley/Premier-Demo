import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function unwrap(value: string) {
  const v = value.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

/** Neon pooled hosts hang under Prisma unless pgbouncer=true; channel_binding=require can stall on Vercel. */
export function sanitizeDatabaseUrl(raw: string) {
  try {
    const u = new URL(unwrap(raw));
    if (u.hostname.includes("-pooler")) {
      u.searchParams.set("pgbouncer", "true");
    }
    u.searchParams.delete("channel_binding");
    if (!u.searchParams.get("sslmode")) u.searchParams.set("sslmode", "require");
    u.searchParams.set("connect_timeout", "10");
    return u.toString();
  } catch {
    return unwrap(raw);
  }
}

export function databaseUrl() {
  const raw =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    "";
  return raw.trim() ? sanitizeDatabaseUrl(raw) : "";
}

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
