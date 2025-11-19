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

export const metadata = {
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
  openGraph: {
    title: "Book Consultation | Dr SNA Clinic",
    description:
      "Schedule your confidential consultation with award-winning aesthetic medicine specialist Dr Syed Nadeem Abbas.",
    url: "https://drsnaclinic.com/contact",
    type: "website",
    images: [{
      url: "/images/drsnaclinic/clinic-inside.jpg",
      width: 1200,
      height: 630,
      alt: "Dr SNA Clinic Consultation Room",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Consultation | Dr SNA Clinic",
    description:
      "Schedule your confidential consultation with award-winning aesthetic medicine specialist Dr Syed Nadeem Abbas.",
    images: ["/images/drsnaclinic/clinic-inside.jpg"],
  },
  alternates: {
    canonical: "https://drsnaclinic.com/contact",
  },
};

export default function ContactPage() {
  const data = getContactData();

  return (
    <main className="min-h-screen">
      <SectionRenderer sections={contactSections} data={data} />
    </main>
  );
}
