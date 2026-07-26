"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/20 bg-black/40 backdrop-blur-xl shadow-md text-white"
          : "bg-white text-black backdrop-blur-lg border-b border-white/10"
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

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ShoppingBag className="h-5 w-5" />
            </Button>

            <Button className="cursor-pointer">
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}


