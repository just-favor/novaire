"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  category?: string;
}

const clothingRows = [
  { size: "XS", eu: "32–34", uk: "6–8",  us: "2–4",  chest: "80–84", waist: "60–64", hips: "86–90" },
  { size: "S",  eu: "36–38", uk: "10–12", us: "6–8",  chest: "85–89", waist: "65–69", hips: "91–95" },
  { size: "M",  eu: "40–42", uk: "14–16", us: "10–12", chest: "90–94", waist: "70–74", hips: "96–100" },
  { size: "L",  eu: "44–46", uk: "18–20", us: "14–16", chest: "95–99", waist: "75–79", hips: "101–105" },
  { size: "XL", eu: "48–50", uk: "22–24", us: "18–20", chest: "100–104", waist: "80–84", hips: "106–110" },
  { size: "XXL",eu: "52–54", uk: "26–28", us: "22–24", chest: "105–110", waist: "85–90", hips: "111–116" },
];

const shoeRows = [
  { eu: "38", uk: "5",   us: "7",   cm: "24.0" },
  { eu: "39", uk: "6",   us: "8",   cm: "24.7" },
  { eu: "40", uk: "6.5", us: "8.5", cm: "25.3" },
  { eu: "41", uk: "7",   us: "9",   cm: "26.0" },
  { eu: "42", uk: "8",   us: "10",  cm: "26.7" },
  { eu: "43", uk: "9",   us: "11",  cm: "27.3" },
  { eu: "44", uk: "10",  us: "12",  cm: "28.0" },
  { eu: "45", uk: "11",  us: "13",  cm: "28.7" },
];

const childrenRows = [
  { size: "2Y",  height: "86–92",  chest: "52",  waist: "51" },
  { size: "4Y",  height: "98–104", chest: "56",  waist: "53" },
  { size: "6Y",  height: "110–116",chest: "60",  waist: "55" },
  { size: "8Y",  height: "122–128",chest: "64",  waist: "57" },
  { size: "10Y", height: "134–140",chest: "68",  waist: "60" },
  { size: "12Y", height: "146–152",chest: "72",  waist: "63" },
  { size: "14Y", height: "158–164",chest: "76",  waist: "66" },
];

type Tab = "clothing" | "shoes" | "children";

export default function SizeGuideModal({ open, onClose, category }: Props) {
  const defaultTab: Tab =
    category === "shoes" ? "shoes" : category === "children" ? "children" : "clothing";
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="sg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4 pointer-events-none">
            <motion.div
              key="sg-modal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.15, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto w-full max-w-2xl rounded-t-3xl sm:rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.5em] text-[#ffbf50]/60 mb-1">NOVAIRE</span>
                  <h2 className="font-heading text-lg tracking-[0.2em] text-white/90">Size Guide</h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-white/25 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-white/5 px-6 pt-4 pb-0">
                {(["clothing", "shoes", "children"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-200 border-b-2 -mb-px ${
                      tab === t
                        ? "border-[#ffbf50] text-[#ffbf50]"
                        : "border-transparent text-white/30 hover:text-white/60"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto px-6 py-6 max-h-[60dvh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(255,191,80,0.2)_transparent]">
                <AnimatePresence mode="wait">
                  {tab === "clothing" && (
                    <motion.div key="clothing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="mb-4 text-[10px] tracking-[0.15em] text-white/30 leading-relaxed">
                        All measurements in centimetres. For the best fit, measure over light clothing and compare to the size that best matches your measurements.
                      </p>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            {["Size", "EU", "UK", "US", "Chest", "Waist", "Hips"].map((h) => (
                              <th key={h} className="pb-3 pr-4 text-[9px] uppercase tracking-[0.35em] text-[#ffbf50]/50 font-normal whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {clothingRows.map((r, i) => (
                            <tr key={r.size} className={`border-b border-white/[0.03] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                              <td className="py-3 pr-4 text-xs font-medium tracking-[0.15em] text-white/80">{r.size}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.eu}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.uk}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.us}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.chest}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.waist}</td>
                              <td className="py-3 pr-4 text-xs tracking-wider text-white/40">{r.hips}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  {tab === "shoes" && (
                    <motion.div key="shoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="mb-4 text-[10px] tracking-[0.15em] text-white/30 leading-relaxed">
                        Foot length in centimetres. Measure your foot from heel to longest toe on a flat surface. If between sizes, we recommend sizing up.
                      </p>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            {["EU", "UK", "US", "Foot Length (cm)"].map((h) => (
                              <th key={h} className="pb-3 pr-6 text-[9px] uppercase tracking-[0.35em] text-[#ffbf50]/50 font-normal whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {shoeRows.map((r, i) => (
                            <tr key={r.eu} className={`border-b border-white/[0.03] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                              <td className="py-3 pr-6 text-xs font-medium tracking-[0.15em] text-white/80">{r.eu}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.uk}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.us}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.cm}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}

                  {tab === "children" && (
                    <motion.div key="children" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="mb-4 text-[10px] tracking-[0.15em] text-white/30 leading-relaxed">
                        All measurements in centimetres. Sized by height — measure from top of head to floor. Chest and waist measured at fullest point.
                      </p>
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5">
                            {["Size", "Height (cm)", "Chest (cm)", "Waist (cm)"].map((h) => (
                              <th key={h} className="pb-3 pr-6 text-[9px] uppercase tracking-[0.35em] text-[#ffbf50]/50 font-normal whitespace-nowrap">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {childrenRows.map((r, i) => (
                            <tr key={r.size} className={`border-b border-white/[0.03] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                              <td className="py-3 pr-6 text-xs font-medium tracking-[0.15em] text-white/80">{r.size}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.height}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.chest}</td>
                              <td className="py-3 pr-6 text-xs tracking-wider text-white/40">{r.waist}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tip */}
                <div className="mt-6 rounded-xl border border-[#ffbf50]/10 bg-[#ffbf50]/[0.03] px-5 py-4">
                  <p className="text-[10px] tracking-[0.15em] text-white/30 leading-relaxed">
                    <span className="text-[#ffbf50]/60">Need help?</span> Our atelier team is available to assist with sizing. Contact us at{" "}
                    <span className="text-white/40">concierge@novaire.com</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
