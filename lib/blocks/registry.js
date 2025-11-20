/**
 * Central Block Registry
 *
 * Single source of truth for all reusable components/blocks.
 * Import once, reference everywhere by block ID.
 *
 * Heavy below-fold components use dynamic imports for better performance.
 */

import dynamic from 'next/dynamic';
import {
  GallerySkeleton,
  TestimonialsSkeleton,
  ProcessTimelineSkeleton
} from '@/components/common/skeletons';

// Heroes
import { HeroSectionV2 } from "@/components/heroes/landing/HeroSectionV2";
import { HeroSection } from "@/components/heroes/landing/HeroSection";
import { CategoryHero } from "@/components/heroes/treatments/CategoryHero";
import { TreatmentHero } from "@/components/heroes/treatments/TreatmentHero";
import { PShotHero } from "@/components/heroes/specialty/PShotHero";

// Landing Sections
import { AwardSpotlightSection } from "@/components/landing/AwardSpotlightSection";
import { ClinicShowcaseSection } from "@/components/landing/ClinicShowcaseSection";
import { FeaturedTreatments } from "@/components/landing/FeaturedTreatments";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { PShotFeaturedSection } from "@/components/landing/PShotFeaturedSection";
import { TreatmentBentoSection } from "@/components/landing/TreatmentBentoSection";
import { RegulatoryLogos } from "@/components/landing/RegulatoryLogos";

// Content Blocks - Above-the-fold components
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { ExpertiseBlock } from "@/components/blocks/ExpertiseBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { HowItWorksBlock } from "@/components/blocks/HowItWorksBlock";
import { CandidacyBlock } from "@/components/blocks/CandidacyBlock";
import { VideoBlock } from "@/components/blocks/VideoBlock";
import { TreatmentAreasBlock } from "@/components/blocks/TreatmentAreasBlock";
import { SafetyBlock } from "@/components/blocks/SafetyBlock";

// Content Blocks - Lazy-loaded (below-the-fold)
const GalleryBlock = dynamic(() => import('@/components/blocks/GalleryBlock').then(mod => ({ default: mod.GalleryBlock })), {
  loading: () => <GallerySkeleton />,
  ssr: true
});

const ComparisonBlock = dynamic(() => import('@/components/blocks/ComparisonBlock').then(mod => ({ default: mod.ComparisonBlock })), {
  ssr: true
});

const BeforeAfterBlock = dynamic(() => import('@/components/blocks/BeforeAfterBlock').then(mod => ({ default: mod.BeforeAfterBlock })), {
  ssr: true
});

// Common Sections - Above-the-fold components
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

// Common Sections - Lazy-loaded (below-the-fold)
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection').then(mod => ({ default: mod.TestimonialsSection })), {
  loading: () => <TestimonialsSkeleton />,
  ssr: true
});

// About Sections
import { TeamSection } from "@/components/sections/about/TeamSection";
import { WhyChooseSection } from "@/components/sections/about/WhyChooseSection";

// Treatment Sections - Above-the-fold components
import { RelatedTreatmentsSection } from "@/components/treatments/RelatedTreatmentsSection";
import { TreatmentHighlightGrid } from "@/components/treatments/TreatmentHighlightGrid";
import { TreatmentsCategoriesSection } from "@/components/treatments/TreatmentsCategoriesSection";
import { TreatmentsWhyChooseSection } from "@/components/treatments/TreatmentsWhyChooseSection";
import { CategoryIntroductionSection } from "@/components/treatments/CategoryIntroductionSection";
import { CategoryTestimonialsSection } from "@/components/treatments/CategoryTestimonialsSection";

// Treatment Sections - Lazy-loaded (below-the-fold)
const ProcessTimeline = dynamic(() => import('@/components/treatments/ProcessTimeline').then(mod => ({ default: mod.ProcessTimeline })), {
  loading: () => <ProcessTimelineSkeleton />,
  ssr: true
});

// Subcategory Sections
import { SubcategoryIntro } from "@/components/sections/subcategory/SubcategoryIntro";
import { SubcategoryTreatmentGrid } from "@/components/sections/subcategory/SubcategoryTreatmentGrid";

