/**
 * Contact Main Section
 *
 * Two-column layout with contact form and location/hours info.
 * Uses centralized animation primitives and lazy-loaded map component.
 *
 * @param {Object} props
 * @param {Object} props.data.form - Contact form configuration
 * @param {Array} props.data.businessHours - Business hours array
 */

import dynamic from "next/dynamic";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { MapSkeleton } from "@/components/common/skeletons";
import { SlideIn } from "@/components/common/AnimatedWrapper";
import { Clock } from "lucide-react";

// Lazy-load ContactMap component (below-the-fold)
const ContactMap = dynamic(() => import("@/components/contact/ContactMap"), {
  loading: () => <MapSkeleton />,
  ssr: true
});

export function ContactMainSection({ data }) {
  const { form, businessHours } = data;

  return (
    <section className="py-16 md:py-24 bg-muted">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <SlideIn direction="left">
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  {form.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {form.description}
                </p>
              </div>
              <ContactForm />
            </div>
          </SlideIn>

          {/* Location & Hours */}
          <SlideIn direction="right">
            <div className="space-y-8">
              {/* Map */}
              <ContactMap />

              {/* Business Hours */}
              <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Opening Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground font-medium">
                        {schedule.day}
                      </span>
                      <span className="font-semibold text-foreground">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> For emergencies or urgent consultations, please call us directly.
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </section>
  );
}
