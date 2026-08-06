"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Star,
  ChevronDown,
  ChevronUp,
  Shield,
  Truck,
  RotateCcw,
  Heart,
} from "lucide-react";
import { useProductModal } from "@/context/ProductModalContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { Product } from "@/data/products";
import SizeGuideModal from "@/components/ui/SizeGuideModal";

const mockDetails: Record<string, string[]> = {
  default: [
    "Hand-finished construction",
    "Sourced from heritage European mills",
    "Dry clean only",
    "Numbered limited edition",
    "Includes NOVAIRE dust bag and certificate of authenticity",
  ],
};

const mockSizes: Record<string, string[]> = {
  men: ["XS", "S", "M", "L", "XL", "XXL"],
  women: ["XS", "S", "M", "L", "XL"],
  children: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y", "14Y"],
  shoes: ["38", "39", "40", "41", "42", "43", "44", "45"],
  default: ["XS", "S", "M", "L", "XL"],
};

const mockReviews = [
  {
    name: "E. Marchetti",
    rating: 5,
    date: "March 2025",
    body: "Absolutely impeccable quality. The fabric feels extraordinary and the fit is perfect. Worth every penny.",
  },
  {
    name: "J. Whitmore",
    rating: 5,
    date: "February 2025",
    body: "I've owned pieces from many luxury houses and NOVAIRE stands apart. The attention to detail is remarkable.",
  },
  {
    name: "S. Beaumont",
    rating: 4,
    date: "January 2025",
    body: "Stunning piece. Sizing runs slightly slim — I'd recommend going one size up if between sizes.",
  },
];

function getSizes(product: Product) {
  const name = product.name.toLowerCase();
  if (
    name.includes("shoe") || name.includes("boot") || name.includes("loafer") ||
    name.includes("brogue") || name.includes("sneaker") || name.includes("heel") ||
    name.includes("slingback")
  ) return mockSizes.shoes;
  if (product.category === "children") return mockSizes.children;
  if (product.category === "men") return mockSizes.men;
  if (product.category === "women") return mockSizes.women;
  return mockSizes.default;
}

