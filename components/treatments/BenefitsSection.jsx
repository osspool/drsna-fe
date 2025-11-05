"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import {
  Award,
  Heart,
  Shield,
  Users,
  Star,
  CheckCircle2,
  Sparkles,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";

const iconMap = {
  award: Award,
  heart: Heart,
  shield: Shield,
  "shield-check": Shield,
  users: Users,
  user: Users,
  star: Star,
  "check-circle": CheckCircle2,
  sparkles: Sparkles,
  clock: Clock,
  "trending-up": TrendingUp,
  zap: Zap,
  palette: Sparkles,
  "graduation-cap": Award,
};

export function BenefitsSection({ data, variant = "default" }) {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section
      className={`py-16 md:py-24 ${
        variant === "dark" ? "bg-dark-brown" : "bg-white"
      }`}
    >
      <Container>
        {/* Section Header */}
        <div className="text-center mb-20">
          {data.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 ring-1 ring-gold/15 rounded-full mb-4"
            >
              <Sparkles className="w-3 h-3 text-gold" />
              <span className="text-gold text-xs md:text-sm font-semibold tracking-wider uppercase">
                {data.subtitle}
              </span>
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl md:text-5xl font-heading font-bold tracking-tight leading-tight mb-4 ${
              variant === "dark" ? "text-white" : "text-dark-brown"
            }`}
          >
            {data.title || "Why Choose Us"}
          </motion.h2>

          {data.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-base md:text-lg max-w-3xl mx-auto ${
                variant === "dark" ? "text-white/60" : "text-dark-brown/60"
              }`}
            >
              {data.description}
            </motion.p>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((benefit, index) => (
            <BenefitCard
              key={index}
              benefit={benefit}
              index={index}
              variant={variant}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function BenefitCard({ benefit, index, variant }) {
  const Icon = benefit.icon ? iconMap[benefit.icon] || Sparkles : Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      className={`group relative p-6 md:p-7 rounded-2xl border transition-colors duration-200 ${
        variant === "dark"
          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-gold/30"
          : "bg-cream border-dark-brown/10 hover:border-gold/30 hover:shadow-md"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 ${
          variant === "dark"
            ? "bg-gold/10 group-hover:bg-gold/20"
            : "bg-gold/10 group-hover:bg-gold/20"
        }`}
      >
        <Icon className="w-6 h-6 text-gold" />
      </div>

      {/* Title */}
      <h3
        className={`text-lg md:text-xl font-heading font-bold mb-2 transition-colors ${
          variant === "dark"
            ? "text-white group-hover:text-gold"
            : "text-dark-brown group-hover:text-gold"
        }`}
      >
        {benefit.title}
      </h3>

      {/* Description */}
      <p
        className={`text-sm md:text-base leading-relaxed ${
          variant === "dark" ? "text-white/70" : "text-dark-brown/70"
        }`}
      >
        {benefit.description}
      </p>
    </motion.div>
  );
}

// Compact variant for smaller sections
export function BenefitsListCompact({ items, variant = "default" }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((benefit, index) => {
        const Icon = benefit.icon ? iconMap[benefit.icon] || CheckCircle2 : CheckCircle2;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-4"
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                variant === "dark" ? "bg-gold/20" : "bg-gold/10"
              }`}
            >
              <Icon className="w-5 h-5 text-gold" />
            </div>
            <div className="flex-1">
              {benefit.title && (
                <h4
                  className={`font-heading font-bold mb-1 ${
                    variant === "dark" ? "text-white" : "text-dark-brown"
                  }`}
                >
                  {benefit.title}
                </h4>
              )}
              <p
                className={`text-sm leading-relaxed ${
                  variant === "dark" ? "text-white/70" : "text-dark-brown/70"
                }`}
              >
                {benefit.description || benefit}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
