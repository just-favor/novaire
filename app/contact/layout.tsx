import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact \u2014 NOVAIRE",
  description: "Get in touch with the NOVAIRE atelier. Bespoke commissions, press inquiries, and general questions welcome.",
  openGraph: {
    title: "Contact \u2014 NOVAIRE",
    description: "Get in touch with the NOVAIRE atelier. Bespoke commissions, press inquiries, and general questions welcome.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
