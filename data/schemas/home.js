/**
 * Home Page Data Schema
 *
 * Use this schema to generate home/landing page content.
 */

import { z } from 'zod';

const iconSchema = z.string().describe('Lucide icon name');

export const homeSchema = z.object({
  // Hero carousel
  hero: z.object({
    slides: z.array(z.object({
      id: z.number(),
      badge: z.string(),
      headline: z.string(),
      subheadline: z.string(),
      description: z.string(),
      image: z.string(),
      mobileImage: z.string().optional(),
      primaryCta: z.object({
        text: z.string(),
        href: z.string()
      })
    })).max(3),
    secondaryCta: z.object({
      text: z.string(),
      href: z.string()
    }).optional()
  }),

  // Award spotlight section
  awardSpotlight: z.object({
    badge: z.string(),
    badgeIcon: iconSchema,
    title: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string()
    }),
    highlights: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(3),
    cta: z.object({
      text: z.string(),
      href: z.string()
    }).optional()
  }),

  // Treatment bento grid
  treatmentBento: z.object({
    badge: z.object({
      text: z.string(),
      icon: iconSchema
    }),
    title: z.string(),
    subtitle: z.string(),
    cards: z.record(z.string(), z.object({
      title: z.string(),
      description: z.string().optional(),
      subtitle: z.string().optional(),
      image: z.string(),
      icon: iconSchema,
      iconColor: z.string().optional(),
      href: z.string(),
      highlights: z.array(z.object({ text: z.string() })).optional(),
      chips: z.array(z.object({
        text: z.string(),
        className: z.string().optional()
      })).optional()
    })),
    cta: z.object({
      text: z.string(),
      button: z.object({
        text: z.string(),
        href: z.string()
      })
    }).optional()
  }),

  // Featured treatments by category
  featuredTreatments: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    categories: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: iconSchema,
      image: z.string(),
      href: z.string(),
      treatments: z.array(z.string()).max(4)
    })).max(4),
    cta: z.object({
      text: z.string(),
      href: z.string()
    })
  }),

  // Clinic showcase carousel
  clinicShowcase: z.object({
    badge: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    slides: z.array(z.object({
      src: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string()
    })).max(5)
  }),

  // P-Shot featured section
  pshotFeatured: z.object({
    badge: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    titleSuperscript: z.string().optional(),
    subtitle: z.string(),
    processTitle: z.string(),
    processSubtitle: z.string(),
    processSteps: z.array(z.object({
      step: z.string(),
      title: z.string(),
      description: z.string(),
      image: z.string()
    })).max(3),
    disclaimer: z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    }),
    ctaButtons: z.array(z.object({
      text: z.string(),
      href: z.string(),
      variant: z.enum(['primary', 'outline']),
      icon: iconSchema.optional()
    })).max(2)
  }).optional(),

  // Global reach section
  globalReach: z.object({
    badge: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    description: z.string(),
    stats: z.array(z.object({
      icon: iconSchema,
      value: z.string(),
      label: z.string(),
      description: z.string()
    })).max(4),
    reasons: z.array(z.object({
      icon: iconSchema,
      title: z.string(),
      description: z.string()
    })).max(3),
    locations: z.array(z.object({
      icon: z.string(),
      label: z.string(),
      count: z.string(),
      description: z.string(),
      lat: z.number(),
      lng: z.number()
    })).optional()
  }),

  // Video testimonials
  testimonials: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    variant: z.enum(['video', 'text']).default('video'),
    testimonials: z.array(z.object({
      id: z.string().describe('YouTube video ID'),
      title: z.string(),
      thumbnail: z.string(),
      orientation: z.enum(['portrait', 'landscape']),
      thumbnailZoom: z.number().optional()
    })).max(6)
  }),

  // FAQ section
  faq: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    variant: z.string().default('with-icons'),
    questions: z.array(z.object({
      id: z.number(),
      icon: iconSchema,
      question: z.string(),
      answer: z.string()
    })).max(6)
  }),

  // Regulatory logos
  regulatory: z.object({
    badge: z.string(),
    title: z.string(),
    logos: z.array(z.object({
      name: z.string(),
      src: z.string()
    })).max(6)
  }),

  // CTA section
  cta: z.object({
    title: z.string(),
    titleAccent: z.string().optional(),
    subtitle: z.string(),
    variant: z.enum(['default', 'contact']).default('contact'),
    primaryButton: z.string(),
    contactInfo: z.array(z.object({
      icon: iconSchema,
      label: z.string(),
      value: z.string(),
      href: z.string()
    })).max(3),
    openingHours: z.object({
      days: z.string(),
      hours: z.string()
    }).optional()
  })
});

export default homeSchema;
