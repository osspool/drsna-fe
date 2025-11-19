import { SectionRenderer } from "@/components/common/SectionRenderer";
import { drAbbasPageConfig } from "@/lib/configs/dr-abbas";
import { getDrAbbasPageData, getDrAbbasMetadata } from "@/lib/dr-abbas";
import { getBaseUrl } from "@/lib/domain-helpers";
import { buildBreadcrumbSchema } from "@/lib/seo-helpers";

/**
 * Generate metadata - NOT cached, can use headers()
 */
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  return getDrAbbasMetadata(baseUrl);
}

export default async function DrAbbasPage() {
  const drAbbasData = await getDrAbbasPageData();
  const baseUrl = await getBaseUrl();
  const structuredData = buildDoctorStructuredData(drAbbasData, baseUrl);
  
  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="min-h-screen">
        <SectionRenderer sections={drAbbasPageConfig} data={drAbbasData} />
      </main>
    </>
  );
}

function buildDoctorStructuredData(data, baseUrl) {
  if (!data || !baseUrl) return [];

  const doctorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.title,
    description: data.description,
    jobTitle: "Aesthetic Medicine Specialist",
    url: `${baseUrl}/dr-syed-nadeem-abbas`,
    image: data.hero?.image || "/images/drsnaclinic/doctor-hero.jpg",
    worksFor: {
      "@type": "MedicalOrganization",
      name: "Dr SNA Clinic",
      url: baseUrl,
    },
    alumniOf: data.quickStats?.awards ? ["Royal College of Surgeons", "Royal College of General Practitioners"] : undefined,
    knowsAbout: data.quickStats
      ? ["Aesthetic Medicine", "Intimate Health", "Regenerative Therapies"]
      : undefined,
  };

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: data.title, path: "/dr-syed-nadeem-abbas" },
  ]);

  return [doctorSchema, breadcrumbSchema].filter(Boolean);
}
