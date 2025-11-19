import { SectionRenderer } from "@/components/common/SectionRenderer";
import { drAbbasPageConfig } from "@/lib/configs/dr-abbas";
import { getDrAbbasPageData, getDrAbbasMetadata } from "@/lib/dr-abbas";

/**
 * Generate metadata using standardized helper for consistency
 */
export function generateMetadata() {
  return getDrAbbasMetadata();
}

export default async function DrAbbasPage() {
  const drAbbasData = await getDrAbbasPageData();
  
  return (
    <main className="min-h-screen">
      <SectionRenderer sections={drAbbasPageConfig} data={drAbbasData} />
    </main>
  );
}
