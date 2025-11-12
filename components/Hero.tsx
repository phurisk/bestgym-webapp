"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-dark to-primary/20" />
      
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/BestGym/473047574_4119171878321210_6137209201647970908_n.jpg')" }}
      />

      <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6"
        >
          BEST<span className="text-primary">GYM</span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300"
        >
          ฟิตเนสและยิมคุณภาพ ใกล้ Seacon ศรีนครินทร์
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8"
        >
          <div className="flex items-center gap-2 bg-black/50 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
            <FaMapMarkerAlt className="text-primary flex-shrink-0" />
            <span className="whitespace-nowrap">ศรีนครินทร์ 45 ใกล้ Seacon</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base">
            <FaClock className="text-primary flex-shrink-0" />
            <span className="whitespace-nowrap">จ.-ศ. 08:00-22:00</span>
          </div>
        </motion.div>

        <motion.a
          href="#packages"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-primary hover:bg-red-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition"
        >
          ดูแพ็กเกจของเรา
        </motion.a>
      </div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 sm:bottom-10 left-0 right-0 z-20 flex flex-col items-center justify-center mx-auto"
      >
        <div className="w-7 h-12 sm:w-8 sm:h-14 border-2 sm:border-3 border-white rounded-full flex justify-center shadow-lg">
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-4 sm:w-2 sm:h-5 bg-white rounded-full mt-2"
          />
        </div>
        <p className="text-white text-xs sm:text-sm mt-2 font-light whitespace-nowrap">เลื่อนลง</p>
      </motion.div>
    </section>
  );
}
