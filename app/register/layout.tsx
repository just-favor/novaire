import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account \u2014 NOVAIRE",
  description: "Join NOVAIRE. Create an account to save pieces, track orders, and access exclusive vault drops.",
  openGraph: {
    title: "Create Account \u2014 NOVAIRE",
    description: "Join NOVAIRE. Create an account to save pieces, track orders, and access exclusive vault drops.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
