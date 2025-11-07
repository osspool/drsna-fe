"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FAQSection({ data, variant = "default" }) {
  // Conditional rendering - return null if no FAQ data
  if (!data || !data.length || data.length === 0) return null;

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-muted">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Everything you need to know about our treatments
            </motion.p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {data.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center p-8 rounded-3xl bg-card border border-border"
          >
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Our expert team is here to help. Book a consultation or get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-colors shadow-lg"
              >
                Book Consultation
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full transition-colors bg-secondary hover:bg-secondary/80 text-foreground border border-border"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${
        isOpen
          ? "bg-card border-primary/40 shadow-2xl"
          : "bg-card border-border hover:border-primary/30"
      }`}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
      >
        <h3
          className={`text-lg md:text-xl font-heading font-bold transition-colors ${
            isOpen ? "text-primary" : "text-foreground"
          }`}
        >
          {faq.question}
        </h3>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground rotate-180"
              : "bg-secondary text-muted-foreground group-hover:bg-secondary/80"
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8">
              <div className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
