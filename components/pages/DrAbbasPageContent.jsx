import { HeroSection } from "@/components/heroes/landing/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { drAbbasData } from "@/data/dr-abbas";

// P-Shot focused data configuration
const pshotFocusedData = {
  ...drAbbasData,
  overview: {
    ...drAbbasData.overview,
    title: "Your P-Shot Specialist",
    content: "Dr Syed Nadeem Abbas is one of London's most experienced P-Shot practitioners, having performed over 1,000 procedures with exceptional results. As a certified provider trained directly by Dr. Charles Runels (creator of the Priapus Shot®), Dr Abbas brings unmatched expertise to male intimate health.\n\nWith distinction-level qualifications including MSc in Aesthetic Medicine, MRCGP, and MRCSEd, Dr Abbas combines surgical precision with deep understanding of male sexual health. His discreet, professional approach has made him the trusted choice for men seeking natural enhancement and ED treatment.\n\nDr Abbas stays at the forefront of regenerative medicine, continuously updating his techniques to deliver the safest, most effective P-Shot treatments available in the UK.",
  },
  whyChooseDrSNA: {
    enabled: true,
    title: "Why Men Choose Dr Abbas for P-Shot",
    subtitle: "The specialist you can trust with your intimate health",
    features: [
      {
        title: "P-Shot Mastery",
        description: "Over 1,000 successful procedures with 98% patient satisfaction rate",
        icon: "award"
      },
      {
        title: "Certified Expertise",
        description: "Directly trained and certified by Dr. Charles Runels, creator of the P-Shot®",
        icon: "shield"
      },
      {
        title: "Complete Discretion",
        description: "Private consultations in a luxury setting with absolute confidentiality",
        icon: "lock"
      },
      {
        title: "Natural Approach",
        description: "Focus on regenerative medicine and your body's own healing potential",
        icon: "leaf"
      },
      {
        title: "Comprehensive Care",
        description: "Full spectrum of male intimate health treatments under one roof",
        icon: "heart"
      },
      {
        title: "Proven Results",
        description: "Consistent outcomes backed by hundreds of satisfied patients",
        icon: "star"
      }
    ]
  },
  testimonials: [
    {
      name: "James K.",
      treatment: "P-Shot Treatment",
      rating: 5,
      text: "Dr Abbas changed my life. His expertise with the P-Shot is unmatched. Professional, discreet, and the results exceeded every expectation. I finally feel like myself again.",
      location: "London, UK"
    },
    {
      name: "Michael R.",
      treatment: "P-Shot Enhancement",
      rating: 5,
      text: "After trying everything else, the P-Shot with Dr Abbas delivered real results. His technique is precise, and he made me feel completely comfortable. Highly recommended.",
      location: "Surrey, UK"
    },
    {
      name: "David L.",
      treatment: "P-Shot for Peyronie's",
      rating: 5,
      text: "Dr Abbas's expertise in treating Peyronie's with the P-Shot is exceptional. The improvement has been life-changing. Professional, understanding, and highly skilled.",
      location: "Kent, UK"
    }
  ],
  cta: {
    title: "Ready to Transform Your Intimate Health?",
    subtitle: "Schedule a confidential consultation with Dr Abbas",
    primaryButton: "Book Consultation",
    secondaryButton: "Call Now"
  }
};

/**
 * Shared Dr Abbas page content component
 * @param {Object} props
 * @param {'general' | 'pshot'} props.variant - Determines which content variant to show
 */
export function DrAbbasPageContent({ variant = 'general' }) {
  const isPShot = variant === 'pshot';
  const data = isPShot ? pshotFocusedData : drAbbasData;

  // Hero configuration based on variant
  const heroConfig = isPShot ? {
    videoUrl: "https://www.youtube.com/watch?v=nUqENQZHd80",
    badge: "CERTIFIED P-SHOT® PROVIDER",
    headline: "Dr Syed Nadeem Abbas",
    flipWords: ["P-Shot Expert", "Male Health Specialist", "Certified Provider", "Trusted Doctor"],
    subheadline: 'London\'s most experienced P-Shot practitioner with <span class="text-primary font-semibold">over 1,000 successful procedures</span> and <span class="text-primary font-semibold">98% satisfaction rate</span>',
    primaryCTA: "Book Consultation",
    primaryCTAHref: "/contact",
    secondaryCTA: "Learn About P-Shot",
    secondaryCTAHref: "/",
    trustIndicators: [
      "Certified by Dr. Runels",
      "1,000+ P-Shot Procedures",
      "15+ Years Experience",
      "98% Success Rate"
    ]
  } : {
    videoUrl: "https://www.youtube.com/watch?v=nUqENQZHd80",
    badge: "GLOBAL RECOGNITION AWARD 2024",
    headline: "Dr Syed Nadeem Abbas",
    flipWords: ["Excellence", "Precision", "Artistry", "Compassion"],
    subheadline: 'Transforming lives through <span class="text-primary font-semibold">surgical precision</span>, <span class="text-primary font-semibold">artistic vision</span>, and <span class="text-primary font-semibold">15+ years mastery</span>',
    primaryCTA: "Book Your Consultation",
    primaryCTAHref: "/booking",
    secondaryCTA: "Explore Treatments",
    secondaryCTAHref: "/treatments",
    trustIndicators: [
      "MSc (Distinction)",
      "MRCGP | MRCSEd | MBBS",
      "15+ Years Experience",
      "10,000+ Happy Patients"
    ]
  };

  // Stats configuration
  const statsData = isPShot ? {
    experience: "15+ Years",
    procedures: "1,000+ P-Shots",
    satisfaction: "98% Success Rate",
    certified: "Official P-Shot® Provider"
  } : data.quickStats;

  // FAQ configuration
  const faqData = isPShot ? [
    {
      question: "What makes Dr Abbas different from other P-Shot providers?",
      answer: "Dr Abbas is one of the few UK practitioners directly certified by Dr. Charles Runels, creator of the Priapus Shot®. With over 1,000 procedures performed and surgical-level qualifications (MRCSEd), he brings unmatched precision and expertise to every treatment."
    },
    {
      question: "How experienced is Dr Abbas with the P-Shot?",
      answer: "Dr Abbas has performed over 1,000 P-Shot procedures with a 98% patient satisfaction rate. He's one of London's most experienced providers, having specialized in male intimate health for over 15 years."
    },
    {
      question: "Is the consultation confidential?",
      answer: "Absolutely. Dr Abbas understands the sensitive nature of intimate health concerns. All consultations are completely confidential, conducted in private at our discreet Wimpole Street clinic."
    }
  ] : data.faq;

  const faqTitle = isPShot ? "Questions About Dr Abbas" : "Frequently Asked Questions";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection {...heroConfig} />

      {/* Quick Stats */}
      <StatsSection data={statsData} variant="cards" />

      {/* Overview/Biography */}
      <OverviewBlock data={data.overview} />

      {/* Why Choose Dr Abbas */}
      <FeaturesSection data={data.whyChooseDrSNA} variant="cards" />

      {/* Gallery */}
      <GalleryBlock data={drAbbasData.gallery} />

      {/* Patient Testimonials */}
      <TestimonialsSection data={data.testimonials} variant="text" />

      {/* FAQ Section */}
      <FAQSection data={faqData} title={faqTitle} />

      {/* CTA Section */}
      <CTASection data={data.cta} />
    </main>
  );
}
