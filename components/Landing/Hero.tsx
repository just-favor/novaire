"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const words = "LUXURY REDEFINED".split(" ");

// 5 background images representing each collection
const backgroundSlides = [
  {
    url: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=2070&auto=format&fit=crop",
    label: "NEW ARRIVALS",
  },
  {
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop",
    label: "MEN",
  },
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    label: "WOMEN",
  },
  {
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    label: "COLLECTIONS",
  },
  {
    url: "https://images.unsplash.com/photo-1608032077018-c9aad9565d2c?q=80&w=1888&auto=format&fit=crop",
    label: "SALE",
  },
];

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

const slideVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselActive, setCarouselActive] = useState(false);

  // Start carousel after initial entrance animations complete (~6s)
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setCarouselActive(true);
    }, 5800);

    return () => clearTimeout(startTimer);
  }, []);

  // Cycle through slides every 8 seconds once active
  useEffect(() => {
    if (!carouselActive) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [carouselActive]);

  return (
    <section className="relative min-h-[100dvh] h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* Background Image Carousel (Unified Image for all screen sizes) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={slideVariants}
          className="absolute inset-0 overflow-hidden"
        >
          <img
            src={backgroundSlides[currentSlide].url}
            alt={backgroundSlides[currentSlide].label}
            className="h-full w-full object-cover object-center transition-transform duration-700"
          />
        </motion.div>
      </AnimatePresence>

      {/* Persistent gradient overlays (on top of images) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bgOverlayVariants}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main Content Box */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center pt-12 pb-24 sm:pb-28">
        {/* Decorative top line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="mb-4 sm:mb-8 h-px w-20 sm:w-32 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/60 to-transparent"
        />

        {/* Heading */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.15em] sm:tracking-[0.25em]">
          <motion.span
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="block text-white/90"
          >
            NOVAIRE
          </motion.span>
          <span className="mt-2 sm:mt-4 flex flex-wrap justify-center gap-x-3 sm:gap-x-8 gap-y-1 sm:gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent text-xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] sm:tracking-[0.35em]"
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
          className="mt-4 sm:mt-8 max-w-xs sm:max-w-xl text-[11px] sm:text-sm tracking-[0.15em] sm:tracking-[0.3em] text-white/50 uppercase leading-relaxed px-2"
        >
          Curated collections for the discerning few — where every piece tells a story of timeless elegance
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={decorativeLineVariants}
          className="mt-4 sm:mt-8 h-px w-16 sm:w-24 origin-center bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent"
        />

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ctaVariants}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full max-w-xs sm:max-w-none"
        >
          <Link href="/collections" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto group relative overflow-hidden border border-[#ffbf50]/40 bg-[#ffbf50]/15 px-6 py-5 sm:px-8 sm:py-6 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/25 hover:shadow-[0_0_30px_rgba(255,191,80,0.2)]">
              <span className="relative z-10 flex items-center justify-center gap-2.5">
                Explore Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 scale-x-0 origin-left bg-gradient-to-r from-[#ffbf50]/10 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Button>
          </Link>

          <Link href="/shop" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="w-full sm:w-auto group border border-white/15 px-6 py-5 sm:px-8 sm:py-6 text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-white/70 uppercase transition-all duration-500 hover:border-white/30 hover:text-white hover:bg-white/10"
            >
              <span className="flex items-center justify-center gap-2.5">
                Shop Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom controls & indicator section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ctaVariants}
        className="absolute bottom-4 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 sm:gap-4"
      >
        {/* Slide indicator dots */}
        <div className="flex items-center gap-2 sm:gap-3 p-1">
          {backgroundSlides.map((slide, index) => (
            <button
              key={slide.label}
              onClick={() => {
                setCurrentSlide(index);
                setCarouselActive(true);
              }}
              className="group relative p-2 flex items-center justify-center focus:outline-none"
              aria-label={`View ${slide.label}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "h-2 sm:h-2.5 w-4 sm:w-6 bg-[#ffbf50]"
                    : "h-2 w-2 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Current collection label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={backgroundSlides[currentSlide].label}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={labelVariants}
            className="text-[8px] sm:text-[9px] tracking-[0.35em] sm:tracking-[0.4em] text-[#ffbf50]/60 uppercase font-mono"
          >
            {backgroundSlides[currentSlide].label}
          </motion.span>
        </AnimatePresence>

        {/* Scroll indicator - hidden on small viewports to save space */}
        <div className="hidden sm:flex flex-col items-center gap-2 mt-1">
          <span className="text-[8px] tracking-[0.4em] text-white/20 uppercase">
            Scroll
          </span>
          <div className="h-6 w-px bg-gradient-to-b from-[#ffbf50]/40 to-transparent" />
        </div>
      </motion.div>

      {/* Edge lighting effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/10 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#ffbf50]/10 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#ffbf50]/10 to-transparent" />
    </section>
  );
}

