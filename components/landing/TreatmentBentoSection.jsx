"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BentoGridShowcase } from "./bento-grid";
import { Section } from "../layout/Section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoCard = ({ children, className }) => {
  return (
    <div
      className={cn(
        "group gradient-border group-hover:gradient-border-hover rounded-3xl h-full",
        "hover:scale-[1.02] transition-all duration-300",
        className
      )}
    >
      <div className="gradient-border-inner rounded-[calc(1.5rem-4px)]">
        {children}
      </div>
    </div>
  );
};

const defaultData = {
  badge: {
    text: "Premium Treatments",
    icon: "sparkles",
  },
  title: "Our Signature Treatments",
  subtitle:
    "Experience cutting-edge aesthetic and regenerative medicine with our expert-led treatments",
  cards: {
    leftTop: {
      title: "PRP Hair Restoration",
      description: "Natural regrowth therapy",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
      icon: "sparkles",
      iconColor: "text-emerald-400",
    },
    leftMiddle: {
      title: "PRP Facial Rejuvenation",
      description: "Natural anti-aging treatment",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&h=400&fit=crop",
      icon: "sparkles",
      iconColor: "text-purple-400",
    },
    leftBottom: {
      title: "Shockwave Therapy",
      description: "ED & musculoskeletal treatment",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
      icon: "activity",
      iconColor: "text-blue-400",
    },
    middleTop: {
      title: "Dr Syed Nadeem Abbas",
      subtitle: "Consultant Aesthetic Physician",
      image: "/images/drsnaclinic/doctor-intro-2.png",
      icon: "award",
      iconColor: "text-primary",
      highlights: [
        { text: "CQC Registered" },
        { text: "GMC Certified" },
        { text: "10,000+ Patients" },
      ],
    },
    middleBottom: {
      title: "Ultra Femme 360",
      description: "Revolutionary laser therapy for feminine wellness",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=800&fit=crop",
      icon: "heart",
      iconColor: "text-amber-400",
      chips: [
        {
          text: "Vaginal rejuvenation",
          className: "bg-amber-500/20 text-white border border-amber-400/30",
        },
        {
          text: "FDA Approved",
          className: "bg-amber-500/20 text-white border border-amber-400/30",
        },
      ],
    },
    rightTop: {
      title: "P-Shot Treatment",
      description: "Revolutionary PRP therapy",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
      icon: "zap",
      iconColor: "text-rose-400",
    },
    rightMiddle: {
      title: "Dermal Fillers",
      description: "Natural facial enhancement",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
      icon: "sparkles",
      iconColor: "text-pink-400",
    },
    rightBottom: {
      title: "Anti-Wrinkle Treatments",
      description: "Smooth and refresh your skin",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
      icon: "sparkles",
      iconColor: "text-cyan-400",
    },
  },
  cta: {
    text: "Ready to transform your health and confidence?",
    button: {
      text: "Book Your Consultation",
      href: "/booking",
    },
  },
};

const ImageCard = ({ card, minHeight = 280 }) => {
  if (!card) return null;
  const imageSrc = card.image || "/images/drsnaclinic/doctor-hero.jpg";

  return (
    <BentoCard>
      <div className="relative h-full" style={{ minHeight }}>
        <Image
          src={imageSrc}
          alt={card.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-white">
            {card.title}
          </h3>
          {card.description && (
            <p className="text-sm text-white/90">
              {card.description}
            </p>
          )}

          {card.chips?.length ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {card.chips.map((chip, index) => (
                <span
                  key={`${chip.text}-${index}`}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full border border-white/20 text-white",
                    chip.className
                  )}
                >
                  {chip.text}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </BentoCard>
  );
};

const MainFeatureCard = ({ card }) => {
  if (!card) return null;
  const imageSrc = card.image || "/images/drsnaclinic/doctor-hero.jpg";

  return (
    <BentoCard>
      <div className="relative h-full" style={{ minHeight: card.minHeight || 320 }}>
        <Image
          src={imageSrc}
          alt={card.title}
          fill
          className="object-cover object-center md:object-center transition-transform duration-500 group-hover:scale-105"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-center text-center">
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-white">
            {card.title}
          </h3>
          {card.subtitle && (
            <p className="text-primary font-semibold text-base md:text-lg mb-4">
              {card.subtitle}
            </p>
          )}

          {card.highlights?.length ? (
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {card.highlights.map((highlight, index) => (
                <span
                  key={`${highlight.text || highlight}-${index}`}
                  className={cn(
                    "px-3 py-1.5 rounded-full bg-primary/20 text-white border border-primary/30",
                    highlight.className
                  )}
                >
                  {highlight.text || highlight}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </BentoCard>
  );
};

export const TreatmentBentoSection = ({ data }) => {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        badge: { ...defaultData.badge, ...data.badge },
        cards: { ...defaultData.cards, ...data.cards },
        cta: { ...defaultData.cta, ...data.cta },
      }
    : defaultData;

  const cards = { ...defaultData.cards, ...sectionData.cards };

  return (
    <Section padding="sm" className="relative bg-royal-blue/10">
      <div className="container mx-auto px-4 mb-14 md:mb-16 text-center">
        {sectionData.badge?.text && (
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            {sectionData.badge.text}
          </p>
        )}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
          {sectionData.title}
        </h2>
        {sectionData.subtitle && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {sectionData.subtitle}
          </p>
        )}
      </div>

      <div className="container mx-auto px-4">
        <BentoGridShowcase
          leftTop={<ImageCard card={cards.leftTop} />}
          leftMiddle={<ImageCard card={cards.leftMiddle} />}
          leftBottom={<ImageCard card={cards.leftBottom} />}
          middleTop={<MainFeatureCard card={cards.middleTop} />}
          middleBottom={<ImageCard card={cards.middleBottom} minHeight={340} />}
          rightTop={<ImageCard card={cards.rightTop} />}
          rightMiddle={<ImageCard card={cards.rightMiddle} />}
          rightBottom={<ImageCard card={cards.rightBottom} />}
        />
      </div>

      {(sectionData.cta?.text || sectionData.cta?.button) && (
        <div className="container mx-auto px-4 mt-12 text-center">
          {sectionData.cta?.text && (
            <p className="text-royal-blue font-bold mb-6">
              {sectionData.cta.text}
            </p>
          )}
          {sectionData.cta?.button?.text && sectionData.cta?.button?.href && (
            <Button asChild size="lg" className="rounded-full px-8 font-semibold">
              <Link href={sectionData.cta.button.href}>
                {sectionData.cta.button.text}
              </Link>
            </Button>
          )}
        </div>
      )}
    </Section>
  );
};
