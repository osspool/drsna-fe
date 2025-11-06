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
        variant === "dark" ? "bg-secondary" : "bg-background"
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
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 ring-1 ring-primary/15 rounded-full mb-4"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-primary text-xs md:text-sm font-semibold tracking-wider uppercase">
                {data.subtitle}
              </span>
            </motion.div>
          )}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-heading font-bold tracking-tight leading-tight mb-4 text-foreground"
          >
            {data.title || "Why Choose Us"}
          </motion.h2>

          {data.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg max-w-3xl mx-auto text-muted-foreground"
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
      className="group relative p-6 md:p-7 rounded-2xl border bg-card border-border hover:border-primary/30 hover:shadow-md transition-colors duration-200"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 bg-primary/10 group-hover:bg-primary/20">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-heading font-bold mb-2 transition-colors text-foreground group-hover:text-primary">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
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
            <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              {benefit.title && (
                <h4 className="font-heading font-bold mb-1 text-foreground">
                  {benefit.title}
                </h4>
              )}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description || benefit}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
