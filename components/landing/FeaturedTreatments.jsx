"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CometCard } from "@/components/aceternity/comet-card";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { getIconComponent } from "@/lib/icon-utils";

const defaultData = {
  badge: "OUR SPECIALTIES",
  title: "Comprehensive Care",
  subtitle:
    "From aesthetic enhancement to regenerative medicine, we offer world-class treatments tailored to your unique needs",
  categories: [
    {
      icon: "sparkles",
      title: "Aesthetic Medicine",
      description: "Advanced non-surgical treatments for facial rejuvenation",
      href: "/treatments/aesthetic-medicine",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      treatments: ["Dermal Fillers", "Anti-Wrinkle", "Lip Enhancement", "Skin Boosters"],
    },
    {
      icon: "heart",
      title: "Intimate Health",
      description: "Discreet professional wellness treatments",
      href: "/treatments/intimate-health",
      image: "/images/drsnaclinic/clinic-inside.jpg",
      treatments: ["P-Shot", "O-Shot", "Ultra Femme 360", "Regenerative Therapy"],
    },
    {
      icon: "zap",
      title: "Pain Management",
      description: "Regenerative treatments for chronic pain relief",
      href: "/treatments/pain-management",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
      treatments: ["PRP Therapy", "Joint Injections", "Stem Cell Treatment", "Physiotherapy"],
    },
  ],
  cta: {
    text: "View All Treatments",
    href: "/treatments",
  },
};

export function FeaturedTreatments({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        categories: data.categories || defaultData.categories,
        cta: { ...defaultData.cta, ...data.cta },
      }
    : defaultData;

  return (
    <Section padding="lg" className="bg-background">
     
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          {sectionData.badge && (
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
              {sectionData.badge}
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {sectionData.categories.map((category, index) => {
            const Icon = getIconComponent(category.icon, "sparkles");

            return (
              <motion.div
                key={category.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className="flex h-full"
              >
                <div className="hidden md:block w-full h-full group">
                  <CometCard rotateDepth={5} translateDepth={8} className="w-full h-full">
                    <Link href={category.href} className="block h-full w-full">
                      <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-300">
                        <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] flex flex-col shadow-sm">
                          <div className="relative w-full aspect-5/3 overflow-hidden bg-muted">
                            <Image
                              src={category.image}
                              alt={category.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              priority={index === 0}
                            />

                            <div className="absolute top-5 left-5">
                              <div className="bg-card rounded-2xl p-2.5 shadow-sm border border-border/50">
                                <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col grow p-6">
                            <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                              {category.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground mb-5 leading-relaxed">
                              {category.description}
                            </p>

                            <div className="mt-auto space-y-2">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Signature Treatments
                              </p>
                              <div className="flex flex-wrap gap-2" aria-label={`${category.title} treatments`}>
                                {category.treatments?.map((treatment) => (
                                  <span
                                    key={treatment}
                                    className="text-sm font-medium text-foreground/80 bg-secondary/40 rounded-full px-3 py-1"
                                  >
                                    {treatment}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CometCard>
                </div>
                <div className="md:hidden w-full h-full">
                  <Link href={category.href} className="block h-full w-full group">
                    <div className="gradient-border group-hover:gradient-border-hover rounded-3xl h-full w-full transition-all duration-300">
                      <div className="gradient-border-inner rounded-[calc(1.5rem-4px)] flex flex-col">
                        <div className="relative w-full aspect-video overflow-hidden bg-muted">
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <div className="bg-card rounded-2xl p-2 border border-border/50">
                              <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col grow p-5 gap-4">
                          <div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                              {category.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                          <div className="mt-auto space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                              Signature Treatments
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.treatments?.map((treatment) => (
                                <span
                                  key={treatment}
                                  className="text-xs font-medium text-foreground/80 bg-secondary/40 rounded-full px-3 py-1"
                                >
                                  {treatment}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-16 flex justify-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            <Link href={sectionData.cta.href} className="gap-2">
              {sectionData.cta.text}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
    </Section>
  );
}
