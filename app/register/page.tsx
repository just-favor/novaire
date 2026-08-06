"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number] },
  }),
};

const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      router.push("/account");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-16 selection:bg-[#ffbf50] selection:text-black">
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ffbf50]/5 blur-[160px] rounded-full" />

      <motion.div initial="hidden" animate="visible" className="relative z-10 w-full max-w-md">
        {/* Wordmark */}
        <motion.div variants={fadeUp} custom={0} className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1 className="font-heading text-3xl tracking-[0.4em] text-white/90 hover:text-white transition-colors">NOVAIRE</h1>
          </Link>
          <div className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent" />
        </motion.div>

        <motion.div variants={fadeUp} custom={1} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-xl tracking-[0.2em] text-white/90">Create Account</h2>
            <p className="text-xs tracking-[0.15em] text-white/30">Join the NOVAIRE atelier</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "First Name", key: "firstName", placeholder: "Eloise" },
                { label: "Last Name", key: "lastName", placeholder: "Varet" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                    {label} <span className="text-[#ffbf50]/60">*</span>
                  </label>
                  <Input
                    required
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={set(key)}
                    className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                Email <span className="text-[#ffbf50]/60">*</span>
              </label>
              <Input
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={set("email")}
                className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                Password <span className="text-[#ffbf50]/60">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={set("password")}
                  className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password rules */}
              {form.password.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                  {rules.map((r) => (
                    <span key={r.label} className={`flex items-center gap-1 text-[10px] tracking-[0.1em] transition-colors ${r.test(form.password) ? "text-[#ffbf50]/70" : "text-white/20"}`}>
                      <Check className="h-2.5 w-2.5" /> {r.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-[0.35em] text-white/30">
                Confirm Password <span className="text-[#ffbf50]/60">*</span>
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={form.confirm}
                onChange={set("confirm")}
                className={`border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 tracking-[0.08em] ${
                  form.confirm.length > 0 && form.confirm !== form.password ? "border-red-400/40" : ""
                }`}
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[11px] tracking-[0.15em] text-red-400/80">
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
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>

          <div className="h-px bg-white/5" />

          <p className="text-center text-xs tracking-[0.15em] text-white/25">
            Already have an account?{" "}
            <Link href="/login" className="text-[#ffbf50]/60 transition-colors hover:text-[#ffbf50]">Sign in</Link>
          </p>
        </motion.div>

        <motion.p variants={fadeUp} custom={2} className="mt-6 text-center text-[10px] tracking-[0.15em] text-white/15 leading-relaxed">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-white/25 hover:text-white/40 transition-colors">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-white/25 hover:text-white/40 transition-colors">Privacy Policy</Link>.
        </motion.p>
      </motion.div>
    </div>
  );
}
