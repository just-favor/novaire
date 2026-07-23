"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Container from "./Container";
import { Button } from "@/components/ui/button";

const brandLetters = "NOVAIRE".split("");

const letterVariants = {
  hidden: { opacity: 0, x: -60, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  }),
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 shadow-sm ${
        isScrolled
          ? "border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-md"
          : "bg-transparent backdrop-blur-lg"
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <h1 className="font-heading text-3xl tracking-[0.3em] flex">
              {brandLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button>Login</Button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <Menu className="h-6 w-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] border-l border-white/90 bg-black/40  text-black shadow-2xl backdrop-blur-sm"
              >
                <div className="flex h-full flex-col justify-center px-2">
                  <nav className="flex flex-col space-y-1">
                    <Link
                      href="/"
                      className="group relative border-b border-white/6 py-5 text-center text-lg font-light tracking-[0.15em] transition-all duration-500 hover:tracking-[0.25em]"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Home
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>

                    <Link
                      href="/shop"
                      className="group relative border-b border-white/[0.06] py-5 text-center text-lg font-light tracking-[0.15em] transition-all duration-500 hover:tracking-[0.25em]"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Shop
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>

                    <Link
                      href="/collections"
                      className="group relative border-b border-white/[0.06] py-5 text-center text-lg font-light tracking-[0.15em] transition-all duration-500 hover:tracking-[0.25em]"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Collections
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>

                    <Link
                      href="/about"
                      className="group relative border-b border-white/[0.06] py-5 text-center text-lg font-light tracking-[0.15em] transition-all duration-500 hover:tracking-[0.25em]"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        About
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>

                    <Link
                      href="/contact"
                      className="group relative border-b border-white/[0.06] py-5 text-center text-lg font-light tracking-[0.15em] transition-all duration-500 hover:tracking-[0.25em]"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        Contact
                      </span>
                      <span className="absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </nav>

                  <Button className="mt-10 w-fit mx-auto bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    Login
                  </Button>

                  <p className="mt-6 text-center text-[10px] tracking-[0.3em] text-white">
                    NOVAIRE
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
