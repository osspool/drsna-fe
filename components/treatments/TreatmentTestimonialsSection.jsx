"use client";

import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function TreatmentTestimonialsSection({ testimonials }) {
  return (
    <section className="py-32 bg-linear-to-b from-secondary to-background">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Patient Experiences
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
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
              className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-primary-lg transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-border">
                <p className="font-heading font-bold text-foreground">
                  {testimonial.name}
                </p>
                {testimonial.age && (
                  <p className="text-sm text-muted-foreground">
                    Age {testimonial.age} • {testimonial.treatment}
                  </p>
                )}
                {testimonial.verified && (
                  <div className="flex items-center gap-1 mt-2 text-primary text-xs">
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

