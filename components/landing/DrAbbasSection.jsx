"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getIconComponent } from "@/lib/icon-utils";

const defaultData = {
  badge: "Meet Our Founder",
  title: "Precision. Artistry.",
  titleAccent: "Natural Results.",
  image: {
    src: "/images/drsnaclinic/doctor-intro.jpg",
    alt: "Dr Syed Nadeem Abbas - Founder & Lead Aesthetic Physician",
    name: "Dr Syed Nadeem Abbas",
    credentials: "MSc (Distinction) | MRCGP | MRCSEd | MBBS",
    role: "Founder & Lead Aesthetic Physician",
  },
  credentials: [
    {
      icon: "graduation-cap",
      title: "Masters in Aesthetic Surgery",
      description: "Completed with Distinction",
    },
    {
      icon: "award",
      title: "Multi-Certified Professional",
      description: "MSc | MRCGP | MRCSEd | MBBS",
    },
    {
      icon: "shield",
      title: "Rigorous Training",
      description: "Cadaveric courses & world-renowned clinics",
    },
    {
      icon: "heart",
      title: "Patient-Centered Approach",
      description: "Personalized consultations for natural results",
    },
  ],
  content: [
    "With a Masters in Aesthetic Plastic Surgery completed with distinction, Dr Syed Nadeem Abbas represents the pinnacle of aesthetic medicine in London. His extensive credentials—including MRCGP, MRCSEd, and MBBS—underscore a commitment to medical excellence.",
    "Dr Abbas's philosophy: \"Making you appear to be your best, not just younger.\" This patient-centered vision focuses on enhancing your natural features while preserving your unique character.",
    "Through extensive training at world-renowned aesthetic clinics across Europe and the UK, Dr Abbas has refined his expertise in facial anatomy and advanced injection techniques, achieving results that look refreshed, never overdone.",
  ],
  quote: {
    icon: "sparkles",
    text: "True artistry in aesthetic medicine lies not in dramatic transformation, but in subtle enhancement. It's about understanding the intricate anatomy beneath the surface, respecting each patient's natural beauty, and delivering results that restore confidence while preserving individuality.",
    author: "Dr Syed Nadeem Abbas",
    subtitle: "MSc (Distinction) in Aesthetic Plastic Surgery",
  },
  cta: {
    text: "Learn More About Dr Abbas",
    href: "/dr-syed-nadeem-abbas",
  },
};

export function DrAbbasSection({ data }) {
  const mergedData = data
    ? {
        ...defaultData,
        ...data,
        image: { ...defaultData.image, ...data.image },
        quote: { ...defaultData.quote, ...data.quote },
        cta: { ...defaultData.cta, ...data.cta },
        content: data.content || defaultData.content,
        credentials: data.credentials || defaultData.credentials,
      }
    : defaultData;

  const image = mergedData.image;
  const quote = mergedData.quote;
  const cta = mergedData.cta;
  const QuoteIcon = getIconComponent(quote.icon, Sparkles);

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {mergedData.badge && (
            <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">
              {mergedData.badge}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 leading-tight">
            {mergedData.title}
            {mergedData.titleAccent && (
              <>
                <br />
                <span className="text-primary">{mergedData.titleAccent}</span>
              </>
            )}
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  priority
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                  <div className="p-6 rounded-2xl backdrop-blur-md border border-white/20 bg-black/20">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                      {image.name}
                    </h3>
                    <p className="text-primary font-semibold text-base md:text-lg">
                      {image.credentials}
                    </p>
                    <p className="text-white/80 mt-2 text-sm md:text-base">
                      {image.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {mergedData.credentials.map((credential, index) => {
                const Icon = getIconComponent(credential.icon, Sparkles);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="relative w-full h-full group">
                      <div className="hidden md:block absolute inset-0 h-full w-full scale-[0.85] transform rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative flex h-full flex-col items-start justify-start rounded-2xl border border-primary/20 bg-card p-6 shadow-md hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          {credential.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {credential.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Content & Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              {mergedData.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-muted dark:from-secondary dark:via-secondary/95 dark:to-background" />
                <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-primary/8 rounded-full blur-xl opacity-60" />
                <div className="hidden md:block absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-xl opacity-40" />

                <div className="relative p-8 md:p-10">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/20 backdrop-blur-sm mb-6 border border-primary/30">
                    <QuoteIcon className="w-7 h-7 text-primary" />
                  </div>

                  <blockquote className="space-y-6">
                    <p className="text-lg md:text-xl font-heading font-medium text-foreground leading-relaxed">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <footer className="pt-4 border-t border-primary/20">
                      <cite className="not-italic">
                        <p className="font-bold text-primary text-base">
                          {quote.author}
                        </p>
                        <p className="text-muted-foreground text-sm mt-1">
                          {quote.subtitle}
                        </p>
                      </cite>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </motion.div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="btn-primary-gradient text-base md:text-lg px-8 py-6 shadow-lg hover:shadow-xl group w-full sm:w-auto transition-all"
              >
                <Link href={cta.href} className="gap-2">
                  {cta.text}
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
