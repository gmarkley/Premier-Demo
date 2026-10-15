import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CRM_COOKIE, crmCookieValid } from "../../../lib/crm-auth";

export default function CrmDeskLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get(CRM_COOKIE)?.value;
  if (!crmCookieValid(token)) redirect("/crm/login");
  return <>{children}</>;
}
