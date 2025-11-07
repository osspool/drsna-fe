import { Header } from "@/components/core/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuickStatsBlock } from "@/components/blocks/QuickStatsBlock";
import { OverviewBlock } from "@/components/blocks/OverviewBlock";
import { WhyChooseBlock } from "@/components/blocks/WhyChooseBlock";
import { GalleryBlock } from "@/components/blocks/GalleryBlock";
import { TreatmentTestimonialsSection } from "@/components/treatments/TreatmentTestimonialsSection";
import { FAQBlock } from "@/components/blocks/FAQBlock";
import { CTASection } from "@/components/treatments/CTASection";
import { Footer } from "@/components/core/Footer";

const drAbbasData = {
  title: "Dr Syed Nadeem Abbas",
  tagline: "Transforming Lives Through Excellence in Aesthetic Medicine",
  description: "Meet London's most distinguished aesthetic medicine specialist, combining clinical precision with artistic vision to deliver natural, confidence-enhancing results.",

  hero: {
    backgroundImage: "/images/drsnaclinic/doctor-hero.jpg",
    badge: "GLOBAL RECOGNITION AWARD 2024",
    headline: "Meet Dr Syed Nadeem Abbas",
    subheadline: "Pioneer in Advanced Aesthetic Medicine",
  },

  quickStats: {
    stats: [
      {
        value: "15+",
        label: "Years Experience",
        description: "Mastering aesthetic excellence"
      },
      {
        value: "10,000+",
        label: "Happy Patients",
        description: "Lives transformed with care"
      },
      {
        value: "50+",
        label: "Awards Won",
        description: "Global recognition achieved"
      },
      {
        value: "98%",
        label: "Success Rate",
        description: "Exceptional outcomes delivered"
      }
    ]
  },

  overview: {
    title: "A Visionary in Aesthetic Medicine",
    content: "Dr Syed Nadeem Abbas stands at the forefront of aesthetic medicine, blending surgical precision with an artist's eye. With distinction-level qualifications including MSc, MRCGP, MRCSEd, and MBBS, he transforms aesthetic aspirations into reality through evidence-based treatments and compassionate care.\n\nDr Abbas believes true aesthetic excellence lies in enhancement, not transformation. His philosophy centers on celebrating your natural features while addressing concerns with subtle, sophisticated interventions that boost confidence without compromising authenticity.\n\nFrom training at prestigious institutions to pioneering innovative techniques, Dr Abbas has earned international acclaim. His commitment to continuous learning ensures you receive cutting-edge treatments backed by the latest medical science.",
    image: "/images/drsnaclinic/doctor-intro.jpg",
    highlights: [
      "MSc in Aesthetic Medicine (Distinction)",
      "MRCGP & MRCSEd Qualifications",
      "15+ Years Clinical Excellence",
      "10,000+ Successful Treatments",
      "International Recognition & Awards"
    ]
  },

  whyChooseDrSNA: {
    enabled: true,
    title: "Why Patients Choose Dr Abbas",
    subtitle: "Excellence that speaks through every consultation, treatment, and transformation",
    features: [
      {
        title: "Unmatched Expertise",
        description: "Over 15 years mastering advanced aesthetic techniques with surgical precision and artistic sensibility.",
        icon: "award"
      },
      {
        title: "Patient-Centered Care",
        description: "Every treatment plan is meticulously tailored to your unique features, concerns, and aesthetic goals.",
        icon: "shield"
      },
      {
        title: "Evidence-Based Results",
        description: "Combining cutting-edge medical science with proven techniques for safe, predictable outcomes.",
        icon: "check"
      },
      {
        title: "Holistic Approach",
        description: "Addressing not just aesthetics but overall wellness, confidence, and quality of life enhancement.",
        icon: "leaf"
      },
      {
        title: "Transparent Communication",
        description: "Honest consultations with realistic expectations, ensuring you're informed every step of the journey.",
        icon: "users"
      },
      {
        title: "Luxury Experience",
        description: "From consultation to aftercare, experience unparalleled service in a sophisticated, welcoming environment.",
        icon: "award"
      }
    ]
  },

  gallery: {
    title: "Dr Abbas: Behind the Excellence",
    subtitle: "A glimpse into our world-class clinic and personalized patient care",
    images: [
      {
        url: "/images/drsnaclinic/doctor-intro.jpg",
        alt: "Dr Syed Nadeem Abbas consulting with patient",
        caption: "Personalized consultations"
      },
      {
        url: "/images/drsnaclinic/doctor-hero.jpg",
        alt: "Dr Abbas in clinic",
        caption: "State-of-the-art facility"
      },
      {
        url: "/images/drsnaclinic/clinic-outside.jpg",
        alt: "Dr SNA Clinic exterior",
        caption: "Prestigious London location"
      }
    ]
  },

  testimonials: [
    {
      name: "Sarah M.",
      treatment: "Facial Rejuvenation",
      rating: 5,
      text: "Dr Abbas changed my life. His expertise and genuine care made me feel valued, not just another patient. The results exceeded every expectation.",
      location: "London, UK"
    },
    {
      name: "James K.",
      treatment: "P-Shot Treatment",
      rating: 5,
      text: "Professional, discreet, and incredibly knowledgeable. Dr Abbas restored my confidence with life-changing results. I'm forever grateful.",
      location: "Surrey, UK"
    },
    {
      name: "Emma R.",
      treatment: "Non-Surgical Facelift",
      rating: 5,
      text: "Natural, elegant results that have people asking my secret. Dr Abbas is a true artist with an exceptional medical background.",
      location: "Berkshire, UK"
    }
  ],

  faq: [
    {
      question: "What makes Dr Abbas different from other aesthetic practitioners?",
      answer: "Dr Abbas combines surgical-level qualifications (MRCSEd) with advanced aesthetic specialization (MSc Distinction), offering a unique blend of medical precision and artistic vision. His 15+ years of experience, commitment to evidence-based practice, and patient-centered approach set him apart in London's competitive aesthetic medicine landscape."
    },
    {
      question: "What qualifications does Dr Abbas hold?",
      answer: "Dr Abbas holds: MSc in Aesthetic Medicine (Distinction), MRCGP (Member of Royal College of General Practitioners), MRCSEd (Member of Royal College of Surgeons Edinburgh), and MBBS. He continuously updates his skills through international training and certifications in the latest aesthetic techniques."
    },
    {
      question: "How does Dr Abbas ensure natural-looking results?",
      answer: "Dr Abbas employs a philosophy of 'enhancement, not transformation.' He conducts thorough facial analysis, considers your unique features and proportions, and uses conservative, gradual approaches. His artistic eye combined with medical expertise ensures results that look naturally beautiful, never overdone."
    },
    {
      question: "What can I expect during a consultation with Dr Abbas?",
      answer: "Consultations are unhurried, comprehensive, and judgment-free. Dr Abbas listens carefully to your concerns, conducts detailed assessments, explains all options with realistic expectations, and collaboratively designs a personalized treatment plan. You'll leave feeling informed, confident, and excited about your aesthetic journey."
    },
    {
      question: "Does Dr Abbas treat both men and women?",
      answer: "Absolutely. Dr Abbas specializes in aesthetic treatments for all genders, with particular expertise in male-specific concerns including intimate health, facial rejuvenation, and body contouring. His discreet, professional approach makes him trusted by diverse patients seeking aesthetic enhancement."
    },
    {
      question: "How do I book a consultation with Dr Abbas?",
      answer: "Booking is simple: call our clinic at 020 7123 4567, use our online booking system, or email info@drsnaclinic.com. Initial consultations are comprehensive, allowing ample time to discuss your goals, ask questions, and create your personalized treatment roadmap."
    }
  ],

  cta: {
    title: "Begin Your Transformation Journey",
    subtitle: "Experience the Dr Abbas difference - where medical excellence meets artistic vision",
    primaryButton: "Book Your Consultation",
    secondaryButton: "Explore Treatments"
  }
};

