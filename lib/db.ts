import { neon } from "@neondatabase/serverless";

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

export function sanitizeDatabaseUrl(raw: string) {
  try {
    const u = new URL(unwrap(raw));
    u.searchParams.delete("channel_binding");
    if (!u.searchParams.get("sslmode")) u.searchParams.set("sslmode", "require");
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

/** Neon SQL over HTTP — no Prisma TCP engine, which hangs on Vercel + pooler. */
export function sql() {
  const url = databaseUrl();
  if (!url) throw new Error("DATABASE_URL is not set.");
  return neon(url, {
    fetchOptions: { signal: AbortSignal.timeout(8000) },
  });
}
