/**
 * Central Block Registry
 *
 * Single source of truth for all reusable components/blocks.
 * Import once, reference everywhere by block ID.
 */

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

// Content Blocks
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { ExpertiseBlock } from "@/components/blocks/ExpertiseBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { ComparisonBlock } from "@/components/blocks/ComparisonBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { HowItWorksBlock } from "@/components/blocks/HowItWorksBlock";
import { BeforeAfterBlock } from "@/components/blocks/BeforeAfterBlock";
import { CandidacyBlock } from "@/components/blocks/CandidacyBlock";

// Common Sections
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { StatsSection } from "@/components/sections/StatsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";

// About Sections
import { TeamSection } from "@/components/sections/about/TeamSection";
import { WhyChooseSection } from "@/components/sections/about/WhyChooseSection";

// Treatment Sections
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { RelatedTreatmentsSection } from "@/components/treatments/RelatedTreatmentsSection";
import { TreatmentHighlightGrid } from "@/components/treatments/TreatmentHighlightGrid";

// Subcategory Sections
import { SubcategoryIntro } from "@/components/sections/subcategory/SubcategoryIntro";
import { SubcategoryTreatmentGrid } from "@/components/sections/subcategory/SubcategoryTreatmentGrid";

// Treatment Page Components
import { SubcategoryGrid } from "@/components/treatments/SubcategoryGrid";
import TwoColumnTextFeaturesImage from "@/components/custom/ui/blocks/TwoColumnTextFeaturesImage";

// Specialty Sections
import { DoctorCredentials } from "@/components/pshot/DoctorCredentials";

// Contact Components
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { ContactCard } from "@/components/contact/ContactCard";

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

  // ===== SUBCATEGORY SECTIONS =====
  'subcategory.intro': SubcategoryIntro,
  'subcategory.treatment-grid': SubcategoryTreatmentGrid,
  'subcategory.grid': SubcategoryGrid,

  // ===== TREATMENT PAGE COMPONENTS =====
  'treatment.two-column-features': TwoColumnTextFeaturesImage,

  // ===== SPECIALTY SECTIONS =====
  'specialty.doctor-credentials': DoctorCredentials,

  // ===== CONTACT COMPONENTS =====
  'contact.form': ContactForm,
  'contact.card': ContactCard,
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
