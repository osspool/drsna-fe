"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";

export function CandidacyBlock({ data }) {
  const { title, subtitle, suitable, notSuitable, note } = data;

  return (
    <Section background="muted-dark">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Suitable Candidates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 border-2 border-green-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Good Candidates
              </h3>
            </div>

            <ul className="space-y-3">
              {suitable?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Suitable */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 border-2 border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-foreground">
                Not Suitable If
              </h3>
            </div>

            <ul className="space-y-3">
              {notSuitable?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Note */}
        {note && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/10 rounded-2xl p-6 border border-primary/20 text-center"
          >
            <p className="text-foreground/80 font-medium">{note}</p>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

