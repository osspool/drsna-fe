import { Suspense } from "react";
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { pshotPageConfig } from "@/lib/configs/pshot";
import { getPShotPageData } from "@/lib/pshot";
import { pshotSiteConfig } from "@/data/pages/pshot/site-config";
import { clinicStructuredData } from "@/data/structured-data";
import { getBaseUrl } from "@/lib/domain-helpers";

export const metadata = {
  metadataBase: new URL("https://pshots.co.uk"),
  title: "P-Shot Treatment London | Priapus Shot UK | ED Treatment | Dr SNA Clinic",
  description: "Revolutionary P-Shot (Priapus Shot) treatment in London. Natural ED solution using PRP therapy. 98% satisfaction rate. CQC registered. Book consultation with Dr Syed Nadeem Abbas.",
  keywords: pshotSiteConfig.keywords,
  authors: [{ name: "Dr Syed Nadeem Abbas" }],
  openGraph: {
    title: "P-Shot Treatment London - UK's Leading P-Shot Specialist",
    description: "Experience the P-Shot with Dr Abbas, one of the UK's leading specialists. Over 1,000 procedures, 98% satisfaction rate. Natural ED treatment.",
    url: "https://pshots.co.uk",
    siteName: "P-Shot UK",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: pshotSiteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "P-Shot Treatment London - Dr SNA Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P-Shot Treatment London - Natural ED Solution",
    description: "Revolutionary PRP therapy for erectile dysfunction. 98% satisfaction rate. Book your consultation today.",
    images: [pshotSiteConfig.ogImage],
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
    canonical: "https://pshots.co.uk",
  },
};

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
