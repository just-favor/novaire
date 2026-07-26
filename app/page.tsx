import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Hero from "@/components/Landing/Hero";
import FeaturedCollections from "@/components/Landing/FeaturedCollections";
import FeaturedProducts from "@/components/Landing/FeaturedProducts";
import BrandStory from "@/components/Landing/BrandStory";
import Footer from "@/components/Layout/Footer";

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
