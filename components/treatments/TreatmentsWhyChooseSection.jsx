"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  AnimatedFeatureList,
  AnimatedContent
} from "@/components/treatments/TreatmentsAnimatedSection";

/**
 * Treatments Why Choose Section
 *
 * Two-column layout with features list and image
 */
export function TreatmentsWhyChooseSection({ data }) {
  return (
    <Section padding="lg" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <AnimatedContent direction="left">
            <SectionHeader
              badge={data.badge}
              badgeIcon={data.badgeIcon}
              title={data.title}
              subtitle={data.subtitle}
              subtitleClassName="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed"
              align="left"
              spacing="md"
              animate={false}
            />

            <AnimatedFeatureList items={data.features} />

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground mt-10 text-base md:text-lg px-8 py-6 font-semibold shadow-lg"
            >
              <Link href={data.cta.href}>
                {data.cta.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </AnimatedContent>

          <AnimatedContent direction="right">
            <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={data.image.src}
                alt={data.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
            </div>
          </AnimatedContent>
        </div>
      </Container>
    </Section>
  );
}
