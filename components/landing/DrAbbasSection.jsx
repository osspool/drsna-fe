"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, GraduationCap, Heart, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/aceternity/meteors";
import Glow from "@/components/custom/ui/glow";

export function DrAbbasSection() {
  const credentials = [
    {
      icon: GraduationCap,
      title: "Masters in Aesthetic Surgery",
      description: "Completed with Distinction",
    },
    {
      icon: Award,
      title: "Multi-Certified Professional",
      description: "MSc | MRCGP | MRCSEd | MBBS",
    },
    {
      icon: Shield,
      title: "Rigorous Training",
      description: "Cadaveric courses & world-renowned clinics",
    },
    {
      icon: Heart,
      title: "Patient-Centered Approach",
      description: "Personalized consultations for natural results",
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Simple glow background */}
      <Glow className="pointer-events-none" variant="center" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm font-semibold tracking-wider uppercase mb-3">
            Meet Our Founder
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark-brown mb-4 leading-tight">
            Precision. Artistry.
            <br />
            <span className="text-gold">Natural Results.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image & Credentials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative space-y-8"
          >
            {/* Main Image with Modern Design */}
            <div className="relative h-[500px] lg:h-[550px]">
              <div className="relative h-full rounded-3xl overflow-hidden group">
                {/* Glassmorphic border */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/40 via-gold-light/30 to-transparent p-[2px] rounded-3xl">
                  <div className="relative h-full rounded-[22px] overflow-hidden bg-white/10 backdrop-blur-sm">
                    <Image
                      src="/images/drsnaclinic/dr-syed-nadeem-abbas.webp"
                      alt="Dr Syed Nadeem Abbas - Founder & Lead Aesthetic Physician"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    {/* Modern overlay with better gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Info card overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                      <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                          Dr Syed Nadeem Abbas
                        </h3>
                        <p className="text-gold-light font-semibold text-base md:text-lg">
                          MSc (Distinction) | MRCGP | MRCSEd | MBBS
                        </p>
                        <p className="text-white/90 mt-2 text-sm md:text-base">
                          Founder & Lead Aesthetic Physician
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials Grid with CometCard */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative w-full h-full group">
                    {/* Glow background effect */}
                    <div className="absolute inset-0 h-full w-full scale-[0.85] transform rounded-2xl bg-gradient-to-r from-gold-primary to-gold-light blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                    
                    {/* Card with meteor effect */}
                    <div className="relative flex h-full flex-col items-start justify-start overflow-hidden rounded-2xl border border-gold-primary/20 bg-white/80 backdrop-blur-sm p-6 shadow-lg hover:shadow-2xl hover:border-gold-primary/50 transition-all duration-500">
                      {/* Icon with gradient background */}
                      <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-gold-primary/30 to-gold-light/30 mb-4 group-hover:from-gold-primary/40 group-hover:to-gold-light/40 transition-all duration-300 shadow-md">
                        <credential.icon className="w-6 h-6 text-gold-dark" />
                      </div>
                      
                      <h4 className="relative z-10 font-heading font-bold text-dark-brown text-sm mb-2 leading-tight">
                        {credential.title}
                      </h4>
                      
                      <p className="relative z-10 text-xs text-dark-brown/70 leading-relaxed">
                        {credential.description}
                      </p>

                      {/* Meteors effect */}
                      <Meteors 
                        number={10} 
                        className="bg-gradient-to-r from-gold-primary to-gold-light before:bg-linear-to-r before:from-gold-primary before:to-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Content Text - Condensed */}
            <div className="space-y-5 text-base md:text-lg text-dark-brown/90 leading-relaxed">
              <p>
                With a <span className="font-bold text-dark-brown">Masters in Aesthetic Plastic Surgery completed with distinction</span>, Dr Syed Nadeem Abbas represents the pinnacle of aesthetic medicine in London. His extensive credentials—including MRCGP, MRCSEd, and MBBS—underscore a commitment to medical excellence.
              </p>

              <p>
                Dr Abbas's philosophy:{" "}
                <span className="font-bold text-gold-dark italic">
                  "Making you appear to be your best, not just younger."
                </span>{" "}
                This patient-centered vision focuses on enhancing your natural features while preserving your unique character.
              </p>

              <p>
                Through extensive training at{" "}
                <span className="font-bold text-dark-brown">world-renowned aesthetic clinics across Europe and the UK</span>, Dr Abbas has refined his expertise in facial anatomy and advanced injection techniques, achieving results that look refreshed, never overdone.
              </p>
            </div>

            {/* Dark Elegant Quote Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                {/* Dark gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-brown via-dark-brown/95 to-black" />

                {/* Decorative gold accents */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-light/10 rounded-full blur-3xl" />

                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(202, 158, 71, 0.3) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }}
                />

                <div className="relative p-8 md:p-10">
                  {/* Gold sparkle icon */}
                  <div className="inline-flex p-3 rounded-2xl bg-gold-primary/20 backdrop-blur-sm mb-6 border border-gold-primary/30">
                    <Sparkles className="w-7 h-7 text-gold-light" />
                  </div>

                  {/* Quote text */}
                  <blockquote className="space-y-6">
                    <p className="text-lg md:text-xl font-heading font-medium text-white/95 leading-relaxed">
                      "True artistry in aesthetic medicine lies not in dramatic transformation, but in subtle enhancement. It's about understanding the intricate anatomy beneath the surface, respecting each patient's natural beauty, and delivering results that restore confidence while preserving individuality."
                    </p>

                    {/* Attribution with gold accent */}
                    <footer className="pt-4 border-t border-gold-primary/20">
                      <cite className="not-italic">
                        <p className="font-bold text-gold-light text-base">
                          Dr Syed Nadeem Abbas
                        </p>
                        <p className="text-white/70 text-sm mt-1">
                          MSc (Distinction) in Aesthetic Plastic Surgery
                        </p>
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="btn-gold text-base md:text-lg px-8 py-6 shadow-2xl hover:shadow-gold-lg transition-all duration-300 group w-full sm:w-auto"
              >
                <Link href="/about" className="gap-2">
                  Learn More About Dr Abbas
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
