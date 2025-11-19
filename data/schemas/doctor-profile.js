/**
 * Doctor Profile Page Data Schema
 *
 * Use this schema to generate doctor/practitioner profile page content.
 */

import { z } from 'zod';

const iconSchema = z.string().describe('Lucide icon name');

export const doctorProfileSchema = z.object({
  // Hero section
  hero: z.object({
    badge: z.string().optional(),
    headline: z.string(),
    subheadline: z.string().optional(),
    flipWords: z.array(z.string()).optional().describe('Rotating words for animation'),
    image: z.string(),
    videoUrl: z.string().optional(),
    primaryCTA: z.string().default('Book Consultation'),
    primaryCTAHref: z.string().default('/contact'),
    secondaryCTA: z.string().optional(),
    secondaryCTAHref: z.string().optional(),
    trustIndicators: z.array(z.string()).max(4).optional()
  }),

  // Quick stats
  quickStats: z.object({
    experience: z.string().describe('e.g., "15+ Years"'),
    procedures: z.string().describe('e.g., "10,000+"'),
    satisfaction: z.string().describe('e.g., "98%"'),
    certified: z.string().optional()
  }),

  // Overview/About section
  overview: z.object({
    title: z.string(),
    content: z.string().describe('2-3 paragraphs about the doctor'),
    image: z.string().optional(),
    highlights: z.array(z.string()).max(5).optional()
  }),

  // Why choose this doctor
  whyChooseDrSNA: z.object({
    enabled: z.boolean().default(true),
    title: z.string(),
    subtitle: z.string().optional(),
    features: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(6)
  }),

  // Gallery/credentials
  gallery: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      title: z.string().optional(),
      caption: z.string().optional()
    })).max(6)
  }).optional(),

  // Testimonials
  testimonials: z.array(z.object({
    name: z.string(),
    treatment: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    location: z.string().optional()
  })).max(5).optional(),

  // FAQ
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).max(6).optional(),

  // CTA
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryButton: z.string().default('Book Consultation'),
    secondaryButton: z.string().optional()
  })
});

export default doctorProfileSchema;
