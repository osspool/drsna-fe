"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Zap } from "lucide-react";
import { CometCard } from "@/components/aceternity/comet-card";
import { HoverBorderGradient } from "@/components/aceternity/hover-border-gradient";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function FeaturedTreatments() {
  const categories = [
    {
      icon: Sparkles,
      title: "Aesthetic Medicine",
      description: "Advanced non-surgical treatments for facial rejuvenation",
      href: "/treatments/aesthetic-medicine",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      treatments: ["Dermal Fillers", "Anti-Wrinkle", "Lip Enhancement", "Skin Boosters"],
    },
    {
      icon: Heart,
      title: "Intimate Health",
      description: "Discreet professional wellness treatments",
      href: "/treatments/intimate-health",
      image: "/images/drsnaclinic/clinic-inside.jpg",
      treatments: ["P-Shot", "O-Shot", "Ultra Femme 360", "Regenerative Therapy"],
    },
    {
      icon: Zap,
      title: "Pain Management",
      description: "Regenerative treatments for chronic pain relief",
      href: "/treatments/pain-management",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
      treatments: ["PRP Therapy", "Joint Injections", "Stem Cell Treatment", "Physiotherapy"],
    },
  ];

  return (
    <Section padding="lg" className="bg-background">
      <Container maxWidth="7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-3">
            OUR SPECIALTIES
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
            Comprehensive Care
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From aesthetic enhancement to regenerative medicine, we offer world-class
            treatments tailored to your unique needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-fr gap-6 md:gap-8 items-stretch max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex h-full"
            >
              <CometCard 
                rotateDepth={8}
                translateDepth={10}
                className="w-full h-full"
              >
                <Link 
                  href={category.href}
                  className="block h-full w-full"
                >
                  <div className="group relative bg-card rounded-3xl overflow-hidden h-full w-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-500 border border-border">
                    {/* Image Section - Compact */}
                    <div className="relative w-full aspect-5/3 overflow-hidden bg-muted">
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      
                      {/* Clean icon badge */}
                      <div className="absolute top-5 left-5">
                        <div className="bg-card rounded-2xl p-2.5 shadow-sm border border-border/50">
                          <category.icon className="w-5 h-5 text-primary" strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Content Section - More compact */}
                    <div className="flex flex-col grow p-6">
                      {/* Title */}
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                        {category.description}
                      </p>

                      {/* Treatment List - Clean and compact */}
                      <ul className="space-y-2 mb-5">
                        {category.treatments.map((treatment, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-muted-foreground group/item"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary/50 mr-2.5 shrink-0 group-hover/item:bg-primary transition-colors duration-200" />
                            <span className="group-hover/item:text-foreground transition-colors duration-200">
                              {treatment}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA - Simple and clean */}
                      <div className="mt-auto pt-4 flex items-center justify-between group/cta">
                        <span className="text-primary font-semibold text-sm group-hover/cta:text-primary/80 transition-colors duration-200">
                          Explore Treatments
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary group-hover/cta:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CometCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA - Clean Apple-style button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-16 flex justify-center"
        >
          <HoverBorderGradient
            as={Link}
            href="/treatments"
            className="group inline-flex items-center gap-2.5 text-foreground font-medium px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md mx-auto"
          >
            <span>View All Treatments</span>
            <ArrowRight className="w-4 h-4" />
          </HoverBorderGradient>
        </motion.div>
      </Container>
    </Section>
  );
}
