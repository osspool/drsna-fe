"use client";

import { Container } from "@/components/layout/Container";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/icon-utils";

/**
 * FAQ Section Component
 * Clean, accessible FAQ section using shadcn Accordion
 * Minimal animations for better UX performance
 *
 * @param {Array} data - FAQ items [{question, answer, icon?}]
 * @param {string} variant - 'default' | 'with-icons' | 'with-cta'
 * @param {string} title - Section title
 * @param {string} subtitle - Section subtitle
 * @param {string} badge - Badge text
 * @param {Object} cta - CTA configuration
 */
export function FAQSection({
  data,
  variant = "default",
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our treatments",
  badge = "FAQ",
  cta = null
}) {
  if (!data?.length) return null;

  const showIcons = variant === "with-icons";
  const showCTA = variant === "with-cta" || cta;

  const defaultCTA = {
    title: "Still have questions?",
    description: "Our expert team is here to help. Book a consultation or get in touch.",
    primaryButton: { text: "Book Consultation", href: "/booking" },
    secondaryButton: { text: "Contact Us", href: "/contact" }
  };

  const ctaConfig = cta || defaultCTA;

  return (
    <section className="py-24 md:py-32 bg-muted/60">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                {badge}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              {title}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* FAQ Accordion - Using shadcn Accordion for accessibility */}
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {data.map((faq, index) => {
              const Icon = showIcons ? getIconComponent(faq.icon) : null;

              return (
                <AccordionItem
                  key={faq.id || index}
                  value={`item-${index}`}
                  className={cn(
                    "border-2 rounded-2xl px-6 bg-card transition-all duration-200",
                    "data-[state=open]:border-primary/40 data-[state=open]:shadow-lg",
                    "data-[state=closed]:border-border hover:border-primary/30"
                  )}
                >
                  <AccordionTrigger className="hover:no-underline py-6 text-left [&[data-state=open]>div>h3]:text-primary">
                    <div className="flex items-start gap-4 flex-1 pr-4">
                      {/* Icon (optional) */}
                      {showIcons && Icon && (
                        <div className={cn(
                          "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200",
                          "bg-secondary group-data-[state=open]:bg-primary/10"
                        )}>
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      )}

                      {/* Question */}
                      <h3 className="font-heading font-bold text-lg md:text-xl text-foreground transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className={cn(
                    "text-base md:text-lg text-muted-foreground leading-relaxed pb-6",
                    showIcons && "ml-16"
                  )}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          {/* Contact CTA (optional) */}
          {showCTA && (
            <div className="mt-16 text-center p-8 rounded-3xl bg-card border border-border shadow-sm">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                {ctaConfig.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
                {ctaConfig.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={ctaConfig.primaryButton.href}
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-colors shadow-lg"
                >
                  {ctaConfig.primaryButton.text}
                </a>
                <a
                  href={ctaConfig.secondaryButton.href}
                  className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-full transition-colors bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                >
                  {ctaConfig.secondaryButton.text}
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