export default function ProductModal() {
  const { product, close } = useProductModal();
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { formatPrice } = useCurrency();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedSize(null);
    setShowDetails(false);
    setAdded(false);
    setShowSizeGuide(false);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [product]);

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopFade(scrollTop > 4);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 4);
  };

  useEffect(() => {
    handleScroll();
  }, [showDetails, product]);

  const sizes = product ? getSizes(product) : [];

  const sizeGuideCategory =
    product && (product.name.toLowerCase().includes("shoe") || product.name.toLowerCase().includes("boot") ||
    product.name.toLowerCase().includes("loafer") || product.name.toLowerCase().includes("brogue") ||
    product.name.toLowerCase().includes("sneaker") || product.name.toLowerCase().includes("heel") ||
    product.name.toLowerCase().includes("slingback"))
      ? "shoes"
      : product?.category ?? "clothing";

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal wrapper */}
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 lg:p-6 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.15, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative flex w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl
                         h-[92dvh] sm:h-auto sm:max-h-[85dvh] sm:w-[92vw]
                         lg:w-full lg:max-w-[640px] lg:rounded-2xl"
            >
              {/* Close */}
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/50 backdrop-blur-md transition-all hover:border-white/30 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggle(product)}
                aria-label="Wishlist"
                className={`absolute right-14 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border bg-black/60 backdrop-blur-md transition-all duration-300 ${
                  isWishlisted(product.id)
                    ? "border-[#ffbf50]/60 text-[#ffbf50]"
                    : "border-white/10 text-white/40 hover:border-[#ffbf50]/40 hover:text-[#ffbf50]"
                }`}
              >
                <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${isWishlisted(product.id) ? "fill-[#ffbf50]" : ""}`} />
              </button>

              {/* Drag handle on mobile */}
              <div className="flex shrink-0 justify-center pb-1 pt-3 lg:hidden">
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              {/* Image banner — spans full width at every breakpoint now */}
              <div className="relative aspect-[16/10] w-full shrink-0 bg-black/40 sm:aspect-[21/9] lg:aspect-[2.4/1]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="rounded-full bg-[#ffbf50] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-black shadow-lg">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="rounded-full bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-black shadow-lg">
                      Best Seller
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="rounded-full bg-red-600 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white shadow-lg">
                      Vault Sale
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">
                    {product.categoryName}
                  </span>
                </div>
              </div>

              {/* Scrollable content. min-h-0 is what actually makes it scroll instead of overflowing. */}
              <div className="relative flex min-h-0 flex-1 flex-col">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent transition-opacity duration-200 ${
                    showTopFade ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-8
                             [scrollbar-width:thin] [scrollbar-color:rgba(255,191,80,0.25)_transparent]
                             [&::-webkit-scrollbar]:w-1.5
                             [&::-webkit-scrollbar-track]:bg-transparent
                             [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#ffbf50]/20"
                >
                  <div className="space-y-6">
                    {/* Name + Price */}
                    <div className="space-y-3 pr-8">
                      <h2 className="font-heading text-xl leading-snug tracking-[0.1em] text-white sm:text-2xl">
                        {product.name}
                      </h2>
                      <p className="text-sm leading-relaxed tracking-[0.08em] text-white/40">
                        {product.tagline}
                      </p>
                      <div className="flex items-baseline gap-3 pt-1">
                        <span className="font-mono text-2xl font-light tracking-wider text-white">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="font-mono text-sm text-white/25 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-xs tracking-wider text-red-400">
                              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Size selector */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                          Select Size
                        </span>
                        <span
                          onClick={() => setShowSizeGuide(true)}
                          className="cursor-pointer text-[10px] uppercase tracking-[0.2em] text-[#ffbf50]/50 transition-colors hover:text-[#ffbf50]">
                          Size Guide
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[44px] rounded-lg border px-3 py-2 text-[11px] uppercase tracking-[0.12em] transition-all duration-200 ${
                              selectedSize === size
                                ? "border-[#ffbf50] bg-[#ffbf50]/15 text-[#ffbf50]"
                                : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/25 hover:text-white/80"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to bag */}
                    <button
                      onClick={() => {
                        if (!selectedSize) return;
                        addItem(product, selectedSize);
                        setAdded(true);
                        setTimeout(() => setAdded(false), 2000);
                      }}
                      className={`flex w-full items-center justify-center gap-2.5 rounded-xl border px-6 py-3.5 text-xs font-medium uppercase tracking-[0.25em] transition-all duration-500 sm:w-auto ${
                        added
                          ? "border-[#ffbf50]/60 bg-[#ffbf50]/20 text-[#ffbf50]"
                          : !selectedSize
                          ? "border-white/10 bg-white/[0.03] text-white/25 cursor-not-allowed"
                          : "border-[#ffbf50]/30 bg-[#ffbf50]/10 text-[#ffbf50] hover:border-[#ffbf50]/50 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_24px_rgba(255,191,80,0.15)]"
                      }`}
                    >
                      <ShoppingBag className="h-4 w-4 shrink-0" />
                      {added ? "Added to Bag ✓" : !selectedSize ? "Select a Size" : "Add to Bag"}
                    </button>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Truck, label: "Free Shipping", sub: "Over $500" },
                        { icon: RotateCcw, label: "Free Returns", sub: "Within 30 days" },
                        { icon: Shield, label: "Authenticated", sub: "Certificate incl." },
                      ].map(({ icon: Icon, label, sub }) => (
                        <div
                          key={label}
                          className="flex flex-col items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center"
                        >
                          <Icon className="h-4 w-4 text-[#ffbf50]/50" strokeWidth={1.5} />
                          <span className="text-[9px] uppercase leading-tight tracking-[0.15em] text-white/50">
                            {label}
                          </span>
                          <span className="text-[8px] leading-tight tracking-wide text-white/20">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* Description */}
                    <div className="space-y-3">
                      <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                        Description
                      </span>
                      <p className="text-xs leading-loose tracking-[0.06em] text-white/40">
                        A masterwork of considered design, this piece is constructed from the
                        finest materials sourced across Europe&apos;s most storied textile
                        houses. Each element — from the hand-finished seams to the custom
                        hardware — reflects NOVAIRE&apos;s uncompromising commitment to craft
                        and longevity.
                      </p>
                    </div>

                    {/* Details accordion */}
                    <div className="overflow-hidden rounded-xl border border-white/5">
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="flex w-full items-center justify-between px-5 py-4 text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors hover:text-white/60"
                      >
                        <span>Product Details</span>
                        {showDetails ? (
                          <ChevronUp className="h-3.5 w-3.5 text-[#ffbf50]/50" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-white/30" />
                        )}
                      </button>
                      <AnimatePresence>
                        {showDetails && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-2.5 overflow-hidden border-t border-white/5 px-5 pb-4 pt-3"
                          >
                            {mockDetails.default.map((d) => (
                              <li
                                key={d}
                                className="flex items-start gap-3 text-xs tracking-[0.06em] text-white/35"
                              >
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#ffbf50]/40" />
                                {d}
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Reviews */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                          Reviews
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-[#ffbf50] text-[#ffbf50]" />
                            ))}
                          </div>
                          <span className="font-mono text-[10px] tracking-wider text-white/30">
                            4.8 / 5
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {mockReviews.map((r) => (
                          <div
                            key={r.name}
                            className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium tracking-[0.15em] text-white/60">
                                {r.name}
                              </span>
                              <span className="text-[10px] tracking-wider text-white/20">
                                {r.date}
                              </span>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-2.5 w-2.5 fill-[#ffbf50] text-[#ffbf50]"
                                />
                              ))}
                            </div>
                            <p className="text-xs leading-relaxed tracking-[0.04em] text-white/30">
                              {r.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-[#0a0a0a] to-transparent transition-opacity duration-200 ${
                    showBottomFade ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </motion.div>
          </div>

          <SizeGuideModal
            open={showSizeGuide}
            onClose={() => setShowSizeGuide(false)}
            category={sizeGuideCategory}
          />
        </>
      )}
    </AnimatePresence>
  );
}