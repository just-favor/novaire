"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, Truck, Tag, Check, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/context/CurrencyContext";

const FREE_SHIPPING_THRESHOLD_USD = 500;

export default function CartDrawer() {
  const { items, removeItem, updateQty, total, count, isOpen, closeCart } = useCart();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);

  const discountAmount = discountApplied ? total * 0.1 : 0;
  const finalTotal = Math.max(0, total - discountAmount);

  const amountRemainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_USD - total);
  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD_USD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "NOVAIRE10") {
      setDiscountApplied(true);
      setPromoError(null);
    } else {
      setPromoError("Invalid code. Try NOVAIRE10");
    }
  };

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
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
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
            <div className="border-b border-white/5 px-6 pt-5 pb-4">
              {/* Title row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 text-[#ffbf50]" />
                  <span className="text-[11px] uppercase tracking-[0.4em] text-white/70 font-semibold">
                    Your Bag
                  </span>
                  {count > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffbf50]/20 text-[10px] font-bold text-[#ffbf50]">
                      {count}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-white/25 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Currency switcher row */}
              <div className="mt-3 flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 mr-1">Currency</span>
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                  const item = CURRENCIES[code];
                  const isSelected = currency === code;
                  return (
                    <button
                      key={code}
                      onClick={() => setCurrency(code)}
                      className={`flex items-center gap-0.5 px-2.5 py-1 rounded-full border text-[9px] font-mono tracking-[0.15em] uppercase transition-all duration-200 ${
                        isSelected
                          ? "border-[#ffbf50]/60 bg-[#ffbf50]/20 text-[#ffbf50] font-bold shadow-[0_0_8px_rgba(255,191,80,0.2)]"
                          : "border-white/10 bg-white/5 text-white/40 hover:border-white/25 hover:text-white/70"
                      }`}
                    >
                      <span>{item.symbol}</span>
                      <span>{item.code}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="border-b border-white/5 bg-white/[0.02] px-6 py-3.5">
              <div className="flex items-center justify-between text-[10px] tracking-[0.15em] uppercase mb-2">
                <div className="flex items-center gap-2 text-white/60">
                  <Truck className="h-3.5 w-3.5 text-[#ffbf50]" />
                  <span>
                    {amountRemainingForFreeShipping === 0
                      ? "Complimentary Express Shipping Unlocked"
                      : `Add ${formatPrice(amountRemainingForFreeShipping)} for free express shipping`}
                  </span>
                </div>
                <span className="font-mono text-[#ffbf50]">{Math.round(shippingProgress)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#ffbf50]/70 via-[#ffbf50] to-[#ffbf50]"
                />
              </div>
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
                      className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 relative group"
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
                              Size: {size} {product.subCategory ? `• ${product.subCategory}` : ""}
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

                          <span className="font-mono text-sm tracking-wider text-white">
                            {formatPrice(product.price * qty)}
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
              <div className="border-t border-white/5 px-6 py-5 space-y-4 bg-black/40">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                          setPromoCode(e.target.value);
                          if (promoError) setPromoError(null);
                        }}
                        placeholder="Promo code (e.g. NOVAIRE10)"
                        disabled={discountApplied}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase tracking-wider placeholder:text-white/20 focus:border-[#ffbf50]/50 outline-none disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={discountApplied || !promoCode.trim()}
                      className="px-4 py-2 rounded-xl border border-[#ffbf50]/40 bg-[#ffbf50]/10 text-[#ffbf50] text-xs uppercase tracking-[0.15em] hover:bg-[#ffbf50]/20 disabled:opacity-30 transition-all"
                    >
                      {discountApplied ? <Check className="h-4 w-4" /> : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] tracking-wider text-red-400 pl-1">{promoError}</p>
                  )}
                  {discountApplied && (
                    <div className="flex items-center gap-1.5 text-[10px] tracking-wider text-[#ffbf50] pl-1">
                      <Sparkles className="h-3 w-3" />
                      <span>10% VIP Atelier Discount Applied (-{formatPrice(discountAmount)})</span>
                    </div>
                  )}
                </form>

                {/* Subtotal breakdown */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs tracking-wider text-white/50">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex items-center justify-between text-xs tracking-wider text-[#ffbf50]">
                      <span>VIP Discount (10%)</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs tracking-wider text-white/50">
                    <span>Estimated Shipping</span>
                    <span className="font-mono text-white/40">
                      {amountRemainingForFreeShipping === 0 ? "FREE" : "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs uppercase tracking-[0.3em] text-white font-semibold">Total</span>
                    <span className="font-mono text-lg tracking-wider text-[#ffbf50] font-semibold">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group flex w-full items-center justify-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/15 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/25 hover:shadow-[0_0_40px_rgba(255,191,80,0.15)] rounded-xl font-medium"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
