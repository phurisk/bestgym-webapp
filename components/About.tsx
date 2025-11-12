"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaDumbbell, FaParking, FaLock, FaUserTie } from "react-icons/fa";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    { icon: FaUserTie, title: "เทรนเนอร์มืออาชีพ", desc: "ดูแลและให้คำแนะนำตลอด" },
    { icon: FaParking, title: "ที่จอดรถสะดวก", desc: "พื้นที่จอดรถกว้างขวาง" },
    { icon: FaLock, title: "ล็อกเกอร์ส่วนตัว", desc: "ปลอดภัยและสะอาด" },
    { icon: FaDumbbell, title: "อุปกรณ์ครบครัน", desc: "เครื่องออกกำลังกายทันสมัย" },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-center mb-16"
        >
          ทำไมต้อง <span className="text-primary">BESTGYM</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-black/50 p-8 rounded-xl text-center border border-gray-800 hover:border-primary transition"
            >
              <feature.icon className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
