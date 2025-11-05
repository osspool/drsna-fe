"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function RelatedTreatmentsSection({ treatments, categoryId, subcategoryId }) {
  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-brown mb-4">
            You May Also Like
          </h2>
          <p className="text-lg text-dark-brown/60 max-w-3xl mx-auto">
            Complementary treatments that work beautifully together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/treatments/${categoryId}/${subcategoryId}/${treatment.id}`}>
                <div className="group h-full bg-white rounded-3xl p-8 border border-dark-brown/10 hover:border-gold/30 hover:shadow-gold-lg transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-dark-brown mb-3 group-hover:text-gold transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-dark-brown/70 mb-4 leading-relaxed">
                    {treatment.description}
                  </p>
                  <div className="flex items-center text-gold font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                  {treatment.reason && (
                    <div className="mt-4 pt-4 border-t border-dark-brown/10">
                      <p className="text-sm text-dark-brown/50 italic">
                        Why? {treatment.reason}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

