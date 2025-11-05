"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export function HeroBlock({ data }) {
  const { type, media, title, subtitle, description, cta } = data;

  return (
    <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark-brown">
      {/* Background Image/Video */}
      {type === "image" && media && (
        <div className="absolute inset-0 z-0">
          <Image
            src={media}
            alt={title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      )}

      {/* Dark gradient background when no image */}
      {(!media || type !== "image") && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark-brown via-charcoal to-dark-brown">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(205,165,92,0.15),transparent_50%)]" />
        </div>
      )}

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl md:text-3xl font-accent text-gold-light drop-shadow-lg mb-4"
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-200 drop-shadow-md mb-8 max-w-2xl"
            >
              {description}
            </motion.p>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {cta?.primary && (
              <Button
                asChild
                size="lg"
                className="btn-gold text-lg px-8 py-6 shadow-gold-lg hover:shadow-gold transition-all duration-300"
              >
                <Link href={cta.primary.link}>
                  {cta.primary.text}
                </Link>
              </Button>
            )}
            {cta?.secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white bg-transparent border-2 border-gold-light hover:bg-gold hover:border-gold hover:text-dark-brown transition-all duration-300 shadow-lg"
              >
                <Link href={cta.secondary.link}>
                  {cta.secondary.text}
                </Link>
              </Button>
            )}
          </motion.div>
        </motion.div>
      </Container>

      {/* Decorative Gold Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient shadow-gold" />
    </div>
  );
}
