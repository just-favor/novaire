"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const words = "LUXURY REDEFINED".split(" ");

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3.2,
      duration: 1.6,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 3.6 + i * 0.2,
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  }),
};

const taglineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 4.4,
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 5.0,
      duration: 1.0,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      delay: 3.4,
      duration: 1.4,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const decorativeLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      delay: 4.8,
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const bgOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 2.8,
      duration: 2.0,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with overlay */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bgOverlayVariants}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Decorative top line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="mb-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/60 to-transparent"
        />

        {/* Heading */}
        <h1 className="font-heading text-5xl tracking-[0.25em] sm:text-7xl md:text-8xl lg:text-9xl">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="block text-white/90"
          >
            NOVAIRE
          </motion.span>
          <span className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.35em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={taglineVariants}
          className="mt-10 max-w-xl text-sm tracking-[0.3em] text-white/40 uppercase leading-relaxed"
        >
          Curated collections for the discerning few — where every piece tells a story of timeless elegance
        </motion.p>

        {/* Decorative bottom line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={decorativeLineVariants}
          className="mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent"
        />

        {/* CTA */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="mt-12 flex gap-6"
        >
          <Link href="/collections">
            <Button className="group relative overflow-hidden border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-6 text-xs tracking-[0.3em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.15)]">
              <span className="relative z-10 flex items-center gap-3">
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 scale-x-0 origin-left bg-gradient-to-r from-[#ffbf50]/5 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Button>
          </Link>

          <Link href="/shop">
            <Button
              variant="ghost"
              className="group border border-white/10 px-8 py-6 text-xs tracking-[0.3em] text-white/60 uppercase transition-all duration-500 hover:border-white/20 hover:text-white hover:bg-white/5"
            >
              <span className="flex items-center gap-3">
                Shop Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>

        {/* Bottom decorative elements */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[8px] tracking-[0.4em] text-white/15 uppercase">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-[#ffbf50]/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Edge lighting effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/10 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/10 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#ffbf50]/10 to-transparent" />
    </section>
  );
}

