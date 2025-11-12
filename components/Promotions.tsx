"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Promotions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const promotions = [
    "/BestGym/promotion-1.jpg",
    "/BestGym/promotion-2.jpg",
    "/BestGym/promotion-3.jpg",
    "/BestGym/promotion-4.jpg",
  ];

  return (
    <section id="promotions" ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-center mb-16"
        >
          โปรโมชัน<span className="text-primary">พิเศษ</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {promotions.map((promo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-2 border-primary/20 hover:border-primary transition"
            >
              <Image
                src={promo}
                alt={`โปรโมชัน ${i + 1}`}
                fill
                className="object-contain bg-dark"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
