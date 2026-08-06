"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Container from "./Container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";



const brandLetters = "NOVAIRE".split("");

const letterVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.6,
      ease: [0.25, 0.1, 0.15, 1] as [number, number, number, number],
    },
  }),
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className={`fixed top-0 left-0 z-50 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-white/40 backdrop-blur-xl shadow-md text-white"
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
          <div className="flex items-center gap-2">

            <Button variant="ghost" size="icon" className="cursor-pointer relative" onClick={openCart}>
              <ShoppingBag className={`h-5 w-5 transition-colors duration-300 ${isScrolled ? "text-white" : "text-black"}`} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbf50] text-[9px] font-bold text-black">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Button>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs tracking-[0.15em] transition-all duration-300 ${
                    isScrolled
                      ? "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                      : "border-black/10 bg-black/5 text-black/70 hover:border-black/20 hover:text-black"
                  }`}
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{user.firstName}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Signed in as</p>
                        <p className="text-xs tracking-[0.1em] text-white/60 mt-0.5 truncate">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <User className="h-3.5 w-3.5" /> My Account
                        </Link>
                        <Link
                          href="/wishlist"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-[0.15em] text-white/60 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          Wishlist
                          {wishlistCount > 0 && (
                            <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbf50] text-[9px] font-bold text-black">
                              {wishlistCount}
                            </span>
                          )}
                        </Link>
                        <button
                          onClick={() => { logout(); setMenuOpen(false); }}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-xs tracking-[0.15em] text-red-400/60 hover:text-red-400 hover:bg-white/5 transition-all border-t border-white/5 mt-1"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <Button className={`cursor-pointer text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? "" : "bg-black text-white hover:bg-black/80"
                }`}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}


