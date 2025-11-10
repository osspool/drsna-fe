import { Header } from "@/components/core/Header";
import { HeroSectionV2 } from "@/components/landing/HeroSectionV2";
import { RegulatoryLogos } from "@/components/landing/RegulatoryLogos";
import { DrAbbasSection } from "@/components/landing/DrAbbasSection";
import { PShotFeaturedSection } from "@/components/landing/PShotFeaturedSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { FeaturedTreatments } from "@/components/landing/FeaturedTreatments";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { landingFaqData } from "@/data/landing-faq";
import { landingTestimonials } from "@/data/landing-testimonials";
import { clinicStructuredData } from "@/data/structured-data";

export const metadata = {
  metadataBase: new URL("https://drsnaclinic.com"),
  title:
    "Dr SNA Clinic | London's Premier Aesthetic Medicine Clinic | Dr Syed Nadeem Abbas",
  description:
    "Award-winning aesthetic medicine clinic in London. Expert treatments including dermal fillers, anti-wrinkle injections, PRP therapy, and intimate health. CQC registered with GMC certified doctors. Book your consultation today.",
  keywords: [
    "aesthetic medicine London",
    "dermal fillers London",
    "anti-wrinkle treatment",
    "Dr Syed Nadeem Abbas",
    "PRP therapy London",
    "aesthetic clinic Wimpole Street",
    "intimate health treatments",
    "pain management London",
    "CQC registered clinic",
    "best aesthetic doctor London",
  ],
  authors: [{ name: "Dr Syed Nadeem Abbas" }],
  openGraph: {
    title: "Dr SNA Clinic - Premier Aesthetic Medicine in London",
    description:
      "Global Recognition Award 2024. Expert care, natural results. 15+ years experience, 10,000+ happy patients.",
    url: "https://drsnaclinic.com",
    siteName: "Dr SNA Clinic",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr SNA Clinic - Aesthetic Medicine Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr SNA Clinic - London's Premier Aesthetic Medicine",
    description:
      "Award-winning aesthetic treatments with Dr Syed Nadeem Abbas. Natural results, expert care.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://drsnaclinic.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData) }}
      />

      <Header />

      <main>
        {/* Hero Section with Luxury Carousel & Emotional Messaging */}
        <HeroSectionV2 />

        {/* Dr Abbas Section with Card Spotlight */}
        <DrAbbasSection />

        {/* Featured Treatments with Comet Cards */}
        <FeaturedTreatments />

        {/* Clinic Showcase - Interior & Exterior Gallery */}
        <ClinicShowcaseSection />

        {/* P-Shot Featured Section - Premium Treatment Highlight */}
        <PShotFeaturedSection />

        {/* Global Reach Section with World Map */}
        <GlobalReachSection />

        {/* Testimonials with Card Spotlight */}
        <TestimonialsSection
          variant="video"
          data={landingTestimonials}
          title="Hear From Our Patients"
          subtitle="Real stories from real patients who have experienced transformative results at Dr SNA Clinic"
        />

        {/* FAQ Section with Icons */}
        <FAQSection data={landingFaqData} variant="with-icons" />

        {/* Regulatory Logos Carousel - Trust Signals */}
        <RegulatoryLogos />

        {/* Final CTA with Wavy Background */}
        <CTASection variant="contact" />
      </main>
    </>
  );
}
