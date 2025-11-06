import { notFound } from "next/navigation";
import Link from "next/link";
import { CategoryHero } from "@/components/treatments/CategoryHero";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { FAQSection } from "@/components/treatments/FAQSection";
import { CTASection } from "@/components/treatments/CTASection";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { BenefitsSection } from "@/components/treatments/BenefitsSection";
import { Container } from "@/components/layout/Container";
import { Sparkles, ArrowRight } from "lucide-react";
import { CometCard } from "@/components/aceternity/comet-card";

import faceData from "@/data/aesthetic-medicine/face/subcategory.json";
import categoriesData from "@/data/categories.json";
import maleData from "@/data/intimate-health/male/subcategory.json";
import femaleData from "@/data/intimate-health/female/subcategory.json";

const subcategoryDataMap = {
  "aesthetic-medicine": {
    face: faceData,
  },
  "intimate-health": {
    "male": maleData,
    "female": femaleData,
  },
};

// Helper function to get category name
const getCategoryName = (categoryId) => {
  return categoriesData.categories?.[categoryId]?.title || "Treatments";
};

export async function generateStaticParams() {
  return [
    { category: "aesthetic-medicine", subcategory: "face" },
    { category: "aesthetic-medicine", subcategory: "body" },
    { category: "aesthetic-medicine", subcategory: "skin" },
    { category: "aesthetic-medicine", subcategory: "hair" },
  ];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const subcategoryData = subcategoryDataMap[resolvedParams.category]?.[resolvedParams.subcategory];

  if (!subcategoryData) {
    return { title: "Treatment Not Found" };
  }

  return {
    title: subcategoryData.seo?.metaTitle || `${subcategoryData.title} | Dr. SNA Clinic`,
    description: subcategoryData.seo?.metaDescription || subcategoryData.description,
    keywords: subcategoryData.seo?.keywords?.join(", "),
    openGraph: {
      title: subcategoryData.seo?.metaTitle || subcategoryData.title,
      description: subcategoryData.seo?.metaDescription || subcategoryData.description,
      images: [subcategoryData.hero?.backgroundImage],
    },
  };
}

export default async function SubcategoryPage({ params }) {
  const resolvedParams = await params;
  const subcategoryData = subcategoryDataMap[resolvedParams.category]?.[resolvedParams.subcategory];

  if (!subcategoryData) {
    notFound();
  }

  const treatmentsArray = subcategoryData.treatments
    ? Object.entries(subcategoryData.treatments).map(([id, treatment]) => ({ ...treatment, id }))
    : [];

  const featuredTreatments = treatmentsArray.filter((t) => t.featured);

  return (
    <main className="min-h-screen">
      <CategoryHero 
        data={subcategoryData}
        variant="subcategory"
        breadcrumb={{
          categoryId: resolvedParams.category,
          categoryName: getCategoryName(resolvedParams.category)
        }}
      />

      {subcategoryData.introduction && (
        <IntroSection data={subcategoryData.introduction} title={subcategoryData.title} />
      )}

      {/* Featured Banner - Only if we have featured treatments */}
      {featuredTreatments.length > 0 && (
        <FeaturedBanner
          treatments={featuredTreatments}
          categoryId={resolvedParams.category}
          subcategoryId={resolvedParams.subcategory}
        />
      )}

      <AllTreatmentsSection
        treatments={treatmentsArray}
        categoryId={resolvedParams.category}
        subcategoryId={resolvedParams.subcategory}
        title={subcategoryData.title}
      />

      {subcategoryData.benefits && <BenefitsSection data={subcategoryData.benefits} />}
      {subcategoryData.process && <ProcessTimeline data={subcategoryData.process} variant="vertical" />}
      <FAQSection data={subcategoryData.faq} variant="default" />
      <CTASection data={subcategoryData.cta} variant="default" />
    </main>
  );
}

function IntroSection({ data, title }) {
  return (
    <section className="py-32 bg-background">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Our Approach</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">{data.title}</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{data.content}</p>
            {data.highlights && (
              <div className="space-y-3">
                {data.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <img src={data.image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// Featured Banner - Minimal luxury showcase for featured treatments
function FeaturedBanner({ treatments, categoryId, subcategoryId }) {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <Container>
        <div className="flex items-center gap-3 mb-12">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-heading font-bold text-foreground">Most Popular Treatments</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.slice(0, 3).map((treatment, index) => (
            <CometCard key={treatment.id}>
              <Link 
                href={`/treatments/${categoryId}/${subcategoryId}/${treatment.id}`}
                className="block group"
              >
                <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full">
                  {/* Popular Badge */}
                  <div className="absolute -top-3 right-6">
                    <span className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-lg uppercase tracking-wider">
                      Popular
                    </span>
                  </div>

                  {/* Treatment Title */}
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {treatment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2 min-h-[40px]">
                    {treatment.shortDescription}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    {treatment.price && (
                      <span className="text-primary font-heading font-bold text-xl">
                        {treatment.price}
                      </span>
                    )}
                    <span className="text-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </CometCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function AllTreatmentsSection({ treatments, categoryId, subcategoryId, title }) {
  return (
    <section id="all-treatments" className="py-24 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            All {title} Treatments
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our complete range of {title.toLowerCase()} treatments
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <TreatmentCard
              key={treatment.id}
              treatment={treatment}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
