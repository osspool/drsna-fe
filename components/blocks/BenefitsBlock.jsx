"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function BenefitsBlock({ data }) {
  const { heading, layout = "grid-3", items } = data;

  const gridCols = {
    "grid-2": "md:grid-cols-2",
    "grid-3": "md:grid-cols-3",
    "grid-4": "md:grid-cols-4"
  };

  return (
    <Section background="cream">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary"
        >
          {heading}
        </motion.h2>

        <div className={`grid ${gridCols[layout]} gap-8`}>
          {items?.map((item, index) => {
            // Convert icon name to PascalCase and get icon component
            const iconName = item.icon?.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            const Icon = Icons[iconName] || Icons.Star;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex"
              >
                <div className="flex flex-col h-full w-full p-6 bg-card rounded-xl shadow-lg hover:shadow-primary-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shadow-primary group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-3 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
