"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function OverviewBlock({ data }) {
  const { title, content, image, highlights } = data;

  return (
    <Section background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-6">
              {title}
            </h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base md:text-lg text-dark-brown/70 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-dark-brown/80 font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-gold-xl"
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </Container>
    </Section>
  );
}

