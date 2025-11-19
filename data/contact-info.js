/**
 * Single Source of Truth for Contact Information
 * Update this file to propagate changes across the entire application
 */

export const contactInfo = {
  clinic: {
    name: "Dr SNA Clinic",
    legalName: "Dr Syed Nadeem Abbas Clinic",
    tagline: "Premier Aesthetic & Regenerative Medicine",
  },
  
  address: {
    streetAddress: "48 Wimpole Street",
    addressLocality: "Marylebone",
    addressRegion: "London",
    postalCode: "W1G 8SF",
    addressCountry: "GB",
    addressCountryName: "United Kingdom",
    // Full formatted address for display
    formatted: "48 Wimpole Street, Marylebone, London W1G 8SF, UK",
    // For Google Maps links
    googleMapsQuery: "48+Wimpole+Street,+Marylebone,+London+W1G+8SF,+UK",
  },

  phone: {
    primary: {
      number: "+447955836986",
      formatted: "+44 7955 836986",
      display: "+44 7955 836986",
      type: "primary",
      label: "Primary Contact",
    },
    secondary: {
      number: "+442038467111",
      formatted: "+44 20 3846 7111",
      display: "+44 20 3846 7111",
      type: "secondary",
      label: "Office Line",
    },
  },

  email: {
    primary: "info@slategrey-zebra-994132.hostingersite.com",
    general: "info@slategrey-zebra-994132.hostingersite.com",
    // Add other emails as needed
    // appointments: "appointments@drsnaclinic.com",
    // support: "support@drsnaclinic.com",
  },

  social: {
    facebook: "https://facebook.com/drsnaclinic",
    instagram: "https://instagram.com/drsnaclinic",
    twitter: "https://twitter.com/drsnaclinic",
    linkedin: "https://linkedin.com/company/drsnaclinic",
  },

  geo: {
    latitude: "51.5175",
    longitude: "-0.1483",
  },

  hours: {
    monday: { opens: "09:00", closes: "18:00" },
    tuesday: { opens: "09:00", closes: "18:00" },
    wednesday: { opens: "09:00", closes: "18:00" },
    thursday: { opens: "09:00", closes: "18:00" },
    friday: { opens: "09:00", closes: "18:00" },
    saturday: { opens: "09:00", closes: "18:00" },
    sunday: { opens: null, closes: null }, // Closed
  },

  // URLs
  urls: {
    website: "https://drsnaclinic.com",
    booking: "https://drsnaclinic.com/contact",
    logo: "https://drsnaclinic.com/dr-sna-clinic-logo.png",
  },
};

/**
 * Helper function to get all phone numbers
 */
export function getAllPhoneNumbers() {
  return Object.values(contactInfo.phone).filter(p => p.number);
}

/**
 * Helper function to get primary phone
 */
export function getPrimaryPhone() {
  return contactInfo.phone.primary;
}

/**
 * Helper function to get formatted address
 */
export function getFormattedAddress(includeCountry = true) {
  const { streetAddress, addressLocality, addressRegion, postalCode, addressCountryName } = contactInfo.address;
  
  if (includeCountry) {
    return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}, ${addressCountryName}`;
  }
  return `${streetAddress}, ${addressLocality}, ${addressRegion} ${postalCode}`;
}

/**
 * Helper function to get Google Maps link
 */
export function getGoogleMapsLink() {
  return `https://www.google.com/maps/search/?api=1&query=${contactInfo.address.googleMapsQuery}`;
}

/**
 * Helper function to get schema.org formatted address
 */
export function getSchemaAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address.streetAddress,
    addressLocality: contactInfo.address.addressLocality,
    addressRegion: contactInfo.address.addressRegion,
    postalCode: contactInfo.address.postalCode,
    addressCountry: contactInfo.address.addressCountry,
  };
}

/**
 * Helper function to get schema.org opening hours
 */
export function getSchemaOpeningHours() {
  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ];
}

