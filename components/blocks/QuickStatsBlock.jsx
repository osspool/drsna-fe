"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProgressiveBlur } from "@/components/custom/ui/progressive-blur";
import { GlowingEffect } from "@/components/aceternity/glowing-effect";
import { Pill } from "@/components/custom/ui/pill";
import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";

const STAT_CONFIG = {
  duration: { label: "Duration" },
  anesthesia: { label: "Anesthesia" },
  downtime: { label: "Downtime" },
  resultsVisible: { label: "Results Visible" },
  resultsLast: { label: "Results Last" },
  painLevel: { label: "Pain Level" },
  price: { label: "Price" },
  sessions: { label: "Recommended Sessions" },
};

export function QuickStatsBlock({ data }) {
  const stats = Object.entries(STAT_CONFIG)
    .map(([key, meta]) =>
      data?.[key]
        ? {
            ...meta,
            value: data[key],
          }
        : null
    )
    .filter(Boolean);

  if (!stats.length) {
    return null;
  }

  return (
    <Section
      background="default"
      padding="default"
      ripple={false}
      className="relative overflow-hidden py-16! sm:py-24! bg-linear-to-b from-background via-secondary/50 to-secondary"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[-10%] h-80 w-80 rounded-full bg-accent/30 blur-[160px]" />
        <ProgressiveBlur direction="top" blurLayers={10} blurIntensity={0.32} className="absolute inset-0" />
      </div>

      <Container className="relative">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <p className="text-[0.65rem] uppercase tracking-[0.4em] text-muted-foreground">
            Treatment At A Glance
          </p>
          <h2 className="text-[2.6rem] leading-tight font-heading text-primary md:text-[2.9rem]">
            Quick Treatment Facts
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know before booking—timelines, comfort level, and investment for the treatment.
          </p>
        </div>

        <div className="relative">
          <GlowingEffect
            blur={45}
            spread={60}
            proximity={160}
            borderWidth={2}
            disabled={false}
            className="opacity-50"
          />

          <div className="relative grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.04, duration: 0.4, type: "spring", stiffness: 220, damping: 20 }}
                className="h-full"
              >
                <HoverBorderGradient
                  as="div"
                  variant="light"
                  containerClassName="!w-full !h-full !rounded-[30px] border-transparent !bg-transparent"
                  className="w-full h-full rounded-[26px] !bg-card/95 !text-foreground flex flex-col gap-4 px-6 py-5 shadow-[0_30px_65px_-55px_rgba(15,23,42,0.65)] transition-all duration-300 hover:shadow-[0_25px_60px_-35px_rgba(15,23,42,0.55)]"
                >
                  <div className="flex items-center justify-between">
                    <Pill
                      variant="outline"
                      className="uppercase tracking-[0.35em] text-[0.58rem] border-transparent bg-primary/10 text-primary px-4 py-1"
                    >
                      {stat.label}
                    </Pill>
                    <span className="block h-1.5 w-1.5 rounded-full bg-primary" />
                  </div>

                  <p className="text-[1.25rem] sm:text-[1.35rem] font-semibold text-foreground leading-tight mt-auto">
                    {stat.value}
                  </p>
                </HoverBorderGradient>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

