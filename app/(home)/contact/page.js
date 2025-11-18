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

export default function ContactPage() {
  const data = getContactData();

  return (
    <main className="min-h-screen">
      <SectionRenderer sections={contactSections} data={data} />
    </main>
  );
}
