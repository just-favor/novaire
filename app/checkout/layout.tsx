import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout \u2014 NOVAIRE",
  description: "Complete your NOVAIRE order.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
