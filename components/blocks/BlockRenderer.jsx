import { HeroBlock } from "./HeroBlock";
import { ContentBlock } from "./ContentBlock";
import { OverviewBlock } from "./OverviewBlock";
import { BeforeAfterBlock } from "./BeforeAfterBlock";
import { GalleryBlock } from "./GalleryBlock";
import { VideoBlock } from "./VideoBlock";
import { VideoTestimonialBlock } from "./VideoTestimonialBlock";
import { WhatToExpectBlock } from "./WhatToExpectBlock";
import { HowItWorksBlock } from "./HowItWorksBlock";
import { TreatmentAreasBlock } from "./TreatmentAreasBlock";
import { PricingBlock } from "./PricingBlock";
import { CandidacyBlock } from "./CandidacyBlock";
import { SafetyBlock } from "./SafetyBlock";
import { ComparisonBlock } from "./ComparisonBlock";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABlock } from "./CTABlock";
import { FAQSection } from "@/components/sections/FAQSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

/**
 * Block Component Registry
 * Maps block type identifiers to their corresponding React components
 * Following data-driven architecture pattern for flexible content rendering
 */
const blockComponents = {
  // Core Layout
  hero: HeroBlock,
  overview: OverviewBlock,
  content: ContentBlock,

  // Data-Driven Sections (Consolidated)
  stats: StatsSection,
  features: FeaturesSection,
  faq: FAQSection,

  // Media
  gallery: GalleryBlock,
  video: VideoBlock,
  videoTestimonial: VideoTestimonialBlock,
  beforeAfter: BeforeAfterBlock,

  // Treatment Specific
  treatmentAreas: TreatmentAreasBlock,
  whatToExpect: WhatToExpectBlock,
  howItWorks: HowItWorksBlock,
  pricing: PricingBlock,
  candidacy: CandidacyBlock,
  safety: SafetyBlock,
  comparison: ComparisonBlock,

  // Social Proof & Conversion
  testimonials: TestimonialsSection,
  cta: CTABlock,
};

/**
 * Block Renderer Component
 * Dynamically renders blocks based on type using the component registry
 * React 19 optimized with proper error boundaries and null handling
 */
export function BlockRenderer({ block }) {
  // Early return for invalid blocks
  if (!block?.type) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[BlockRenderer] Block missing type property:', block);
    }
    return null;
  }

  const BlockComponent = blockComponents[block.type];

  if (!BlockComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[BlockRenderer] Unknown block type: "${block.type}". Available types:`, Object.keys(blockComponents));
    }
    return null;
  }

  return <BlockComponent data={block} />;
}

/**
 * Blocks Renderer Component
 * Renders an array of blocks in sequence
 * React 19 optimized with key generation for stable reconciliation
 */
export function BlocksRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => (
        <BlockRenderer
          key={block.id || `block-${block.type}-${index}`}
          block={block}
        />
      ))}
    </>
  );
}
