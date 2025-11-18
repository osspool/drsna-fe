import { SectionRenderer } from "@/components/common/SectionRenderer";
import { aboutPageConfig } from "@/lib/configs/about";
import { getAboutPageData } from "@/lib/about";

/**
 * About Us Page Metadata
 */
export const metadata = {
  metadataBase: new URL("https://drsnaclinic.com"),
  title: "About Us - Dr SNA Clinic | Advanced Aesthetic & Regenerative Medicine in London",
  description: "Discover Dr SNA Clinic: a medically-led aesthetic and regenerative clinic on Wimpole Street, London. 20+ years of clinical excellence, CQC-registered, offering advanced treatments for skin, hair, joints, and natural facial enhancement.",
  keywords: [
    "aesthetic clinic London",
    "regenerative medicine London",
    "Dr SNA Clinic",
    "Wimpole Street clinic",
    "Harley Street medical district",
    "CQC registered clinic",
    "PRP treatment London",
    "facial aesthetics London",
    "hair restoration London",
    "joint pain treatment",
    "medically-led clinic"
  ],
  openGraph: {
    title: "About Dr SNA Clinic - Advanced Aesthetic & Regenerative Medicine",
    description: "Medically-led aesthetic and regenerative clinic in London. 20+ years of expertise in skin rejuvenation, hair restoration, joint treatments, and natural facial enhancement.",
    url: "https://drsnaclinic.com/about-us",
    siteName: "Dr SNA Clinic",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/drsnaclinic/dr-syed-nadeem-abbas.webp",
        width: 1200,
        height: 630,
        alt: "Dr Syed Nadeem Abbas - Founder & Clinical Director of Dr SNA Clinic"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Dr SNA Clinic - Advanced Aesthetic & Regenerative Medicine",
    description: "Medically-led aesthetic and regenerative clinic in London with 20+ years of clinical excellence.",
    images: ["/images/drsnaclinic/dr-syed-nadeem-abbas.webp"]
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
  alternates: {
    canonical: "https://drsnaclinic.com/about-us"
  }
};

/**
 * Structured Data for About Page
 */
const aboutStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Dr SNA Clinic",
  "description": "Advanced medical, regenerative and aesthetic clinic in London's Harley Street medical district, offering doctor-led treatments for skin, hair, joints, and natural facial enhancement.",
  "url": "https://drsnaclinic.com/about-us",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Wimpole Street",
    "addressLocality": "London",
    "addressRegion": "Greater London",
    "addressCountry": "GB"
  },
  "medicalSpecialty": [
    "Regenerative Medicine",
    "Aesthetic Medicine",
    "Dermatology",
    "Pain Management"
  ],
  "founder": {
    "@type": "Person",
    "name": "Dr Syed Nadeem Abbas",
    "honorificPrefix": "Dr",
    "jobTitle": "Founder & Clinical Director",
    "description": "Medical doctor with 20+ years clinical experience, specializing in regenerative medicine, aesthetic medicine, and Trauma & Orthopaedics.",
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Queen Mary University of London",
        "degree": "Masters in Aesthetic Plastic Surgery (Distinction)"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Royal College of Surgeons of Edinburgh"
      },
      {
        "@type": "Organization",
        "name": "Royal College of General Practitioners"
      },
      {
        "@type": "Organization",
        "name": "British Medical Association"
      },
      {
        "@type": "Organization",
        "name": "American Cellular Medical Association"
      }
    ]
  },
  "sameAs": [
    "https://www.facebook.com/drsnaclinic",
    "https://www.instagram.com/drsnaclinic",
    "https://www.linkedin.com/company/drsnaclinic"
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
      "credentialCategory": "Membership",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Royal College of Surgeons of Edinburgh"
      }
    }
  ]
};

/**
 * About Us Page
 *
 * Displays comprehensive information about Dr SNA Clinic, including mission,
 * story, team, expertise, services, and values using a config-driven section
 * rendering pattern. Follows the same architecture as the home page.
 */
export default async function AboutUsPage() {
  const aboutData = await getAboutPageData();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutStructuredData) }}
      />

      {/* Main Content */}
      <main>
        <SectionRenderer sections={aboutPageConfig} data={aboutData} />
      </main>
    </>
  );
}
