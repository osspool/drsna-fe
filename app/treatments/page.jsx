"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Spotlight } from "@/components/aceternity/spotlight";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { ArrowRight, Sparkles, HeartPulse, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1a1814]">
        <Spotlight className="-top-40 left-0 md:left-60" fill="#cda55c" />
        <BackgroundBeams />

        <Container className="relative z-10 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 backdrop-blur-sm border border-gold/30 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold-light text-sm font-semibold tracking-wider uppercase">
                Expert Medical Care
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-8 leading-tight"
            >
              Premium Medical
              <span className="block text-gold mt-4">Treatments</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto mb-12 font-light leading-relaxed"
            >
              Transform your life with world-class aesthetic medicine, intimate health, and pain management solutions
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-12 mb-12"
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading font-bold text-gold mb-2">
                  45+
                </div>
                <div className="text-white/60 text-sm md:text-base tracking-wide">
                  Treatments Available
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading font-bold text-gold mb-2">
                  15+
                </div>
                <div className="text-white/60 text-sm md:text-base tracking-wide">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-heading font-bold text-gold mb-2">
                  10K+
                </div>
                <div className="text-white/60 text-sm md:text-base tracking-wide">
                  Happy Patients
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                asChild
                size="lg"
                className="btn-gold text-xl px-12 py-8 group"
              >
                <Link href="#categories">
                  Explore Treatments
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-32 bg-gradient-to-b from-cream to-white">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-dark-brown mb-6"
            >
              Choose Your Treatment Category
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-dark-brown/60 max-w-3xl mx-auto"
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
      <section className="py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                  Excellence in Care
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-heading font-bold text-dark-brown mb-6">
                Why Choose Dr. SNA Clinic?
              </h2>

              <p className="text-xl text-dark-brown/70 mb-8 leading-relaxed">
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
                    <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-gold rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-dark-brown mb-2">
                        {item.title}
                      </h3>
                      <p className="text-dark-brown/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button asChild size="lg" className="btn-gold mt-10 text-lg px-8 py-6">
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
              className="relative h-[600px] rounded-3xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                alt="Dr. SNA Clinic"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/60 to-transparent" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-[#1a1814] via-[#2d2620] to-[#1a1814]">
        <BackgroundBeams />
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto font-light">
              Book a consultation with our expert team and discover your personalized treatment plan
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-gold text-xl px-12 py-8 group">
                <Link href="/booking">
                  Book Consultation
                  <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 text-xl px-12 py-8 backdrop-blur-sm"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
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
        <div className="group relative h-full rounded-3xl overflow-hidden bg-white border-2 border-dark-brown/10 hover:border-transparent hover:shadow-2xl transition-all duration-700">
          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-dark-brown/40 to-transparent" />

            {/* Floating Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Icon className="w-8 h-8" style={{ color: category.color }} />
            </div>

            {/* Treatment Count Badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
              <span className="text-dark-brown font-semibold text-sm">
                {category.treatmentCount}+ Treatments
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h3 className="text-3xl font-heading font-bold text-dark-brown mb-4 group-hover:text-gold transition-colors">
              {category.title}
            </h3>

            <p className="text-dark-brown/70 mb-6 leading-relaxed line-clamp-3">
              {category.description}
            </p>

            {/* Subcategories */}
            {category.subcategories && (
              <div className="flex flex-wrap gap-2 mb-6">
                {category.subcategories.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-cream text-dark-brown/70 text-sm rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-gold font-semibold">
              Explore {category.shortTitle}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Gradient Border on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl`}
          />
        </div>
      </Link>
    </motion.div>
  );
}