// Treatment Page Components
import { SubcategoryGrid } from "@/components/treatments/SubcategoryGrid";
import { TwoColumnFeaturesBlock } from "@/components/blocks/TwoColumnFeaturesBlock";
import TwoColumnImageQuote from "@/components/custom/ui/blocks/TwoColumnImageQuote";

// Specialty Sections
import { DoctorCredentials } from "@/components/pshot/DoctorCredentials";

// Contact Components
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { ContactCard } from "@/components/contact/ContactCard";
import { ContactInfoCards } from "@/components/contact/ContactInfoCards";
import { ContactMainSection } from "@/components/contact/ContactMainSection";

/**
 * Block Registry
 *
 * Organized by category with semantic IDs.
 * Format: 'category.name' or 'category.subcategory.name'
 */
export const blockRegistry = {
  // ===== HEROES =====
  'hero.landing': HeroSectionV2,
  'hero.landing-v1': HeroSection,
  'hero.category': CategoryHero,
  'hero.treatment': TreatmentHero,
  'hero.pshot': PShotHero,

  // ===== LANDING SECTIONS =====
  'landing.award-spotlight': AwardSpotlightSection,
  'landing.clinic-showcase': ClinicShowcaseSection,
  'landing.featured-treatments': FeaturedTreatments,
  'landing.global-reach': GlobalReachSection,
  'landing.pshot-featured': PShotFeaturedSection,
  'landing.treatment-bento': TreatmentBentoSection,
  'landing.regulatory-logos': RegulatoryLogos,

  // ===== CONTENT BLOCKS =====
  'block.overview': OverviewBlock,
  'block.expertise': ExpertiseBlock,
  'block.gallery': GalleryBlock,
  'block.comparison': ComparisonBlock,
  'block.pricing': PricingBlock,
  'block.how-it-works': HowItWorksBlock,
  'block.before-after': BeforeAfterBlock,
  'block.candidacy': CandidacyBlock,
  'block.video': VideoBlock,
  'block.treatment-areas': TreatmentAreasBlock,
  'block.safety': SafetyBlock,

  // ===== COMMON SECTIONS =====
  'section.testimonials': TestimonialsSection,
  'section.faq': FAQSection,
  'section.cta': CTASection,
  'section.stats': StatsSection,
  'section.features': FeaturesSection,

  // ===== ABOUT SECTIONS =====
  'section.team': TeamSection,
  'section.why-choose': WhyChooseSection,

  // ===== TREATMENT SECTIONS =====
  'treatment.process-timeline': ProcessTimeline,
  'treatment.related': RelatedTreatmentsSection,
  'treatment.highlight-grid': TreatmentHighlightGrid,
  'treatments.categories-section': TreatmentsCategoriesSection,
  'treatments.why-choose-section': TreatmentsWhyChooseSection,
  'category.introduction': CategoryIntroductionSection,
  'category.testimonials': CategoryTestimonialsSection,
  // ===== HEROES =====
  'hero.landing': HeroSectionV2,
  'hero.landing-v1': HeroSection,
  'hero.category': CategoryHero,
  'hero.treatment': TreatmentHero,
  'hero.pshot': PShotHero,

  // ===== LANDING SECTIONS =====
  'landing.award-spotlight': AwardSpotlightSection,
  'landing.clinic-showcase': ClinicShowcaseSection,
  'landing.featured-treatments': FeaturedTreatments,
  'landing.global-reach': GlobalReachSection,
  'landing.pshot-featured': PShotFeaturedSection,
  'landing.treatment-bento': TreatmentBentoSection,
  'landing.regulatory-logos': RegulatoryLogos,

  // ===== CONTENT BLOCKS =====
  'block.overview': OverviewBlock,
  'block.expertise': ExpertiseBlock,
  'block.gallery': GalleryBlock,
  'block.comparison': ComparisonBlock,
  'block.pricing': PricingBlock,
  'block.how-it-works': HowItWorksBlock,
  'block.before-after': BeforeAfterBlock,
  'block.candidacy': CandidacyBlock,
  'block.video': VideoBlock,
  'block.treatment-areas': TreatmentAreasBlock,
  'block.safety': SafetyBlock,

  // ===== COMMON SECTIONS =====
  'section.testimonials': TestimonialsSection,
  'section.faq': FAQSection,
  'section.cta': CTASection,
  'section.stats': StatsSection,
  'section.features': FeaturesSection,

  // ===== ABOUT SECTIONS =====
  'section.team': TeamSection,
  'section.why-choose': WhyChooseSection,

  // ===== TREATMENT SECTIONS =====
  'treatment.process-timeline': ProcessTimeline,
  'treatment.related': RelatedTreatmentsSection,
  'treatment.highlight-grid': TreatmentHighlightGrid,
  'treatments.categories-section': TreatmentsCategoriesSection,
  'treatments.why-choose-section': TreatmentsWhyChooseSection,
  'category.introduction': CategoryIntroductionSection,
  'category.testimonials': CategoryTestimonialsSection,

  // ===== SUBCATEGORY SECTIONS =====
  'subcategory.intro': SubcategoryIntro,
  'subcategory.treatment-grid': SubcategoryTreatmentGrid,
  'subcategory.grid': SubcategoryGrid,

  // ===== TREATMENT PAGE COMPONENTS =====
  'treatment.two-column-features': TwoColumnFeaturesBlock,
  'block.image-quote': TwoColumnImageQuote,

  // ===== SPECIALTY SECTIONS =====
  'specialty.doctor-credentials': DoctorCredentials,

  // ===== CONTACT COMPONENTS =====
  'contact.form': ContactForm,
  'contact.card': ContactCard,
  'contact.info-cards': ContactInfoCards,
  'contact.main-section': ContactMainSection,
};

