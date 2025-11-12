"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark to-primary/20" />
      
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/BestGym/473047574_4119171878321210_6137209201647970908_n.jpg')" }}
      />

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6"
        >
          BEST<span className="text-primary">GYM</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl mb-8 text-gray-300"
        >
          ฟิตเนสและยิมคุณภาพ ใกล้ Seacon ศรีนครินทร์
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8"
        >
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
            <FaMapMarkerAlt className="text-primary" />
            <span>ศรีนครินทร์ 45 ใกล้ Seacon</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
            <FaClock className="text-primary" />
            <span>จ.-ศ. 08:00-22:00</span>
          </div>
        </motion.div>

        <motion.a
          href="#packages"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-primary hover:bg-red-700 px-8 py-4 rounded-full text-xl font-bold transition"
        >
          ดูแพ็กเกจของเรา
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
