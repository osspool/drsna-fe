export const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Dr SNA Clinic",
  alternateName: "Dr Syed Nadeem Abbas Clinic",
  description:
    "Premier aesthetic medicine and regenerative treatment clinic in London",
  url: "https://drsnaclinic.com",
  telephone: "+447955836986",
  email: "info@drsnaclinic.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "48 Wimpole Street",
    addressLocality: "Marylebone, London",
    postalCode: "W1G 8SF",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "51.5175",
    longitude: "-0.1483",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: "Dr Syed Nadeem Abbas",
    jobTitle: "Aesthetic Medicine Specialist",
    description:
      "MSc | MRCGP | MRCSEd | MBBS - Masters in Aesthetic Plastic Surgery with Distinction",
  },
  medicalSpecialty: [
    "Aesthetic Medicine",
    "Dermatology",
    "Regenerative Medicine",
    "Pain Management",
  ],
  hasCredential: [
    "CQC Registered",
    "GMC Certified",
    "Masters in Aesthetic Plastic Surgery",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
  award:
    "Global Recognition Award 2024 - Excellence in Aesthetic & Regenerative Medicine",
};
