import { randomUUID } from "crypto";
import { sql } from "./db";

const STATUSES = ["new", "contacted", "booked", "closed"] as const;
export type ContactStatus = (typeof STATUSES)[number];

export function isContactStatus(value: string): value is ContactStatus {
  return (STATUSES as readonly string[]).includes(value);
}

type ContactRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  notes: string;
  created_at: string | Date;
  updated_at: string | Date;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

function mapContact(row: ContactRow): Contact {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    message: row.message,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createContact(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const id = randomUUID();
  const rows = (await sql()`
    insert into pe_contacts (id, name, email, phone, message, status, notes)
    values (${id}, ${input.name}, ${input.email}, ${input.phone || ""}, ${input.message}, 'new', '')
    returning id, name, email, phone, message, status, notes, created_at, updated_at
  `) as ContactRow[];
  const row = rows[0];
  if (!row) throw new Error("Contact insert returned no row.");
  return mapContact(row);
}

export async function listContacts() {
  const rows = (await sql()`
    select id, name, email, phone, message, status, notes, created_at, updated_at
    from pe_contacts
    order by created_at desc
    limit 500
  `) as ContactRow[];
  return rows.map(mapContact);
}

export async function getContact(id: string) {
  const rows = (await sql()`
    select id, name, email, phone, message, status, notes, created_at, updated_at
    from pe_contacts
    where id = ${id}
    limit 1
  `) as ContactRow[];
  return rows[0] ? mapContact(rows[0]) : null;
}

export async function updateContact(
  id: string,
  data: { status?: ContactStatus; notes?: string },
) {
  const rows = (await sql()`
    update pe_contacts
    set
      status = coalesce(${data.status ?? null}, status),
      notes = coalesce(${data.notes ?? null}, notes),
      updated_at = now()
    where id = ${id}
    returning id, name, email, phone, message, status, notes, created_at, updated_at
  `) as ContactRow[];
  const row = rows[0];
  if (!row) throw new Error("Contact not found.");
  return mapContact(row);
}
