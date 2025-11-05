"use client";

import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function TreatmentTestimonialsSection({ testimonials }) {
  return (
    <section className="py-32 bg-gradient-to-b from-cream to-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Patient Experiences
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-brown mb-6">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-dark-brown/10 hover:border-gold/30 hover:shadow-gold-lg transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-dark-brown/70 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-dark-brown/10">
                <p className="font-heading font-bold text-dark-brown">
                  {testimonial.name}
                </p>
                {testimonial.age && (
                  <p className="text-sm text-dark-brown/60">
                    Age {testimonial.age} • {testimonial.treatment}
                  </p>
                )}
                {testimonial.verified && (
                  <div className="flex items-center gap-1 mt-2 text-green-600 text-xs">
                    <Check className="w-3 h-3" />
                    <span>Verified Patient</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

