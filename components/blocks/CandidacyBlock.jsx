"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function CandidacyBlock({ data }) {
  const { title, subtitle, suitable, notSuitable, note } = data;

  return (
    <Section background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-dark-brown/60 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Suitable Candidates */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-green-50 rounded-3xl p-8 border-2 border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-green-900">
                Good Candidates
              </h3>
            </div>

            <ul className="space-y-3">
              {suitable?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-green-900/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Suitable */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-red-50 rounded-3xl p-8 border-2 border-red-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-red-900">
                Not Suitable If
              </h3>
            </div>

            <ul className="space-y-3">
              {notSuitable?.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-red-900/90">{item}</span>
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
            className="bg-gold/10 rounded-2xl p-6 border border-gold/20 text-center"
          >
            <p className="text-dark-brown/80 font-medium">{note}</p>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

