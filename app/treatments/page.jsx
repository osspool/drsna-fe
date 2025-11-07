"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CategoryHero } from "@/components/treatments/CategoryHero";
import { CTASection } from "@/components/treatments/CTASection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, HeartPulse, Activity } from "lucide-react";

const heroData = {
  title: "Premium Medical Treatments",
  tagline: "Expert Medical Care",
  hero: {
    headline: "Premium Medical Treatments",
    subheadline: "Transform your life with world-class aesthetic medicine, intimate health, and pain management solutions",
    stats: [
      { value: "45+", label: "Treatments Available" },
      { value: "15+", label: "Years Experience" },
      { value: "10K+", label: "Happy Patients" }
    ],
    cta: "Book Consultation"
  }
};

const categories = [
  {
    id: "aesthetic-medicine",
    title: "Aesthetic Medicine",
    shortTitle: "Aesthetics",
    description: "Advanced non-surgical treatments for facial rejuvenation, body contouring, and aesthetic enhancement",
    longDescription: "Transform your appearance with cutting-edge aesthetic treatments. From facial rejuvenation to body contouring, our expert practitioners deliver natural-looking results that enhance your confidence.",
    icon: Sparkles,
    color: "#cda55c",
    gradient: "from-gold-primary/20 to-gold-light/20",
    borderGradient: "from-gold-primary to-gold-light",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    treatmentCount: 25,
    subcategories: ["Face", "Body", "Skin", "Hair"],
    featured: true,
  },
  {
    id: "intimate-health",
    title: "Intimate Health",
    shortTitle: "Intimate Health",
    description: "Discreet, professional intimate wellness treatments for enhanced quality of life",
    longDescription: "Expert intimate health solutions delivered with sensitivity and professionalism. Restore confidence and improve your intimate wellness with our specialized treatments.",
    icon: HeartPulse,
    color: "#8b2635",
    gradient: "from-rose-900/20 to-rose-700/20",
    borderGradient: "from-rose-900 to-rose-700",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
    treatmentCount: 8,
    subcategories: ["Male", "Female"],
    featured: false,
  },
  {
    id: "pain-management",
    title: "Pain Management",
    shortTitle: "Pain Relief",
    description: "Regenerative treatments for chronic pain relief and enhanced mobility",
    longDescription: "Advanced regenerative therapies to treat chronic pain and joint conditions. Non-surgical solutions for lasting relief and improved quality of life.",
    icon: Activity,
    color: "#2d2620",
    gradient: "from-dark-brown/20 to-dark-brown/10",
    borderGradient: "from-dark-brown to-dark-brown/70",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    treatmentCount: 12,
    subcategories: ["Conditions", "Treatments"],
    featured: false,
  },
];

export default function TreatmentsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero data={heroData} variant="category" showStats={true} />

      {/* Categories Section */}
      <section id="categories" className="py-24 md:py-32 bg-linear-to-b from-secondary/30 to-background">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6"
            >
              Choose Your Treatment Category
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Explore our comprehensive range of medical treatments, each delivered with expertise, care, and the highest safety standards
            </motion.p>
          </div>

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-card">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                  Excellence in Care
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                Why Choose Dr. SNA Clinic?
              </h2>

              <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                We combine medical expertise, advanced technology, and personalized care to deliver exceptional results that transform lives.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Expert Practitioners",
                    description: "Led by Dr. Syed Nadeem Abbas with 15+ years of specialist experience",
                  },
                  {
                    title: "CQC Registered",
                    description: "Fully regulated clinic meeting the highest UK medical standards",
                  },
                  {
                    title: "Premium Products",
                    description: "FDA/CE approved treatments using only the finest medical-grade products",
                  },
                  {
                    title: "Natural Results",
                    description: "Subtle enhancements that celebrate your natural beauty and confidence",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-heading font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mt-10 text-base md:text-lg px-8 py-6 font-semibold shadow-lg">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                alt="Dr. SNA Clinic"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

function CategoryCard({ category, index }) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/treatments/${category.id}`}>
        <div className="group relative h-full rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-700">
          {/* Image */}
          <div className="relative h-72 md:h-80 overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/40 to-transparent" />

            {/* Floating Icon */}
            <div className="absolute top-6 md:top-8 right-6 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-card/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: category.color }} />
            </div>

            {/* Treatment Count Badge */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 px-3 md:px-4 py-1.5 md:py-2 bg-card/90 backdrop-blur-sm rounded-full">
              <span className="text-foreground font-semibold text-xs md:text-sm">
                {category.treatmentCount}+ Treatments
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors">
              {category.title}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed line-clamp-3">
              {category.description}
            </p>

            {/* Subcategories */}
            {category.subcategories && (
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {category.subcategories.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary text-muted-foreground text-xs md:text-sm rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm md:text-base">
              Explore {category.shortTitle}
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Gradient Border on Hover */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl`}
          />
        </div>
      </Link>
    </motion.div>
  );
}
