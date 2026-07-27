"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Gem, Layers, Leaf, Shield } from "lucide-react";

import Navbar from "@/components/Layout/Navbar";
import SecondaryHeader from "@/components/Layout/Secnav";
import Footer from "@/components/Layout/Footer";
import Container from "@/components/Layout/Container";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const pillars = [
  {
    icon: Gem,
    label: "Craftsmanship",
    body: "Every silhouette is shaped by hands that have spent decades mastering their discipline — from Milanese ateliers to Parisian maisons.",
  },
  {
    icon: Layers,
    label: "Materiality",
    body: "We source only heritage-certified textiles: English wools, Japanese silks, and Portuguese linens selected for drape, longevity, and origin.",
  },
  {
    icon: Leaf,
    label: "Conscious Luxury",
    body: "Sustainability is not an afterthought. Our supply chain is audited end-to-end, and every run is sized to eliminate deadstock.",
  },
  {
    icon: Shield,
    label: "Integrity",
    body: "No seasonal overproduction. No trend-chasing. NOVAIRE releases only what is ready — and only what will endure.",
  },
];

const milestones = [
  { year: "2018", event: "Founded in Paris by creative director Eloise Varet." },
  { year: "2019", event: "Debut collection presented at an invitation-only salon in Le Marais." },
  { year: "2021", event: "First atelier collaboration with Tokyo-based textile house Mitsuru." },
  { year: "2022", event: "Launched the Vault — a private archive of limited, numbered pieces." },
  { year: "2024", event: "Expanded to a curated global clientele across 28 countries." },
  { year: "2026", event: "60-piece collection marking NOVAIRE's commitment to intentional dressing." },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffbf50] selection:text-black">
      <Navbar />
      <SecondaryHeader />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#ffbf50]/6 blur-[160px]" />
          <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[#ffbf50]/4 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute left-0 right-0 top-[38%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center px-4 text-center"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="mb-6 text-[10px] tracking-[0.5em] text-[#ffbf50]/70 uppercase"
          >
            Est. Paris, 2018
          </motion.span>
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="font-heading text-5xl sm:text-7xl lg:text-9xl tracking-[0.25em] text-white/90 leading-none"
          >
            NOVAIRE
          </motion.h1>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="my-8 h-px w-16 bg-gradient-to-r from-transparent via-[#ffbf50]/50 to-transparent"
          />
          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="max-w-md text-sm leading-relaxed tracking-[0.2em] text-white/40"
          >
            Curated luxury for those who understand that true elegance is never loud.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-14 flex items-center gap-2 text-[10px] tracking-[0.35em] text-white/20 uppercase"
          >
            <span>Scroll to explore</span>
            <ArrowRight className="h-3 w-3 animate-pulse" />
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* STATEMENT */}
      <section className="border-y border-white/5 py-24 lg:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.span variants={fadeUp} className="block mb-8 text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
              Our Philosophy
            </motion.span>
            <motion.p
              variants={fadeUp}
              className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-[0.12em] text-white/70"
            >
              We believe clothing should outlast seasons,{" "}
              <span className="text-white/90">designed once, worn for decades.</span>
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#ffbf50]/30 to-transparent"
            />
          </motion.div>
        </Container>
      </section>

      {/* STORY */}
      <section className="py-24 lg:py-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-8"
            >
              <motion.span variants={fadeUp} className="block text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
                The Story
              </motion.span>
              <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl tracking-[0.15em] text-white/90 leading-snug">
                Born from a quiet refusal to compromise.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm leading-loose tracking-[0.12em] text-white/40">
                NOVAIRE began as a single question posed in a Haussmann apartment:
                why does luxury so often feel performative? Eloise Varet, former
                head of fabric development at a storied Parisian house, set out
                to build something different — a brand with no press events, no
                celebrity endorsements, and no seasonal noise.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm leading-loose tracking-[0.12em] text-white/40">
                Instead: silence, precision, and a commitment to the client who
                buys deliberately. Each collection is developed over 18 months.
                Each piece is produced in a numbered edition of no more than 200.
                Every detail — from the lining stitching to the button sourcing
                — is documented and shared with the wearer.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 text-[10px] tracking-[0.4em] text-[#ffbf50]/70 uppercase transition-all duration-300 hover:text-[#ffbf50] group"
                >
                  <span>Explore the collection</span>
                  <span className="h-px w-6 bg-[#ffbf50]/40 transition-all duration-500 group-hover:w-10" />
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.15, 1] }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1205] via-black to-[#0d0d0d]" />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(255,191,80,0.12) 0%, transparent 60%)" }}
              />
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#ffbf50]/20 to-transparent" />
              <div className="absolute right-8 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#ffbf50]/20 to-transparent" />
              <div className="absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ffbf50]/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#ffbf50]/20 to-transparent" />
              <div className="absolute left-6 top-6 h-5 w-px bg-[#ffbf50]/40" />
              <div className="absolute left-6 top-6 h-px w-5 bg-[#ffbf50]/40" />
              <div className="absolute right-6 top-6 h-5 w-px bg-[#ffbf50]/40" />
              <div className="absolute right-6 top-6 h-px w-5 bg-[#ffbf50]/40" />
              <div className="absolute left-6 bottom-6 h-5 w-px bg-[#ffbf50]/40" />
              <div className="absolute left-6 bottom-6 h-px w-5 bg-[#ffbf50]/40" />
              <div className="absolute right-6 bottom-6 h-5 w-px bg-[#ffbf50]/40" />
              <div className="absolute right-6 bottom-6 h-px w-5 bg-[#ffbf50]/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-10">
                <span className="font-heading text-5xl tracking-[0.4em] text-white/10">N</span>
                <div className="h-px w-12 bg-[#ffbf50]/20" />
                <span className="text-[9px] tracking-[0.5em] text-white/20 uppercase">
                  Atelier Paris / Est. 2018
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* PILLARS */}
      <section className="border-y border-white/5 py-24 lg:py-36 bg-white/[0.01]">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16 text-center"
          >
            <motion.span variants={fadeUp} className="block mb-4 text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
              What We Stand For
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl tracking-[0.15em] text-white/80">
              Four Commitments
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {pillars.map((p) => (
              <motion.div
                key={p.label}
                variants={fadeUp}
                className="group relative rounded-sm border border-white/5 bg-white/[0.02] p-8 transition-all duration-500 hover:border-[#ffbf50]/20 hover:bg-[#ffbf50]/[0.03]"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ffbf50]/0 to-transparent transition-all duration-500 group-hover:via-[#ffbf50]/30" />
                <p.icon className="mb-6 h-5 w-5 text-[#ffbf50]/50 transition-colors duration-300 group-hover:text-[#ffbf50]/80" strokeWidth={1.5} />
                <h3 className="mb-3 font-heading text-sm tracking-[0.3em] text-white/80 uppercase">{p.label}</h3>
                <p className="text-xs leading-loose tracking-[0.1em] text-white/35">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="py-24 lg:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mb-16"
          >
            <motion.span variants={fadeUp} className="block mb-4 text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
              A Quiet History
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl tracking-[0.15em] text-white/80">
              Milestones
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="relative"
          >
            <div className="absolute left-[3.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#ffbf50]/30 via-[#ffbf50]/10 to-transparent hidden sm:block" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  variants={fadeUp}
                  custom={i}
                  className="flex items-start gap-6 sm:gap-16"
                >
                  <span className="shrink-0 font-heading text-sm tracking-[0.3em] text-[#ffbf50]/60 w-14 text-right">
                    {m.year}
                  </span>
                  <div className="relative hidden sm:flex shrink-0 items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#ffbf50]/40 mt-1" />
                    <div className="absolute h-5 w-5 rounded-full border border-[#ffbf50]/15" />
                  </div>
                  <p className="pt-0.5 text-sm tracking-[0.12em] text-white/45 leading-relaxed max-w-lg">{m.event}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24 lg:py-36">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.span variants={fadeUp} className="block mb-6 text-[10px] tracking-[0.5em] text-[#ffbf50]/60 uppercase">
              The Collection Awaits
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em] text-white/85 mb-8">
              Dress with intention.
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-12 text-sm leading-loose tracking-[0.15em] text-white/35">
              60 pieces. Each numbered. Each crafted to last a lifetime.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 border border-[#ffbf50]/30 bg-[#ffbf50]/10 px-8 py-4 text-[11px] tracking-[0.4em] text-[#ffbf50] uppercase backdrop-blur-md transition-all duration-500 hover:bg-[#ffbf50]/20 hover:shadow-[0_0_40px_rgba(255,191,80,0.12)]"
              >
                Enter the Shop
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-white/10 px-8 py-4 text-[11px] tracking-[0.4em] text-white/40 uppercase transition-all duration-300 hover:border-white/20 hover:text-white/60"
              >
                Contact the Atelier
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
