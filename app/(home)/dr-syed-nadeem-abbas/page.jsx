import { DrAbbasPageContent } from "@/components/pages/DrAbbasPageContent";

export const metadata = {
  title: "Dr Syed Nadeem Abbas | Award-Winning Aesthetic Medicine Specialist London",
  description: "Meet Dr Syed Nadeem Abbas (MSc, MRCGP, MRCSEd, MBBS), London's most distinguished aesthetic medicine specialist. 15+ years experience, 10,000+ happy patients, globally recognized excellence.",
  keywords: "Dr Syed Nadeem Abbas, aesthetic doctor London, Dr SNA, best aesthetic practitioner UK, facial rejuvenation specialist, intimate health expert London, award-winning cosmetic doctor",
  openGraph: {
    title: "Dr Syed Nadeem Abbas | Leading Aesthetic Medicine Specialist",
    description: "Award-winning aesthetic medicine specialist with 15+ years experience transforming lives through excellence, precision, and artistry.",
    images: ["/images/drsnaclinic/doctor-hero.jpg"],
    type: "profile",
  },
};

export default function DrAbbasPage() {
  return <DrAbbasPageContent variant="general" />;
}
