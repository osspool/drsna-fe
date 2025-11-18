import { FeaturedGrid } from "@/components/common/FeaturedGrid";

/**
 * Featured Treatments Component
 *
 * Displays treatment categories in a featured grid layout.
 * Now uses the unified FeaturedGrid component with variant="category".
 * Maintains backwards compatibility with existing data structure.
 */

const defaultData = {
  badge: "OUR SPECIALTIES",
  title: "Comprehensive Care",
  subtitle:
    "From aesthetic enhancement to regenerative medicine, we offer world-class treatments tailored to your unique needs",
  categories: [
    {
      icon: "sparkles",
      title: "Aesthetic Medicine",
      description: "Advanced non-surgical treatments for facial rejuvenation",
      href: "/treatments/aesthetic-medicine",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      treatments: ["Dermal Fillers", "Anti-Wrinkle", "Lip Enhancement", "Skin Boosters"],
    },
    {
      icon: "heart",
      title: "Intimate Health",
      description: "Discreet professional wellness treatments",
      href: "/treatments/intimate-health",
      image: "/images/drsnaclinic/clinic-inside.jpg",
      treatments: ["P-Shot", "O-Shot", "Ultra Femme 360", "Regenerative Therapy"],
    },
    {
      icon: "zap",
      title: "Pain Management",
      description: "Regenerative treatments for chronic pain relief",
      href: "/treatments/pain-management",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
      treatments: ["PRP Therapy", "Joint Injections", "Stem Cell Treatment", "Physiotherapy"],
    },
  ],
  cta: {
    text: "View All Treatments",
    href: "/treatments",
  },
};

export function FeaturedTreatments({ data }) {
  const sectionData = data
    ? {
        ...defaultData,
        ...data,
        categories: data.categories || defaultData.categories,
        cta: { ...defaultData.cta, ...data.cta },
      }
    : defaultData;

  return (
    <FeaturedGrid
      variant="category"
      items={sectionData.categories}
      header={{
        badge: sectionData.badge,
        title: sectionData.title,
        subtitle: sectionData.subtitle
      }}
      cta={sectionData.cta}
      background="default"
      padding="lg"
    />
  );
}
