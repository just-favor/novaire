"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShoppingBag, Eye, Plus, ArrowUpRight } from "lucide-react";
import { products, Product } from "@/data/products";
import { useProductModal } from "@/context/ProductModalContext";
import { useCurrency } from "@/context/CurrencyContext";

interface Hotspot {
  id: string;
  productId: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
}

interface LookbookShoot {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  hotspots: Hotspot[];
}

const shoots: LookbookShoot[] = [
  {
    id: "shoot-1",
    title: "THE OBSIDIAN ATELIER",
    subtitle: "Architectural tailoring cut from Italian virgin wool & double-faced cashmere.",
    season: "AUTUMN / WINTER 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    hotspots: [
      {
        id: "h1-1",
        productId: "na-1", // Aethelgard Cashmere Overcoat
        x: 35,
        y: 28,
        title: "Cashmere Overcoat",
      },
      {
        id: "h1-2",
        productId: "w-8", // Vivienne Satin Slingback Heels
        x: 52,
        y: 82,
        title: "Satin Slingback Heels",
      },
      {
        id: "h1-3",
        productId: "w-6", // Serafina Leather Top-Handle Bag
        x: 68,
        y: 58,
        title: "Top-Handle Bag",
      },
    ],
  },
  {
    id: "shoot-2",
    title: "SAVILE TAILORING & HOROLOGY",
    subtitle: "Precision-milled Swiss timepieces paired with double-breasted barathea tuxedos.",
    season: "PRIVATE VAULT DROP",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop",
    hotspots: [
      {
        id: "h2-1",
        productId: "m-1", // Savile Double-Breasted Suit
        x: 48,
        y: 38,
        title: "Double-Breasted Suit",
      },
      {
        id: "h2-2",
        productId: "m-15", // Chronos Automatic Tourbillon Watch
        x: 32,
        y: 54,
        title: "Tourbillon Watch",
      },
      {
        id: "h2-3",
        productId: "m-6", // Kenelm Leather Monk-Strap Shoes
        x: 58,
        y: 88,
        title: "Monk-Strap Shoes",
      },
    ],
  },
];

export default function ShoppableLookbook() {
  const [activeShootIndex, setActiveShootIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const { open } = useProductModal();
  const { formatPrice } = useCurrency();

  const currentShoot = shoots[activeShootIndex];

  // Helper to find product by id
  const getProduct = (productId: string): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  return (
    <section className="relative w-full bg-black py-24 sm:py-32 overflow-hidden border-t border-b border-white/10">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#ffbf50]/5 blur-[160px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#ffbf50]" />
              <span className="text-[10px] tracking-[0.4em] text-[#ffbf50] uppercase font-semibold">
                Interactive Lookbook
              </span>
            </div>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] text-white">
              EDITORIAL HOTSPOTS
            </h2>
            <p className="mt-2 text-xs sm:text-sm tracking-[0.15em] text-white/50 max-w-lg">
              Hover or tap any glowing pin on the editorial campaign to inspect signature pieces directly.
            </p>
          </div>

          {/* Shoot Selector Tabs */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-full self-start md:self-auto">
            {shoots.map((shoot, idx) => (
              <button
                key={shoot.id}
                onClick={() => {
                  setActiveShootIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  activeShootIndex === idx
                    ? "bg-[#ffbf50] text-black font-semibold shadow-[0_0_20px_rgba(255,191,80,0.3)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {shoot.season}
              </button>
            ))}
          </div>
        </div>

        {/* Main Editorial Canvas Frame */}
        <div className="relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[2.1/1] w-full rounded-3xl border border-white/10 overflow-hidden bg-black/60 shadow-2xl group">
          {/* Main Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentShoot.id}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={currentShoot.image}
                alt={currentShoot.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
            </motion.div>
          </AnimatePresence>

          {/* Overlay shoot title */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 max-w-lg pointer-events-none">
            <span className="text-[9px] sm:text-[10px] tracking-[0.4em] text-[#ffbf50] uppercase font-mono">
              {currentShoot.season}
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-white mt-1">
              {currentShoot.title}
            </h3>
            <p className="mt-1 text-xs tracking-wider text-white/60 line-clamp-2">
              {currentShoot.subtitle}
            </p>
          </div>

          {/* Hotspot Pins */}
          {currentShoot.hotspots.map((hs) => {
            const product = getProduct(hs.productId);
            if (!product) return null;
            const isActive = activeHotspot?.id === hs.id;

            return (
              <div
                key={hs.id}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                {/* Glowing Pulsing Pin */}
                <button
                  onClick={() => setActiveHotspot(isActive ? null : hs)}
                  onMouseEnter={() => setActiveHotspot(hs)}
                  className="relative group/pin flex items-center justify-center p-2 focus:outline-none"
                  aria-label={`Inspect ${hs.title}`}
                >
                  <span className="absolute h-8 w-8 rounded-full bg-[#ffbf50]/40 animate-ping" />
                  <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#ffbf50] text-black shadow-[0_0_20px_rgba(255,191,80,0.8)] transition-transform duration-300 group-hover/pin:scale-125">
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${isActive ? "rotate-45" : ""}`} />
                  </span>
                </button>

                {/* Popover Preview Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 rounded-2xl border border-[#ffbf50]/30 bg-black/90 backdrop-blur-2xl p-4 shadow-2xl z-40 pointer-events-auto"
                    >
                      {/* Arrow */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden flex justify-center">
                        <div className="w-2.5 h-2.5 rotate-45 bg-[#ffbf50]/30 border-r border-b border-[#ffbf50]/40 -mt-1 bg-black" />
                      </div>

                      <div className="flex gap-3">
                        <div className="relative h-16 w-14 rounded-lg overflow-hidden bg-black/40 shrink-0">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <span className="text-[8px] tracking-[0.3em] text-[#ffbf50] uppercase font-mono">
                              {product.categoryName}
                            </span>
                            <h4 className="font-heading text-xs tracking-wider text-white truncate mt-0.5">
                              {product.name}
                            </h4>
                            <p className="text-[10px] font-mono tracking-wider text-white/80 mt-1">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                        <button
                          onClick={() => open(product)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#ffbf50] text-black text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#ffbf50]/90 transition-all shadow-md"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          Quick View
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
