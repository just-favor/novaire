import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist \u2014 NOVAIRE",
  description: "Your saved NOVAIRE pieces.",
  openGraph: {
    title: "Wishlist \u2014 NOVAIRE",
    description: "Your saved NOVAIRE pieces.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
