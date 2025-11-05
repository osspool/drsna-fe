"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQBlock({ data }) {
  const { heading, items } = data;

  return (
    <Section>
      <Container maxWidth="4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-gold"
        >
          {heading}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {items?.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-cream border border-gold-primary/20 rounded-lg px-6 hover:shadow-gold transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-dark-brown hover:text-gold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-dark-brown/80 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </Section>
  );
}
