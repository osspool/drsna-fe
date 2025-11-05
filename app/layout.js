import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Dr SNA Clinic | Luxury Aesthetic Medicine in London",
  description: "Premier aesthetic medicine clinic offering advanced treatments in facial aesthetics, intimate health, and pain management. Expert care in the heart of London.",
  keywords: ["aesthetic medicine", "dermal fillers", "anti-wrinkle", "intimate health", "pain management", "London clinic"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
