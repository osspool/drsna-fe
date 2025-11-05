import { HeroBlock } from "./HeroBlock";
import { AtAGlanceBlock } from "./AtAGlanceBlock";
import { ContentBlock } from "./ContentBlock";
import { BenefitsBlock } from "./BenefitsBlock";
import { BeforeAfterBlock } from "./BeforeAfterBlock";
import { GalleryBlock } from "./GalleryBlock";
import { VideoBlock } from "./VideoBlock";
import { FAQBlock } from "./FAQBlock";
import { TestimonialsBlock } from "./TestimonialsBlock";
import { CTABlock } from "./CTABlock";
import { TreatmentAreasBlock } from "./TreatmentAreasBlock";
import { PricingBlock } from "./PricingBlock";
import { CandidacyBlock } from "./CandidacyBlock";
import { SafetyBlock } from "./SafetyBlock";
import { ComparisonBlock } from "./ComparisonBlock";
import { OverviewBlock } from "./OverviewBlock";
import { QuickStatsBlock } from "./QuickStatsBlock";

const blockComponents = {
  hero: HeroBlock,
  atAGlance: AtAGlanceBlock,
  quickStats: QuickStatsBlock,
  overview: OverviewBlock,
  content: ContentBlock,
  benefits: BenefitsBlock,
  beforeAfter: BeforeAfterBlock,
  gallery: GalleryBlock,
  video: VideoBlock,
  treatmentAreas: TreatmentAreasBlock,
  pricing: PricingBlock,
  candidacy: CandidacyBlock,
  safety: SafetyBlock,
  comparison: ComparisonBlock,
  faq: FAQBlock,
  testimonials: TestimonialsBlock,
  cta: CTABlock,
};

export function BlockRenderer({ block }) {
  const BlockComponent = blockComponents[block.type];

  if (!BlockComponent) {
    console.warn(`Unknown block type: ${block.type}`);
    return null;
  }

  return <BlockComponent data={block} />;
}

export function BlocksRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} />
      ))}
    </>
  );
}
