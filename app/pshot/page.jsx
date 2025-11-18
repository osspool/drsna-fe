import { SectionRenderer } from "@/components/common/SectionRenderer";
import { pshotPageConfig } from "@/lib/configs/pshot";
import { pshotLandingData } from "@/data/pages/pshot/landing-data";
import { pshotSiteConfig } from "@/data/pages/pshot/site-config";
import { clinicStructuredData } from "@/data/structured-data";

export const metadata = {
  title: "P-Shot Treatment London | Natural ED Solution | Dr SNA Clinic",
  description: pshotSiteConfig.description,
  keywords: pshotSiteConfig.keywords,
  openGraph: {
    title: "P-Shot Treatment London - World-Class P-Shot Specialist",
    description: "Experience the P-Shot with Dr Abbas, one of the UK's leading specialists. Over 1,000 procedures, 98% satisfaction rate.",
    images: [pshotSiteConfig.ogImage],
    type: "website",
  },
};

// Enhanced structured data for P-Shot specific page
const pshotStructuredData = {
  ...clinicStructuredData,
  "@type": "MedicalBusiness",
  name: pshotSiteConfig.name,
  medicalSpecialty: ["Sexual Health", "Regenerative Medicine", "Men's Health"],
  availableService: {
    "@type": "MedicalProcedure",
    name: "P-Shot (Priapus Shot)",
    alternateName: "Platelet-Rich Plasma Therapy for Men",
    description: "Non-surgical PRP treatment for erectile dysfunction, enhancement, and Peyronie's disease",
    procedureType: "Minimally invasive",
  },
};

export default function PShotLandingPage() {
  return (
    <>
      {/* Enhanced Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pshotStructuredData) }}
      />

      <main>
        <SectionRenderer sections={pshotPageConfig} data={pshotLandingData} />
      </main>
    </>
  );
}
