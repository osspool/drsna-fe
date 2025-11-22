// import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/layout/navbar/navbar";
import { getBaseUrl } from "@/lib/domain-helpers";
import { generateHomeOGImage } from "@/lib/og-helpers";

// Domain-aware metadata - dynamically set metadataBase
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  const ogImage = generateHomeOGImage();
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Dr SNA Clinic | Luxury Aesthetic Medicine in London",
      template: "%s | Dr SNA Clinic",
    },
    description:
      "Premier aesthetic medicine clinic offering advanced treatments in facial aesthetics, intimate health, and pain management. Expert care in the heart of London.",
    keywords: [
      "aesthetic medicine",
      "dermal fillers",
      "anti-wrinkle",
      "intimate health",
      "pain management",
      "London clinic",
    ],
    authors: [{ name: "Dr Syed Nadeem Abbas", url: `${baseUrl}/dr-syed-nadeem-abbas` }],
    creator: "Dr SNA Clinic",
    publisher: "Dr SNA Clinic",
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Dr SNA Clinic',
      url: baseUrl,
      title: "Dr SNA Clinic | Luxury Aesthetic Medicine in London",
      description: "Premier aesthetic medicine clinic offering advanced treatments in facial aesthetics, intimate health, and pain management.",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'Dr SNA Clinic - Award-Winning Aesthetic Medicine',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@drsnaclinic',
      creator: '@drsnaclinic',
      images: [ogImage],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
      bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  };
}

export default function HomeLayout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