/**
 * Block specifications
 *
 * Each spec is a small contract owned by the block:
 * - required: props that must be present (checked in dev)
 * - defaults: props merged in before rendering
 * - normalize: function to shape incoming data into props (replaces ad-hoc mappers)
 * - shouldRender: optional render guard (overrides default dataKey check)
 */
export const blockSpecs = {
  'section.testimonials': {
    required: ['data'],
    shouldRender: (_pageData, sectionData) => {
      const items = sectionData?.testimonials || sectionData?.items || sectionData;
      return Array.isArray(items) && items.length > 0;
    }
  },
  'section.faq': {
    required: ['data'],
    shouldRender: (_pageData, sectionData) => {
      const items = sectionData?.questions || sectionData?.items || sectionData;
      return Array.isArray(items) && items.length > 0;
    }
  },
  'section.cta': {
    required: ['data'],
    defaults: { variant: 'default' }
  },
  'section.features': {
    required: ['data'],
    shouldRender: (_pageData, sectionData) => {
      const features = sectionData?.features || sectionData?.items || [];
      const enabled = sectionData?.enabled ?? true;
      return enabled && Array.isArray(features) && features.length > 0;
    }
  },
  'treatment.process-timeline': {
    required: ['data'],
    shouldRender: (_pageData, sectionData) => {
      const steps = sectionData?.steps;
      return Array.isArray(steps) && steps.length > 0;
    }
  }
};

/**
 * Get a block component by ID
 * @param {string} blockId - The block identifier from the registry
 * @returns {React.Component} The block component
 */
export function getBlock(blockId) {
  const block = blockRegistry[blockId];

  if (!block) {
    console.warn(`Block "${blockId}" not found in registry. Available blocks:`, Object.keys(blockRegistry));
    return null;
  }

  return block;
}

/**
 * Check if a block exists in the registry
 * @param {string} blockId - The block identifier to check
 * @returns {boolean}
 */
export function hasBlock(blockId) {
  return blockId in blockRegistry;
}

/**
 * Get all available block IDs
 * @returns {string[]}
 */
export function getAvailableBlocks() {
  return Object.keys(blockRegistry);
}

/**
 * Get block specification by ID
 * @param {string} blockId
 * @returns {Object|undefined}
 */
export function getBlockSpec(blockId) {
  return blockSpecs[blockId];
}
