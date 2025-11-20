import { Suspense } from "react";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { pshotPageConfig } from "@/lib/configs/pshot";
import { getPShotPageData } from "@/lib/pshot";
import { pshotSiteConfig } from "@/data/pages/pshot/site-config";
import { clinicStructuredData } from "@/data/structured-data";
import { getBaseUrl } from "@/lib/domain-helpers";

export async function generateMetadata() {
  const { buildMetadata } = await import("@/lib/seo-helpers");
  const { getBaseUrl } = await import("@/lib/domain-helpers");
  const baseUrl = await getBaseUrl();

  return buildMetadata(
    {
      title: "P-Shot Treatment London | Priapus Shot UK | ED Treatment | Dr SNA Clinic",
      description: "Revolutionary P-Shot (Priapus Shot) treatment in London. Natural ED solution using PRP therapy. 98% satisfaction rate. CQC registered. Book consultation with Dr Syed Nadeem Abbas.",
      categoryId: "intimate-health",
      quickStats: {
        price: "£1,200",
      },
      seo: {
        keywords: pshotSiteConfig.keywords,
        canonicalUrl: "https://pshots.co.uk",
      },
      authors: [{ name: "Dr Syed Nadeem Abbas" }],
      hero: {
        image: pshotSiteConfig.ogImage,
        badge: "P-Shot Treatment"
      }
    },
    'hero.image',
    "P-Shot Treatment London",
    baseUrl
  );
}

export default function PShotLandingPage() {
  return (
    <Suspense fallback={null}>
      <DomainAwarePShotPage />
    </Suspense>
  );
}

async function DomainAwarePShotPage() {
  const pshotLandingData = await getPShotPageData();
  const baseUrl = await getBaseUrl();
  const structuredData = buildPshotStructuredData(baseUrl);

  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <main>
        <SectionRenderer sections={pshotPageConfig} data={pshotLandingData} />
      </main>
    </>
  );
}

function buildPshotStructuredData(baseUrl) {
  const siteUrl = baseUrl || pshotSiteConfig.url;
  return [
    {
      ...clinicStructuredData,
      "@type": "MedicalBusiness",
      name: pshotSiteConfig.name,
      url: siteUrl,
      medicalSpecialty: ["Sexual Health", "Regenerative Medicine", "Men's Health"],
      availableService: {
        "@type": "MedicalProcedure",
        name: "P-Shot (Priapus Shot)",
        alternateName: "Platelet-Rich Plasma Therapy for Men",
        description: "Non-surgical PRP treatment for erectile dysfunction, enhancement, and Peyronie's disease",
        procedureType: "Minimally invasive",
        howPerformed: "PRP injection therapy using patient's own blood platelets",
        preparation: "Blood draw and centrifugation to extract platelet-rich plasma",
        followup: "Results typically visible within 2-4 weeks",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "P-Shot Treatment",
      provider: {
        "@type": "MedicalBusiness",
        name: "Dr SNA Clinic",
        url: siteUrl,
      },
      areaServed: {
        "@type": "Country",
        name: "United Kingdom",
      },
      description: "Revolutionary P-Shot (Priapus Shot) treatment for erectile dysfunction and male enhancement using PRP therapy",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the P-Shot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The P-Shot (Priapus Shot) is a non-surgical treatment using PRP (Platelet-Rich Plasma) from your own blood to enhance erectile function and treat erectile dysfunction naturally.",
          },
        },
        {
          "@type": "Question",
          name: "How long do P-Shot results last?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "P-Shot results typically last 12-18 months. Many patients choose to have maintenance treatments annually to maintain optimal results.",
          },
        },
        {
          "@type": "Question",
          name: "Is the P-Shot safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, the P-Shot is very safe as it uses your own blood platelets. There is minimal risk of allergic reaction or rejection. Dr SNA Clinic is CQC registered with GMC certified doctors.",
          },
        },
      ],
    },
  ];
}
