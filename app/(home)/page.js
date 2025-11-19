import { SectionRenderer } from "@/components/common/SectionRenderer";
import { homePageConfig } from "@/lib/configs/home";
import { clinicStructuredData } from "@/data/structured-data";
import { getHomePageData } from "@/lib/home";
import { getBaseUrl } from "@/lib/domain-helpers";

// Domain-aware metadata generation
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  
  return {
  metadataBase: new URL(baseUrl),
  title:
    "Dr SNA Clinic London | ED Treatment, PRP Facelift, Hair Loss, Knee Pain | Dr Syed Nadeem Abbas",
  description:
    "Solve erectile dysfunction without pills, restore hair naturally, rejuvenate your face without surgery, and relieve knee pain without replacement. Award-winning treatments by Dr Syed Nadeem Abbas. P-Shot, Shockwave Therapy, PRP Facelift, Stem Cell Therapy. Book confidential consultation.",
  keywords: [
    // ED & Intimate Health - Problem-based
    "erectile dysfunction treatment London",
    "ED cure without pills",
    "P-Shot UK",
    "shockwave therapy ED",
    "natural male enhancement",
    // Facial Rejuvenation - Problem-based
    "vampire facelift London",
    "PRP facelift UK",
    "natural facelift without surgery",
    "face rejuvenation London",
    // Hair Loss - Problem-based
    "hair loss treatment London",
    "PRP hair restoration",
    "stop balding naturally",
    "hair regrowth treatment UK",
    // Joint Pain - Problem-based
    "knee pain treatment London",
    "avoid knee replacement",
    "Arthrosamid UK",
    "stem cell therapy joints",
    "PRP for arthritis",
    "BMAC therapy London",
    // Brand terms
    "Dr Syed Nadeem Abbas",
    "Dr SNA Clinic",
    "Wimpole Street clinic",
  ],
  authors: [{ name: "Dr Syed Nadeem Abbas" }],
  openGraph: {
    title: "Dr SNA Clinic - Premier Aesthetic Medicine in London",
    description:
      "Global Recognition Award 2024. Expert care, natural results. 15+ years experience, 10,000+ happy patients.",
    url: "https://drsnaclinic.com",
    siteName: "Dr SNA Clinic",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp",
        width: 1200,
        height: 630,
        alt: "Dr SNA Clinic - Global Recognition Award 2024 Winner - Aesthetic Medicine Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr SNA Clinic - London's Premier Aesthetic Medicine",
    description:
      "Award-winning aesthetic treatments with Dr Syed Nadeem Abbas. Natural results, expert care.",
    images: ["/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  };
}

// Generate domain-aware structured data
async function getHomeStructuredData() {
  const baseUrl = await getBaseUrl();
  
  return [
  clinicStructuredData,
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dr SNA Clinic",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/treatments?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dr SNA Clinic",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      "https://facebook.com/drsnaclinic",
      "https://instagram.com/drsnaclinic",
      "https://twitter.com/drsnaclinic",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7955-836986",
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: ["English"],
    },
  },
  // SiteNavigationElement - problem-focused treatment links for sitelinks
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "ED Treatment",
        description: "P-Shot and Shockwave Therapy for erectile dysfunction without pills or surgery",
        url: `${baseUrl}/treatments/intimate-health/male/p-shot`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Natural Facelift",
        description: "PRP Vampire Facelift for facial rejuvenation without surgery",
        url: `${baseUrl}/treatments/aesthetic-medicine/face/prp-facelift`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Hair Loss Treatment",
        description: "PRP hair restoration to stop balding and regrow hair naturally",
        url: `${baseUrl}/treatments/aesthetic-medicine/hair/prp-hair`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Knee Pain Relief",
        description: "PRP and Arthrosamid injections to avoid knee replacement surgery",
        url: `${baseUrl}/treatments/pain-management/conditions/knee-treatment`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Stem Cell Therapy",
        description: "BMAC and adipose stem cell therapy for joint regeneration",
        url: `${baseUrl}/treatments/pain-management/treatments/bmac-therapy`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Book Consultation",
        description: "Confidential consultation with Dr Syed Nadeem Abbas",
        url: `${baseUrl}/contact`,
      },
    ],
  },
  // MedicalProcedure structured data for top treatments - enables rich snippets
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "P-Shot (Priapus Shot)",
    alternateName: ["P-Shot", "PRP for ED", "Priapus Shot"],
    description: "PRP injection therapy for erectile dysfunction and male enhancement without pills or surgery",
    url: `${baseUrl}/treatments/intimate-health/male/p-shot`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Platelet-rich plasma from your own blood is injected to stimulate tissue regeneration",
    preparation: "No special preparation required. Treatment takes 40 minutes.",
    followup: "Results develop over 6-12 weeks. Lasts 12-18 months.",
    status: "EventScheduled",
    bodyLocation: "Male intimate area",
    outcome: "Improved erectile function, enhanced sensitivity, potential size increase of 10-20%",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Shockwave Therapy for ED",
    alternateName: ["ESWT", "Low-Intensity Shockwave Therapy", "Acoustic Wave Therapy"],
    description: "Non-invasive treatment that restores natural blood flow to treat erectile dysfunction",
    url: `${baseUrl}/treatments/intimate-health/male/shockwave-therapy`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Acoustic waves stimulate new blood vessel growth and improve circulation",
    followup: "6 painless sessions. Results last 2+ years.",
    outcome: "76% improvement in erectile function without medication",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "PRP Facelift (Vampire Facelift)",
    alternateName: ["Vampire Facelift", "PRP Facial Rejuvenation", "Natural Facelift"],
    description: "Non-surgical facelift using your own platelet-rich plasma to rejuvenate and tighten skin",
    url: `${baseUrl}/treatments/aesthetic-medicine/face/prp-facelift`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "PRP from your blood is injected to stimulate collagen production and tissue regeneration",
    outcome: "Natural facial rejuvenation, improved skin texture, reduced wrinkles without surgery",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "PRP Hair Restoration",
    alternateName: ["PRP for Hair Loss", "Hair Regrowth Treatment", "Non-Surgical Hair Restoration"],
    description: "PRP therapy to stop hair loss and stimulate natural hair regrowth",
    url: `${baseUrl}/treatments/aesthetic-medicine/hair/prp-hair`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Platelet-rich plasma injected into scalp to stimulate hair follicles",
    outcome: "Reduced hair loss, thicker hair, natural regrowth without surgery",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Arthrosamid Knee Injection",
    alternateName: ["Arthrosamid", "Knee Arthritis Treatment", "Alternative to Knee Replacement"],
    description: "Single injection treatment for knee osteoarthritis to avoid knee replacement surgery",
    url: `${baseUrl}/treatments/pain-management/treatments/arthrosamid-injection`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Hydrogel injection that cushions and lubricates the knee joint",
    outcome: "Long-lasting pain relief, improved mobility, avoid or delay knee replacement",
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "BMAC Stem Cell Therapy",
    alternateName: ["Bone Marrow Stem Cell Therapy", "Regenerative Joint Treatment"],
    description: "Stem cell therapy using your own bone marrow to regenerate damaged joints",
    url: `${baseUrl}/treatments/pain-management/treatments/bmac-therapy`,
    procedureType: "NoninvasiveProcedure",
    howPerformed: "Stem cells concentrated from bone marrow are injected into damaged joints",
    outcome: "Joint regeneration, pain relief, improved function without surgery",
  },
];
}

export default async function HomePage() {
  const homeData = await getHomePageData();
  const homeStructuredData = await getHomeStructuredData();

  return (
    <>
      {/* Structured Data for SEO - enables rich snippets and sitelinks */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />

      <main>
        {/* All home sections - config-driven rendering */}
        <SectionRenderer sections={homePageConfig} data={homeData} />
      </main>
    </>
  );
}
