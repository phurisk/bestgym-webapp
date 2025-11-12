"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const images = [
    "/BestGym/473047574_4119171878321210_6137209201647970908_n.jpg",
    "/BestGym/473072358_4119919154913149_7235681083747084916_n.jpg",
    "/BestGym/474622939_4129987663906298_8217817207389649493_n.jpg",
    "/BestGym/475264146_4132393120332419_8706820366972176327_n.jpg",
    "/BestGym/storefront-1.jpg",
    "/BestGym/storefront-2.jpg",
    "/BestGym/facilities-locker.jpg",
    "/BestGym/472709085_4118173688421029_813379643645722897_n.jpg",
    "/BestGym/472844815_4118184158419982_3636719454063427064_n.jpg",
  ];

  return (
    <section id="gallery" ref={ref} className="py-20 bg-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-5xl font-bold text-center mb-16"
        >
          บรรยากาศ<span className="text-primary">ภายใน</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-64 rounded-xl overflow-hidden cursor-pointer"
            >
              <Image
                src={img}
                alt={`BestGym ${i + 1}`}
                fill
                className="object-cover hover:scale-110 transition duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
