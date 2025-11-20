import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getBaseUrl } from "@/lib/domain-helpers";
import Link from "next/link";

export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Privacy Policy | Dr SNA Clinic - How We Protect Your Personal Data",
    description: "Dr SNA Clinic's privacy policy. Learn how we collect, use, and protect your personal information in compliance with UK GDPR and Data Protection Act 2018.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/privacy`,
    },
  };
}

async function getPrivacyStructuredData() {
  const baseUrl = await getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr SNA Clinic",
    "url": `${baseUrl}`,
    "privacyPolicy": `${baseUrl}/privacy`,
  };
}

export default async function PrivacyPage() {
  const privacyStructuredData = await getPrivacyStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyStructuredData) }}
      />

      <main>
        <Section background="default" className="pt-32 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Introduction</h2>
                <p>
                  Dr SNA Clinic ("we", "our", or "us") is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, store, and protect your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>

                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <ul>
                  <li>Name, date of birth, and contact details (address, phone number, email)</li>
                  <li>Medical history and health information relevant to your treatment</li>
                  <li>Photographs for medical records and treatment planning</li>
                  <li>Payment and billing information</li>
                  <li>Appointment and consultation records</li>
                </ul>

                <h3>Automatically Collected Information</h3>
                <ul>
                  <li>Website usage data (IP address, browser type, pages visited)</li>
                  <li>Cookies and similar technologies (see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use your personal information for the following purposes:</p>
                <ul>
                  <li>To provide medical and aesthetic treatments</li>
                  <li>To maintain accurate medical records</li>
                  <li>To communicate with you about appointments and treatments</li>
                  <li>To process payments and billing</li>
                  <li>To comply with legal and regulatory obligations</li>
                  <li>To improve our services and website experience</li>
                  <li>To send you marketing communications (with your consent)</li>
                </ul>

                <h2>Legal Basis for Processing</h2>
                <p>We process your personal data under the following legal bases:</p>
                <ul>
                  <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
                  <li><strong>Contract:</strong> To provide treatments and services you've requested</li>
                  <li><strong>Legal Obligation:</strong> To comply with medical and healthcare regulations</li>
                  <li><strong>Legitimate Interests:</strong> To improve our services and ensure clinic security</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul>
                  <li>Secure, encrypted storage systems</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security assessments</li>
                  <li>Staff training on data protection</li>
                  <li>Secure disposal of records when no longer needed</li>
                </ul>

                <h2>Data Retention</h2>
                <p>
                  We retain your medical records for a minimum of 8 years from the date of your last treatment, in accordance with General Medical Council (GMC) guidelines. Marketing data is retained until you withdraw consent.
                </p>

                <h2>Your Rights</h2>
                <p>Under UK GDPR, you have the following rights:</p>
                <ul>
                  <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                  <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a structured format</li>
                  <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for marketing communications</li>
                </ul>

                <h2>Third-Party Sharing</h2>
                <p>
                  We do not sell your personal data. We may share your information with:
                </p>
                <ul>
                  <li>Healthcare professionals involved in your care</li>
                  <li>CQC and other regulatory bodies (when required by law)</li>
                  <li>Insurance companies (with your consent)</li>
                  <li>Payment processors for billing purposes</li>
                  <li>IT service providers who support our systems</li>
                </ul>

                <h2>Cookies and Tracking</h2>
                <p>
                  Our website uses cookies to improve your browsing experience. For detailed information, please see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <ul>
                  <li><strong>Email:</strong> privacy@drsnaclinic.com</li>
                  <li><strong>Phone:</strong> +44 7955 836986</li>
                  <li><strong>Address:</strong> Wimpole Street, London</li>
                </ul>

                <h2>Complaints</h2>
                <p>
                  If you're not satisfied with how we handle your personal data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
                </p>
                <ul>
                  <li><strong>Website:</strong> <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a></li>
                  <li><strong>Phone:</strong> 0303 123 1113</li>
                </ul>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The latest version will always be available on this page with the updated date at the top.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
