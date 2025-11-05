"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Calendar, MapPin, Mail } from "lucide-react";
import { WavyBackground } from "@/components/aceternity/wavy-background";
import { MovingBorderButton } from "@/components/aceternity/moving-border";

export function FinalCTA() {
  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+44 7955 836986",
      href: "tel:+447955836986",
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@drsnaclinic.com",
      href: "mailto:info@drsnaclinic.com",
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "48 Wimpole Street, London W1G 8SF",
      href: "https://maps.google.com/?q=48+Wimpole+Street+London",
    },
  ];

  return (
    <section className="relative">
      <WavyBackground
        className="py-32"
        colors={["#cda55c", "#e6c89f", "#b8935a"]}
        waveOpacity={0.3}
        blur={15}
        speed="slow"
      >
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
              Begin Your Journey
              <br />
              <span className="text-gold-light">To Natural Beauty</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light">
              Book your consultation today and discover how Dr Abbas and his expert
              team can help you achieve your aesthetic goals with precision and care
            </p>

            {/* Main CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/booking">
                <MovingBorderButton
                  borderRadius="1.5rem"
                  className="bg-white text-dark-brown px-12 py-6 font-bold text-lg"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Your Consultation
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </MovingBorderButton>
              </Link>
            </div>

            {/* Contact Info Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-gold-light transition-all"
                >
                  <info.icon className="w-6 h-6 text-gold-light mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-white/70 mb-1">{info.label}</p>
                  <p className="text-white font-semibold group-hover:text-gold-light transition-colors">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-white/60 text-sm"
            >
              <p className="mb-2">Open Monday - Saturday</p>
              <p className="text-lg font-semibold text-white/80">9:00 AM - 6:00 PM</p>
            </motion.div>
          </motion.div>
        </div>
      </WavyBackground>
    </section>
  );
}
