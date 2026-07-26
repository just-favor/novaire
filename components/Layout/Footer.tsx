"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "./Container";

const footerSections = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/shop" },
      { name: "Collections", href: "/collections" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Categories",
    links: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Men", href: "/men" },
      { name: "Women", href: "/women" },
      { name: "Essentials", href: "/essentials" },
      { name: "Sale / Vault", href: "/sale" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Atelier", href: "/atelier" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "FAQ", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
];

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Twitter", href: "#" },
  { name: "Pinterest", href: "#" },
  { name: "TikTok", href: "#" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative w-full bg-black border-t border-white/5">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffbf50]/15 to-transparent" />

      {/* Edge lighting */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/5 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/5 to-transparent" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="py-16 lg:py-24"
        >
          {/* Top section: Brand + Newsletter */}
          <div className="grid gap-12 pb-12 lg:grid-cols-2 lg:pb-16 border-b border-white/5">
            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Link href="/">
                <h2 className="font-heading text-2xl tracking-[0.3em] text-white/90">
                  NOVAIRE
                </h2>
              </Link>
              <p className="max-w-sm text-xs leading-relaxed tracking-[0.15em] text-white/30">
                Curated collections for the discerning few — where every piece
                tells a story of timeless elegance and uncompromising quality.
              </p>

              {/* Social links */}
              <div className="flex items-center gap-6 pt-2">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-[10px] tracking-[0.3em] text-white/20 uppercase transition-colors duration-300 hover:text-[#ffbf50]/60"
                  >
                    {social.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <div className="space-y-4">
                <span className="block text-[10px] tracking-[0.4em] text-[#ffbf50]/60 uppercase">
                  Newsletter
                </span>
                <h3 className="font-heading text-xl tracking-[0.15em] text-white/70">
                  Receive Exclusive Access
                </h3>
                <p className="max-w-sm text-xs leading-relaxed tracking-[0.1em] text-white/30">
                  Be the first to know about limited drops, private sales, and
                  atelier releases.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
                  <div className="relative flex-1 group">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs tracking-[0.1em] text-white/60 placeholder:text-white/20 focus:border-[#ffbf50]/40 focus:ring-[#ffbf50]/10 transition-all duration-300"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-5 text-[10px] tracking-[0.3em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_30px_rgba(255,191,80,0.1)]"
                  >
                    {subscribed ? "Joined" : "Join"}
                  </Button>
                </form>
                {subscribed && (
                  <p className="text-[10px] tracking-[0.2em] text-[#ffbf50]/60">
                    ✓ You&apos;ve been subscribed
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Links grid */}
          <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {footerSections.map((section) => (
              <motion.div key={section.title} variants={itemVariants}>
                <h4 className="mb-6 text-[10px] tracking-[0.4em] text-[#ffbf50]/60 uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-xs tracking-[0.15em] text-white/30 transition-all duration-300 hover:text-white/60"
                      >
                        <span className="h-px w-0 bg-[#ffbf50]/40 transition-all duration-300 group-hover:w-4" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact info */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-6 text-[10px] tracking-[0.4em] text-[#ffbf50]/60 uppercase">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="text-xs tracking-[0.1em] text-white/30 leading-relaxed">
                  47 Rue de la Paix
                  <br />
                  Paris, 75002
                  <br />
                  France
                </li>
                <li>
                  <Link
                    href="mailto:concierge@novaire.com"
                    className="text-xs tracking-[0.1em] text-white/40 transition-colors duration-300 hover:text-[#ffbf50]/60"
                  >
                    concierge@novaire.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+33123456789"
                    className="text-xs tracking-[0.1em] text-white/40 transition-colors duration-300 hover:text-[#ffbf50]/60"
                  >
                    +33 1 23 45 67 89
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 sm:flex-row"
        >
          <motion.p
            variants={itemVariants}
            className="text-[10px] tracking-[0.3em] text-white/15"
          >
            &copy; {new Date().getFullYear()} NOVAIRE. All rights reserved.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6"
          >
            <Link
              href="/privacy"
              className="text-[10px] tracking-[0.25em] text-white/15 transition-colors duration-300 hover:text-white/30"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] tracking-[0.25em] text-white/15 transition-colors duration-300 hover:text-white/30"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-[10px] tracking-[0.25em] text-white/15 transition-colors duration-300 hover:text-white/30"
            >
              Cookies
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
