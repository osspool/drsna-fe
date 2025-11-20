const fs = require('fs');

// Read the original JSON file
const data = JSON.parse(fs.readFileSync('d:/projects/it/clinic/demo/data/intimate-health/male/treatments/p-shot.json', 'utf8'));

// Add detailedFeatures section
data.detailedFeatures = {
    title: "The Science of Penile Regeneration",
    paragraphs: [
        "The P-Shot works by harnessing the regenerative power of your own body. Platelet-Rich Plasma (PRP) is packed with growth factors that stimulate the repair of aged or damaged tissues.",
        "When injected into the penile tissue, these growth factors trigger the formation of new blood vessels (angiogenesis) and the rejuvenation of nerve endings. This dual action improves blood flow for stronger erections and enhances sensitivity for greater pleasure."
    ],
    features: [
        {
            icon: "activity",
            title: "Angiogenesis",
            description: "Formation of new blood vessels improves circulation and erectile quality."
        },
        {
            icon: "sparkles",
            title: "Nerve Rejuvenation",
            description: "Restores sensitivity and enhances sexual pleasure."
        },
        {
            icon: "shield-check",
            title: "Tissue Repair",
            description: "Heals micro-trauma and improves tissue elasticity."
        },
        {
            icon: "zap",
            title: "Natural Enhancement",
            description: "Uses your body's own healing mechanisms for safe, long-lasting results."
        }
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    imageAlt: "Scientific illustration of cellular regeneration"
};

// Add doctorQuote section
data.doctorQuote = {
    title: "Restoring Confidence Through Science",
    paragraphs: [
        "At Dr. SNA Clinic, we believe that sexual health is a vital part of overall well-being. The P-Shot offers a scientifically backed, non-surgical solution for men seeking to improve their performance and confidence.",
        "Our approach combines medical expertise with a deep understanding of men's health needs, ensuring a comfortable and effective treatment experience."
    ],
    quote: {
        text: "The P-Shot is more than just a treatment; it's a pathway to renewed confidence and intimacy. Seeing our patients regain their vitality is the most rewarding part of my practice.",
        cite: "Dr. Syed Abbas, Medical Director",
        logoSrc: "/images/logos/drsna-logo-dark.svg"
    },
    images: {
        light: "/images/treatment/intimate-health/dr-syed-abbas.jpg",
        dark: "/images/treatment/intimate-health/dr-syed-abbas.jpg",
        altLight: "Dr. Syed Abbas",
        altDark: "Dr. Syed Abbas"
    }
};

// Write the updated JSON back to the file with proper formatting
fs.writeFileSync('d:/projects/it/clinic/demo/data/intimate-health/male/treatments/p-shot.json', JSON.stringify(data, null, 4), 'utf8');

console.log('Successfully added detailedFeatures and doctorQuote sections to p-shot.json');
