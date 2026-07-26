"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Container from "./Container";
import { shopNavigation } from "@/constants/shop-navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

const containerVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.8,
      duration: 1.2,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
      staggerChildren: 0.08,
      delayChildren: 2.0,
    },
  },
};

const linkVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

const searchVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  },
};

export default function SecondaryHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed top-20 left-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl shadow-md"
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-8">
            {/* Search - Desktop */}
            <motion.div
              variants={searchVariants}
              className="hidden w-64 lg:block"
            >
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 group-focus-within:text-[#ffbf50] transition-colors duration-300" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-full border-white/10 bg-white/5 text-[#ffbf50] placeholder:text-white/30 focus:border-[#ffbf50]/50 focus:ring-[#ffbf50]/20 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Mobile Search Icon - left side */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="text-white/60 hover:text-[#ffbf50] hover:bg-white/5 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation - Desktop */}
            <nav className="mx-auto hidden items-center gap-10 md:flex">
              {shopNavigation.map((link) => {
                const active = pathname === link.href;

                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={`group relative pb-1 text-sm uppercase tracking-[0.18em] transition-colors duration-300 ${
                        active
                          ? "text-[#ffbf50]"
                          : "text-white/80 hover:text-[#ffbf50]"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`absolute left-0 -bottom-1 h-px transition-all duration-500 ${
                          active
                            ? "w-full bg-[#ffbf50]"
                            : "w-0 bg-white/40 group-hover:w-full"
                        }`}
                      />
                      <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Burger Icon - right side */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileSheetOpen(true)}
                className="text-white/60 hover:text-[#ffbf50] hover:bg-white/5 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Expandable Search Bar */}
          <AnimatePresence>
            {mobileSearchOpen && (
              <motion.div
                key="mobile-search"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.15, 1] }}
                className="overflow-hidden md:hidden border-t border-white/10"
              >
                <div className="py-3 px-1">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40 group-focus-within:text-[#ffbf50] transition-colors duration-300" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-full border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-[#ffbf50]/50 focus:ring-[#ffbf50]/20 transition-all duration-300"
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.div>

      {/* Mobile Shop Navigation Sheet */}
      <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-t border-white/20 bg-black/90 backdrop-blur-2xl text-white shadow-2xl"
        >
          <div className="px-4 py-6">
            <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-white/20" />
            <h3 className="text-center text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
              Shop Categories
            </h3>
            <nav className="flex flex-col space-y-3 py-2">
              {shopNavigation.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.5,
                      ease: [0.25, 0.1, 0.15, 1],
                    }}
                  >
                    <SheetClose
                      render={
                        <button
                          className={`group flex w-full items-center justify-center py-3 text-lg font-light tracking-[0.2em] transition-all duration-500 hover:tracking-[0.25em] ${
                            active
                              ? "text-[#ffbf50]"
                              : "text-white/70 hover:text-white"
                          }`}
                        />
                      }
                      onClick={() => router.push(link.href)}
                    >
                      {/* Left horizontal line */}
                      <span
                        className={`h-px flex-1 transition-all duration-500 ${
                          active
                            ? "bg-gradient-to-r from-transparent via-[#ffbf50]/40 to-[#ffbf50]/60"
                            : "bg-gradient-to-r from-transparent via-white/15 to-white/30 group-hover:via-white/30 group-hover:to-white/50"
                        }`}
                      />

                      {/* Centered Link Name */}
                      <span className="px-4 uppercase font-heading text-base sm:text-lg">
                        {link.name}
                      </span>

                      {/* Right horizontal line */}
                      <span
                        className={`h-px flex-1 transition-all duration-500 ${
                          active
                            ? "bg-gradient-to-r from-[#ffbf50]/60 via-[#ffbf50]/40 to-transparent"
                            : "bg-gradient-to-r from-white/30 via-white/15 to-transparent group-hover:from-white/50 group-hover:via-white/30"
                        }`}
                      />
                    </SheetClose>
                  </motion.div>
                );
              })}
            </nav>
            <p className="mt-8 text-center text-[10px] tracking-[0.3em] text-white/20">
              NOVAIRE COLLECTION
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}




