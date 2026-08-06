"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Shield, Truck, RotateCcw, Check, Lock } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Container from "@/components/Layout/Container";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.15, 1] as [number,number,number,number] },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

type Step = "shipping" | "payment" | "confirmed";

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("shipping");
  const [loading, setLoading] = useState(false);
  const [orderNumber] = useState(() => `NV-${Math.floor(100000 + Math.random() * 900000)}`);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "France",
  });

  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });

  const shippingFee = total >= 500 ? 0 : 25;
  const tax = Math.round(total * 0.08);
  const grandTotal = total + shippingFee + tax;

  const handleShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    setStep("confirmed");
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-4 pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
            className="w-full max-w-lg text-center space-y-8"
          >
            {/* Check icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#ffbf50]/30 bg-[#ffbf50]/10">
              <Check className="h-8 w-8 text-[#ffbf50]" />
            </div>

            <div className="space-y-3">
              <span className="block text-[10px] uppercase tracking-[0.5em] text-[#ffbf50]/60">Order Confirmed</span>
              <h1 className="font-heading text-3xl sm:text-4xl tracking-[0.2em] text-white/90">Thank You</h1>
              <p className="text-sm tracking-[0.12em] text-white/40 leading-relaxed">
                Your order has been received and is being prepared with care at our atelier.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4 text-left">
              <div className="flex justify-between text-xs tracking-[0.15em]">
                <span className="text-white/30">Order Number</span>
                <span className="font-mono text-[#ffbf50]">{orderNumber}</span>
              </div>
              <div className="flex justify-between text-xs tracking-[0.15em]">
                <span className="text-white/30">Shipping To</span>
                <span className="text-white/60">{shipping.firstName} {shipping.lastName}</span>
              </div>
              <div className="flex justify-between text-xs tracking-[0.15em]">
                <span className="text-white/30">Total Paid</span>
                <span className="font-mono text-white/80">${grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs tracking-[0.15em]">
                <span className="text-white/30">Confirmation sent to</span>
                <span className="text-white/50">{shipping.email}</span>
              </div>
            </div>

            <p className="text-[10px] tracking-[0.2em] text-white/25 leading-relaxed">
              Estimated delivery: 5–8 business days. You will receive a tracking number once your order ships.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 rounded-xl"
              >
                Continue Shopping
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />

      <div className="pt-28 pb-20">
        <Container>
          {/* Header */}
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            className="mb-10"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-2">
              <Link href="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-white/60">
                <ArrowLeft className="h-3 w-3" /> Back to Shop
              </Link>
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-heading text-3xl sm:text-4xl tracking-[0.2em] text-white/90">
              CHECKOUT
            </motion.h1>

            {/* Guest banner */}
            {!user && (
              <motion.div variants={fadeUp} className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-5 py-3">
                <p className="text-xs tracking-[0.12em] text-white/30">Have an account? Sign in to autofill your details.</p>
                <Link href="/login" className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-[#ffbf50]/60 transition-colors hover:text-[#ffbf50]">
                  Sign In
                </Link>
              </motion.div>
            )}

            {/* Steps */}
            <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
              {(["shipping", "payment"] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                    step === s ? "bg-[#ffbf50] text-black" :
                    (step === "payment" && s === "shipping") ? "bg-[#ffbf50]/20 text-[#ffbf50]" :
                    "bg-white/5 text-white/20"
                  }`}>
                    {step === "payment" && s === "shipping" ? <Check className="h-3 w-3" /> : i + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-[0.3em] ${step === s ? "text-white/70" : "text-white/20"}`}>
                    {s}
                  </span>
                  {i === 0 && <span className="h-px w-8 bg-white/10" />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Left — Forms */}
            <div>
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.form
                    key="shipping"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleShipping}
                    className="space-y-6"
                  >
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 space-y-6">
                      <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Contact Information</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { label: "First Name", key: "firstName", placeholder: "Eloise" },
                          { label: "Last Name", key: "lastName", placeholder: "Varet" },
                        ].map(({ label, key, placeholder }) => (
                          <div key={key} className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">{label} <span className="text-[#ffbf50]/60">*</span></label>
                            <Input required placeholder={placeholder} value={shipping[key as keyof typeof shipping]}
                              onChange={(e) => setShipping((p) => ({ ...p, [key]: e.target.value }))}
                              className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                          </div>
                        ))}
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Email <span className="text-[#ffbf50]/60">*</span></label>
                          <Input required type="email" placeholder="your@email.com" value={shipping.email}
                            onChange={(e) => setShipping((p) => ({ ...p, email: e.target.value }))}
                            className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Phone</label>
                          <Input type="tel" placeholder="+33 1 23 45 67 89" value={shipping.phone}
                            onChange={(e) => setShipping((p) => ({ ...p, phone: e.target.value }))}
                            className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 space-y-6">
                      <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Street Address <span className="text-[#ffbf50]/60">*</span></label>
                          <Input required placeholder="47 Rue de la Paix" value={shipping.address}
                            onChange={(e) => setShipping((p) => ({ ...p, address: e.target.value }))}
                            className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          {[
                            { label: "City", key: "city", placeholder: "Paris" },
                            { label: "State / Region", key: "state", placeholder: "Île-de-France" },
                            { label: "Postal Code", key: "zip", placeholder: "75002" },
                          ].map(({ label, key, placeholder }) => (
                            <div key={key} className="space-y-2">
                              <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">{label} <span className="text-[#ffbf50]/60">*</span></label>
                              <Input required placeholder={placeholder} value={shipping[key as keyof typeof shipping]}
                                onChange={(e) => setShipping((p) => ({ ...p, [key]: e.target.value }))}
                                className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                            </div>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Country</label>
                          <select value={shipping.country} onChange={(e) => setShipping((p) => ({ ...p, country: e.target.value }))}
                            className="w-full appearance-none border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs tracking-[0.08em] text-white/50 focus:border-[#ffbf50]/40 focus:outline-none rounded-md">
                            {["France", "United Kingdom", "United States", "Germany", "Italy", "Spain", "Japan", "Other"].map((c) => (
                              <option key={c} value={c} className="bg-black">{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button type="submit"
                      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)]">
                      Continue to Payment
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.form>
                )}

                {step === "payment" && (
                  <motion.form
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handlePayment}
                    className="space-y-6"
                  >
                    <button type="button" onClick={() => setStep("shipping")}
                      className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/30 transition-colors hover:text-white/60">
                      <ArrowLeft className="h-3 w-3" /> Edit Shipping
                    </button>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Payment Details</h2>
                        <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-white/25">
                          <Lock className="h-3 w-3" /> Secure
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Name on Card <span className="text-[#ffbf50]/60">*</span></label>
                          <Input required placeholder="Eloise Varet" value={payment.cardName}
                            onChange={(e) => setPayment((p) => ({ ...p, cardName: e.target.value }))}
                            className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]" />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Card Number <span className="text-[#ffbf50]/60">*</span></label>
                          <Input required placeholder="4242 4242 4242 4242" value={payment.cardNumber}
                            onChange={(e) => setPayment((p) => ({ ...p, cardNumber: formatCard(e.target.value) }))}
                            className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] font-mono" />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">Expiry <span className="text-[#ffbf50]/60">*</span></label>
                            <Input required placeholder="MM/YY" value={payment.expiry}
                              onChange={(e) => setPayment((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                              className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] font-mono" />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">CVV <span className="text-[#ffbf50]/60">*</span></label>
                            <Input required placeholder="•••" maxLength={4} value={payment.cvv}
                              onChange={(e) => setPayment((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                              className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] font-mono" />
                          </div>
                        </div>
                      </div>

                      {/* Trust row */}
                      <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5">
                        {[
                          { icon: Shield, label: "SSL Encrypted" },
                          { icon: Lock, label: "PCI Compliant" },
                          { icon: RotateCcw, label: "30-Day Returns" },
                        ].map(({ icon: Icon, label }) => (
                          <div key={label} className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/25">
                            <Icon className="h-3 w-3 text-[#ffbf50]/40" strokeWidth={1.5} />
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="submit" disabled={loading}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-4 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)] disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <span className="h-3.5 w-3.5 rounded-full border border-[#ffbf50]/60 border-t-transparent animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          Place Order · ${grandTotal.toLocaleString()}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right — Order Summary */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-5 lg:sticky lg:top-28">
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#ffbf50]/60">Order Summary</h2>

                {items.length === 0 ? (
                  <p className="text-xs tracking-[0.15em] text-white/25">Your bag is empty.</p>
                ) : (
                  <div className="space-y-4 max-h-72 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,191,80,0.2)_transparent]">
                    {items.map(({ product, size, qty }) => (
                      <div key={`${product.id}-${size}`} className="flex gap-3">
                        <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-black/40">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbf50] text-[8px] font-bold text-black">{qty}</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center gap-1">
                          <p className="text-xs tracking-[0.08em] text-white/70 leading-snug">{product.name}</p>
                          <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Size: {size}</p>
                        </div>
                        <span className="font-mono text-xs tracking-wider text-white/50 self-center">
                          ${(product.price * qty).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <div className="flex justify-between text-xs tracking-[0.12em]">
                    <span className="text-white/30">Subtotal ({count} items)</span>
                    <span className="font-mono text-white/50">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs tracking-[0.12em]">
                    <span className="text-white/30">Shipping</span>
                    <span className={`font-mono ${shippingFee === 0 ? "text-[#ffbf50]/70" : "text-white/50"}`}>
                      {shippingFee === 0 ? "Free" : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs tracking-[0.12em]">
                    <span className="text-white/30">Tax (8%)</span>
                    <span className="font-mono text-white/50">${tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-3">
                    <span className="text-[10px] uppercase tracking-[0.35em] text-white/50">Total</span>
                    <span className="font-mono text-lg tracking-wider text-white/90">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {shippingFee === 0 && (
                  <div className="flex items-center gap-2 rounded-xl border border-[#ffbf50]/15 bg-[#ffbf50]/5 px-4 py-3">
                    <Truck className="h-3.5 w-3.5 text-[#ffbf50]/60 shrink-0" strokeWidth={1.5} />
                    <span className="text-[10px] tracking-[0.15em] text-[#ffbf50]/60">Free shipping applied</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer />
    </div>
  );
}
