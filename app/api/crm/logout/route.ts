import { NextResponse } from "next/server";
import { CRM_COOKIE } from "../../../../lib/crm-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: CRM_COOKIE,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
