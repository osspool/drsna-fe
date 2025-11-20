import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AwardSpotlightSection } from "@/components/landing/AwardSpotlightSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { getBaseUrl } from "@/lib/domain-helpers";
import Image from "next/image";

// Domain-aware metadata generation
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Awards & Recognition | Dr SNA Clinic - Global Recognition Award 2024 Winner",
    description: "Dr SNA Clinic was crowned Global Recognition Award 2024 Winner for London's Premier Aesthetic Medicine Clinic. Learn about our award-winning treatments, GMC-certified doctors, and commitment to clinical excellence.",
    keywords: [
      "Dr SNA Clinic awards",
      "Global Recognition Award 2024",
      "aesthetic medicine awards London",
      "award-winning clinic UK",
      "Dr Syed Nadeem Abbas awards",
      "best aesthetic clinic London",
    ],
    openGraph: {
      title: "Awards & Recognition - Dr SNA Clinic",
      description: "Global Recognition Award 2024 Winner - London's Premier Aesthetic Medicine Clinic",
      url: `${baseUrl}/awards`,
      siteName: "Dr SNA Clinic",
      images: [
        {
          url: "/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp",
          width: 1200,
          height: 630,
          alt: "Dr SNA Clinic - Global Recognition Award 2024 Winner",
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/awards`,
    },
  };
}

// Generate domain-aware structured data
async function getAwardsStructuredData() {
  const baseUrl = await getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr SNA Clinic",
    "url": `${baseUrl}/awards`,
    "award": [
      {
        "@type": "Award",
        "name": "Global Recognition Award 2024",
        "description": "Awarded for being London's Premier Aesthetic Medicine Clinic",
        "datePublished": "2024-01-01"
      }
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Registration",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Care Quality Commission (CQC)"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "recognizedBy": {
          "@type": "Organization",
          "name": "General Medical Council (GMC)"
        }
      }
    ]
  };
}

export default async function AwardsPage() {
  const awardsStructuredData = await getAwardsStructuredData();

  const awardsData = {
    badge: "Global Recognition Award 2024",
    title: "Crowned London's Premier Aesthetic Medicine Clinic",
    description:
      "Our clinic was honoured with the Global Recognition Award™ 2024 for redefining luxury aesthetic medicine through uncompromising safety, artistry, and concierge-level care. This prestigious recognition validates our commitment to clinical excellence and patient-centered care.",
    image: {
      src: "/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp",
      alt: "Dr SNA Clinic accepting the Global Recognition Award 2024",
    },
    highlights: [
      {
        icon: "award",
        title: "Only UK Winner",
        description: "Selected from hundreds of clinics worldwide for clinical excellence and innovative treatments.",
      },
      {
        icon: "shield-check",
        title: "Unmatched Safety Standards",
        description: "CQC registered, GMC-certified doctors, and exclusively FDA/CE-approved treatments.",
      },
      {
        icon: "sparkles",
        title: "Natural, Signature Results",
        description: "Confidence-building outcomes guided by award-winning Dr Syed Nadeem Abbas.",
      },
      {
        icon: "users",
        title: "10,000+ Happy Patients",
        description: "Trusted by patients worldwide for over 15 years of clinical excellence.",
      },
    ],
  };

  const statsData = {
    title: "Award-Winning Excellence",
    subtitle: "Our commitment to clinical excellence is reflected in these achievements",
    stats: [
      {
        value: "2024",
        label: "Global Recognition Award Winner",
        suffix: "",
      },
      {
        value: "15",
        label: "Years of Clinical Excellence",
        suffix: "+",
      },
      {
        value: "10,000",
        label: "Happy Patients Treated",
        suffix: "+",
      },
      {
        value: "100",
        label: "CQC Registration & GMC Certified",
        suffix: "%",
      },
    ],
  };

  const featuresData = {
    title: "What Makes Us Award-Winning",
    subtitle: "The pillars of excellence that earned us international recognition",
    features: [
      {
        icon: "microscope",
        title: "Evidence-Based Medicine",
        description: "All treatments backed by peer-reviewed research and clinical studies with proven efficacy.",
      },
      {
        icon: "user-md",
        title: "GMC-Certified Doctors",
        description: "Every treatment performed by fully qualified, GMC-registered medical professionals.",
      },
      {
        icon: "shield-check",
        title: "Safety First Protocols",
        description: "CQC registered facility with comprehensive medical insurance and emergency protocols.",
      },
      {
        icon: "heart",
        title: "Patient-Centered Care",
        description: "Personalized treatment plans with thorough consultations and ongoing support.",
      },
      {
        icon: "check-circle",
        title: "FDA/CE-Approved Only",
        description: "We exclusively use treatments approved by leading regulatory authorities.",
      },
      {
        icon: "sparkles",
        title: "Natural Results",
        description: "Artistic approach focused on enhancing your natural features, not changing them.",
      },
    ],
  };

  const ctaData = {
    title: "Experience Award-Winning Care",
    description: "Book a confidential consultation with our award-winning team and discover why we're London's premier aesthetic medicine clinic.",
    primaryButton: {
      text: "Book Consultation",
      href: "/contact",
    },
    secondaryButton: {
      text: "View Treatments",
      href: "/treatments",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(awardsStructuredData) }}
      />

      <main>
        {/* Hero Section */}
        <Section background="gradient" className="pt-32 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-6 py-2 text-sm font-semibold text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Award-Winning Excellence
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Awards & Recognition
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Celebrating our commitment to clinical excellence, patient safety, and natural results in aesthetic medicine.
              </p>

              <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src="/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp"
                  alt="Dr SNA Clinic - Global Recognition Award 2024 Winner"
                  width={1200}
                  height={630}
                  className="object-cover w-full"
                  priority
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Award Spotlight */}
        <AwardSpotlightSection data={awardsData} />

        {/* Stats */}
        <StatsSection data={statsData} />

        {/* Features */}
        <FeaturesSection data={featuresData} />

        {/* CTA */}
        <CTASection data={ctaData} />
      </main>
    </>
  );
}
