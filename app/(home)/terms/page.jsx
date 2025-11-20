import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getBaseUrl } from "@/lib/domain-helpers";
import Link from "next/link";

export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Terms & Conditions | Dr SNA Clinic - Treatment Terms & Policies",
    description: "Dr SNA Clinic's terms and conditions. Read our policies for treatments, appointments, payments, cancellations, and patient responsibilities.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/terms`,
    },
  };
}

async function getTermsStructuredData() {
  const baseUrl = await getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr SNA Clinic",
    "url": `${baseUrl}`,
    "termsOfService": `${baseUrl}/terms`,
  };
}

export default async function TermsPage() {
  const termsStructuredData = await getTermsStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsStructuredData) }}
      />

      <main>
        <Section background="default" className="pt-32 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2>Introduction</h2>
                <p>
                  These Terms and Conditions ("Terms") govern your use of services provided by Dr SNA Clinic. By booking a consultation or treatment with us, you agree to be bound by these Terms. Please read them carefully before proceeding.
                </p>

                <h2>Appointments and Consultations</h2>
                <h3>Booking</h3>
                <ul>
                  <li>All appointments must be booked in advance via phone, email, or our website</li>
                  <li>Consultations are mandatory before any treatment</li>
                  <li>We reserve the right to refuse treatment if deemed medically inappropriate</li>
                </ul>

                <h3>Cancellations and Rescheduling</h3>
                <ul>
                  <li>We require at least 48 hours notice for cancellations or changes</li>
                  <li>Late cancellations (less than 48 hours) may incur a cancellation fee</li>
                  <li>No-shows may be charged up to 50% of the treatment cost</li>
                  <li>We will make every effort to accommodate rescheduling requests</li>
                </ul>

                <h2>Treatment Policies</h2>
                <h3>Medical Assessment</h3>
                <ul>
                  <li>You must provide accurate and complete medical history information</li>
                  <li>You must disclose all medications, allergies, and medical conditions</li>
                  <li>Failure to disclose relevant information may void liability for complications</li>
                  <li>We reserve the right to request additional medical information or GP clearance</li>
                </ul>

                <h3>Consent and Risks</h3>
                <ul>
                  <li>All treatments require written informed consent</li>
                  <li>You will be fully informed of potential risks, benefits, and alternatives</li>
                  <li>You must be 18 years or older for most treatments</li>
                  <li>We use only FDA/CE-approved products and equipment</li>
                </ul>

                <h3>Treatment Results</h3>
                <ul>
                  <li>Individual results vary and cannot be guaranteed</li>
                  <li>Follow-up appointments may be required</li>
                  <li>You must follow all post-treatment care instructions</li>
                  <li>Before/after photos may be taken for medical records</li>
                </ul>

                <h2>Payment Terms</h2>
                <h3>Pricing and Fees</h3>
                <ul>
                  <li>All prices are quoted in GBP (£) and include VAT where applicable</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Consultation fees are non-refundable</li>
                  <li>Some treatments require a deposit at booking</li>
                </ul>

                <h3>Payment Methods</h3>
                <ul>
                  <li>We accept cash, credit/debit cards, and bank transfers</li>
                  <li>Payment is due at the time of treatment unless otherwise agreed</li>
                  <li>Payment plans may be available for certain treatments</li>
                </ul>

                <h3>Refunds</h3>
                <ul>
                  <li>Refunds are assessed on a case-by-case basis</li>
                  <li>No refunds for change of mind after treatment</li>
                  <li>Complications due to non-disclosure do not qualify for refunds</li>
                </ul>

                <h2>Patient Responsibilities</h2>
                <p>As a patient, you agree to:</p>
                <ul>
                  <li>Arrive on time for appointments</li>
                  <li>Provide accurate medical information</li>
                  <li>Follow pre-treatment and post-treatment instructions</li>
                  <li>Attend all required follow-up appointments</li>
                  <li>Report any adverse reactions or concerns immediately</li>
                  <li>Maintain realistic expectations about treatment outcomes</li>
                </ul>

                <h2>Clinic Policies</h2>
                <h3>Confidentiality</h3>
                <ul>
                  <li>All patient information is confidential and stored securely</li>
                  <li>See our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for details</li>
                </ul>

                <h3>Photography</h3>
                <ul>
                  <li>Medical photography is part of your treatment record</li>
                  <li>We may request permission to use photos for marketing (optional)</li>
                  <li>You can withdraw photo consent at any time</li>
                </ul>

                <h3>Professional Standards</h3>
                <ul>
                  <li>All treatments performed by GMC-registered doctors</li>
                  <li>We are CQC registered and fully insured</li>
                  <li>We adhere to GMC Good Medical Practice guidelines</li>
                </ul>

                <h2>Liability and Insurance</h2>
                <ul>
                  <li>We maintain comprehensive medical malpractice insurance</li>
                  <li>Our liability is limited to the cost of the treatment provided</li>
                  <li>We are not liable for complications arising from non-disclosure</li>
                  <li>We are not liable for failure to achieve desired cosmetic results</li>
                </ul>

                <h2>Complaints Procedure</h2>
                <p>
                  If you have a complaint or concern, please see our <Link href="/complaints" className="text-primary hover:underline">Complaints Policy</Link>. We are committed to resolving issues promptly and professionally.
                </p>

                <h2>Intellectual Property</h2>
                <ul>
                  <li>All content on our website is protected by copyright</li>
                  <li>You may not reproduce content without written permission</li>
                  <li>Dr SNA Clinic and our logo are registered trademarks</li>
                </ul>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of our services constitutes acceptance of any changes.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>

                <h2>Contact Information</h2>
                <p>For questions about these Terms, please contact us:</p>
                <ul>
                  <li><strong>Email:</strong> info@drsnaclinic.com</li>
                  <li><strong>Phone:</strong> +44 7955 836986</li>
                  <li><strong>Address:</strong> Wimpole Street, London</li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
