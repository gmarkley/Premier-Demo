import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CRM_COOKIE, crmCookieValid } from "../../../../lib/crm-auth";
import { listContacts } from "../../../../lib/contacts";

export async function GET() {
  const token = cookies().get(CRM_COOKIE)?.value;
  if (!crmCookieValid(token)) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  try {
    const contacts = await listContacts();
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error("[CRM] List failed", err);
    return NextResponse.json({ error: "Could not load contacts." }, { status: 500 });
  }
}
