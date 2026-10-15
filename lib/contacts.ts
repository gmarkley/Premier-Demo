import { prisma } from "./db";

const STATUSES = ["new", "contacted", "booked", "closed"] as const;
export type ContactStatus = (typeof STATUSES)[number];

export function isContactStatus(value: string): value is ContactStatus {
  return (STATUSES as readonly string[]).includes(value);
}

export async function createContact(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
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
  return prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
}

export async function getContact(id: string) {
  return prisma.contact.findUnique({ where: { id } });
}

export async function updateContact(
  id: string,
  data: { status?: ContactStatus; notes?: string },
) {
  return prisma.contact.update({
    where: { id },
    data: {
      ...(data.status ? { status: data.status } : {}),
      ...(typeof data.notes === "string" ? { notes: data.notes } : {}),
    },
  });
}
