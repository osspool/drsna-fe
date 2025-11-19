import { SectionRenderer } from "@/components/common/SectionRenderer";
import { aboutPageConfig } from "@/lib/configs/about";
import { getAboutPageData, getAboutMetadata } from "@/lib/about";
import { getBaseUrl } from "@/lib/domain-helpers";

/**
 * Generate domain-aware metadata - NOT cached, can use headers()
 */
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  return getAboutMetadata(baseUrl);
}

/**
 * Generate domain-aware structured data
 */
async function getAboutStructuredData() {
  const baseUrl = await getBaseUrl();
  
  return {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Dr SNA Clinic",
  "description": "Advanced medical, regenerative and aesthetic clinic in London's Harley Street medical district, offering doctor-led treatments for skin, hair, joints, and natural facial enhancement.",
  "url": `${baseUrl}/about-us`,
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
}

/**
 * About Us Page
 *
 * Displays comprehensive information about Dr SNA Clinic, including mission,
 * story, team, expertise, services, and values using a config-driven section
 * rendering pattern. Follows the same architecture as the home page.
 */
export default async function AboutUsPage() {
  const aboutData = await getAboutPageData();
  const aboutStructuredData = await getAboutStructuredData();

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
