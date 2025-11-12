"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Award, GraduationCap, CheckCircle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DoctorCredentials({ data }) {
  return (
    <Section background="muted" padding="xl">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            {data.title}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
            {data.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Achievement Stats - Full Width on Large Screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {data.achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 lg:p-8 border border-border hover:border-primary/30 transition-all hover:shadow-lg"
            >
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-3">
                {achievement.metric}
              </div>
              <div className="font-semibold text-foreground text-base lg:text-lg mb-2">
                {achievement.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {achievement.description}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content - Better Space Utilization */}
        <div className="grid lg:grid-cols-[minmax(0,1fr),1.2fr] gap-12 lg:gap-16 xl:gap-20">
          {/* Doctor Image - Optimized Aspect Ratio */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-border shadow-2xl">
              <Image
                src={data.image}
                alt="Dr Syed Nadeem Abbas"
                fill
                className="object-cover"
                priority
              />
              {/* Certification Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/95 backdrop-blur-md rounded-2xl p-5 border border-primary/20 shadow-xl">
                  <div className="flex items-center gap-3 mb-1">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-heading font-bold text-base">Certified Provider</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Official P-Shot® certification by Dr. Charles Runels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Content - More Space */}
          <div className="space-y-8 lg:space-y-10 order-1 lg:order-2">
            {/* Qualifications */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                  Qualifications & Training
                </h3>
              </div>
              <div className="grid gap-3">
                {data.qualifications.map((qualification, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/30 transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground text-base leading-relaxed">{qualification}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:p-8 border border-primary/20">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-foreground mb-3">
                    Award-Winning Excellence
                  </h4>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Recipient of the Global Recognition Award 2024 for Excellence in
                    Aesthetic & Regenerative Medicine. Recognized internationally for
                    contributions to male intimate health treatments.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Trust Indicator */}
            <div className="flex items-center gap-4 p-6 rounded-xl bg-background border-2 border-primary/30">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">GMC Registered & CQC Approved</p>
                <p className="text-sm text-muted-foreground">
                  Fully regulated and compliant with UK medical standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
