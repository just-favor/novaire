import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account \u2014 NOVAIRE",
  description: "Manage your NOVAIRE account, orders, addresses, and security settings.",
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
