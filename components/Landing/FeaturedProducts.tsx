"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductModal } from "@/context/ProductModalContext";
import { useCurrency } from "@/context/CurrencyContext";

import { products as catalogProducts, Product } from "@/data/products";

const mobileItems = catalogProducts.slice(0, 10);
const desktopItems = catalogProducts.slice(0, 20);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const headerWordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const productCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};



function ProductCard({ product }: { product: Product }) {
  const { open } = useProductModal();
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      variants={productCardVariants}
      onClick={() => open(product)}
      className="group relative flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={(e) => { e.stopPropagation(); open(product); }}
            className="w-full border border-[#ffbf50]/30 bg-[#ffbf50]/10 text-xs tracking-[0.2em] text-[#ffbf50] uppercase backdrop-blur-md transition-[background-color,box-shadow] duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_30px_rgba(255,191,80,0.12)]">
            <ShoppingBag className="mr-2 h-3.5 w-3.5" />
            Quick View
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 px-1">
        <span className="block text-[10px] tracking-[0.3em] text-[#ffbf50]/50 uppercase">
          {product.categoryName}
        </span>
        <h3 className="text-sm tracking-[0.1em] text-white/80 transition-colors duration-300 group-hover:text-white">
          {product.name}
        </h3>
        <p className="text-sm font-light tracking-[0.05em] text-white/50">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const headerWords = "CURATED EDITS".split(" ");

  return (
    <section className="relative w-full overflow-hidden bg-black py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/8 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/8 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div
            variants={lineVariants}
            className="mx-auto mb-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/50 to-transparent"
          />
          <h2 className="font-heading text-4xl tracking-[0.25em] sm:text-5xl md:text-6xl">
            {headerWords.map((word) => (
              <motion.span
                key={word}
                variants={headerWordVariants}
                className="inline-block mx-3 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            variants={headerWordVariants}
            className="mt-4 text-sm tracking-[0.3em] text-white/40 uppercase"
          >
            This season&apos;s definitive drops
          </motion.p>
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/30 to-transparent"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {desktopItems.map((product, i) => (
            <div key={product.id} className={i >= 10 ? "hidden sm:block" : ""}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 text-center"
        >
          <Link href="/shop">
            <Button className="group relative overflow-hidden border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-6 text-xs tracking-[0.3em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.15)]">
              <span className="relative z-10 flex items-center gap-3">
                View All Products
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 scale-x-0 origin-left bg-gradient-to-r from-[#ffbf50]/5 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
