import { Suspense } from "react";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { edPageConfig } from "@/lib/configs/erectiledysfunction";
import { getEDPageData } from "@/lib/erectiledysfunction";
import { edSiteConfig } from "@/data/pages/erectiledysfunction/site-config";
import { getBaseUrl } from "@/lib/domain-helpers";

export async function generateMetadata() {
  const { buildMetadata } = await import("@/lib/seo-helpers");
  const { getBaseUrl } = await import("@/lib/domain-helpers");
  const baseUrl = await getBaseUrl();

  return buildMetadata(
    {
      title: edSiteConfig.name,
      description: edSiteConfig.description,
      categoryId: "intimate-health",
      quickStats: {}, // Triggers treatment layout
      seo: {
        keywords: edSiteConfig.keywords,
        canonicalUrl: edSiteConfig.url,
      },
      hero: {
        image: edSiteConfig.ogImage,
        badge: "ED Treatments"
      }
    },
    'hero.image',
    edSiteConfig.name,
    baseUrl
  );
}

export default function EDLandingPage() {
  return (
    <Suspense fallback={null}>
      <DomainAwareEDPage />
    </Suspense>
  );
}

async function DomainAwareEDPage() {
  const pageData = await getEDPageData();
  const baseUrl = await getBaseUrl();
  const structuredData = buildEDStructuredData(baseUrl, pageData);

  return (
    <main className="min-h-screen bg-white">
       <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      <SectionRenderer sections={edPageConfig} data={pageData} />
    </main>
  );
}

function buildEDStructuredData(baseUrl, pageData) {
  const siteUrl = baseUrl || edSiteConfig.url;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      name: edSiteConfig.name,
      url: siteUrl,
      logo: "https://drsnaclinic.com/images/logo.png",
      telephone: edSiteConfig.contacts.phone,
      email: edSiteConfig.contacts.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "48 Wimpole Street",
        addressLocality: "Marylebone",
        addressRegion: "London",
        postalCode: "W1G 8SF",
        addressCountry: "UK"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.5206,
        longitude: -0.1494
      },
      medicalSpecialty: ["Sexual Health", "Men's Health", "Regenerative Medicine"],
      availableService: [
        {
          "@type": "MedicalProcedure",
          name: "P-Shot (Priapus Shot)",
          description: "Non-surgical PRP treatment for erectile dysfunction using the patient's own growth factors.",
          procedureType: "NoninvasiveProcedure",
          bodyLocation: "Penis",
          howPerformed: "Blood is drawn from the patient, processed to extract PRP, and injected into specific areas of the penis using a fine needle after numbing.",
          outcome: "Improved blood flow, stronger erections, and increased sensitivity.",
          followup: "Results typically visible within 2-4 weeks. Maintenance treatments may be recommended annually."
        },
        {
          "@type": "MedicalProcedure",
          name: "Shockwave Therapy",
          description: "Low-intensity extracorporeal shockwave therapy (Li-ESWT) for erectile dysfunction.",
          procedureType: "NoninvasiveProcedure",
          bodyLocation: "Penis",
          howPerformed: "Low-intensity sound waves are applied to the penile tissue to stimulate blood vessel growth and break down micro-plaque.",
          outcome: "Restored natural erectile function and improved blood flow.",
          treatmentFrequency: "Typically 6 sessions over 3-6 weeks."
        }
      ]
    }
  ];

  // Add FAQ Schema if data exists
  if (pageData?.faq?.length > 0) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pageData.faq.map(item => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    });
  }

  return structuredData;
}
