import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop \u2014 NOVAIRE",
  description: "Browse 60 meticulously crafted pieces across tailoring, couture, essentials, and vault sale.",
  openGraph: {
    title: "Shop \u2014 NOVAIRE",
    description: "Browse 60 meticulously crafted pieces across tailoring, couture, essentials, and vault sale.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
