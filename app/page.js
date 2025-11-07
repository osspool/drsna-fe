import { Header } from "@/components/core/Header";
import { HeroSectionV2 } from "@/components/landing/HeroSectionV2";
import { RegulatoryLogos } from "@/components/landing/RegulatoryLogos";
import { DrAbbasSection } from "@/components/landing/DrAbbasSection";
import { PShotFeaturedSection } from "@/components/landing/PShotFeaturedSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { FeaturedTreatments } from "@/components/landing/FeaturedTreatments";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";

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

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Dr SNA Clinic",
  alternateName: "Dr Syed Nadeem Abbas Clinic",
  description:
    "Premier aesthetic medicine and regenerative treatment clinic in London",
  url: "https://drsnaclinic.com",
  telephone: "+447955836986",
  email: "info@drsnaclinic.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "48 Wimpole Street",
    addressLocality: "Marylebone, London",
    postalCode: "W1G 8SF",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.5175",
    longitude: "-0.1483",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Dr Syed Nadeem Abbas",
    jobTitle: "Aesthetic Medicine Specialist",
    description:
      "MSc | MRCGP | MRCSEd | MBBS - Masters in Aesthetic Plastic Surgery with Distinction",
  },
  medicalSpecialty: [
    "Aesthetic Medicine",
    "Dermatology",
    "Regenerative Medicine",
    "Pain Management",
  ],
  hasCredential: [
    "CQC Registered",
    "GMC Certified",
    "Masters in Aesthetic Plastic Surgery",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  award:
    "Global Recognition Award 2024 - Excellence in Aesthetic & Regenerative Medicine",
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <TestimonialsSection />

        {/* FAQ Section with Animated Accordion */}
        <FAQSection />

        {/* Regulatory Logos Carousel - Trust Signals */}
        <RegulatoryLogos />

        {/* Final CTA with Wavy Background */}
        <FinalCTA />
      </main>
    </>
  );
}
