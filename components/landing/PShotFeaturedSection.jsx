"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Shield,
  Sparkles,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CometCard } from "@/components/aceternity/comet-card";
import { WavyBackground } from "@/components/aceternity/wavy-background";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function PShotFeaturedSection() {
  return (
    <Section
      background="default"
      padding="none"
      className="relative overflow-hidden bg-gradient-to-b from-secondary via-secondary/90 to-background"
    >
      {/* Hero Section with Wavy Background */}
      <div className="relative w-full overflow-hidden">
        <WavyBackground
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center"
          containerClassName="!h-auto w-full py-12 md:py-16"
          colors={["var(--primary)", "var(--accent)", "var(--primary)", "var(--accent)", "var(--primary)"]}
          waveWidth={50}
          backgroundFill="var(--background)"
          blur={15}
          speed="slow"
          waveOpacity={0.7}
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur">
              <Award className="h-4 w-4" />
              Featured Treatment
              <Sparkles className="h-4 w-4" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-balance text-4xl font-heading font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            The P-Shot<sup className="align-super text-base md:text-lg">®</sup>
            <span className="mt-2 block text-primary">Revolutionary Male Enhancement</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-balance text-base text-muted-foreground md:text-lg"
          >
            Advanced PRP therapy designed to enhance male sexual health and performance
            using your body's natural healing factors.
          </motion.p>
        </WavyBackground>
      </div>

      {/* Main Content Section */}
      <div className="w-full py-16 md:py-20">
        <Container maxWidth="5xl" className="relative">
          {/* How It Works Section */}
          <div className="mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 text-center md:mb-10"
            >
              <h3 className="text-balance text-3xl font-heading font-semibold text-foreground md:text-4xl">
                How It Works
              </h3>
              <p className="text-base text-muted-foreground md:text-lg">
                A simple, safe, and effective three-step process
              </p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Blood Collection",
                  description:
                    "A small blood sample is taken and processed to extract platelet-rich plasma containing growth factors",
                  image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80",
                },
                {
                  step: "02",
                  title: "PRP Preparation",
                  description:
                    "Your blood is centrifuged to concentrate the healing platelets and growth factors",
                  image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80",
                },
                {
                  step: "03",
                  title: "Precise Injection",
                  description:
                    "PRP is carefully injected to stimulate tissue regeneration and enhance blood flow",
                  image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80",
                },
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CometCard className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/20 bg-card/50">
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={process.image}
                          alt={process.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="pointer-events-none absolute inset-0">
                          <div className="absolute inset-0 bg-black/35 dark:bg-background/35" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15 dark:from-background/95 dark:via-background/55 dark:to-background/15" />
                        </div>

                        {/* Step number */}
                        <div className="absolute top-4 left-4">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center backdrop-blur-sm border-2 border-primary/50">
                            <span className="text-primary-foreground font-heading font-bold text-lg">
                              {process.step}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-3 p-6">
                        <h4 className="text-lg font-heading font-semibold text-foreground md:text-xl">
                          {process.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </CometCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden btn-primary-gradient text-lg shadow-2xl hover:shadow-primary-lg"
              >
                <Link href="/treatments/p-shot" className="flex items-center gap-2">
                  Learn More About P-Shot®
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="group bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  Book Consultation
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Medical Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-14"
          >
            <div className="rounded-2xl border border-primary/20 glass-card p-6 md:p-8">
              <div className="flex items-start gap-4">
                <Shield className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div className="space-y-2">
                  <h4 className="text-lg font-heading font-semibold text-foreground">
                    Professional Medical Care
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    All P-Shot® treatments at Dr SNA Clinic are performed by Dr Syed
                    Nadeem Abbas, MSc (Distinction), with extensive training in aesthetic
                    and regenerative medicine. Individual results may vary. A thorough
                    consultation and medical assessment is required before treatment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
