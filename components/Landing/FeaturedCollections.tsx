"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: "novus",
    title: "NOVUS",
    tagline: "New Arrivals",
    description:
      "Our latest curation defining the new standard of modern luxury.",
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    ],
    href: "/shop#new-arrivals",
    gridClass: "lg:col-span-6 lg:row-span-2",
    featured: true,
  },
  {
    id: "tailored",
    title: "TAILORED",
    tagline: "Gentleman's Atelier",
    description:
      "Precision silhouettes and refined fabrics for modern tailoring.",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1887&auto=format&fit=crop",
    ],
    href: "/shop#men",
    gridClass: "lg:col-span-3 lg:row-span-1",
    featured: false,
  },
  {
    id: "artisan",
    title: "ARTISAN",
    tagline: "Women's Couture",
    description:
      "Timeless design crafted with unparalleled artistic flair.",
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1886&auto=format&fit=crop",
    ],
    href: "/shop#women",
    gridClass: "lg:col-span-3 lg:row-span-1",
    featured: false,
  },
  {
    id: "essentials",
    title: "ESSENTIALS",
    tagline: "Signature Staples",
    description:
      "Core luxury items engineered for everyday refinement.",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop",
    ],
    href: "/shop#essentials",
    gridClass: "lg:col-span-3 lg:row-span-1",
    featured: false,
  },
  {
    id: "archive",
    title: "ARCHIVE",
    tagline: "Private Vault",
    description:
      "Exclusive drops and rare limited releases.",
    images: [
      "https://images.unsplash.com/photo-1608032077018-c9aad9565d2c?q=80&w=1888&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1888&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop",
    ],
    href: "/shop#sale",
    gridClass: "lg:col-span-3 lg:row-span-1",
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

function CollectionCard({
  collection,
  index,
}: {
  collection: (typeof collections)[0];
  index: number;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Each box is staggered by 1.6s (1600ms) so boxes fade sequentially
    const staggerDelay = index * 1600;
    let interval: NodeJS.Timeout;

    const timer = setTimeout(() => {
      // Advance to next image
      setCurrentImageIndex((prev) => (prev + 1) % collection.images.length);

      // Then cycle every 8 seconds
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % collection.images.length);
      }, 8000);
    }, staggerDelay + 8000);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [index, collection.images.length]);

  return (
    <motion.div
      variants={itemVariants}
      className={`relative group overflow-hidden rounded-2xl border border-white/10 hover:border-[#ffbf50]/50 transition-all duration-700 shadow-2xl ${collection.gridClass}`}
    >
      <Link href={collection.href} className="block h-full w-full relative">
        {/* Background Image Carousel with Fade Animation */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={collection.images[currentImageIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{
                duration: 1.4,
                ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
              }}
              className="absolute inset-0"
            >
              {imgErrors[collection.images[currentImageIndex]] ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                  <span className="text-white/10 text-5xl">✦</span>
                </div>
              ) : (
                <Image
                  src={collection.images[currentImageIndex]}
                  alt={collection.title}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={() => setImgErrors((prev) => ({ ...prev, [collection.images[currentImageIndex]]: true }))}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:via-black/30 transition-all duration-500 z-10" />
          <div className="absolute inset-0 bg-[#ffbf50]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 h-full flex flex-col justify-end p-5 md:p-6 lg:p-7">
          <span className="text-[10px] tracking-[0.35em] text-[#ffbf50]/80 uppercase font-medium">
            {collection.tagline}
          </span>

          <h3
            className={`font-heading tracking-[0.2em] text-white group-hover:text-white/90 transition-colors mt-1 ${
              collection.featured
                ? "text-3xl sm:text-4xl md:text-5xl"
                : "text-xl sm:text-2xl lg:text-3xl"
            }`}
          >
            {collection.title}
          </h3>

          <p
            className={`text-white/50 tracking-wider line-clamp-2 mt-2 leading-relaxed transition-opacity duration-500 ${
              collection.featured
                ? "text-xs md:text-sm max-w-lg"
                : "text-[11px] max-w-xs"
            }`}
          >
            {collection.description}
          </p>

          {/* CTA Link */}
          <div className="mt-4 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#ffbf50] group-hover:text-white transition-colors">
            <span>Explore</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
          </div>
        </div>

        {/* Edge glow effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-[#ffbf50]/30 rounded-2xl z-30" />
      </Link>
    </motion.div>
  );
}

export default function FeaturedCollections() {
  return (
    <section className="relative w-full min-h-screen lg:h-screen bg-black px-4 py-8 md:px-8 lg:px-12 flex flex-col justify-between overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#ffbf50]/5 blur-[120px] rounded-full" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-[10px] sm:text-xs tracking-[0.4em] text-[#ffbf50] uppercase font-semibold">
            Curated Lines
          </span>
          <h2 className="mt-1 font-heading text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] text-white/90">
            FEATURED COLLECTIONS
          </h2>
        </div>
        <p className="max-w-md text-xs tracking-[0.15em] text-white/40 leading-relaxed">
          Explore our five signature pillars of craftsmanship, designed to elevate every wardrobe facet.
        </p>
      </div>

      {/* 5-Collection Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 flex-1 min-h-[600px] lg:min-h-0"
      >
        {collections.map((collection, index) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            index={index}
          />
        ))}
      </motion.div>
    </section>
  );
}



