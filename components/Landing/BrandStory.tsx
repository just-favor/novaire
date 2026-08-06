"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const labelVariants = {
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

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      duration: 0.8,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const statVariants = {
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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

export default function BrandStory() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-24 sm:py-32">
      {/* Edge lighting */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/8 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/8 to-transparent" />

      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffbf50]/20 to-transparent" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="mx-auto w-full max-w-7xl px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <motion.div variants={imageVariants} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                alt="NOVAIRE atelier craftsmanship"
                fill
                className="object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

              {/* Subtle grain overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Decorative frame lines */}
              <div className="pointer-events-none absolute left-4 top-4 right-4 bottom-4 border border-white/5" />
              <div className="pointer-events-none absolute left-6 top-6 right-6 bottom-6 border border-white/[0.02]" />
            </div>

            {/* Stats overlay on image */}
            <motion.div
              variants={statVariants}
              className="absolute -bottom-6 -right-6 border border-white/10 bg-black/80 backdrop-blur-xl px-8 py-6 lg:bottom-auto lg:top-1/2 lg:-right-10 lg:-translate-y-1/2"
            >
              <p className="text-3xl font-light tracking-[0.1em] text-[#ffbf50] lg:text-4xl">
                Est. 2024
              </p>
              <div className="mt-2 h-px w-12 bg-[#ffbf50]/30" />
              <p className="mt-2 text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Redefining Luxury
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={contentVariants} className="flex flex-col justify-center">
            <motion.span
              variants={labelVariants}
              className="inline-block text-[10px] tracking-[0.4em] text-[#ffbf50]/60 uppercase"
            >
              Brand Philosophy
            </motion.span>

            <motion.h2
              variants={headingVariants}
              className="font-heading mt-6 text-4xl tracking-[0.15em] sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Crafted for the
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#ffbf50] via-[#ffbf50]/90 to-[#ffbf50]/70 bg-clip-text text-transparent">
                Discerning Few
              </span>
            </motion.h2>

            <motion.div
              variants={lineVariants}
              className="my-8 h-px w-16 bg-gradient-to-r from-[#ffbf50]/60 to-transparent"
            />

            <motion.p
              variants={paragraphVariants}
              className="max-w-lg text-sm leading-relaxed tracking-[0.08em] text-white/50"
            >
              At NOVAIRE, we believe true luxury is not defined by excess — but by
              intention. Every piece in our collection is a study in restraint, a
              celebration of material, form, and the quiet power of understatement.
            </motion.p>

            <motion.p
              variants={paragraphVariants}
              className="mt-5 max-w-lg text-sm leading-relaxed tracking-[0.08em] text-white/40"
            >
              Born from a desire to bridge the gap between heritage craftsmanship and
              contemporary minimalism, we scour the world's finest ateliers to bring
              you pieces that transcend seasons — destined to outlive trends and
              define your personal legacy.
            </motion.p>

            <motion.div
              variants={ctaVariants}
              className="mt-10"
            >
              <Link href="/about">
                <Button className="group relative overflow-hidden border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-6 text-xs tracking-[0.3em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.15)]">
                  <span className="relative z-10 flex items-center gap-3">
                    Discover Our Story
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 scale-x-0 origin-left bg-gradient-to-r from-[#ffbf50]/5 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

