import { SectionRenderer } from "@/components/common/SectionRenderer";
import { homePageConfig } from "@/lib/configs/home";
import { clinicStructuredData } from "@/data/structured-data";
import { getHomePageData } from "@/lib/home";

export const metadata = {
  metadataBase: new URL("https://drsnaclinic.com"),
  title:
    "Dr SNA Clinic | London's Premier Aesthetic Medicine Clinic | Dr Syed Nadeem Abbas",
  description:
    "Award-winning aesthetic medicine clinic in London. Expert treatments including dermal fillers, anti-wrinkle injections, PRP therapy, and intimate health. CQC registered with GMC certified doctors. Book your consultation today.",
  keywords: [
    "aesthetic medicine London",
    "dermal fillers London",
    "anti-wrinkle treatment",
    "Dr Syed Nadeem Abbas",
    "PRP therapy London",
    "aesthetic clinic Wimpole Street",
    "intimate health treatments",
    "pain management London",
    "CQC registered clinic",
    "best aesthetic doctor London",
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
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dr SNA Clinic - Aesthetic Medicine Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr SNA Clinic - London's Premier Aesthetic Medicine",
    description:
      "Award-winning aesthetic treatments with Dr Syed Nadeem Abbas. Natural results, expert care.",
    images: ["/images/og-image.jpg"],
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
  verification: {
    google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://drsnaclinic.com",
  },
};

// Enhanced structured data with Organization and WebSite for sitelinks
const homeStructuredData = [
  clinicStructuredData,
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dr SNA Clinic",
    url: "https://drsnaclinic.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://drsnaclinic.com/treatments?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dr SNA Clinic",
    url: "https://drsnaclinic.com",
    logo: "https://drsnaclinic.com/images/logo.png",
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
];

export default async function HomePage() {
  const homeData = await getHomePageData();

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
