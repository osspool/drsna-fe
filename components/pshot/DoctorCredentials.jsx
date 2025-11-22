"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Award, GraduationCap, CheckCircle, Shield, ArrowRight } from "lucide-react";
import { generateStableKey } from "@/lib/utils";

export function DoctorCredentials({ data, background = "muted", padding = "xl" }) {
  return (
    <Section background={background} padding={padding} className="border-y border-primary/5">
      <Container>
        {/* Section Header */}
        <SectionHeader 
          badge={data.title}
          badgeVariant="primary"
          title={data.subtitle}
          subtitle={data.description}
          maxWidth={3}
          className="mb-16"
        />

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {data.achievements.map((achievement, index) => (
            <div
              key={generateStableKey(achievement, index, "doctor-achievement")}
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg group"
            >
              <div className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-3 group-hover:scale-105 transition-transform duration-300">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-[minmax(0,1fr),1.2fr] gap-12 lg:gap-16 xl:gap-20">
          {/* Doctor Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-4/3 lg:aspect-3/2 rounded-3xl overflow-hidden bg-linear-to-br from-primary/5 to-primary/10 border border-border shadow-2xl">
              <Image
                src={data.image}
                alt="Dr Syed Nadeem Abbas"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
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

          {/* Credentials Content */}
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
                    key={generateStableKey(qualification, index, "doctor-qualification")}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span className="text-foreground text-base leading-relaxed">{qualification}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div className="bg-linear-to-br from-primary/5 to-primary/10 rounded-2xl p-6 lg:p-8 border border-primary/20">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Award className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xl text-foreground mb-3">
                    Award-Winning Excellence
                  </h4>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4">
                    Recipient of the Global Recognition Award 2024 for Excellence in
                    Aesthetic & Regenerative Medicine.
                  </p>
                  
                  <Link 
                    href="/dr-syed-nadeem-abbas" 
                    className="inline-flex items-center text-primary font-semibold hover:underline group"
                  >
                    Why Dr Abbas is the safe choice
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
