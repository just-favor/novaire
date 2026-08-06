"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, X, ArrowRight } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Footer from "@/components/Layout/Footer";
import Container from "@/components/Layout/Container";
import { useWishlist } from "@/context/WishlistContext";
import { useProductModal } from "@/context/ProductModalContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.25, 0.1, 0.15, 1] as [number,number,number,number] },
  }),
};

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { open } = useProductModal();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />
      <SecondaryHeader />

      {/* Hero */}
      <section className="relative pt-44 pb-12 border-b border-white/5 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffbf50]/5 blur-[140px] rounded-full" />
        <Container>
          <motion.div initial="hidden" animate="visible" className="space-y-3">
            <motion.span variants={fadeUp} custom={0} className="block text-[10px] uppercase tracking-[0.5em] text-[#ffbf50]/60">
              Saved Pieces
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-[0.2em] text-white/90">
              WISHLIST
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-sm tracking-[0.15em] text-white/30">
              {items.length === 0 ? "No saved pieces yet." : `${items.length} saved ${items.length === 1 ? "piece" : "pieces"}`}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-6 py-24 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-white/[0.02]">
                <Heart className="h-8 w-8 text-white/10" strokeWidth={1} />
              </div>
              <div className="space-y-2">
                <p className="text-sm tracking-[0.2em] text-white/30 uppercase">Your wishlist is empty</p>
                <p className="text-xs tracking-[0.15em] text-white/20">Save pieces you love by clicking the heart icon on any product.</p>
              </div>
              <Link
                href="/shop"
                className="group mt-4 inline-flex items-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 rounded-xl"
              >
                Explore the Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={fadeUp}
                  className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#ffbf50]/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,191,80,0.07)]"
                >
                  {/* Image */}
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden bg-black/40 cursor-pointer"
                    onClick={() => open(product)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="rounded-full bg-[#ffbf50] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black">New</span>
                      )}
                      {product.originalPrice && (
                        <span className="rounded-full bg-red-600/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white">Sale</span>
                      )}
                    </div>

                    {/* Remove from wishlist */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggle(product); }}
                      className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-red-400/40 bg-black/60 text-red-400 backdrop-blur-md transition-all hover:bg-red-400/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between p-4 gap-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.3em] text-[#ffbf50]/60 font-mono">{product.categoryName}</span>
                      <h3
                        className="mt-1 font-heading text-sm tracking-[0.12em] text-white/85 line-clamp-1 cursor-pointer hover:text-[#ffbf50] transition-colors"
                        onClick={() => open(product)}
                      >
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[10px] tracking-wider text-white/35 line-clamp-2 leading-relaxed">{product.tagline}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-sm tracking-wider text-white/80">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="font-mono text-xs text-white/25 line-through">${product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        onClick={() => open(product)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#ffbf50]/25 bg-[#ffbf50]/8 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#ffbf50]/70 transition-all hover:border-[#ffbf50]/50 hover:bg-[#ffbf50]/15 hover:text-[#ffbf50]"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-12 flex justify-center"
            >
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/25 transition-colors hover:text-[#ffbf50]/60"
              >
                Continue Shopping
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
}
