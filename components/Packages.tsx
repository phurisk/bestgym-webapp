"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaCheck, FaFire } from "react-icons/fa";

export default function Packages() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const packages = [
    {
      name: "2 เดือน",
      price: "2,300",
      features: ["ใช้อุปกรณ์ทั้งหมด", "เทรนเนอร์ดูแล", "ล็อกเกอร์ส่วนตัว"],
      popular: false,
    },
    {
      name: "6 เดือน",
      price: "5,700",
      features: ["ใช้อุปกรณ์ทั้งหมด", "เทรนเนอร์ดูแล", "ล็อกเกอร์ส่วนตัว", "แถมฟรี 1 เดือน"],
      popular: true,
    },
    {
      name: "รายปี",
      price: "8,990",
      features: ["ใช้อุปกรณ์ทั้งหมด", "เทรนเนอร์ดูแล", "ล็อกเกอร์ส่วนตัว", "คุ้มที่สุด!"],
      popular: false,
    },
  ];

  return (
    <section id="packages" ref={ref} className="py-20 bg-gradient-to-b from-dark to-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-center mb-16"
        >
          แพ็กเกจ<span className="text-primary">สมาชิก</span>
        </motion.h2>


        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`relative p-8 rounded-2xl ${pkg.popular
                ? "bg-gradient-to-br from-primary to-red-900 border-2 border-primary"
                : "bg-black/50 border border-gray-800"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full flex items-center gap-1">
                  <FaFire className="text-primary" />
                  <span className="font-bold">ยอดนิยม</span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">{pkg.price}</span>
                <span className="text-xl text-gray-300"> บาท</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <FaCheck className="text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <a
                  href="https://line.me/R/ti/p/@bestgym"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 rounded-full font-bold transition ${pkg.popular
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-primary hover:bg-red-700"
                    }`}
                >
                  💬 สมัครผ่าน LINE
                </a>
                <a
                  href="tel:0864199868"
                  className="block text-center py-3 rounded-full font-bold border-2 border-current hover:bg-white/10 transition"
                >
                  📞 โทรสอบถาม
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
