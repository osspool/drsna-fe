/**
 * Contact Page
 *
 * Registry-driven architecture using:
 * - JSON data (data/contact.json)
 * - Mapper (lib/mappers/contact.js)
 * - Config (lib/configs/contact.js)
 * - SectionRenderer (components/common/SectionRenderer.jsx)
 *
 * This follows the established pattern for consistency and maintainability.
 */

import { SectionRenderer } from "@/components/common/SectionRenderer";
import { contactSections, getContactData } from "@/lib/configs/contact";
import { getBaseUrl } from "@/lib/domain-helpers";
import { buildBreadcrumbSchema } from "@/lib/seo-helpers";

export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  const canonical = `${baseUrl}/contact`;

  return {
    title: "Book Consultation | Dr SNA Clinic London",
    description:
      "Book your confidential consultation with Dr Syed Nadeem Abbas. Award-winning aesthetic medicine clinic on Wimpole Street, London. Call +44 7955 836986 or book online.",
    keywords: [
      "book consultation",
      "aesthetic medicine appointment",
      "Dr Syed Nadeem Abbas contact",
      "Wimpole Street clinic",
      "London aesthetic clinic",
    ],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Book Consultation | Dr SNA Clinic",
      description:
        "Schedule your confidential consultation with award-winning aesthetic medicine specialist Dr Syed Nadeem Abbas.",
      url: canonical,
      type: "website",
      images: [
        {
          url: "/images/drsnaclinic/clinic-inside.jpg",
          width: 1200,
          height: 630,
          alt: "Dr SNA Clinic Consultation Room",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Book Consultation | Dr SNA Clinic",
      description:
        "Schedule your confidential consultation with award-winning aesthetic medicine specialist Dr Syed Nadeem Abbas.",
      images: ["/images/drsnaclinic/clinic-inside.jpg"],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function ContactPage() {
  const data = getContactData();
  const baseUrl = await getBaseUrl();
  const structuredData = buildContactStructuredData(data, baseUrl);

  return (
    <>
      {structuredData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <main className="min-h-screen">
        <SectionRenderer sections={contactSections} data={data} />
      </main>
    </>
  );
}

function buildContactStructuredData(data, baseUrl) {
  if (!data || !baseUrl) return [];

  const phoneCard = data.contactInfo?.find((card) => card.icon === "phone");
  const emailCard = data.contactInfo?.find((card) => card.icon === "mail");

  const phoneNumbers = phoneCard?.details || [];
  const email = emailCard?.details?.[0];

  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr SNA Clinic",
    description: data.hero?.subheadline,
    url: `${baseUrl}/contact`,
    telephone: phoneNumbers,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "48 Wimpole Street",
      addressLocality: "London",
      addressRegion: "Greater London",
      postalCode: "W1G 8SF",
      addressCountry: "GB",
    },
    contactPoint: phoneNumbers.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["English"],
    })),
    sameAs: [
      "https://www.instagram.com/drsnaclinic",
      "https://www.facebook.com/drsnaclinic",
      "https://www.linkedin.com/company/dr-sna-clinic",
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema(baseUrl, [
    { name: "Contact", path: "/contact" },
  ]);

  return [clinicSchema, breadcrumbSchema].filter(Boolean);
}
