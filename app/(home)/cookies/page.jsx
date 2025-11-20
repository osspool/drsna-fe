import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getBaseUrl } from "@/lib/domain-helpers";
import Link from "next/link";

export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Cookie Policy | Dr SNA Clinic - How We Use Cookies",
    description: "Dr SNA Clinic's cookie policy. Learn how we use cookies and similar technologies to improve your website experience and respect your privacy.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/cookies`,
    },
  };
}

async function getCookiesStructuredData() {
  const baseUrl = await getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Cookie Policy | Dr SNA Clinic",
    "url": `${baseUrl}/cookies`,
    "about": {
      "@type": "MedicalBusiness",
      "name": "Dr SNA Clinic",
      "url": baseUrl,
    },
    "dateModified": "2025-01-01",
  };
}

export default async function CookiesPage() {
  const cookiesStructuredData = await getCookiesStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesStructuredData) }}
      />

      <main>
      <Section background="default" className="pt-32 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Cookie Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 2025
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                This Cookie Policy explains how Dr SNA Clinic ("we", "our", or "us") uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
              </p>

              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website recognize your device and remember information about your visit, such as your preferences and actions.
              </p>

              <h2>Types of Cookies We Use</h2>

              <h3>1. Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
              <ul>
                <li><strong>Purpose:</strong> Essential site operations</li>
                <li><strong>Duration:</strong> Session or persistent</li>
                <li><strong>Can be disabled:</strong> No (required for site functionality)</li>
              </ul>

              <h3>2. Performance Cookies</h3>
              <p>
                These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages.
              </p>
              <ul>
                <li><strong>Purpose:</strong> Website analytics and performance monitoring</li>
                <li><strong>Duration:</strong> Typically 2 years</li>
                <li><strong>Can be disabled:</strong> Yes</li>
                <li><strong>Examples:</strong> Google Analytics</li>
              </ul>

              <h3>3. Functionality Cookies</h3>
              <p>
                These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
              </p>
              <ul>
                <li><strong>Purpose:</strong> Remember your preferences and settings</li>
                <li><strong>Duration:</strong> Varies (session to 1 year)</li>
                <li><strong>Can be disabled:</strong> Yes</li>
              </ul>

              <h3>4. Marketing Cookies</h3>
              <p>
                These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
              </p>
              <ul>
                <li><strong>Purpose:</strong> Targeted advertising and marketing</li>
                <li><strong>Duration:</strong> Typically up to 2 years</li>
                <li><strong>Can be disabled:</strong> Yes</li>
                <li><strong>Examples:</strong> Facebook Pixel, Google Ads</li>
              </ul>

              <h2>Third-Party Cookies</h2>
              <p>
                We use some third-party services that may set cookies on your device. These include:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> To analyze website traffic and usage patterns</li>
                <li><strong>Google Maps:</strong> To display our clinic location</li>
                <li><strong>Social Media:</strong> To enable social sharing features</li>
              </ul>
              <p>
                These third parties have their own privacy policies, and we have no control over their cookies. We recommend reviewing their policies directly.
              </p>

              <h2>How to Control Cookies</h2>

              <h3>Browser Settings</h3>
              <p>
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul>
                <li>View and delete existing cookies</li>
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Clear all cookies when you close your browser</li>
              </ul>

              <h3>Browser-Specific Instructions</h3>
              <ul>
                <li><strong>Chrome:</strong> Settings &gt; Privacy and security &gt; Cookies</li>
                <li><strong>Firefox:</strong> Options &gt; Privacy & Security &gt; Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Cookies and website data</li>
                <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
              </ul>

              <h3>Mobile Devices</h3>
              <p>
                For mobile devices, check your device settings or browser app for cookie management options.
              </p>

              <h2>Opt-Out Options</h2>
              <ul>
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                <li><strong>Network Advertising:</strong> <a href="http://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NAI Opt-out</a></li>
                <li><strong>Digital Advertising Alliance:</strong> <a href="http://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DAA Opt-out</a></li>
              </ul>

              <h2>Impact of Disabling Cookies</h2>
              <p>
                If you disable cookies, some features of our website may not function properly. Essential cookies cannot be disabled without affecting the core functionality of the site.
              </p>

              <h2>Data Protection</h2>
              <p>
                Information collected through cookies is processed in accordance with our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. Cookie data may include:
              </p>
              <ul>
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit on our site</li>
                <li>Time and date of your visit</li>
                <li>Referring website</li>
              </ul>

              <h2>Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our practices. The updated policy will be posted on this page with a new "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions about our use of cookies, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@drsnaclinic.com</li>
                <li><strong>Phone:</strong> +44 7955 836986</li>
                <li><strong>Address:</strong> Wimpole Street, London</li>
              </ul>

              <h2>Useful Resources</h2>
              <ul>
                <li><a href="https://ico.org.uk/for-the-public/online/cookies/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ICO - Cookies</a></li>
                <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">All About Cookies</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </main>
    </>
  );
}
