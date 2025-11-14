"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { getIconComponent } from "@/lib/icon-utils";
import { cn } from "@/lib/utils";

const defaultData = {
  badge: "Global Recognition Award 2024",
  title: "Crowned London's Premier Aesthetic Medicine Clinic",
  description:
    "Our clinic was honoured with the Global Recognition Award™ 2024 for redefining luxury aesthetic medicine through uncompromising safety, artistry, and concierge-level care.",
  image: {
    src: "/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp",
    alt: "Dr SNA Clinic accepting the Global Recognition Award 2024",
  },
  highlights: [
    {
      icon: "award",
      title: "Only UK Winner",
      description: "Selected from hundreds of clinics worldwide for clinical excellence.",
    },
    {
      icon: "shield-check",
      title: "Unmatched Safety",
      description: "CQC registered, GMC-led protocols, and FDA/CE-approved treatments.",
    },
    {
      icon: "sparkles",
      title: "Signature Results",
      description: "Natural, confidence-building outcomes guided by Dr Syed Nadeem Abbas.",
    },
  ],
  cta: {
    text: "Discover the Award Journey",
    href: "/awards",
  },
};

export function AwardSpotlightSection({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        image: { ...defaultData.image, ...data.image },
        highlights: data.highlights?.length ? data.highlights : defaultData.highlights,
        cta: { ...defaultData.cta, ...data.cta },
      }
    : defaultData;

  const BadgeIcon = getIconComponent(sectionData.badgeIcon || "sparkles", Sparkles);

  return (
    <Section background="muted" padding="lg" className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-30 pointer-events-none bg-gradient-to-r from-primary/20 to-transparent" />
      <Container className="grid gap-10 lg:grid-cols-2 items-center relative">
        <div>
          {sectionData.badge && (
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary mb-5">
              <BadgeIcon className="w-4 h-4" />
              {sectionData.badge}
            </div>
          )}

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {sectionData.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {sectionData.description}
          </p>

          <div className="space-y-4">
            {sectionData.highlights.map((item, index) => {
              const Icon = getIconComponent(item.icon, Sparkles);
              return (
                <div
                  key={`${item.title}-${index}`}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-background/60 backdrop-blur"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {sectionData.cta?.href && (
            <Button asChild size="lg" className="mt-8">
              <Link href={sectionData.cta.href}>{sectionData.cta.text}</Link>
            </Button>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
          <div className="relative rounded-[32px] overflow-hidden border border-border shadow-2xl">
            <Image
              src={sectionData.image.src}
              alt={sectionData.image.alt}
              width={900}
              height={900}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
