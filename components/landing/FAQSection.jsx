"use client";

import { motion } from "framer-motion";
import { Plus, Minus, Shield, Award, Clock, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    id: 1,
    icon: Award,
    question: "What sets Dr SNA Clinic apart from other beauty clinics?",
    answer: "Dr SNA Clinic stands out through our unique combination of medical excellence and artistic precision. Led by Dr Syed Nadeem Abbas, who holds a Master's degree in Aesthetic Plastic Surgery with Distinction, we're CQC registered and GMC certified. Our clinic uses state-of-the-art equipment, FDA-approved products, and evidence-based techniques. We've treated over 10,000 happy patients with a 98% satisfaction rate.",
  },
  {
    id: 2,
    icon: Shield,
    question: "Are aesthetic treatments at Dr SNA Clinic safe?",
    answer: "Safety is our absolute priority. All treatments are performed by GMC-certified doctors with extensive training in aesthetic medicine. We're fully CQC registered and follow strict medical protocols. We use only FDA and CE-approved products from premium brands like Juvederm, Restylane, and Botox. Every patient undergoes a thorough medical consultation and assessment before treatment.",
  },
  {
    id: 3,
    icon: CheckCircle2,
    question: "Will my treatment look natural or will people notice?",
    answer: "Natural-looking results are our signature. We follow the philosophy of 'enhanced, not changed' – you'll look like the best, most refreshed version of yourself. Our advanced techniques like the MD Codes™ method focus on restoring facial balance and harmony rather than creating an 'overdone' appearance. People will notice you look great, rested, and radiant.",
  },
  {
    id: 4,
    icon: Clock,
    question: "How long do results last and when will I see them?",
    answer: "Results vary by treatment type. Anti-wrinkle injections typically show results within 3-7 days, lasting 3-4 months initially. Dermal fillers show immediate results that continue improving over 2-4 weeks, lasting 6-18 months. PRP therapy results appear gradually over 3-6 months as collagen regenerates, lasting 12-18 months. We provide a personalized timeline during your consultation.",
  },
  {
    id: 5,
    icon: Heart,
    question: "How do I book a consultation and what can I expect?",
    answer: "Booking is simple – click 'Book Consultation' on our website, call us at 020 7123 4567, or WhatsApp +44 7955 836 986. Your initial consultation (£50, redeemable against treatment) lasts 30-45 minutes. Dr Abbas will discuss your concerns, assess your facial anatomy, and explain suitable treatment options. You'll receive a personalized treatment plan with transparent pricing and no hidden fees.",
  },
];

function FAQItem({ faq, isOpen, onToggle, index }) {
  const Icon = faq.icon;
  const answerId = `faq-answer-${faq.id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={onToggle}
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        className={cn(
          "w-full text-left p-4 sm:p-6 md:p-8 rounded-2xl transition-all duration-300",
          "border-2 bg-card shadow-lg",
          isOpen
            ? "border-primary shadow-primary-lg"
            : "border-transparent hover:border-primary/50 hover:shadow-primary"
        )}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Icon */}
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isOpen
                ? "bg-gradient-to-br from-primary to-primary/80 shadow-primary"
                : "bg-secondary text-primary group-hover:bg-primary/10"
            )}
          >
            <Icon
              className={cn(
                "w-5 h-5 sm:w-6 sm:h-6",
                isOpen ? "text-primary-foreground" : "text-primary"
              )}
            />
          </div>

          {/* Question */}
          <div className="flex-1">
            <h3
              className={cn(
                "font-heading font-bold text-base sm:text-lg md:text-xl transition-colors duration-300",
                isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
              )}
            >
              {faq.question}
            </h3>
          </div>

          {/* Toggle Icon */}
          <div
            className={cn(
              "flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300",
              isOpen
                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rotate-180 shadow-primary"
                : "bg-secondary text-primary group-hover:bg-primary/10"
            )}
          >
            {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
        </div>

        {/* Answer */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
          id={answerId}
        >
          <p className="text-muted-foreground leading-relaxed mt-4 sm:mt-5 md:mt-6 sm:ml-16 sm:pr-14 text-sm sm:text-base md:text-lg">
            {faq.answer}
          </p>
        </motion.div>
      </button>
    </motion.div>
  );
}

export function FAQSection() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden bg-secondary">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)_/_0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)_/_0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 max-w-3xl mx-auto"
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 px-5 py-2.5 rounded-full mb-5 md:mb-6 shadow-primary"
        >
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-primary-foreground font-bold text-xs tracking-wider uppercase">
            Frequently Asked Questions
          </span>
        </motion.div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6">
            Everything You Need to Know
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Get answers to the most common questions about our treatments, safety protocols, and what makes Dr SNA Clinic London's trusted choice for aesthetic excellence.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-block p-6 sm:p-8 md:p-10 rounded-3xl bg-card border-2 border-primary shadow-primary-lg">
            <p className="text-foreground text-base sm:text-lg md:text-xl font-semibold mb-4 md:mb-6">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="inline-flex items-center justify-center gap-2 btn-primary-gradient font-bold px-8 py-4 rounded-xl shadow-primary-lg hover:shadow-primary hover:scale-105 transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                Book Free Consultation
              </a>
              <a
                href="tel:02071234567"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-primary border-2 border-primary font-bold px-8 py-4 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Clock className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </section>
  );
}

