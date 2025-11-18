"use client";

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
    <Section background="default">
      <Container maxWidth="4xl">
        <h2
          className="opacity-0 animate-fade-in text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-center mb-12 sm:mb-16 text-foreground"
        >
          {heading}
        </h2>

        <div
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '100ms' }}
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {items?.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 bg-transparent"
              >
                <div className="bg-card border border-border rounded-xl px-4 sm:px-6 hover:border-primary/40 transition-colors duration-200">
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors py-4 sm:py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-sm sm:text-base pb-4 sm:pb-5">
                    {item.answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
}
