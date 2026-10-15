import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CRM · Premier Entertainment",
  robots: { index: false, follow: false },
};

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gray-950 text-white">{children}</div>;
}
