"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, ShoppingBag, Filter, Check, ChevronRight, SlidersHorizontal, Sparkles } from "lucide-react";

import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Footer from "@/components/Layout/Footer";
import { products, categoriesList, Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [cartNotification, setCartNotification] = useState<string | null>(null);

  // Handle hash deep-linking on page load (e.g. /shop#men)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      if (hashId) {
        setTimeout(() => {
          scrollToCategory(hashId);
        }, 300);
      }
    }
  }, []);

  // Smooth scroll to target category section
  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(categoryId);
    if (element) {
      const yOffset = -180; // Offset for fixed navbar + secnav height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Add to cart notification trigger
  const handleAddToCart = (productName: string) => {
    setCartNotification(`Added "${productName}" to your bag`);
    setTimeout(() => setCartNotification(null), 3000);
  };

  // Filter products by search query
  const getFilteredProducts = (categoryProducts: Product[]) => {
    let result = [...categoryProducts];

    if (searchQuery.trim()) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  };

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
            <span className="text-[10px] sm:text-xs tracking-[0.4em] text-[#ffbf50] uppercase font-semibold">
              Complete Atelier Catalog
            </span>
            <h1 className="mt-2 font-heading text-4xl sm:text-5xl lg:text-6xl tracking-[0.2em] text-white">
              ALL PRODUCTS
            </h1>
            <p className="mt-3 max-w-xl text-xs sm:text-sm tracking-[0.15em] text-white/50 leading-relaxed">
              Explore 60 meticulously crafted pieces spanning tailoring, couture, signature essentials, and private vault drops.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-[0.2em] text-[#ffbf50] font-mono">
              60 ITEMS TOTAL
            </span>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Quick Navigation Bar */}
      <div className="lg:hidden sticky top-36 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10 py-3 px-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => scrollToCategory("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
            activeCategory === "all"
              ? "bg-[#ffbf50] text-black font-semibold shadow-[0_0_20px_rgba(255,191,80,0.3)]"
              : "bg-white/5 text-white/70 border border-white/10"
          }`}
        >
          All (60)
        </button>
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToCategory(cat.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-[#ffbf50] text-black font-semibold shadow-[0_0_20px_rgba(255,191,80,0.3)]"
                : "bg-white/5 text-white/70 border border-white/10"
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Main Page Layout with Content + Clickable Right Sidebar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-10 flex flex-col lg:flex-row gap-10 relative">
        
        {/* Left Side: Product Sections (Section by Section Display) */}
        <main className="flex-1 space-y-20 min-w-0">
          {categoriesList.map((cat) => {
            const categoryProducts = products.filter((p) => p.category === cat.id);
            const filteredProducts = getFilteredProducts(categoryProducts);

            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-44 border-b border-white/5 pb-16 last:border-b-0"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-[#ffbf50]" />
                      <span className="text-[10px] tracking-[0.35em] text-[#ffbf50] uppercase font-mono">
                        Category Section
                      </span>
                    </div>
                    <h2 className="mt-2 font-heading text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] text-white">
                      {cat.name.toUpperCase()}
                    </h2>
                  </div>

                  <span className="text-xs tracking-[0.2em] text-white/40 font-mono">
                    SHOWING {filteredProducts.length} OF {cat.count} PIECES
                  </span>
                </div>

                {/* Section Grid */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.5 }}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#ffbf50]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,191,80,0.08)]"
                      >
                        {/* Card Image Container */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
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
                              onClick={() => handleAddToCart(product.name)}
                              className="w-full bg-[#ffbf50] text-black hover:bg-[#ffbf50]/90 text-xs tracking-[0.2em] uppercase py-5 shadow-xl font-medium"
                            >
                              <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                              Add to Bag
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
                      No products match your search query in this category.
                    </p>
                  </div>
                )}
              </section>
            );
          })}
        </main>

        {/* Right Side: Sticky Clickable Category Sidebar (Desktop View) */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-44 self-start space-y-6">
          <div className="rounded-2xl border border-white/10 bg-black/80 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 bg-[#ffbf50]/10 blur-[50px] rounded-full" />

            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="h-4 w-4 text-[#ffbf50]" />
                <h3 className="font-heading text-sm tracking-[0.25em] text-white uppercase">
                  CATEGORIES
                </h3>
              </div>
              <span className="text-[9px] tracking-[0.2em] text-[#ffbf50] font-mono px-2 py-0.5 rounded-full bg-[#ffbf50]/10 border border-[#ffbf50]/20">
                JUMP TO
              </span>
            </div>

            {/* Search Input Box */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog..."
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

            {/* Clickable Category Links List */}
            <div className="space-y-2">
              <button
                onClick={() => scrollToCategory("all")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                  activeCategory === "all"
                    ? "bg-[#ffbf50]/15 border border-[#ffbf50]/40 text-[#ffbf50] font-medium"
                    : "bg-white/[0.02] border border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeCategory === "all" ? "bg-[#ffbf50]" : "bg-white/20"
                    }`}
                  />
                  <span>All Products</span>
                </div>
                <span className="text-[10px] font-mono opacity-60">60</span>
              </button>

              {categoriesList.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs tracking-[0.18em] uppercase transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#ffbf50]/15 border border-[#ffbf50]/40 text-[#ffbf50] font-medium"
                      : "bg-white/[0.02] border border-white/5 text-white/60 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        activeCategory === cat.id ? "bg-[#ffbf50]" : "bg-white/20"
                      }`}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
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

            {/* Reset Filters */}
            {(searchQuery || sortBy !== "default" || activeCategory !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSortBy("default");
                  setActiveCategory("all");
                }}
                className="w-full mt-4 py-2.5 text-[10px] tracking-[0.25em] text-[#ffbf50] hover:text-white uppercase transition-colors text-center border border-[#ffbf50]/20 rounded-xl"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </aside>

      </div>

      <Footer />
    </div>
  );
}
