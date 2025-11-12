import { PShotHeader } from "@/components/pshot/PShotHeader";
import { Footer } from "@/components/core/Footer";
import { DomainProvider } from "@/lib/domain-context";
import { pshotSiteConfig } from "@/data/pshot/site-config";

export const metadata = {
  metadataBase: new URL(pshotSiteConfig.url),
  title: {
    default: pshotSiteConfig.title,
    template: `%s | ${pshotSiteConfig.name}`
  },
  description: pshotSiteConfig.description,
  keywords: pshotSiteConfig.keywords,
  authors: [{ name: "Dr Syed Nadeem Abbas" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: pshotSiteConfig.url,
    title: pshotSiteConfig.title,
    description: pshotSiteConfig.description,
    siteName: pshotSiteConfig.name,
    images: [
      {
        url: pshotSiteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: pshotSiteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pshotSiteConfig.title,
    description: pshotSiteConfig.description,
    images: [pshotSiteConfig.ogImage],
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
};

export default function PShotLayout({ children }) {
  return (
    <DomainProvider domainType="pshot" siteName={pshotSiteConfig.name}>
      <PShotHeader />
      {children}
      <Footer />
    </DomainProvider>
  );
}
