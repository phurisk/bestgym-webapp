"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaLine } from "react-icons/fa";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-center mb-16"
        >
          ติดต่อ<span className="text-primary">เรา</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <FaPhone className="text-3xl text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">โทรศัพท์</h3>
                <a href="tel:0864199868" className="text-gray-300 hover:text-primary transition">
                  086-419-9868
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-3xl text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">ที่อยู่</h3>
                <p className="text-gray-300">
                  ศรีนครินทร์ 45, หนองบอน, ประเวศ<br />
                  กรุงเทพฯ 10250<br />
                  ใกล้ Seacon Square
                </p>
              </div>
            </div>


            <div className="flex items-start gap-4">
              <FaClock className="text-3xl text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">เวลาเปิด-ปิด</h3>
                <p className="text-gray-300">
                  จันทร์ - ศุกร์: 08:00 - 22:00<br />
                  เสาร์ - อาทิตย์: 10:00 - 21:30
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a
                href="https://line.me/R/ti/p/@bestgym"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#06C755] hover:bg-[#05b34b] p-4 rounded-full transition"
              >
                <FaLine className="text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/BESTGYM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-red-700 p-4 rounded-full transition"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/fitnessbestgym"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-red-700 p-4 rounded-full transition"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="h-96 rounded-xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.4!2d100.6471!3d13.7006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQyJzAyLjIiTiAxMDDCsDM4JzQ5LjYiRQ!5e0!3m2!1sth!2sth!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="text-center mt-16 text-gray-500"
      >
        <p>© 2025 BestGym. All rights reserved.</p>
      </motion.div>
    </section>
  );
}
