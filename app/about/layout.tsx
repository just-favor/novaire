import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About \u2014 NOVAIRE",
  description: "Founded in Paris in 2018. NOVAIRE is built on craftsmanship, materiality, and a quiet refusal to compromise.",
  openGraph: {
    title: "About \u2014 NOVAIRE",
    description: "Founded in Paris in 2018. NOVAIRE is built on craftsmanship, materiality, and a quiet refusal to compromise.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
