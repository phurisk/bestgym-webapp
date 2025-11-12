"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Packages from "@/components/Packages";
import Promotions from "@/components/Promotions";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Packages />
      <Promotions />
      <Gallery />
      <Contact />
    </main>
  );
}
