

export const edPageConfig = [
  {
    id: "hero",
    block: "hero.landing-v1",
    dataKey: "hero",
    // Props are passed directly from dataKey object because they match component props
  },
  {
    id: "intro",
    block: "block.overview", // Using OverviewBlock for intro
    dataKey: "intro",
    mapper: (pageData) => ({
      data: {
        title: pageData.intro?.heading || "Understanding ED",
        content: pageData.intro?.content || "",
        highlights: pageData.intro?.highlights,
      },
    }),
  },
  {
    id: "stats",
    block: "section.stats",
    dataKey: "stats",
    props: { variant: "highlight", title: "ED Treatment By The Numbers" }
  },
  {
    id: "doctorCredentials",
    block: "specialty.doctor-credentials",
    dataKey: "doctorCredentials"
  },
  {
    id: "benefits",
    block: "section.features",
    dataKey: "benefits",
    props: { variant: "cards", layout: "grid-3" }
  },
  {
    id: "treatments",
    block: "landing.featured-treatments",
    dataKey: "treatments",
  },
  {
    id: "process",
    block: "treatment.process-timeline",
    dataKey: "process",
    props: { variant: "detailed" }
  },
  {
    id: "testimonials",
    block: "section.testimonials",
    dataKey: "testimonials",
    condition: (data) => (
      data.testimonials &&
      Array.isArray(data.testimonials) &&
      data.testimonials.length > 0
    ),
    props: {
      variant: "text",
      title: "Patient Success Stories",
      badge: "Verified Reviews"
    }
  },
  {
    id: "whyChoose",
    block: "section.features",
    dataKey: "whyChoose",
    props: { variant: "default", layout: "grid-2" }
  },
  {
    id: "faq",
    block: "section.faq",
    dataKey: "faq",
    props: {
      title: "Common Questions",
      subtitle: "Everything you need to know",
      variant: "default"
    }
  },
  {
    id: "cta",
    block: "section.cta",
    dataKey: "cta",
    props: { variant: "default" }
  }
];
