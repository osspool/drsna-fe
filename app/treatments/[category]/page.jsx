import { notFound } from "next/navigation";
import { CategoryHero } from "@/components/treatments/CategoryHero";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { FAQSection } from "@/components/treatments/FAQSection";
import { CTASection } from "@/components/treatments/CTASection";
import { SubcategoryGrid } from "@/components/treatments/SubcategoryGrid";
import { BenefitsSection } from "@/components/treatments/BenefitsSection";
import { Container } from "@/components/layout/Container";
import { Sparkles, Star } from "lucide-react";
import * as Icons from "lucide-react";

// Import category data
import aestheticMedicineData from "@/data/aesthetic-medicine/category.json";
import intimateHealthData from "@/data/intimate-health/category.json";

const categoryDataMap = {
  "aesthetic-medicine": aestheticMedicineData,
  "intimate-health": intimateHealthData,
  // Add other categories as they're created
};

export async function generateStaticParams() {
  return [
    { category: "aesthetic-medicine" },
    { category: "intimate-health" },
    { category: "pain-management" },
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
        <BenefitsSection data={categoryData.benefits} />
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
    <section className="py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-brown mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-dark-brown/70 max-w-4xl mx-auto leading-relaxed">
            {data.content}
          </p>
        </div>

        {data.highlights && data.highlights.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {data.highlights.map((highlight, index) => {
              const iconName = highlight.icon?.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join('');
              const Icon = Icons[iconName] || Icons.Star;

              return (
                <div
                  key={index}
                  className="text-center p-8 bg-cream rounded-3xl hover:shadow-xl transition-shadow group"
                >
                  <div className="w-16 h-16 bg-gold-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-dark-brown mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-dark-brown/60 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-32 bg-linear-to-b from-cream to-white">
      <Container>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-gold/10 border border-gold/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold text-sm font-semibold tracking-wider uppercase">
              Patient Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark-brown mb-6">
            What Our Patients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-dark-brown/10 hover:border-gold/30 hover:shadow-xl transition-all"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-dark-brown/70 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author Info */}
              <div className="pt-6 border-t border-dark-brown/10">
                <p className="font-heading font-bold text-dark-brown">
                  {testimonial.name}
                </p>
                <p className="text-sm text-dark-brown/60">
                  {testimonial.treatment} • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
