"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Glow from "@/components/custom/ui/glow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";

export function SafetyBlock({ data }) {
  const { title, content, certifications, products } = data;

  return (
    <Section background="default" className="relative overflow-hidden py-20">
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/10 to-transparent" />
      <Glow className="opacity-70" variant="center" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">
            Safety & Trust
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-5">
            {title}
          </h2>
          {content && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {content}
            </p>
          )}
        </motion.div>

        {/* Certifications Grid */}
        {certifications && certifications.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certifications.map((cert, index) => {
              const iconName = cert.icon?.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join('');
              const Icon = Icons[iconName] || Icons.ShieldCheck;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex"
                >
                  <HoverBorderGradient
                    as="div"
                    containerClassName="w-full rounded-[32px]"
                    className="rounded-[28px] flex flex-col items-center gap-4 p-8 min-h-[280px]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl bg-primary/40 opacity-40" />
                      <div className="relative w-16 h-16 rounded-2xl bg-card/10 border border-border flex items-center justify-center">
                        <Icon className="w-8 h-8 text-foreground" />
                      </div>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {cert.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {cert.description}
                    </p>
                  </HoverBorderGradient>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Premium Products */}
        {products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[36px] p-10 md:p-12 border border-border bg-linear-to-r from-card/10 to-card/5 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-heading font-semibold text-foreground mb-8 text-center">
              Premium Products We Use
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-card/10 rounded-full border border-border text-foreground/80 font-semibold"
                >
                  {product}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

