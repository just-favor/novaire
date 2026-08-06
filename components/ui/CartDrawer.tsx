"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, closeCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.15, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-[#ffbf50]/70" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-white/60">
                  Your Bag
                </span>
                {count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffbf50]/20 text-[10px] font-medium text-[#ffbf50]">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-white/25 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4 [scrollbar-width:thin] [scrollbar-color:rgba(255,191,80,0.2)_transparent]">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag className="h-10 w-10 text-white/10" strokeWidth={1} />
                  <p className="text-xs tracking-[0.2em] text-white/25 uppercase">Your bag is empty</p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-[10px] tracking-[0.35em] text-[#ffbf50]/50 uppercase transition-colors hover:text-[#ffbf50]"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(({ product, size, qty }) => (
                    <div
                      key={`${product.id}-${size}`}
                      className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      {/* Image */}
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-medium tracking-[0.1em] text-white/80 leading-snug">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[10px] tracking-[0.2em] text-white/30 uppercase">
                              Size: {size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(product.id, size)}
                            className="text-white/20 transition-colors hover:text-red-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Qty */}
                          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-2 py-1">
                            <button
                              onClick={() => updateQty(product.id, size, qty - 1)}
                              className="text-white/30 transition-colors hover:text-white"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[16px] text-center text-xs tracking-wider text-white/60">
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQty(product.id, size, qty + 1)}
                              className="text-white/30 transition-colors hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <span className="font-mono text-sm tracking-wider text-white/70">
                            ${(product.price * qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-6 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-white/30">Subtotal</span>
                  <span className="font-mono text-lg tracking-wider text-white/80">
                    ${total.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] tracking-[0.15em] text-white/20">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group flex w-full items-center justify-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)] rounded-xl"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-[10px] uppercase tracking-[0.35em] text-white/20 transition-colors hover:text-white/40"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
