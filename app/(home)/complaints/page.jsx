import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getBaseUrl } from "@/lib/domain-helpers";
import { contactInfo } from "@/data/contact-info";
import { Mail, Phone, AlertCircle, FileText, Clock } from "lucide-react";

export async function generateMetadata() {
  const baseUrl = await getBaseUrl();

  return {
    metadataBase: new URL(baseUrl),
    title: "Complaints Procedure | Dr SNA Clinic - How to Raise a Concern",
    description: "Dr SNA Clinic's complaints procedure. We take all concerns seriously and are committed to resolving issues promptly and professionally.",
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/complaints`,
    },
  };
}

async function getComplaintsStructuredData() {
  const baseUrl = await getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Dr SNA Clinic",
    "url": `${baseUrl}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "complaints",
      "email": "complaints@drsnaclinic.com",
      "telephone": contactInfo.phone.primary.number,
    }
  };
}

export default async function ComplaintsPage() {
  const complaintsStructuredData = await getComplaintsStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(complaintsStructuredData) }}
      />

      <main>
        <Section background="default" className="pt-32 pb-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                  Complaints Procedure
                </h1>
              </div>
              <p className="text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                  <p className="text-base text-foreground mb-0">
                    We are committed to providing the highest standard of care. If you have any concerns about our service, we want to hear from you so we can address the issue promptly and improve our practice.
                  </p>
                </div>

                <h2>Our Commitment</h2>
                <p>
                  At Dr SNA Clinic, we take all complaints seriously and are committed to:
                </p>
                <ul>
                  <li>Listening to your concerns with respect and understanding</li>
                  <li>Investigating complaints thoroughly and impartially</li>
                  <li>Responding promptly within our stated timeframes</li>
                  <li>Learning from feedback to improve our services</li>
                  <li>Maintaining confidentiality throughout the process</li>
                </ul>

                <h2>How to Make a Complaint</h2>

                <h3>Step 1: Contact Us Directly</h3>
                <p>
                  We encourage you to raise your concern as soon as possible. Most issues can be resolved quickly through direct communication.
                </p>

                <div className="not-prose grid gap-4 my-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <a href="mailto:complaints@drsnaclinic.com" className="text-primary hover:underline">
                        complaints@drsnaclinic.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <Phone className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <a href={`tel:${contactInfo.phone.primary.number}`} className="text-primary hover:underline">
                        {contactInfo.phone.primary.display}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Monday - Friday, 9am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <FileText className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Written Complaint</h4>
                      <p className="text-foreground">
                        Complaints Manager<br />
                        Dr SNA Clinic<br />
                        {contactInfo.address.streetAddress}<br />
                        {contactInfo.address.addressLocality}, {contactInfo.address.postalCode}
                      </p>
                    </div>
                  </div>
                </div>

                <h3>Step 2: What to Include</h3>
                <p>
                  To help us address your complaint effectively, please provide:
                </p>
                <ul>
                  <li>Your full name and contact details</li>
                  <li>Details of your complaint (what, when, where, who)</li>
                  <li>How the issue has affected you</li>
                  <li>What outcome you would like</li>
                  <li>Any relevant documentation or evidence</li>
                </ul>

                <h2>Our Response Process</h2>

                <div className="not-prose space-y-4 my-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Acknowledgment (3 working days)</h4>
                      <p className="text-muted-foreground mb-0">
                        We will acknowledge receipt of your complaint within 3 working days and provide a reference number.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Investigation (10 working days)</h4>
                      <p className="text-muted-foreground mb-0">
                        We will investigate your complaint thoroughly, which may include reviewing records and speaking with relevant staff.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Response (20 working days)</h4>
                      <p className="text-muted-foreground mb-0">
                        We aim to provide a full response within 20 working days, outlining our findings and any actions taken.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Resolution & Follow-up</h4>
                      <p className="text-muted-foreground mb-0">
                        If you're not satisfied with our response, we'll work with you to find a resolution or advise on further steps.
                      </p>
                    </div>
                  </div>
                </div>

                <h2>If You're Not Satisfied</h2>
                <p>
                  If you're not satisfied with our response, you have the right to escalate your complaint to external bodies:
                </p>

                <h3>1. Care Quality Commission (CQC)</h3>
                <p>
                  The CQC regulates and inspects health and social care services in England.
                </p>
                <ul>
                  <li><strong>Website:</strong> <a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cqc.org.uk</a></li>
                  <li><strong>Phone:</strong> 03000 616161</li>
                  <li><strong>Email:</strong> enquiries@cqc.org.uk</li>
                </ul>

                <h3>2. General Medical Council (GMC)</h3>
                <p>
                  For concerns about a doctor's professional conduct or fitness to practice.
                </p>
                <ul>
                  <li><strong>Website:</strong> <a href="https://www.gmc-uk.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.gmc-uk.org</a></li>
                  <li><strong>Phone:</strong> 0161 923 6602</li>
                </ul>

                <h3>3. Parliamentary and Health Service Ombudsman</h3>
                <p>
                  Independent service for complaints about NHS and private healthcare.
                </p>
                <ul>
                  <li><strong>Website:</strong> <a href="https://www.ombudsman.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ombudsman.org.uk</a></li>
                  <li><strong>Phone:</strong> 0345 015 4033</li>
                </ul>

                <h2>Confidentiality and Records</h2>
                <ul>
                  <li>All complaints are handled confidentially</li>
                  <li>We maintain records of all complaints for regulatory compliance</li>
                  <li>Your complaint will not affect your future treatment</li>
                  <li>Information is only shared with those involved in resolving the complaint</li>
                </ul>

                <h2>Anonymous Feedback</h2>
                <p>
                  If you prefer to provide feedback anonymously or have general concerns, you can do so. However, please note that anonymous complaints may limit our ability to investigate and respond to you directly.
                </p>

                <h2>Learning and Improvement</h2>
                <p>
                  We review all complaints regularly to identify trends and opportunities for improvement. Your feedback helps us enhance our services and patient experience.
                </p>

                <div className="bg-muted border border-border rounded-lg p-6 mt-8">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Need Help Making a Complaint?</h3>
                  <p className="text-muted-foreground mb-0">
                    If you need assistance making a complaint, we can help. You may also wish to involve a friend, family member, or advocate. Contact us at <a href="mailto:complaints@drsnaclinic.com" className="text-primary hover:underline">complaints@drsnaclinic.com</a> or call <a href={`tel:${contactInfo.phone.primary.number}`} className="text-primary hover:underline">{contactInfo.phone.primary.display}</a>.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </>
  );
}
