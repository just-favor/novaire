import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductModalProvider } from "@/context/ProductModalContext";
import ProductModal from "@/components/ui/ProductModal";
import { SearchProvider } from "@/context/SearchContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/ui/CartDrawer";
import CartToast from "@/components/ui/CartToast";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistToast from "@/components/ui/WishlistToast";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVAIRE — Curated Luxury",
  description: "Meticulously crafted pieces spanning tailoring, couture, signature essentials, and private vault drops.",
  metadataBase: new URL("https://novaire.vercel.app"),
  openGraph: {
    title: "NOVAIRE — Curated Luxury",
    description: "Meticulously crafted pieces spanning tailoring, couture, signature essentials, and private vault drops.",
    url: "https://novaire.vercel.app",
    siteName: "NOVAIRE",
    images: [
      {
        url: "/young-trendy-woman-model-outside-street.jpg",
        width: 1200,
        height: 630,
        alt: "NOVAIRE — Curated Luxury",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVAIRE — Curated Luxury",
    description: "Meticulously crafted pieces spanning tailoring, couture, signature essentials, and private vault drops.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script
          // biome-ignore lint: theme init must run before paint
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t='dark';localStorage.setItem('theme','dark');}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <SearchProvider>
                  <ProductModalProvider>
                    {children}
                    <ProductModal />
                    <CartDrawer />
                    <CartToast />
                    <WishlistToast />
                  </ProductModalProvider>
                </SearchProvider>
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
