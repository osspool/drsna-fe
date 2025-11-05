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
    <section className={`py-32 ${variant === "dark" ? "bg-dark-brown" : "bg-cream"}`}>
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                FAQ
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 ${
                variant === "dark" ? "text-white" : "text-dark-brown"
              }`}
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-lg md:text-xl ${
                variant === "dark" ? "text-white/60" : "text-dark-brown/60"
              }`}
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
                variant={variant}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mt-16 text-center p-8 rounded-3xl border ${
              variant === "dark"
                ? "bg-white/5 border-white/10"
                : "bg-white border-dark-brown/10"
            }`}
          >
            <h3
              className={`text-2xl font-heading font-bold mb-3 ${
                variant === "dark" ? "text-white" : "text-dark-brown"
              }`}
            >
              Still have questions?
            </h3>
            <p
              className={`mb-6 ${
                variant === "dark" ? "text-white/60" : "text-dark-brown/60"
              }`}
            >
              Our expert team is here to help. Book a consultation or get in touch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center px-8 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-full transition-colors"
              >
                Book Consultation
              </a>
              <a
                href="/contact"
                className={`inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full transition-colors ${
                  variant === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-dark-brown/5 hover:bg-dark-brown/10 text-dark-brown border border-dark-brown/10"
                }`}
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

function FAQItem({ faq, index, isOpen, onToggle, variant }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 ${
        isOpen
          ? variant === "dark"
            ? "bg-white/10 border-gold/40 shadow-gold-lg"
            : "bg-white border-gold/40 shadow-gold-lg"
          : variant === "dark"
          ? "bg-white/5 border-white/10 hover:border-white/20"
          : "bg-white border-dark-brown/10 hover:border-dark-brown/20"
      }`}
    >
      {/* Question Button */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4"
      >
        <h3
          className={`text-lg md:text-xl font-heading font-bold ${
            variant === "dark" ? "text-white" : "text-dark-brown"
          } ${isOpen ? "text-gold" : ""} transition-colors`}
        >
          {faq.question}
        </h3>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-gold text-white rotate-180"
              : variant === "dark"
              ? "bg-white/10 text-white/60 group-hover:bg-white/20"
              : "bg-cream text-dark-brown/60 group-hover:bg-dark-brown/10"
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
              <div
                className={`text-lg leading-relaxed ${
                  variant === "dark" ? "text-white/70" : "text-dark-brown/70"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
