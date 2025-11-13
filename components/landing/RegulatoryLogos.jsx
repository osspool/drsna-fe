"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function RegulatoryLogos() {
  const logos = [
    {
      name: "CQC - Care Quality Commission",
      src: "/images/drsnaclinic/regulation/care-quality-comission-CQC.webp",
    },
    {
      name: "BMA - British Medical Association",
      src: "/images/drsnaclinic/regulation/BMA-Logo.webp",
    },
    {
      name: "Royal College of General Practitioners",
      src: "/images/drsnaclinic/regulation/royal-college.webp",
    },
    {
      name: "Royal College of Surgeons of Edinburgh",
      src: "/images/drsnaclinic/regulation/royal-college-surgeons-edinburg.webp",
    },
    {
      name: "Queen Mary University",
      src: "/images/drsnaclinic/regulation/queen-mary.webp",
    },
  ];

  return (
    <section className="py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Certified Excellence
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Regulated & Accredited
          </h2>
        </motion.div>

        {/* Infinite Slider for all screen sizes */}
        <div className="relative overflow-hidden">
          <InfiniteSlider
            speedOnHover={20}
            speed={40}
            gap={80}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center  transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={80}
                  className="object-contain h-20 w-auto"
                />
              </div>
            ))}
          </InfiniteSlider>

        
        </div>
      </div>
    </section>
  );
}
