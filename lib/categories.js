"use cache";

/**
 * Get treatment categories data
 * Using 'use cache' for Next.js 16 automatic caching
 * Note: Icon names are strings - client components will map them to actual icons
 */
export async function getCategories() {
  const categories = [
    {
      id: "aesthetic-medicine",
      title: "Aesthetic Medicine",
      shortTitle: "Aesthetics",
      description: "Advanced non-surgical treatments for facial rejuvenation, body contouring, and aesthetic enhancement",
      longDescription: "Transform your appearance with cutting-edge aesthetic treatments. From facial rejuvenation to body contouring, our expert practitioners deliver natural-looking results that enhance your confidence.",
      iconName: "Sparkles",
      color: "#cda55c",
      gradient: "from-gold-primary/20 to-gold-light/20",
      borderGradient: "from-gold-primary to-gold-light",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
      treatmentCount: 25,
      subcategories: ["Face", "Body", "Skin", "Hair"],
      featured: true,
    },
    {
      id: "intimate-health",
      title: "Intimate Health",
      shortTitle: "Intimate Health",
      description: "Discreet, professional intimate wellness treatments for enhanced quality of life",
      longDescription: "Expert intimate health solutions delivered with sensitivity and professionalism. Restore confidence and improve your intimate wellness with our specialized treatments.",
      iconName: "HeartPulse",
      color: "#8b2635",
      gradient: "from-rose-900/20 to-rose-700/20",
      borderGradient: "from-rose-900 to-rose-700",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80",
      treatmentCount: 8,
      subcategories: ["Male", "Female"],
      featured: false,
    },
    {
      id: "pain-management",
      title: "Pain Management",
      shortTitle: "Pain Relief",
      description: "Regenerative treatments for chronic pain relief and enhanced mobility",
      longDescription: "Advanced regenerative therapies to treat chronic pain and joint conditions. Non-surgical solutions for lasting relief and improved quality of life.",
      iconName: "Activity",
      color: "#2d2620",
      gradient: "from-dark-brown/20 to-dark-brown/10",
      borderGradient: "from-dark-brown to-dark-brown/70",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      treatmentCount: 12,
      subcategories: ["Conditions", "Treatments"],
      featured: false,
    },
    {
      id: "life-optimization",
      title: "Life Optimization",
      shortTitle: "Life Optimisation",
      description: "Concierge IV therapy, medicated weight programmes, and medical nutrition to help high-performers feel their best.",
      longDescription: "Upgrade energy, metabolism, and mood with doctor-led protocols ranging from bespoke IV drips to prescription-supported weight journeys and functional nutrition therapy.",
      iconName: "Infinity",
      color: "#112733",
      gradient: "from-slate-900/20 to-slate-700/20",
      borderGradient: "from-slate-900 to-slate-600",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=1200&q=80",
      treatmentCount: 3,
      subcategories: ["Optimisation Services"],
      featured: true,
    },
    {
      id: "private-gp",
      title: "Private GP",
      shortTitle: "GP Services",
      description: "Same-day GP access, health screening, diagnostics, and paperwork handled with concierge care.",
      longDescription: "From family medicine to urgent diagnostics, our Private GP team provides unhurried appointments, rapid referrals, and transparent pricing in the heart of Marylebone.",
      iconName: "Stethoscope",
      color: "#12303f",
      gradient: "from-blue-900/20 to-blue-700/20",
      borderGradient: "from-blue-900 to-blue-600",
      image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?w=1200&q=80",
      treatmentCount: 5,
      subcategories: ["GP Services"],
      featured: true,
    },
  ];

  return categories;
}

/**
 * Get hero data for treatments page
 */
export async function getTreatmentsHeroData() {
  return {
    title: "Premium Medical Treatments",
    tagline: "Expert Medical Care",
    hero: {
      headline: "Premium Medical Treatments",
      subheadline: "Transform your life with world-class aesthetic medicine, intimate health, and pain management solutions",
      stats: [
        { value: "45+", label: "Treatments Available" },
        { value: "15+", label: "Years Experience" },
        { value: "10K+", label: "Happy Patients" }
      ],
      cta: "Book Consultation"
    }
  };
}

/**
 * Get "Why Choose Us" features
 */
export async function getWhyChooseFeatures() {
  return [
    {
      title: "Expert Practitioners",
      description: "Led by Dr. Syed Nadeem Abbas with 15+ years of specialist experience",
    },
    {
      title: "CQC Registered",
      description: "Fully regulated clinic meeting the highest UK medical standards",
    },
    {
      title: "Premium Products",
      description: "FDA/CE approved treatments using only the finest medical-grade products",
    },
    {
      title: "Natural Results",
      description: "Subtle enhancements that celebrate your natural beauty and confidence",
    },
  ];
}
