/**
 * Profile Page Sections Configuration
 *
 * Config-driven rendering for profile pages (Dr Abbas, PShot, etc.).
 * Each section defines component, data key, and props transformer.
 */

import { HeroSection } from "@/components/heroes/landing/HeroSection";
import { PShotHero } from "@/components/heroes/specialty/PShotHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { DoctorCredentials } from "@/components/pshot/DoctorCredentials";
import * as mappers from "@/lib/mappers/profile";

/**
 * Dr Abbas profile page sections in display order
 */
export const drAbbasSections = [
  {
    id: 'hero',
    component: HeroSection,
    dataKey: 'hero',
    props: mappers.mapProfileHeroProps
  },
  {
    id: 'quickStats',
    component: StatsSection,
    dataKey: 'quickStats',
    props: mappers.mapProfileStatsProps
  },
  {
    id: 'overview',
    component: OverviewBlock,
    dataKey: 'overview',
    props: mappers.mapProfileOverviewProps
  },
  {
    id: 'whyChooseDrSNA',
    component: FeaturesSection,
    dataKey: 'whyChooseDrSNA',
    props: mappers.mapProfileWhyChooseProps
  },
  {
    id: 'gallery',
    component: GalleryBlock,
    dataKey: 'gallery',
    props: mappers.mapProfileGalleryProps
  },
  {
    id: 'testimonials',
    component: TestimonialsSection,
    dataKey: 'testimonials',
    condition: (data) => (
      data.testimonials &&
      Array.isArray(data.testimonials) &&
      data.testimonials.length > 0
    ),
    props: mappers.mapProfileTestimonialsProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    ),
    props: mappers.mapProfileFaqProps
  },
  {
    id: 'cta',
    component: CTASection,
    dataKey: 'cta',
    props: mappers.mapProfileCtaProps
  }
];

/**
 * P-Shot landing page sections in display order
 */
export const pshotSections = [
  {
    id: 'hero',
    component: PShotHero,
    dataKey: 'hero',
    props: mappers.mapPShotHeroProps
  },
  {
    id: 'stats',
    component: StatsSection,
    dataKey: 'stats',
    props: mappers.mapPShotStatsProps
  },
  {
    id: 'doctorCredentials',
    component: DoctorCredentials,
    dataKey: 'doctorCredentials',
    props: mappers.mapPShotCredentialsProps
  },
  {
    id: 'benefits',
    component: FeaturesSection,
    dataKey: 'benefits',
    props: mappers.mapPShotBenefitsProps
  },
  {
    id: 'process',
    component: ProcessTimeline,
    dataKey: 'process',
    props: mappers.mapPShotProcessProps
  },
  {
    id: 'videoTestimonials',
    component: TestimonialsSection,
    dataKey: 'videoTestimonials',
    condition: (data) => (
      data.videoTestimonials &&
      Array.isArray(data.videoTestimonials) &&
      data.videoTestimonials.length > 0
    ),
    props: mappers.mapPShotVideoTestimonialsProps
  },
  {
    id: 'testimonials',
    component: TestimonialsSection,
    dataKey: 'testimonials',
    condition: (data) => (
      data.testimonials &&
      Array.isArray(data.testimonials) &&
      data.testimonials.length > 0
    ),
    props: mappers.mapPShotTestimonialsProps
  },
  {
    id: 'whyChoose',
    component: FeaturesSection,
    dataKey: 'whyChoose',
    props: mappers.mapPShotWhyChooseProps
  },
  {
    id: 'faq',
    component: FAQSection,
    dataKey: 'faq',
    condition: (data) => (
      data.faq &&
      Array.isArray(data.faq) &&
      data.faq.length > 0
    ),
    props: mappers.mapPShotFaqProps
  },
  {
    id: 'cta',
    component: CTASection,
    dataKey: 'cta',
    props: mappers.mapPShotCtaProps
  }
];
