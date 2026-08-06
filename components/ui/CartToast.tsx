"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartToast() {
  const { toast, clearToast, openCart } = useCart();

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 3500);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="cart-toast"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.15, 1] }}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-4 rounded-2xl border border-[#ffbf50]/25 bg-[#0a0a0a]/95 px-4 py-3 shadow-2xl backdrop-blur-xl max-w-xs"
        >
          {/* Product thumbnail */}
          <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-black/40">
            <Image src={toast.image} alt={toast.name} fill className="object-cover" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffbf50]/70 mb-0.5">Added to Bag</p>
            <p className="text-xs tracking-[0.08em] text-white/70 truncate">{toast.name}</p>
          </div>

          {/* View bag */}
          <button
            onClick={() => { clearToast(); openCart(); }}
            className="shrink-0 flex items-center gap-1.5 rounded-lg border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#ffbf50] transition-all hover:bg-[#ffbf50]/20"
          >
            <ShoppingBag className="h-3 w-3" />
            View
          </button>

          {/* Dismiss */}
          <button onClick={clearToast} className="shrink-0 text-white/20 transition-colors hover:text-white/50">
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
