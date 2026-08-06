"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#ffbf50]/5 blur-[160px]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          className="relative z-10 space-y-6"
        >
          <span className="block font-heading text-[120px] leading-none tracking-[0.1em] text-white/5 select-none">
            404
          </span>
          <div className="-mt-8 space-y-3">
            <span className="block text-[10px] uppercase tracking-[0.5em] text-[#ffbf50]/60">
              Page Not Found
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl tracking-[0.2em] text-white/80">
              Lost in the Atelier
            </h1>
            <p className="text-sm tracking-[0.15em] text-white/30 max-w-sm mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 rounded-xl"
            >
              Browse the Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/"
              className="text-[10px] uppercase tracking-[0.4em] text-white/25 transition-colors hover:text-white/50"
            >
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