export const metadata = {
  title: "Dr Syed Nadeem Abbas | Award-Winning Aesthetic Medicine Specialist London",
  description: "Meet Dr Syed Nadeem Abbas (MSc, MRCGP, MRCSEd, MBBS), London's most distinguished aesthetic medicine specialist. 15+ years experience, 10,000+ happy patients, globally recognized excellence.",
  keywords: "Dr Syed Nadeem Abbas, aesthetic doctor London, Dr SNA, best aesthetic practitioner UK, facial rejuvenation specialist, intimate health expert London, award-winning cosmetic doctor",
  openGraph: {
    title: "Dr Syed Nadeem Abbas | Leading Aesthetic Medicine Specialist",
    description: "Award-winning aesthetic medicine specialist with 15+ years experience transforming lives through excellence, precision, and artistry.",
    images: ["/images/drsnaclinic/doctor-hero.jpg"],
    type: "profile",
  },
};

export default function DrAbbasPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          videoUrl="https://www.youtube.com/watch?v=nUqENQZHd80"
          badge="GLOBAL RECOGNITION AWARD 2024"
          headline="Dr Syed Nadeem Abbas"
          flipWords={["Excellence", "Precision", "Artistry", "Compassion"]}
          subheadline='Transforming lives through <span class="text-primary font-semibold">surgical precision</span>, <span class="text-primary font-semibold">artistic vision</span>, and <span class="text-primary font-semibold">15+ years mastery</span>'
          primaryCTA="Book Your Consultation"
          primaryCTAHref="/booking"
          secondaryCTA="Explore Treatments"
          secondaryCTAHref="/treatments"
          trustIndicators={[
            "MSc (Distinction)",
            "MRCGP | MRCSEd | MBBS",
            "15+ Years Experience",
            "10,000+ Happy Patients"
          ]}
        />

        {/* Quick Stats */}
        <QuickStatsBlock data={drAbbasData.quickStats} />

        {/* Overview/Biography */}
        <OverviewBlock data={drAbbasData.overview} />

        {/* Why Choose Dr Abbas */}
        <WhyChooseBlock data={drAbbasData.whyChooseDrSNA} />

        {/* Gallery */}
        <GalleryBlock data={drAbbasData.gallery} />

        {/* Patient Testimonials */}
        <TreatmentTestimonialsSection testimonials={drAbbasData.testimonials} />

        {/* FAQ Section */}
        <FAQBlock data={{ heading: "Frequently Asked Questions", items: drAbbasData.faq }} />

        {/* CTA Section */}
        <CTASection data={drAbbasData.cta} />
      </main>
      <Footer />
    </>
  );
}
