import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { getBaseUrl } from "@/lib/domain-helpers";

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

// Root layout - multi-domain aware metadata
// Uses getBaseUrl() to support drsnaclinic.com, pshots.co.uk, and future domains
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

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
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1e3a8a' },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: 'Dr SNA Clinic',
      url: baseUrl,
      title: "Dr SNA Clinic | Luxury Aesthetic Medicine in London",
      description: "Premier aesthetic medicine clinic offering advanced treatments in facial aesthetics, intimate health, and pain management.",
      images: [
        {
          url: '/images/drsnaclinic/GRA-2024-Winner-Dr-SNA-Clinic.webp',
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
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const LIGHT_THEME_COLOR = "hsl(0 0% 100%)";
const DARK_THEME_COLOR = "hsl(240deg 10% 3.92%)";
const THEME_COLOR_SCRIPT = `\
(function() {
  var html = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  function updateThemeColor() {
    var isDark = html.classList.contains('dark');
    meta.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
  }
  var observer = new MutationObserver(updateThemeColor);
  observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  updateThemeColor();
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: "Required"
          dangerouslySetInnerHTML={{
            __html: THEME_COLOR_SCRIPT,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
