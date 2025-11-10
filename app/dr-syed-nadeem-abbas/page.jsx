import { Header } from "@/components/core/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/core/Footer";
import { drAbbasData } from "@/data/dr-abbas";

export const metadata = {
  title: "Dr Syed Nadeem Abbas | Award-Winning Aesthetic Medicine Specialist London",
  description: "Meet Dr Syed Nadeem Abbas (MSc, MRCGP, MRCSEd, MBBS), London's most distinguished aesthetic medicine specialist. 15+ years experience, 10,000+ happy patients, globally recognized excellence.",
  keywords: "Dr Syed Nadeem Abbas, aesthetic doctor London, Dr SNA, best aesthetic practitioner UK, facial rejuvenation specialist, intimate health expert London, award-winning cosmetic doctor",
  openGraph: {
    title: "Dr Syed Nadeem Abbas | Leading Aesthetic Medicine Specialist",
    description: "Award-winning aesthetic medicine specialist with 15+ years experience transforming lives through excellence, precision, and artistry.",
    images: ["/images/drsnaclinic/doctor-hero.jpg"],
    type: "profile",
  },
};

export default function DrAbbasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          videoUrl="https://www.youtube.com/watch?v=nUqENQZHd80"
          badge="GLOBAL RECOGNITION AWARD 2024"
          headline="Dr Syed Nadeem Abbas"
          flipWords={["Excellence", "Precision", "Artistry", "Compassion"]}
          subheadline='Transforming lives through <span class="text-primary font-semibold">surgical precision</span>, <span class="text-primary font-semibold">artistic vision</span>, and <span class="text-primary font-semibold">15+ years mastery</span>'
          primaryCTA="Book Your Consultation"
          primaryCTAHref="/booking"
          secondaryCTA="Explore Treatments"
          secondaryCTAHref="/treatments"
          trustIndicators={[
            "MSc (Distinction)",
            "MRCGP | MRCSEd | MBBS",
            "15+ Years Experience",
            "10,000+ Happy Patients"
          ]}
        />

        {/* Quick Stats */}
        <StatsSection data={drAbbasData.quickStats} variant="cards" />

        {/* Overview/Biography */}
        <OverviewBlock data={drAbbasData.overview} />

        {/* Why Choose Dr Abbas */}
        <FeaturesSection data={drAbbasData.whyChooseDrSNA} variant="cards" />

        {/* Gallery */}
        <GalleryBlock data={drAbbasData.gallery} />

        {/* Patient Testimonials */}
        <TestimonialsSection data={drAbbasData.testimonials} variant="text" />

        {/* FAQ Section */}
        <FAQSection
          data={drAbbasData.faq}
          title="Frequently Asked Questions"
        />

        {/* CTA Section */}
        <CTASection data={drAbbasData.cta} />
      </main>
      <Footer />
    </>
  );
}
