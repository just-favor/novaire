"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number] },
  }),
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 selection:bg-[#ffbf50] selection:text-black">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ffbf50]/5 blur-[160px] rounded-full" />

      <motion.div initial="hidden" animate="visible" className="relative z-10 w-full max-w-md">
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="font-heading text-3xl tracking-[0.4em] text-white/90 hover:text-white transition-colors">NOVAIRE</h1>
          </Link>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent" />
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 space-y-6">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-5 py-4"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#ffbf50]/30 bg-[#ffbf50]/10">
                <Mail className="h-5 w-5 text-[#ffbf50]" />
              </div>
              <div className="space-y-2">
                <h2 className="font-heading text-lg tracking-[0.2em] text-white/90">Check Your Email</h2>
                <p className="text-xs tracking-[0.12em] text-white/35 leading-relaxed">
                  If an account exists for <span className="text-white/60">{email}</span>, you will receive a password reset link shortly.
                </p>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#ffbf50]/60 transition-colors hover:text-[#ffbf50]"
              >
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="space-y-1">
                <h2 className="font-heading text-xl tracking-[0.2em] text-white/90">Reset Password</h2>
                <p className="text-xs tracking-[0.15em] text-white/30">Enter your email and we&apos;ll send a reset link</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                    Email <span className="text-[#ffbf50]/60">*</span>
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-3.5 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <span className="h-3.5 w-3.5 rounded-full border border-[#ffbf50]/60 border-t-transparent animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send Reset Link <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></>
                  )}
                </button>
              </form>

              <div className="h-px bg-white/5" />

              <Link href="/login" className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-white/25 transition-colors hover:text-white/50">
                <ArrowLeft className="h-3 w-3" /> Back to Sign In
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
