import { PShotHero } from "@/components/heroes/specialty/PShotHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { DoctorCredentials } from "@/components/pshot/DoctorCredentials";
import { pshotLandingData } from "@/data/pshot/landing-data";
import { pshotSiteConfig } from "@/data/pshot/site-config";
import { clinicStructuredData } from "@/data/structured-data";

export const metadata = {
  title: "P-Shot Treatment London | Natural ED Solution | Dr SNA Clinic",
  description: pshotSiteConfig.description,
  keywords: pshotSiteConfig.keywords,
  openGraph: {
    title: "P-Shot Treatment London - World-Class P-Shot Specialist",
    description: "Experience the P-Shot with Dr Abbas, one of the UK's leading specialists. Over 1,000 procedures, 98% satisfaction rate.",
    images: [pshotSiteConfig.ogImage],
    type: "website",
  },
};

// Enhanced structured data for P-Shot specific page
const pshotStructuredData = {
  ...clinicStructuredData,
  "@type": "MedicalBusiness",
  name: pshotSiteConfig.name,
  medicalSpecialty: ["Sexual Health", "Regenerative Medicine", "Men's Health"],
  availableService: {
    "@type": "MedicalProcedure",
    name: "P-Shot (Priapus Shot)",
    alternateName: "Platelet-Rich Plasma Therapy for Men",
    description: "Non-surgical PRP treatment for erectile dysfunction, enhancement, and Peyronie's disease",
    procedureType: "Minimally invasive",
  },
};

export default function PShotLandingPage() {
  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pshotStructuredData) }}
      />

      <main>
        {/* Hero Section - Clean Image Background */}
        <PShotHero data={pshotLandingData.hero} />

        {/* Quick Stats - Immediate Impact */}
        <StatsSection
          data={pshotLandingData.stats}
          variant="highlight"
          title="P-Shot By The Numbers"
        />

        {/* Doctor Credentials - World-Class Expertise */}
        <DoctorCredentials data={pshotLandingData.doctorCredentials} />

        {/* Benefits Section */}
        <section id="benefits">
          <FeaturesSection
            data={{
              title: pshotLandingData.benefits.title,
              subtitle: pshotLandingData.benefits.subtitle,
              features: pshotLandingData.benefits.items.map(item => ({
                title: item.title,
                description: item.description,
                icon: item.icon,
              })),
            }}
            variant="cards"
            layout="grid-3"
            background="muted"
          />
        </section>

        {/* How It Works Process */}
        <ProcessTimeline
          data={{
            title: pshotLandingData.process.title,
            subtitle: pshotLandingData.process.subtitle,
            steps: pshotLandingData.process.steps.map(step => ({
              title: step.title,
              description: step.description,
              duration: step.duration,
            })),
          }}
          variant="detailed"
        />

        {/* Video Testimonials - Real Stories */}
        <TestimonialsSection
          variant="video"
          data={pshotLandingData.videoTestimonials}
          title="Real Patient Success Stories"
          subtitle="Hear from men who've transformed their lives with the P-Shot"
          background="muted"
        />

        {/* Text Testimonials - Additional Social Proof */}
        <TestimonialsSection
          variant="text"
          data={pshotLandingData.testimonials}
          title="What Our Patients Say"
          badge="Verified Reviews"
        />

        {/* Why Choose Dr Abbas - Final Conviction */}
        <FeaturesSection
          data={{
            title: pshotLandingData.whyChoose.title,
            subtitle: pshotLandingData.whyChoose.subtitle,
            features: pshotLandingData.whyChoose.features.map(feature => ({
              title: feature.title,
              description: feature.description,
              icon: feature.icon,
            })),
          }}
          variant="default"
          layout="grid-2"
          background="muted"
        />

        {/* FAQ Section - Address Concerns */}
        <FAQSection
          data={pshotLandingData.faq}
          variant="with-icons"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about the P-Shot treatment"
        />

        {/* Final CTA - Convert */}
        <CTASection
          data={pshotLandingData.cta}
          variant="default"
        />
      </main>
    </>
  );
}
