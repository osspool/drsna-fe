"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateStableKey } from "@/lib/utils";
import { getSectionHeaderProps } from "@/lib/section-presets";

export function FAQBlock({ data, id, background = "default", padding = "lg", preset = "faq" }) {
  const headerProps = getSectionHeaderProps(data, preset);
  // Support various data shapes
  const questions = data.questions || data.items || (Array.isArray(data) ? data : []);

  if (!Array.isArray(questions) || questions.length === 0) return null;

  return (
    <Section id={id} background={background} padding={padding}>
      <Container maxWidth="md">
        <SectionHeader {...headerProps} />

        <Accordion type="single" collapsible className="w-full space-y-4">
          {questions.map((item, index) => {
            const itemKey = generateStableKey(item.question || item.name || index, index, "faq-item");
            const questionText = item.question || item.name;
            const answerText = item.answer || item.text || (item.acceptedAnswer && item.acceptedAnswer.text);

            return (
              <AccordionItem 
                key={itemKey} 
                value={itemKey}
                className="bg-card border border-border rounded-xl px-6 transition-all duration-200 hover:border-primary/40"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-6 hover:text-primary hover:no-underline text-foreground">
                  {questionText}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {answerText}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Container>
    </Section>
  );
}
