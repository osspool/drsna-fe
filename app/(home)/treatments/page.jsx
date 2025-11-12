import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CategoryHero } from "@/components/treatments/CategoryHero";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { TreatmentsCategoryCard } from "@/components/treatments/TreatmentsCategoryCard";
import {
  AnimatedSectionHeader,
  AnimatedFeatureList,
  AnimatedContent
} from "@/components/treatments/TreatmentsAnimatedSection";
import {
  getCategories,
  getTreatmentsHeroData,
  getWhyChooseFeatures
} from "@/lib/categories";

/**
 * Treatments Page - Server Component
 * Uses Next.js 16 Server Components for optimal SEO and performance
 * Client-side animations extracted to separate components
 */
export default async function TreatmentsPage() {
  // Fetch data on the server with automatic caching ('use cache' in lib)
  const categories = await getCategories();
  const heroData = await getTreatmentsHeroData();
  const whyChooseFeatures = await getWhyChooseFeatures();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero data={heroData} variant="category" showStats={true} />

      {/* Categories Section */}
      <section id="categories" className="py-24 md:py-32 bg-linear-to-b from-secondary/30 to-background">
        <Container>
          {/* Section Header */}
          <AnimatedSectionHeader
            badge="Our Services"
            title="Choose Your Treatment Category"
            subtitle="Explore our comprehensive range of medical treatments, each delivered with expertise, care, and the highest safety standards"
          />

          {/* Category Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {categories.map((category, index) => (
              <TreatmentsCategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-card">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <AnimatedContent direction="left">
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

              <AnimatedFeatureList items={whyChooseFeatures} />

              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground mt-10 text-base md:text-lg px-8 py-6 font-semibold shadow-lg">
                <Link href="/dr-syed-nadeem-abbas">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </AnimatedContent>

            <AnimatedContent direction="right">
              <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                  alt="Dr. SNA Clinic"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
              </div>
            </AnimatedContent>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata() {
  return {
    title: "Medical Treatments | Aesthetic Medicine, Intimate Health & Pain Management | Dr. SNA Clinic",
    description: "Explore our comprehensive range of medical treatments including aesthetic medicine, intimate health solutions, and advanced pain management. Expert care in London.",
    keywords: "medical treatments, aesthetic medicine, intimate health, pain management, London clinic",
    openGraph: {
      title: "Premium Medical Treatments | Dr. SNA Clinic",
      description: "Transform your life with world-class aesthetic medicine, intimate health, and pain management solutions.",
      images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80"],
    },
  };
}
