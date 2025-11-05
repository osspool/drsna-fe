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
    <Section background="dark" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-gold/10 to-transparent" />
      <Glow className="opacity-70" variant="center" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-3">
            Safety & Trust
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white mb-5">
            {title}
          </h2>
          {content && (
            <p className="text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed">
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
                    variant="dark"
                    containerClassName="w-full rounded-[32px] border-white/10 bg-white/5"
                    className="rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 text-white flex flex-col items-center gap-4 p-8 min-h-[280px]"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 blur-2xl bg-gold/40 opacity-40" />
                      <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white">
                      {cert.name}
                    </h3>
                    <p className="text-white/65 text-sm leading-relaxed">
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
            className="rounded-[36px] p-10 md:p-12 border border-white/10 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-heading font-semibold text-white mb-8 text-center">
              Premium Products We Use
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-white/80 font-semibold"
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

