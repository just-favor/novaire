"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone, Send, Check } from "lucide-react";

import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Footer from "@/components/Layout/Footer";
import Container from "@/components/Layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Atelier Address",
    lines: ["47 Rue de la Paix", "Paris, 75002", "France"],
  },
  {
    icon: Mail,
    label: "Electronic Mail",
    lines: ["concierge@novaire.com"],
    href: "mailto:concierge@novaire.com",
  },
  {
    icon: Phone,
    label: "Direct Line",
    lines: ["+33 1 23 45 67 89"],
    href: "tel:+33123456789",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Bespoke Commission",
  "Press & Editorial",
  "Wholesale",
  "Returns & Exchanges",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />
      <SecondaryHeader />

      {/* ── HERO ── */}
      <section className="relative pt-44 pb-20 px-4 overflow-hidden">
        {/* Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#ffbf50]/5 blur-[160px] rounded-full" />
        {/* Decorative horizontal lines */}
        <div className="pointer-events-none absolute left-0 right-0 top-[55%] h-px bg-gradient-to-r from-transparent via-white/4 to-transparent" />

        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.span variants={fadeUp} custom={0} className="block mb-4 text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
              Get in Touch
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-[0.2em] text-white/90 leading-none mb-6">
              CONTACT
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-sm leading-loose tracking-[0.15em] text-white/35 max-w-md">
              Whether you have a question about a piece, wish to commission something bespoke, or simply want to speak with our atelier — we are here.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-16 lg:py-24 border-t border-white/5">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-24">

            {/* Left — contact details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="space-y-12"
            >
              {contactDetails.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="group space-y-3">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 text-[#ffbf50]/50" strokeWidth={1.5} />
                    <span className="text-[10px] tracking-[0.4em] text-[#ffbf50]/50 uppercase">{item.label}</span>
                  </div>
                  <div className="pl-7 space-y-1">
                    {item.lines.map((line, i) =>
                      item.href && i === 0 ? (
                        <Link
                          key={line}
                          href={item.href}
                          className="block text-sm tracking-[0.15em] text-white/40 transition-colors duration-300 hover:text-white/70"
                        >
                          {line}
                        </Link>
                      ) : (
                        <p key={line} className="text-sm tracking-[0.15em] text-white/40 leading-relaxed">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Hours */}
              <motion.div variants={fadeUp} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#ffbf50]/50" />
                  </div>
                  <span className="text-[10px] tracking-[0.4em] text-[#ffbf50]/50 uppercase">Atelier Hours</span>
                </div>
                <div className="pl-7 space-y-2">
                  {[
                    { day: "Monday – Friday", time: "10:00 – 18:00 CET" },
                    { day: "Saturday", time: "By appointment" },
                    { day: "Sunday", time: "Closed" },
                  ].map((h) => (
                    <div key={h.day} className="flex items-center justify-between gap-8 text-xs tracking-[0.12em]">
                      <span className="text-white/30">{h.day}</span>
                      <span className="text-white/50">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div variants={fadeUp} className="h-px w-full bg-gradient-to-r from-[#ffbf50]/20 via-white/5 to-transparent" />

              {/* Social */}
              <motion.div variants={fadeUp} className="space-y-4">
                <span className="block text-[10px] tracking-[0.4em] text-white/20 uppercase">Follow</span>
                <div className="flex flex-wrap gap-4">
                  {["Instagram", "Pinterest", "TikTok", "Twitter"].map((s) => (
                    <Link
                      key={s}
                      href="#"
                      className="text-[10px] tracking-[0.3em] text-white/25 uppercase transition-colors duration-300 hover:text-[#ffbf50]/60"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
                  className="flex h-full min-h-[480px] flex-col items-center justify-center gap-6 rounded-sm border border-[#ffbf50]/15 bg-[#ffbf50]/[0.03] px-8 py-16 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#ffbf50]/30 bg-[#ffbf50]/10">
                    <Check className="h-5 w-5 text-[#ffbf50]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg tracking-[0.2em] text-white/80">Message Received</h3>
                    <p className="text-xs tracking-[0.15em] text-white/35 leading-relaxed max-w-xs">
                      Thank you for reaching out. A member of our atelier team will be in touch within 48 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", inquiry: "", message: "" }); }}
                    className="mt-4 text-[10px] tracking-[0.4em] text-white/25 uppercase transition-colors duration-300 hover:text-white/50"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <motion.div variants={fadeUp} className="space-y-2">
                      <label className="block text-[10px] tracking-[0.4em] text-white/30 uppercase">
                        Full Name <span className="text-[#ffbf50]/60">*</span>
                      </label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 focus:ring-[#ffbf50]/10 tracking-[0.1em] transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div variants={fadeUp} className="space-y-2">
                      <label className="block text-[10px] tracking-[0.4em] text-white/30 uppercase">
                        Email Address <span className="text-[#ffbf50]/60">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="border-white/10 bg-white/[0.02] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 focus:ring-[#ffbf50]/10 tracking-[0.1em] transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Inquiry type */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <label className="block text-[10px] tracking-[0.4em] text-white/30 uppercase">
                      Nature of Inquiry
                    </label>
                    <div className="relative">
                      <select
                        name="inquiry"
                        value={form.inquiry}
                        onChange={handleChange}
                        className="w-full appearance-none border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs tracking-[0.1em] text-white/50 focus:border-[#ffbf50]/40 focus:outline-none focus:ring-1 focus:ring-[#ffbf50]/10 transition-all duration-300 rounded-md"
                      >
                        <option value="" className="bg-black">Select inquiry type...</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t} className="bg-black">{t}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <ArrowRight className="h-3 w-3 rotate-90 text-white/20" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp} className="space-y-2">
                    <label className="block text-[10px] tracking-[0.4em] text-white/30 uppercase">
                      Your Message <span className="text-[#ffbf50]/60">*</span>
                    </label>
                    <div className="relative group">
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help..."
                        className="w-full resize-none border border-white/10 bg-white/[0.02] px-4 py-3 text-xs tracking-[0.1em] text-white/70 placeholder:text-white/15 focus:border-[#ffbf50]/40 focus:outline-none focus:ring-1 focus:ring-[#ffbf50]/10 transition-all duration-300 rounded-md leading-relaxed"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 shadow-[0_0_30px_rgba(255,191,80,0.04)]" />
                    </div>
                    <p className="text-right text-[10px] tracking-[0.2em] text-white/15">
                      {form.message.length} / 1000
                    </p>
                  </motion.div>

                  {/* Privacy note */}
                  <motion.p variants={fadeUp} className="text-[10px] tracking-[0.15em] text-white/20 leading-relaxed">
                    Your information is handled with strict confidence and will never be shared with third parties.
                  </motion.p>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="group w-full border border-[#ffbf50]/30 bg-[#ffbf50]/10 py-6 text-[11px] tracking-[0.4em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full border border-[#ffbf50]/60 border-t-transparent animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Send Message
                          <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── MAP / LOCATION BANNER ── */}
      <section className="border-t border-white/5 py-20">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative overflow-hidden rounded-sm border border-white/5"
          >
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c00] via-black to-black" />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,191,80,0.08) 0%, transparent 55%)" }}
            />

            {/* Grid lines */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,191,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,191,80,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-10 py-14">
              <motion.div variants={fadeUp} className="text-center lg:text-left space-y-3">
                <span className="block text-[10px] tracking-[0.5em] text-[#ffbf50]/50 uppercase">
                  Visit the Atelier
                </span>
                <p className="font-heading text-2xl sm:text-3xl tracking-[0.2em] text-white/80">
                  Paris, France
                </p>
                <p className="text-sm tracking-[0.15em] text-white/30">
                  47 Rue de la Paix · 75002
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://maps.google.com/?q=47+Rue+de+la+Paix+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-white/10 px-7 py-3.5 text-[10px] tracking-[0.4em] text-white/40 uppercase transition-all duration-300 hover:border-white/25 hover:text-white/60"
                >
                  Open in Maps
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="mailto:concierge@novaire.com"
                  className="group inline-flex items-center gap-3 border border-[#ffbf50]/25 bg-[#ffbf50]/8 px-7 py-3.5 text-[10px] tracking-[0.4em] text-[#ffbf50]/70 uppercase transition-all duration-500 hover:bg-[#ffbf50]/15 hover:text-[#ffbf50]"
                >
                  Email Directly
                  <Mail className="h-3 w-3" />
                </Link>
              </motion.div>
            </div>

            {/* Corner marks */}
            <div className="absolute left-4 top-4 h-4 w-px bg-[#ffbf50]/30" />
            <div className="absolute left-4 top-4 h-px w-4 bg-[#ffbf50]/30" />
            <div className="absolute right-4 top-4 h-4 w-px bg-[#ffbf50]/30" />
            <div className="absolute right-4 top-4 h-px w-4 bg-[#ffbf50]/30" />
            <div className="absolute left-4 bottom-4 h-4 w-px bg-[#ffbf50]/30" />
            <div className="absolute left-4 bottom-4 h-px w-4 bg-[#ffbf50]/30" />
            <div className="absolute right-4 bottom-4 h-4 w-px bg-[#ffbf50]/30" />
            <div className="absolute right-4 bottom-4 h-px w-4 bg-[#ffbf50]/30" />
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
