"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Heart, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

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
  const { count, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

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
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="cursor-pointer relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbf50] text-[9px] font-bold text-black">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="cursor-pointer relative" onClick={openCart}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffbf50] text-[9px] font-bold text-black">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Button>

            {user ? (
              <div className="flex items-center gap-1">
                <Link href="/account">
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer text-white/30 hover:text-red-400/70"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="cursor-pointer text-xs tracking-[0.2em] uppercase">
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


