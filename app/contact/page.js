"use client";

import { CategoryHero } from "@/components/treatments/CategoryHero";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/landing/contact/ContactForm";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import Link from "next/link";

const heroData = {
  title: "Contact Us",
  tagline: "Get In Touch",
  hero: {
    headline: "Contact Dr. SNA Clinic",
    subheadline: "Reach out to our expert team for personalized consultations and world-class aesthetic care",
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+44 7955836986", "+44 2038467111"],
    action: "Call Now",
    actionLink: "tel:+447955836986",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@drsnaclinic.com"],
    action: "Send Email",
    actionLink: "mailto:info@drsnaclinic.com",
  },
  {
    icon: MapPin,
    title: "Clinic Address",
    details: ["48 Wimpole Street", "Marylebone", "London W1G 8SF, UK"],
    action: "Get Directions",
    actionLink: "https://maps.google.com?q=48+Wimpole+Street+Marylebone+London+W1G+8SF+UK",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero data={heroData} variant="subcategory" />

      {/* Contact Information Cards */}
      <section className="py-16 md:py-20 bg-background">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <ContactCard key={index} info={info} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24 bg-muted">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>
              <ContactForm />
            </motion.div>

            {/* Location & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        Our Location
                      </h3>
                    </div>
                    <Link
                      href="https://maps.google.com?q=48+Wimpole+Street+Marylebone+London+W1G+8SF+UK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
                    >
                      Get Directions
                    </Link>
                  </div>
                </div>
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5858558087814!2d-0.14918492345024!3d51.51804097181662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad554c335c1%3A0x4a61a58b0e66ff42!2s48%20Wimpole%20St%2C%20London%20W1G%208SF%2C%20UK!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. SNA Clinic Location"
                  />
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground">
                    Opening Hours
                  </h3>
                </div>
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-border last:border-0"
                    >
                      <span className="text-muted-foreground font-medium">
                        {schedule.day}
                      </span>
                      <span className="font-semibold text-foreground">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> For emergencies or urgent consultations, please call us directly.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Why Visit Section */}
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Visit Our Prestigious Wimpole Street Clinic
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              Located in the heart of London's renowned medical district, Dr. SNA Clinic offers world-class aesthetic treatments in a luxurious, private setting. Our state-of-the-art facility combines cutting-edge technology with personalized care to deliver exceptional results.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-left">
              {[
                {
                  title: "Expert Consultation",
                  description: "Personalized treatment plans tailored to your unique needs",
                },
                {
                  title: "Premium Location",
                  description: "Prestigious Wimpole Street address with excellent transport links",
                },
                {
                  title: "Flexible Appointments",
                  description: "Convenient scheduling to fit your busy lifestyle",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 min-w-[250px]">
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}

function ContactCard({ info, index }) {
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-500"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground mb-4">
          {info.title}
        </h3>
        <div className="space-y-2 mb-6">
          {info.details.map((detail, idx) => (
            <p key={idx} className="text-muted-foreground">
              {detail}
            </p>
          ))}
        </div>
        <Link
          href={info.actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all shadow-lg group-hover:shadow-xl"
        >
          {info.action}
        </Link>
      </div>
    </motion.div>
  );
}
