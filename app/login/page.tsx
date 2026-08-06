"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number] },
  }),
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/account");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 selection:bg-[#ffbf50] selection:text-black">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ffbf50]/5 blur-[160px] rounded-full" />

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Wordmark */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="font-heading text-3xl tracking-[0.4em] text-white/90 hover:text-white transition-colors">
              NOVAIRE
            </h1>
          </Link>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent" />
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 space-y-6"
        >
          <div className="space-y-1">
            <h2 className="font-heading text-xl tracking-[0.2em] text-white/90">Welcome Back</h2>
            <p className="text-xs tracking-[0.15em] text-white/30">Sign in to your NOVAIRE account</p>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                  Password <span className="text-[#ffbf50]/60">*</span>
                </label>
                <Link href="/forgot-password" className="text-[10px] tracking-[0.2em] text-white/25 transition-colors hover:text-[#ffbf50]/60">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 transition-colors hover:text-white/60"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] tracking-[0.15em] text-red-400/80"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-3.5 text-[11px] uppercase tracking-[0.4em] text-[#ffbf50] transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="h-3.5 w-3.5 rounded-full border border-[#ffbf50]/60 border-t-transparent animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="h-px bg-white/5" />

          <p className="text-center text-xs tracking-[0.15em] text-white/25">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#ffbf50]/60 transition-colors hover:text-[#ffbf50]">
              Create one
            </Link>
          </p>
        </motion.div>

        <motion.p variants={fadeUp} custom={2} className="mt-6 text-center text-[10px] tracking-[0.15em] text-white/15 leading-relaxed">
          By signing in you agree to our{" "}
          <Link href="/terms" className="text-white/25 hover:text-white/40 transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-white/25 hover:text-white/40 transition-colors">Privacy Policy</Link>.
        </motion.p>
      </motion.div>
    </div>
  );
}
