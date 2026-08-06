"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Sparkles, ChevronLeft, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useProductModal } from "@/context/ProductModalContext";

import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Footer from "@/components/Layout/Footer";
import { products, categoriesList, subCategories, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Map URL slug -> category id used in data
const validCategorySlugs = categoriesList.map((c) => c.id);

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params?.category as string;

  const { open } = useProductModal();

  // Fallback if invalid slug
  const isValidCategory = validCategorySlugs.includes(categorySlug);
  const categoryInfo = isValidCategory
    ? categoriesList.find((c) => c.id === categorySlug)!
    : null;

  // Filter products by this category
  const categoryProducts = isValidCategory
    ? products.filter((p) => p.category === categorySlug)
    : [];

  const subs = isValidCategory ? subCategories[categorySlug] : null;

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartNotification(`Added "${productName}" to your bag`);
    setTimeout(() => setCartNotification(null), 3000);
  };

  // Filter + Sort
  let filteredProducts = [...categoryProducts];
  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Error / invalid category fallback
  if (!isValidCategory || !categoryInfo) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <SecondaryHeader />
        <div className="flex flex-col items-center justify-center pt-64 pb-40 px-4">
          <span className="text-[10px] tracking-[0.4em] text-[#ffbf50] uppercase mb-4">
            404 — Not Found
          </span>
          <h1 className="font-heading text-4xl tracking-[0.2em] text-white mb-4">
            COLLECTION NOT FOUND
          </h1>
          <p className="text-white/50 text-sm tracking-wider mb-8">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-xl border border-[#ffbf50]/40 text-[#ffbf50] text-xs tracking-[0.2em] uppercase hover:bg-[#ffbf50]/10 transition-all"
          >
            &larr; Back to All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />
      <SecondaryHeader />

      {/* Cart Notification Toast */}
      <AnimatePresence>
        {cartNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-40 right-6 z-50 flex items-center gap-3 bg-black/90 border border-[#ffbf50]/40 text-[#ffbf50] px-5 py-3 rounded-xl shadow-2xl backdrop-blur-xl text-xs tracking-wider"
          >
            <Sparkles className="h-4 w-4 text-[#ffbf50]" />
            <span>{cartNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <section className="relative pt-44 pb-12 px-4 sm:px-8 lg:px-12 bg-gradient-to-b from-black via-black/95 to-black overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 bg-[#ffbf50]/5 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2">
              <Link href="/shop" className="hover:text-[#ffbf50] transition-colors">
                All Products
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-[#ffbf50]">{categoryInfo.name}</span>
            </div>

            <span className="text-[10px] sm:text-xs tracking-[0.4em] text-[#ffbf50] uppercase font-semibold">
              Curated Collection
            </span>
            <h1 className="mt-2 font-heading text-4xl sm:text-5xl lg:text-6xl tracking-[0.2em] text-white">
              {categoryInfo.name.toUpperCase()}
            </h1>
            <p className="mt-3 max-w-xl text-xs sm:text-sm tracking-[0.15em] text-white/50 leading-relaxed">
              {subs
                ? `Explore our ${categoryInfo.name.toLowerCase()} collection featuring ${subs.slice(0, 3).join(", ")}, and more.`
                : `Discover ${categoryProducts.length} meticulously crafted pieces in this collection.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.2em] text-[#ffbf50] font-mono">
              {categoryProducts.length} ITEMS
            </span>
            <Link
              href="/shop"
              className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.2em] text-white/60 hover:text-white hover:border-white/20 transition-all font-mono flex items-center gap-1.5"
            >
              <ChevronLeft className="h-3 w-3" />
              All
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile sticky filter/search bar */}
      <div className="lg:hidden sticky top-36 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 py-3 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search in ${categoryInfo.name}...`}
            className="pl-9 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ffbf50]/50 w-full"
          />
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => setSortBy(sortBy === "price-asc" ? "default" : "price-asc")}
            className={`px-3 py-2 rounded-lg text-[10px] tracking-[0.15em] uppercase border transition-all ${
              sortBy === "price-asc"
                ? "bg-[#ffbf50]/20 border-[#ffbf50]/40 text-[#ffbf50]"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            $ &uarr;
          </button>
          <button
            onClick={() => setSortBy(sortBy === "price-desc" ? "default" : "price-desc")}
            className={`px-3 py-2 rounded-lg text-[10px] tracking-[0.15em] uppercase border transition-all ${
              sortBy === "price-desc"
                ? "bg-[#ffbf50]/20 border-[#ffbf50]/40 text-[#ffbf50]"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            $ &darr;
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 flex flex-col lg:flex-row gap-10 relative">
        {/* Left: Product Grid */}
        <main className="flex-1 min-w-0">
          {/* Subcategory chips */}
          {subs && (
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/10">
              {subs.map((sub) => (
                <span
                  key={sub}
                  className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] tracking-[0.15em] text-white/50 uppercase hover:border-[#ffbf50]/30 hover:text-[#ffbf50] transition-all cursor-default"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}

          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#ffbf50]" />
                <span className="text-[10px] tracking-[0.35em] text-[#ffbf50] uppercase font-mono">
                  {categoryInfo.name}
                </span>
              </div>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl tracking-[0.2em] text-white">
                {categoryInfo.name.toUpperCase()}
              </h2>
            </div>
            <span className="text-xs tracking-[0.2em] text-white/40 font-mono">
              {filteredProducts.length} OF {categoryProducts.length} PIECES
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5 }}
                  onClick={() => open(product)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#ffbf50]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,191,80,0.08)] cursor-pointer"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="px-2.5 py-1 rounded-full bg-[#ffbf50] text-black text-[9px] font-semibold tracking-[0.2em] uppercase shadow-md">
                          NEW
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full bg-white/90 text-black text-[9px] font-semibold tracking-[0.2em] uppercase shadow-md">
                          BEST SELLER
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[9px] font-semibold tracking-[0.2em] uppercase shadow-md">
                          VAULT SALE
                        </span>
                      )}
                    </div>

                    {/* Quick Add Overlay Button */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <Button
                        onClick={(e) => { e.stopPropagation(); open(product); }}
                        className="w-full bg-[#ffbf50] text-black hover:bg-[#ffbf50]/90 text-xs tracking-[0.2em] uppercase py-5 shadow-xl font-medium"
                      >
                        <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                        Quick View
                      </Button>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <span className="text-[9px] tracking-[0.3em] text-[#ffbf50]/70 uppercase font-mono">
                        {product.categoryName}
                      </span>
                      <h3 className="font-heading text-lg tracking-[0.15em] text-white/90 mt-1 line-clamp-1 group-hover:text-[#ffbf50] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] tracking-wider text-white/40 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-medium tracking-wider text-white font-mono">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-white/30 line-through font-mono">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] tracking-[0.2em] text-[#ffbf50]/60 uppercase group-hover:translate-x-1 transition-transform duration-300">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/[0.01]">
              <p className="text-xs tracking-[0.2em] text-white/40">
                {searchQuery
                  ? `No products match your search query in this collection.`
                  : `No products found in this collection.`}
              </p>
              {(searchQuery || sortBy !== "default") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSortBy("default");
                  }}
                  className="mt-4 text-[10px] tracking-[0.25em] text-[#ffbf50] hover:text-white uppercase transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}
        </main>

        {/* Right Sidebar: Filtering options */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-44 self-start space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 bg-[#ffbf50]/10 blur-[50px] rounded-full" />

            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="h-4 w-4 text-[#ffbf50]" />
                <h3 className="font-heading text-sm tracking-[0.25em] text-white uppercase">
                  FILTERS
                </h3>
              </div>
              <span className="text-[9px] tracking-[0.2em] text-[#ffbf50] font-mono px-2 py-0.5 rounded-full bg-[#ffbf50]/10 border border-[#ffbf50]/20">
                {categoryInfo.name}
              </span>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${categoryInfo.name}...`}
                className="pl-9 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ffbf50]/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Subcategories list */}
            {subs && (
              <div className="pb-6 mb-6 border-b border-white/10">
                <span className="block text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3">
                  Subcategories
                </span>
                <div className="space-y-1.5">
                  {subs.map((sub) => (
                    <button
                      key={sub}
                      className="w-full text-left px-3 py-2 rounded-lg text-[10px] tracking-[0.15em] text-white/40 uppercase hover:text-[#ffbf50] hover:bg-[#ffbf50]/5 transition-all duration-200"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sort Options */}
            <div className="space-y-3">
              <span className="block text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Sort Price
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSortBy(sortBy === "price-asc" ? "default" : "price-asc")}
                  className={`px-3 py-2 rounded-lg text-[10px] tracking-[0.15em] uppercase border transition-all duration-300 ${
                    sortBy === "price-asc"
                      ? "bg-[#ffbf50]/20 border-[#ffbf50]/40 text-[#ffbf50]"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  Low &rarr; High
                </button>
                <button
                  onClick={() => setSortBy(sortBy === "price-desc" ? "default" : "price-desc")}
                  className={`px-3 py-2 rounded-lg text-[10px] tracking-[0.15em] uppercase border transition-all duration-300 ${
                    sortBy === "price-desc"
                      ? "bg-[#ffbf50]/20 border-[#ffbf50]/40 text-[#ffbf50]"
                      : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                  }`}
                >
                  High &rarr; Low
                </button>
              </div>
            </div>

            {/* Reset */}
            {(searchQuery || sortBy !== "default") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="w-full mt-4 py-2.5 text-[10px] tracking-[0.25em] text-[#ffbf50] hover:text-white uppercase transition-colors text-center border border-[#ffbf50]/20 rounded-xl"
              >
                Reset All Filters
              </button>
            )}

            {/* Back link */}
            <Link
              href="/shop"
              className="w-full mt-4 py-2.5 text-[10px] tracking-[0.25em] text-white/40 hover:text-white uppercase transition-colors text-center border border-white/10 rounded-xl flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="h-3 w-3" />
              All Products
            </Link>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

