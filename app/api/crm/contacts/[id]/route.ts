import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CRM_COOKIE, crmCookieValid } from "../../../../../lib/crm-auth";
import { isContactStatus, updateContact } from "../../../../../lib/contacts";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const token = cookies().get(CRM_COOKIE)?.value;
  if (!crmCookieValid(token)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { status?: string; notes?: string };
  try {
    body = (await request.json()) as { status?: string; notes?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const status =
    typeof body.status === "string" && isContactStatus(body.status)
      ? body.status
      : undefined;
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 20000) : undefined;

  try {
    const contact = await updateContact(params.id, { status, notes });
    return NextResponse.json({ contact });
  } catch (err) {
    console.error("[CRM] Update failed", err);
    return NextResponse.json({ error: "Could not update contact." }, { status: 500 });
  }
}
