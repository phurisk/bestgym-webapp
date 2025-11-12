"use client";
import { motion } from "framer-motion";
import { FaPhone, FaDumbbell } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center max-w-full">
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <img src="/BestGym/logo.jpg" alt="BestGym Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover" />
          <span className="text-xl md:text-2xl font-bold whitespace-nowrap">BEST<span className="text-primary">GYM</span></span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#about" className="hover:text-primary transition">เกี่ยวกับเรา</a>
          <a href="#packages" className="hover:text-primary transition">แพ็กเกจ</a>
          <a href="#promotions" className="hover:text-primary transition">โปรโมชัน</a>
          <a href="#gallery" className="hover:text-primary transition">แกลเลอรี่</a>
          <a href="#contact" className="hover:text-primary transition">ติดต่อ</a>
        </div>
        <a href="tel:0864199868" className="bg-primary hover:bg-red-700 px-4 md:px-6 py-2 rounded-full flex items-center gap-2 transition text-sm md:text-base whitespace-nowrap flex-shrink-0">
          <FaPhone className="text-sm md:text-base" /> <span className="hidden sm:inline">โทรเลย</span><span className="sm:hidden">โทร</span>
        </a>
      </div>
    </motion.nav>
  );
}
