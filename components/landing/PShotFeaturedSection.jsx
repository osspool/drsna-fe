"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CometCard } from "@/components/aceternity/comet-card";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getIconComponent } from "@/lib/icon-utils";
import { FadeInUp, StaggerChildren } from "@/components/common/AnimatedWrapper";

const defaultData = {
  badge: "Featured Treatment",
  title: "The P-Shot",
  titleSuperscript: "®",
  titleAccent: "Revolutionary Male Enhancement",
  subtitle:
    "Advanced PRP therapy designed to enhance male sexual health and performance using your body's natural healing factors.",
  processTitle: "How It Works",
  processSubtitle: "A simple, safe, and effective three-step process",
  processSteps: [
    {
      step: "01",
      title: "Blood Collection",
      description:
        "A small blood sample is taken and processed to extract platelet-rich plasma containing growth factors",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
    },
    {
      step: "02",
      title: "PRP Preparation",
      description:
        "Your blood is centrifuged to concentrate the healing platelets and growth factors",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
    },
    {
      step: "03",
      title: "Precise Injection",
      description:
        "PRP is carefully injected to stimulate tissue regeneration and enhance blood flow",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80",
    },
  ],
  ctaButtons: [
    {
      text: "Learn More About P-Shot®",
      href: "/treatments/p-shot",
      icon: "arrow-right",
      variant: "primary",
    },
    {
      text: "Book Consultation",
      href: "/contact",
      icon: "heart",
      variant: "outline",
    },
  ],
  disclaimer: {
    icon: "shield",
    title: "Professional Medical Care",
    description:
      "All P-Shot® treatments at Dr SNA Clinic are performed by Dr Syed Nadeem Abbas, MSc (Distinction), with extensive training in aesthetic and regenerative medicine. Individual results may vary. A thorough consultation and medical assessment is required before treatment.",
  },
};

/**
 * P-Shot Featured Section Component
 *
 * Comprehensive featured section for P-Shot treatment.
 * Includes hero banner, process steps cards, CTA buttons, and medical disclaimer.
 *
 * @param {Object} [props.data] - Section data (uses defaults if not provided)
 * @param {string} [props.data.badge] - Badge text
 * @param {string} [props.data.title] - Main title
 * @param {string} [props.data.titleSuperscript] - Superscript text (e.g., ®)
 * @param {string} [props.data.titleAccent] - Accent subtitle in primary color
 * @param {string} [props.data.subtitle] - Description text
 * @param {string} [props.data.processTitle] - Process section title
 * @param {string} [props.data.processSubtitle] - Process section subtitle
 * @param {Array} [props.data.processSteps] - Array of process step objects
 * @param {Array} [props.data.ctaButtons] - Array of CTA button objects
 * @param {Object} [props.data.disclaimer] - Disclaimer object with icon, title, description
 */
export function PShotFeaturedSection({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        processSteps: data.processSteps || defaultData.processSteps,
        ctaButtons: data.ctaButtons || defaultData.ctaButtons,
        disclaimer: { ...defaultData.disclaimer, ...data.disclaimer },
      }
    : defaultData;

  const disclaimer = sectionData.disclaimer;
  const DisclaimerIcon = getIconComponent(disclaimer.icon, Shield);

  return (
    <div>
      <Section
        background="default"
        padding="none"
        className="relative overflow-hidden bg-royal-blue"
      >
        <div className="relative w-full py-12 md:py-16">
          <Container
            maxWidth="7xl"
            className="mx-auto flex w-full flex-col items-center gap-6 px-4 text-center"
          >
            <FadeInUp>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
                <Award className="h-4 w-4" />
                {sectionData.badge}
                <Sparkles className="h-4 w-4" />
              </div>
            </FadeInUp>

            <FadeInUp delay={100}>
              <h2 className="text-balance text-4xl font-heading font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                {sectionData.title}
                {sectionData.titleSuperscript && (
                  <sup className="align-super text-base md:text-lg">
                    {sectionData.titleSuperscript}
                  </sup>
                )}
                {sectionData.titleAccent && (
                  <span className="mt-2 block text-primary">
                    {sectionData.titleAccent}
                  </span>
                )}
              </h2>
            </FadeInUp>

            <FadeInUp delay={200}>
              <p className="max-w-3xl text-balance text-base text-white md:text-lg">
                {sectionData.subtitle}
              </p>
            </FadeInUp>
          </Container>
        </div>
      </Section>

      <Section padding="sm" className="muted-dark">
        <div className="w-full py-16 md:py-20">
          <Container maxWidth="5xl" className="relative">
            <div className="mb-16 md:mb-20">
              <FadeInUp>
                <div className="mb-8 text-center md:mb-10">
                  <h3 className="text-balance text-3xl font-heading font-semibold text-primary md:text-4xl">
                    {sectionData.processTitle}
                  </h3>
                  <p className="text-base text-foreground md:text-lg">
                    {sectionData.processSubtitle}
                  </p>
                </div>
              </FadeInUp>

              <StaggerChildren
                staggerDelay={100}
                animation="fadeInUp"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {sectionData.processSteps.map((process, index) => (
                  <div key={process.title + index} className="group">
                    <CometCard className="h-full">
                      <div className="gradient-border group-hover:gradient-border-hover rounded-2xl h-full transition-all duration-300">
                        <div className="gradient-border-inner rounded-[calc(1rem-4px)] flex flex-col">
                          <div className="relative h-44 overflow-hidden">
                            <Image
                              src={process.image}
                              alt={process.title}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="pointer-events-none absolute inset-0">
                              <div className="absolute inset-0 bg-black/35 dark:bg-background/35" />
                              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/55 to-black/15 dark:from-background/95 dark:via-background/55 dark:to-background/15" />
                            </div>

                            <div className="absolute top-4 left-4">
                              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center backdrop-blur-sm border-2 border-primary/50">
                                <span className="text-primary-foreground font-heading font-bold text-lg">
                                  {process.step}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 p-6">
                            <h4 className="text-lg font-heading font-semibold text-foreground md:text-xl">
                              {process.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {process.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CometCard>
                  </div>
                ))}
              </StaggerChildren>
            </div>

            <FadeInUp delay={200}>
              <div className="text-center">
                <div className="inline-flex flex-col items-center gap-4 sm:flex-row">
                  {sectionData.ctaButtons.map((cta, index) => {
                    const isPrimary = (cta.variant || "primary") === "primary";
                    const Icon = getIconComponent(
                      cta.icon,
                      isPrimary ? ArrowRight : Heart
                    );

                    return (
                      <Button
                        key={cta.text + index}
                        asChild
                        size="lg"
                        variant={isPrimary ? "default" : "outline"}
                        className="group relative overflow-hidden"
                      >
                        <Link href={cta.href} className="flex items-center gap-2">
                          {cta.text}
                          <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={300}>
              <div className="mt-12 md:mt-14">
                <div className="rounded-2xl border border-primary/20 glass-card p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <DisclaimerIcon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                    <div className="space-y-2">
                      <h4 className="text-lg font-heading font-semibold text-foreground">
                        {disclaimer.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {disclaimer.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </Container>
        </div>
      </Section>
    </div>
  );
}
