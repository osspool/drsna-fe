/**
 * P-Shot Landing Page Data Schema
 *
 * Use this schema to generate P-Shot specialty page content.
 * This is a dedicated landing page for the P-Shot treatment.
 */

import { z } from 'zod';

const iconSchema = z.string().describe('Lucide icon name');

export const pshotSchema = z.object({
  // Hero section
  hero: z.object({
    badge: z.string().default('Revolutionary Male Enhancement'),
    headline: z.string(),
    subheadline: z.string(),
    description: z.string(),
    image: z.string(),
    video: z.string().optional(),
    primaryCta: z.object({
      text: z.string(),
      href: z.string()
    }),
    secondaryCta: z.object({
      text: z.string(),
      href: z.string()
    }).optional(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string()
    })).max(4).optional()
  }),

  // Quick stats
  stats: z.object({
    title: z.string().optional(),
    items: z.array(z.object({
      icon: iconSchema,
      value: z.string(),
      label: z.string(),
      description: z.string().optional()
    })).max(4)
  }),

  // Doctor credentials
  doctorCredentials: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    image: z.string(),
    credentials: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(4),
    certifications: z.array(z.string()).optional(),
    cta: z.object({
      text: z.string(),
      href: z.string()
    }).optional()
  }),

  // Benefits
  benefits: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    items: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(6)
  }),

  // Process/How it works
  process: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    steps: z.array(z.object({
      number: z.number().optional(),
      title: z.string(),
      description: z.string(),
      duration: z.string().optional(),
      icon: iconSchema.optional()
    })).max(5)
  }),

  // Video testimonials
  videoTestimonials: z.array(z.object({
    id: z.string().describe('YouTube video ID'),
    title: z.string(),
    thumbnail: z.string(),
    description: z.string().optional()
  })).max(4).optional(),

  // Text testimonials
  testimonials: z.array(z.object({
    name: z.string(),
    treatment: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    location: z.string().optional(),
    verified: z.boolean().default(true)
  })).max(4).optional(),

  // Why choose section
  whyChoose: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    features: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(6)
  }),

  // FAQ
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })).max(8),

  // CTA
  cta: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    primaryButton: z.string().default('Book Consultation'),
    secondaryButton: z.string().optional(),
    urgency: z.string().optional(),
    guarantee: z.string().optional()
  })
});

export default pshotSchema;
