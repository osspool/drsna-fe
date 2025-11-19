import { contactInfo, getSchemaAddress, getSchemaOpeningHours } from "./contact-info";

export const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: contactInfo.clinic.name,
  alternateName: contactInfo.clinic.legalName,
  description:
    "Premier aesthetic medicine and regenerative treatment clinic in London",
  url: contactInfo.urls.website,
  telephone: contactInfo.phone.primary.number,
  email: contactInfo.email.primary,
  address: getSchemaAddress(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: contactInfo.geo.latitude,
    longitude: contactInfo.geo.longitude,
  },
  openingHoursSpecification: getSchemaOpeningHours(),
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
