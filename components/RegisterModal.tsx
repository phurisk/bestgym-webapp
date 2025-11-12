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
        }, 2000);
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
              <div className="text-center py-8">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-primary mb-2">สำเร็จ!</h3>
                <p className="text-gray-300">ทีมงานจะติดต่อกลับเร็วๆ นี้</p>
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

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-red-700 py-4 rounded-lg font-bold text-lg transition disabled:opacity-50"
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
