import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/heroes/treatments/CategoryHero";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { SubcategoryGrid } from "@/components/treatments/SubcategoryGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { IconFeatureCard } from "@/components/common/IconFeatureCard";
import TwoColumnTextFeaturesImage from "@/components/custom/ui/blocks/TwoColumnTextFeaturesImage";
import { Star } from "lucide-react";

// Import category data
import aestheticMedicineData from "@/data/aesthetic-medicine/category.json";
import intimateHealthData from "@/data/intimate-health/category.json";
import painManagementData from "@/data/pain-management/category.json";
import scientificEvidenceData from "@/data/scientific-evidence/category.json";

const categoryDataMap = {
  "aesthetic-medicine": aestheticMedicineData,
  "intimate-health": intimateHealthData,
  "pain-management": painManagementData,
  "scientific-evidence": scientificEvidenceData,
  // Add other categories as they're created
};

export async function generateStaticParams() {
  // Only pre-render top 2 most popular categories to limit server load
  // Other categories will be rendered on-demand with automatic caching
  return [
    { category: "aesthetic-medicine" },
    { category: "intimate-health" },
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const categoryData = categoryDataMap[resolvedParams.category];

  if (!categoryData) {
    return {
      title: "Treatment Not Found",
    };
  }

  return {
    title: categoryData.seo?.metaTitle || `${categoryData.title} | Dr. SNA Clinic`,
    description: categoryData.seo?.metaDescription || categoryData.description,
    keywords: categoryData.seo?.keywords?.join(", "),
    openGraph: {
      title: categoryData.seo?.metaTitle || categoryData.title,
      description: categoryData.seo?.metaDescription || categoryData.description,
      images: [categoryData.hero?.image],
    },
  };
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const categoryData = categoryDataMap[resolvedParams.category];

  if (!categoryData) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero data={categoryData} showStats={true} />

      {/* Featured Section - Two Column with Image */}
      {categoryData.featured && (
        <TwoColumnTextFeaturesImage data={categoryData.featured} />
      )}

      {/* Introduction Section */}
      {categoryData.introduction && (
        <IntroductionSection data={categoryData.introduction} />
      )}

      {/* Subcategories Grid */}
      <SubcategoryGrid
        subcategories={categoryData.subcategories}
        categoryId={resolvedParams.category}
      />

      {/* Benefits Section */}
      {categoryData.benefits && (
        <FeaturesSection data={categoryData.benefits} variant="compact" />
      )}

      {/* Process Timeline */}
      {categoryData.process && (
        <ProcessTimeline data={categoryData.process} variant="default" />
      )}

      {/* Testimonials */}
      {categoryData.testimonials && categoryData.testimonials.length > 0 && (
        <TestimonialsSection testimonials={categoryData.testimonials} />
      )}

      {/* FAQ Section */}
      <FAQSection data={categoryData.faq} variant="default" />

      {/* CTA Section */}
      <CTASection data={categoryData.cta} variant="default" />
    </main>
  );
}

// Introduction Section Component
function IntroductionSection({ data }) {
  return (
    <Section background="default" padding="xl">
      <Container>
        <SectionHeader
          title={data.title}
          titleClassName="text-foreground"
          subtitle={data.content}
          subtitleClassName="text-muted-foreground leading-relaxed"
          maxWidth={4}
        />

        {data.highlights && data.highlights.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {data.highlights.map((highlight, index) => (
              <IconFeatureCard
                key={index}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
                variant="bordered"
                iconBg="none"
                iconSize="lg"
                className="text-center bg-secondary rounded-3xl"
                iconClassName="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mx-auto group-hover:scale-110 transition-transform"
                animationDelay={index * 0.1}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

// Testimonials Section Component
function TestimonialsSection({ testimonials }) {
  return (
    <Section padding="xl" className="bg-gradient-to-b from-secondary to-background">
      <Container>
        <SectionHeader
          badge="Patient Stories"
          badgeIcon="star"
          title="What Our Patients Say"
          titleClassName="text-foreground"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-3xl border border-border hover:border-primary/30 hover:shadow-xl transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-border">
                <p className="font-heading font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.treatment} • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
