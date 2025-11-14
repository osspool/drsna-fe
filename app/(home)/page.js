import { HeroSectionV2 } from "@/components/landing/HeroSectionV2";
import { RegulatoryLogos } from "@/components/landing/RegulatoryLogos";
import { PShotFeaturedSection } from "@/components/landing/PShotFeaturedSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { FeaturedTreatments } from "@/components/landing/FeaturedTreatments";
import { AwardSpotlightSection } from "@/components/landing/AwardSpotlightSection";
import { TreatmentBentoSection } from "@/components/landing/TreatmentBentoSection";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { clinicStructuredData } from "@/data/structured-data";
import { getHomePageData } from "@/lib/home";

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

export default async function HomePage() {
  const homeData = await getHomePageData();
  const testimonialsData = homeData?.testimonials;
  const faqData = homeData?.faq;

  return (
    <>
      {/* Structured Data for SEO */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicStructuredData) }}
      /> */}


      <main>
        {/* Hero Section with Luxury Carousel & Emotional Messaging */}
        <HeroSectionV2 data={homeData?.hero} />

        {/* Award Spotlight */}
        <AwardSpotlightSection data={homeData?.awardSpotlight} />

        {/* Treatment Bento Grid Showcase */}
        <TreatmentBentoSection data={homeData?.treatmentBento} />

        {/* Featured Treatments with Comet Cards */}
        <FeaturedTreatments data={homeData?.featuredTreatments} />


        {/* Clinic Showcase - Interior & Exterior Gallery */}
        <ClinicShowcaseSection data={homeData?.clinicShowcase} />

        {/* P-Shot Featured Section - Premium Treatment Highlight */}
        <PShotFeaturedSection data={homeData?.pshotFeatured} />

        {/* Global Reach Section with World Map */}
        <GlobalReachSection data={homeData?.globalReach} />

        {/* Testimonials with Card Spotlight */}
        <TestimonialsSection
          variant={testimonialsData?.variant || "video"}
          data={testimonialsData}
          title={testimonialsData?.title}
          subtitle={testimonialsData?.subtitle}
          badge={testimonialsData?.badge}
        />

        {/* FAQ Section with Icons */}
        <FAQSection
          data={faqData?.items}
          variant={faqData?.variant || "with-icons"}
          title={faqData?.title}
          subtitle={faqData?.subtitle}
          badge={faqData?.badge}
        />

        {/* Regulatory Logos Carousel - Trust Signals */}
        <RegulatoryLogos data={homeData?.regulatory} />

        {/* Final CTA with Wavy Background */}
        <CTASection data={homeData?.cta} variant={homeData?.cta?.variant || "contact"} />
      </main>
    </>
  );
}
