"use client";

import { motion } from "framer-motion";

const stack = [
  { name: "Next.js 16", desc: "App Router · RSC · Turbopack" },
  { name: "React 19", desc: "Server & Client Components" },
  { name: "TypeScript", desc: "Strict type safety" },
  { name: "Tailwind CSS v4", desc: "Utility-first styling" },
  { name: "Framer Motion", desc: "Animations & transitions" },
  { name: "shadcn/ui", desc: "Accessible UI primitives" },
];

export default function TechBanner() {
  return (
    <section className="relative w-full bg-black border-t border-white/5 overflow-hidden py-16 px-6 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,191,80,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-[9px] tracking-[0.5em] text-[#ffbf50]/50 uppercase font-mono">Built With</span>
          <p className="mt-2 text-[11px] tracking-[0.25em] text-white/20 uppercase">Modern web stack powering this experience</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {stack.map((item) => (
            <motion.div
              key={item.name}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="group flex flex-col gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-4 hover:border-[#ffbf50]/20 hover:bg-[#ffbf50]/[0.03] transition-all duration-300"
            >
              <span className="text-xs tracking-[0.15em] text-white/70 font-mono group-hover:text-[#ffbf50] transition-colors duration-300">
                {item.name}
              </span>
              <span className="text-[10px] tracking-wider text-white/25 leading-relaxed">{item.desc}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
