/**
 * P-Shot Landing Page Base Data
 *
 * Contains above-the-fold and essential sections.
 * Heavy sections (FAQ, testimonials, doctor credentials, featured treatment)
 * are lazy-loaded via lib/pshot.js for better performance.
 */

export const pshotLandingData = {
  hero: {
    badge: "RECLAIM YOUR CONFIDENCE",
    headline: "Feel Like Yourself Again",
    subheadline: "The Natural Solution Men Trust",
    description: "You deserve to feel confident, connected, and in control. Dr Syed Nadeem Abbas has helped over 1,000 men rediscover their vitality through the P-Shot® — a safe, natural treatment that works with your body, not against it.",
    cta: {
      primary: "Book Confidential Consultation",
      secondary: "Speak to Us Today",
    },
    trustIndicators: [
      "1,000+ men treated",
      "98% say 'I'd do it again'",
      "Results in weeks, not months",
      "Complete privacy guaranteed",
    ],
  },

  benefits: {
    title: "What Changes When You Take Action",
    subtitle: "Real benefits men experience every day",
    features: [
      {
        title: "Wake Up Feeling Like Yourself",
        description: "That morning confidence you remember? It comes back. Naturally.",
        icon: "zap",
      },
      {
        title: "Be Present in the Moment",
        description: "Stop worrying about performance. Start enjoying connection.",
        icon: "heart",
      },
      {
        title: "See Real, Measurable Results",
        description: "10-20% increase in size. Not hype — just what the science shows.",
        icon: "trendingUp",
      },
      {
        title: "Say Goodbye to Medication",
        description: "No more pills, no more timing, no more side effects.",
        icon: "shield",
      },
      {
        title: "Feel Confident Again",
        description: "In the bedroom. In your relationship. In yourself.",
        icon: "star",
      },
      {
        title: "Results That Last",
        description: "12-18 months of results from a single treatment.",
        icon: "clock",
      },
    ],
  },

  process: {
    title: "What to Expect",
    subtitle: "40 minutes. No surgery. No downtime.",
    steps: [
      {
        step: 1,
        title: "Quick Blood Draw",
        description: "Just like a routine blood test. Takes about 5 minutes.",
        duration: "5 min",
      },
      {
        step: 2,
        title: "We Prepare Your PRP",
        description: "Your blood is processed to concentrate the healing growth factors.",
        duration: "10 min",
      },
      {
        step: 3,
        title: "Complete Comfort",
        description: "Strong numbing cream means you won't feel the treatment.",
        duration: "15 min",
      },
      {
        step: 4,
        title: "The Treatment",
        description: "Dr Abbas performs the injection with precision and care.",
        duration: "10 min",
      },
      {
        step: 5,
        title: "Walk Out & Live Your Life",
        description: "No recovery time. Results build over 6-12 weeks.",
        duration: "Ongoing",
      },
    ],
  },

  whyChoose: {
    title: "Why Men Trust Dr Abbas",
    subtitle: "It's about more than just the treatment",
    features: [
      {
        title: "He's Done This 1,000+ Times",
        description: "Experience matters. Dr Abbas has helped more men with P-Shot than almost anyone in the UK.",
        icon: "award",
      },
      {
        title: "Trained by the Creator",
        description: "Certified directly by Dr. Charles Runels, who invented the P-Shot.",
        icon: "graduationCap",
      },
      {
        title: "Your Privacy is Sacred",
        description: "Private Wimpole Street clinic. Discreet billing. Complete confidentiality.",
        icon: "shield",
      },
      {
        title: "He Actually Listens",
        description: "Your goals matter. Every treatment plan is built around what you want to achieve.",
        icon: "users",
      },
    ],
  },

  stats: {
    procedures: "1,000+",
    satisfaction: "98%",
    sizeIncrease: "10-20%",
    duration: "12-18 months",
  },

  cta: {
    title: "Ready to Feel Like Yourself Again?",
    subtitle: "Take the first step. Book a confidential consultation with Dr Abbas.",
    primaryButton: "Book Your Consultation",
    secondaryButton: "Call Us Now",
    note: "No pressure. No judgment. Just honest answers about what's possible for you.",
  },
};
