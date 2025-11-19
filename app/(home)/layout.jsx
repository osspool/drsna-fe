// import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/layout/navbar/navbar";
import { getBaseUrl } from "@/lib/domain-helpers";

// Domain-aware metadata - dynamically set metadataBase
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  
  return {
    metadataBase: new URL(baseUrl),
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
