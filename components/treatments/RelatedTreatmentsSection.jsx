"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function RelatedTreatmentsSection({ treatments, categoryId, subcategoryId }) {
  return (
    <section className="py-32 bg-card">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            You May Also Like
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Complementary treatments that work beautifully together
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={treatment.id}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/treatments/${categoryId}/${subcategoryId}/${treatment.id}`}>
                <div className="group h-full bg-card rounded-3xl p-8 border border-border hover:border-primary/30 hover:shadow-primary-lg transition-all duration-300">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {treatment.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm">
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                  {treatment.reason && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground/80 italic">
                        Why? {treatment.reason}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

