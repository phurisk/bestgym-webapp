"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
}

export default function RegisterModal({ isOpen, onClose, packageName }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: packageName || "",
    time: "เช้า",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [pdpaConsent, setPdpaConsent] = useState(false);

  const validatePhone = (phone: string) => {
    // ลบช่องว่างและขีดออก
    const cleanPhone = phone.replace(/[\s-]/g, '');

    // ตรวจสอบว่าเป็นตัวเลขเท่านั้น
    if (!/^\d+$/.test(cleanPhone)) {
      return "กรุณากรอกเฉพาะตัวเลข";
    }

    // ตรวจสอบว่ามี 10 หลัก
    if (cleanPhone.length !== 10) {
      return "เบอร์โทรต้องมี 10 หลัก";
    }

    // ตรวจสอบว่าขึ้นต้นด้วย 0
    if (!cleanPhone.startsWith('0')) {
      return "เบอร์โทรต้องขึ้นต้นด้วย 0";
    }

    return "";
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    const error = validatePhone(value);
    setPhoneError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบเบอร์โทรก่อนส่ง
    const phoneValidation = validatePhone(formData.phone);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      return;
    }

    // ตรวจสอบ PDPA consent
    if (!pdpaConsent) {
      alert("กรุณายอมรับนโยบายความเป็นส่วนตัว");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/[\s-]/g, '') // ส่งเฉพาะตัวเลข
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ name: "", phone: "", interest: packageName || "", time: "เช้า" });
          setPhoneError("");
          setPdpaConsent(false);
        }, 4000); // เพิ่มจาก 2 วินาที เป็น 4 วินาที
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-dark border-2 border-primary rounded-2xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FaTimes className="text-2xl" />
            </button>

            {success ? (
              <div className="text-center py-12">
                {/* Logo Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="mb-6"
                >
                  <img 
                    src="/BestGym/logo.jpg" 
                    alt="BestGym Logo" 
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary shadow-lg shadow-primary/50"
                  />
                </motion.div>

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-3xl font-bold text-primary mb-3">สมัครสำเร็จ!</h3>
                  <p className="text-gray-300 text-lg mb-2">ขอบคุณที่สนใจ BestGym</p>
                  <p className="text-gray-400">ทีมงานจะติดต่อกลับเร็วๆ นี้</p>
                </motion.div>

                {/* Confetti Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, times: [0, 0.5, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0, x: 0, opacity: 1 }}
                      animate={{ 
                        y: Math.random() * 400 - 200,
                        x: Math.random() * 400 - 200,
                        opacity: 0,
                        rotate: Math.random() * 360
                      }}
                      transition={{ duration: 1.5, delay: i * 0.05 }}
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full"
                    />
                  ))}
                </motion.div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">สมัครทันที</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold mb-2">ชื่อ-นามสกุล</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-primary outline-none"
                      placeholder="กรอกชื่อของคุณ"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">เบอร์โทร</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg bg-black border ${phoneError ? "border-red-500" : "border-gray-700"
                        } focus:border-primary outline-none`}
                      placeholder="081-234-5678"
                      maxLength={10}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">สนใจแพ็กเกจ</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-primary outline-none"
                    >
                      <option value="2 เดือน">2 เดือน - 2,300 บาท</option>
                      <option value="6 เดือน">6 เดือน - 5,700 บาท</option>
                      <option value="รายปี">รายปี - 8,990 บาท</option>
                      <option value="สอบถามเพิ่มเติม">สอบถามเพิ่มเติม</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">ช่วงเวลาที่สะดวกรับสาย</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 focus:border-primary outline-none"
                    >
                      <option value="เช้า">เช้า (08:00-12:00)</option>
                      <option value="บ่าย">บ่าย (12:00-17:00)</option>
                      <option value="เย็น">เย็น (17:00-22:00)</option>
                    </select>
                  </div>

                  {/* PDPA Consent */}
                  <div className="flex items-start gap-3 p-4 bg-black/50 rounded-lg border border-gray-700">
                    <input
                      type="checkbox"
                      id="pdpa-consent"
                      checked={pdpaConsent}
                      onChange={(e) => setPdpaConsent(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-primary cursor-pointer"
                      required
                    />
                    <label htmlFor="pdpa-consent" className="text-sm text-gray-300 cursor-pointer">
                      ข้าพเจ้ายินยอมให้ <span className="text-primary font-bold">BestGym</span> ติดต่อกลับเรื่องสมาชิก/โปรโมชั่น และยอมรับนโยบายความเป็นส่วนตัว
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !pdpaConsent}
                    className="w-full bg-primary hover:bg-red-700 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "กำลังส่ง..." : "ส่งข้อมูล"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
