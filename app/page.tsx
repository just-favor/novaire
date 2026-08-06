import type { Metadata } from "next";
import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Hero from "@/components/Landing/Hero";
import FeaturedCollections from "@/components/Landing/FeaturedCollections";
import FeaturedProducts from "@/components/Landing/FeaturedProducts";
import BrandStory from "@/components/Landing/BrandStory";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = {
  title: "NOVAIRE — Curated Luxury",
  description: "Discover 60 meticulously crafted pieces. Tailoring, couture, signature essentials, and private vault drops.",
  openGraph: {
    title: "NOVAIRE — Curated Luxury",
    description: "Discover 60 meticulously crafted pieces. Tailoring, couture, signature essentials, and private vault drops.",
    images: ["/young-trendy-woman-model-outside-street.jpg"],
  },
};

export default function Home() {
  return (
    <main>
      <Navbar/>
      <SecondaryHeader/>
      <Hero/>
      <FeaturedCollections/>
      <FeaturedProducts/>
      <BrandStory/>
      <Footer/>
    </main>
  );
}
