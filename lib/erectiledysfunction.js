import { edSiteConfig } from "@/data/pages/erectiledysfunction/site-config";

export async function getEDPageData() {
  return {
    siteConfig: edSiteConfig,
    hero: {
      image: "/images/erectile-dysfunction/ed-hero-bold.png", // Placeholder for now
      videoUrl: "https://www.youtube.com/watch?v=nUqENQZHd80",
      badge: "London's Premier ED Clinic",
      headline: "Erectile Dysfunction",
      headlinePrefix: "Non-Surgical",
      flipWords: ["Solutions", "Treatment", "Recovery", "Confidence"],
      subheadline: "Restore your vitality with advanced, regenerative treatments. <span class='text-primary font-medium'>Dr SNA Clinic</span> offers discreet, expert care using the P-Shot® and Shockwave Therapy.",
      primaryCTA: "Book Confidential Consultation",
      primaryCTAHref: "/contact",
      secondaryCTA: "View Treatments",
      secondaryCTAHref: "#treatments",
      trustIndicators: [
        "GMC Registered Specialist",
        "CQC Regulated Clinic",
        "100% Confidential",
        "Proven Results"
      ]
    },
    stats: {
      stats: [
        { value: "98%", label: "Patient Satisfaction" },
        { value: "2.5k+", label: "Treatments Performed" },
        { value: "15+", label: "Years Experience" },
        { value: "0%", label: "Side Effects" }
      ]
    },
    doctorCredentials: {
      name: "Dr Syed Nadeem Abbas",
      role: "Lead Aesthetic Physician",
      image: "/images/dr-abbas.jpg", // Ensure this exists or use a placeholder
      description: "Dr. Abbas is a leading specialist in men's sexual health and regenerative medicine. With over 15 years of experience, he has helped thousands of men regain their confidence through non-surgical, evidence-based treatments.",
      qualifications: ["MBBS", "MRCP", "GMC Registered", "CQC Registered Manager"]
    },
    benefits: {
      title: "Why Choose Non-Surgical Treatment?",
      subtitle: "Modern medicine offers effective alternatives to pills and surgery.",
      features: [
        {
          title: "Natural Regeneration",
          description: "Treatments like P-Shot use your body's own healing mechanisms.",
          icon: "leaf"
        },
        {
          title: "No Downtime",
          description: "Walk in, walk out procedures. Resume normal activities immediately.",
          icon: "clock"
        },
        {
          title: "Long-Lasting Results",
          description: "Enjoy improvements that can last for 12-18 months or more.",
          icon: "calendar"
        }
      ]
    },
    intro: {
      heading: "You Are Not Alone",
      content: "Erectile dysfunction affects millions of men, but it doesn't have to define your life. At <a href='https://drsnaclinic.com' class='text-primary hover:underline font-medium' target='_blank'>Dr SNA Clinic</a>, our specialized London facility, we offer hope through cutting-edge, regenerative medicine. We understand the emotional toll ED can take, and we are here to help you regain not just your function, but your confidence and connection.",
    },
    treatments: {
      badge: "OUR SOLUTIONS",
      title: "Advanced Medical Treatments",
      subtitle: "We specialize in non-invasive, regenerative therapies that treat the root cause of ED, not just the symptoms.",
      categories: [
        {
          icon: "activity",
          title: "P-Shot® (Priapus Shot)",
          description: "Revolutionary PRP therapy using your body's own growth factors to rejuvenate tissue and improve blood flow.",
          href: "/treatments/intimate-health/male/p-shot",
          image: "/images/treatments/p-shot-hero.jpg",
          treatments: ["Natural Growth Factors", "Improved Blood Flow", "Enhanced Sensitivity", "No Downtime"]
        },
        {
          icon: "zap",
          title: "Shockwave Therapy",
          description: "Clinically proven low-intensity sound waves that stimulate new blood vessel growth and break down micro-plaque.",
          href: "/treatments/intimate-health/male/shockwave-therapy",
          image: "/images/treatments/shockwave-hero.jpg",
          treatments: ["Non-Invasive", "Pain-Free", "Long-Lasting Results", "Scientifically Proven"]
        }
      ],
      cta: {
        text: "Compare Treatments",
        href: "/treatments/intimate-health"
      }
    },
    process: {
      title: "Your Journey to Recovery",
      subtitle: "Simple, discreet, and effective steps to reclaiming your vitality.",
      steps: [
        {
          title: "Consultation",
          description: "Private discussion with Dr. Abbas to understand your needs and medical history."
        },
        {
          title: "Custom Plan",
          description: "Tailored treatment plan designed specifically for your condition and goals."
        },
        {
          title: "Treatment",
          description: "Quick, comfortable procedure performed in our state-of-the-art clinic."
        },
        {
          title: "Results",
          description: "Follow-up care to ensure optimal results and satisfaction."
        }
      ]
    },
    testimonials: [
      {
        name: "James R.",
        text: "I was skeptical at first, but the P-Shot has been a game changer. Dr. Abbas made me feel completely at ease.",
        rating: 5
      },
      {
        name: "Michael T.",
        text: "Shockwave therapy worked wonders for me. No pills, no side effects, just results. Highly recommend.",
        rating: 5
      },
      {
        name: "David L.",
        text: "Professional, discreet, and effective. The best investment I've made in myself in years.",
        rating: 5
      }
    ],
    whyChoose: {
      title: "Why Dr SNA Clinic?",
      subtitle: "We are London's trusted experts in men's regenerative health.",
      features: [
        {
          title: "Expert Care",
          description: "Treatments performed by GMC registered specialists.",
          icon: "award"
        },
        {
          title: "Latest Technology",
          description: "We use only the most advanced, FDA-approved equipment.",
          icon: "cpu"
        },
        {
          title: "Discreet Service",
          description: "Your privacy is guaranteed from start to finish.",
          icon: "shield"
        },
        {
          title: "Holistic Approach",
          description: "We treat the whole person, not just the symptoms.",
          icon: "heart"
        }
      ]
    },
    faq: [
      {
        question: "Is the treatment painful?",
        answer: "Most of our treatments, including the P-Shot and Shockwave therapy, are minimally invasive and involve little to no discomfort. We prioritize your comfort at every step."
      },
      {
        question: "How quickly will I see results?",
        answer: "Many patients report improvements within a few weeks, with optimal results developing over a course of treatments. Individual results may vary."
      },
      {
        question: "Is it confidential?",
        answer: "Absolutely. We operate with the strictest confidentiality and discretion. Your privacy is our paramount concern."
      },
      {
        question: "Do I need a referral?",
        answer: "No, you do not need a GP referral. You can book directly with our specialist, Dr. Abbas."
      }
    ],
    cta: {
      title: "Ready to Restore Your Confidence?",
      subtitle: "Book a confidential consultation with Dr. Abbas today.",
      primaryButton: "Book Now",
      primaryButtonHref: "/contact",
      secondaryButton: "Call Us",
      secondaryButtonHref: "tel:+442012345678" // Update with real number if available
    }
  };
}
