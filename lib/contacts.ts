import { prisma } from "./db";

const STATUSES = ["new", "contacted", "booked", "closed"] as const;
export type ContactStatus = (typeof STATUSES)[number];

export function isContactStatus(value: string): value is ContactStatus {
  return (STATUSES as readonly string[]).includes(value);
}

export async function ensureContactsTable() {
  await prisma.$executeRawUnsafe(`
    create table if not exists pe_contacts (
      id text primary key,
      name text not null,
      email text not null,
      phone text not null default '',
      message text not null,
      status text not null default 'new',
      notes text not null default '',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `);
  await prisma.$executeRawUnsafe(
    `create index if not exists pe_contacts_email_idx on pe_contacts (email)`,
  );
  await prisma.$executeRawUnsafe(
    `create index if not exists pe_contacts_created_idx on pe_contacts (created_at desc)`,
  );
}

export async function createContact(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await ensureContactsTable();
  return prisma.contact.create({
    data: {
      name: input.name,
      email: input.email,
      phone: input.phone || "",
      message: input.message,
      status: "new",
    },
  });
}

export async function listContacts() {
  await ensureContactsTable();
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
}

export async function getContact(id: string) {
  await ensureContactsTable();
  return prisma.contact.findUnique({ where: { id } });
}

export async function updateContact(
  id: string,
  data: { status?: ContactStatus; notes?: string },
) {
  await ensureContactsTable();
  return prisma.contact.update({
    where: { id },
    data: {
      ...(data.status ? { status: data.status } : {}),
      ...(typeof data.notes === "string" ? { notes: data.notes } : {}),
    },
  });
}
