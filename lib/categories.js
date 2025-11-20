
/**
 * Hardcoded category metadata for UI display
 * This provides the icon names, colors, and UI-specific data
 * The actual category data comes from category.json files
 * Note: Icon names are strings - client components will map them to actual icons
 */
const CATEGORY_UI_METADATA = {
  "aesthetic-medicine": {
    iconName: "Sparkles",
    color: "#cda55c",
    gradient: "from-gold-primary/20 to-gold-light/20",
    borderGradient: "from-gold-primary to-gold-light",
    featured: true,
  },
  "intimate-health": {
    iconName: "HeartPulse",
    color: "#8b2635",
    gradient: "from-rose-900/20 to-rose-700/20",
    borderGradient: "from-rose-900 to-rose-700",
    featured: false,
  },
  "pain-management": {
    iconName: "Activity",
    color: "#2d2620",
    gradient: "from-dark-brown/20 to-dark-brown/10",
    borderGradient: "from-dark-brown to-dark-brown/70",
    featured: false,
  },
  "life-optimization": {
    iconName: "Infinity",
    color: "#112733",
    gradient: "from-slate-900/20 to-slate-700/20",
    borderGradient: "from-slate-900 to-slate-600",
    featured: true,
  },
  "private-gp": {
    iconName: "Stethoscope",
    color: "#12303f",
    gradient: "from-blue-900/20 to-blue-700/20",
    borderGradient: "from-blue-900 to-blue-600",
    featured: true,
  },
  "scientific-evidence": {
    iconName: "BookOpen",
    color: "#1f2a3d",
    gradient: "from-slate-800/20 to-slate-600/20",
    borderGradient: "from-slate-800 to-slate-600",
    featured: false,
  },
};

/**
 * Get treatment categories data with UI metadata
 * Returns simplified array for listings/navigation
 * Using 'use cache' for Next.js 16 automatic caching
 */
export async function getCategories() {
  // Use automatic data scanner to discover all categories
  const { scanCategories } = await import('./data-scanner');
  const { readFileSync } = await import('fs');
  const { join } = await import('path');

  const discoveredCategories = scanCategories();

  // Enhance with UI metadata and load title from category.json
  const categories = discoveredCategories.map(cat => {
    let title = cat.id; // fallback
    let description = '';
    let shortTitle = '';

    try {
      const categoryJsonPath = join(process.cwd(), 'data', cat.id, 'category.json');
      const categoryData = JSON.parse(readFileSync(categoryJsonPath, 'utf-8'));
      title = categoryData.title || cat.id;
      description = categoryData.description || '';
      shortTitle = categoryData.shortTitle || title;
    } catch (e) {
      // If category.json doesn't exist, use defaults
    }

    return {
      id: cat.id,
      title,
      shortTitle,
      description,
      ...CATEGORY_UI_METADATA[cat.id],
    };
  });

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
