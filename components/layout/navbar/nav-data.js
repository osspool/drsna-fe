// Structured navigation data kept in sync with data/categories.json + treatment metadata
export const navigationData = [
  {
    id: "aesthetic-medicine",
    label: "Aesthetic Medicine",
    description: "Advanced non-surgical treatments for facial rejuvenation and enhancement",
    href: "/treatments/aesthetic-medicine",
    children: [
      {
        id: "face",
        label: "Face",
        description: "Facial aesthetic treatments",
        href: "/treatments/aesthetic-medicine/face",
        children: [
          { id: "prp-facelift", label: "PRP Facelift", href: "/treatments/aesthetic-medicine/face/prp-facelift" },
          {
            id: "non-surgical-blepharoplasty",
            label: "Eye Lift",
            href: "/treatments/aesthetic-medicine/face/non-surgical-blepharoplasty",
          },
          { id: "dermal-fillers", label: "Dermal Fillers", href: "/treatments/aesthetic-medicine/face/dermal-fillers" },
          { id: "anti-wrinkle", label: "Anti-Wrinkle", href: "/treatments/aesthetic-medicine/face/anti-wrinkle" },
          { id: "lip-enhancement", label: "Lip Fillers", href: "/treatments/aesthetic-medicine/face/lip-enhancement" },
          { id: "jawline-reduction", label: "Jawline Sculpt", href: "/treatments/aesthetic-medicine/face/jawline-reduction" },
          {
            id: "tear-trough-treatment",
            label: "Tear Trough",
            href: "/treatments/aesthetic-medicine/face/tear-trough-treatment",
          },
          {
            id: "non-surgical-rhinoplasty",
            label: "Liquid Rhinoplasty",
            href: "/treatments/aesthetic-medicine/face/non-surgical-rhinoplasty",
          },
          { id: "skin-boosters", label: "Skin Boosters", href: "/treatments/aesthetic-medicine/face/skin-boosters" },
          { id: "nefertiti-neck-lift", label: "Nefertiti Lift", href: "/treatments/aesthetic-medicine/face/nefertiti-neck-lift" },
          { id: "cheek-augmentation", label: "Cheek Contour", href: "/treatments/aesthetic-medicine/face/cheek-augmentation" },
          { id: "polynucleotide", label: "PN Face", href: "/treatments/aesthetic-medicine/face/polynucleotide" },
          {
            id: "double-chin-treatment",
            label: "Double Chin",
            href: "/treatments/aesthetic-medicine/face/double-chin-treatment",
          },
          { id: "spot-injection", label: "Spot Rescue", href: "/treatments/aesthetic-medicine/face/spot-injection" },
        ],
      },
      {
        id: "body",
        label: "Body",
        description: "Body contouring and enhancement",
        href: "/treatments/aesthetic-medicine/body",
        children: [
          {
            id: "buttock-augmentation-lanluma",
            label: "Lanluma Buttock",
            href: "/treatments/aesthetic-medicine/body/buttock-augmentation-lanluma",
          },
          {
            id: "buttock-augmentation-dermal",
            label: "HA Buttock Fillers",
            href: "/treatments/aesthetic-medicine/body/buttock-augmentation-dermal",
          },
          {
            id: "excessive-sweating",
            label: "Hyperhidrosis",
            href: "/treatments/aesthetic-medicine/body/excessive-sweating",
          },
          {
            id: "fat-reduction-cellulite",
            label: "Cellulite Reduction",
            href: "/treatments/aesthetic-medicine/body/fat-reduction-cellulite",
          },
          {
            id: "decolletage-treatment",
            label: "DAccolletage",
            href: "/treatments/aesthetic-medicine/body/decolletage-treatment",
          },
        ],
      },
      {
        id: "skin",
        label: "Skin",
        description: "Skin rejuvenation treatments",
        href: "/treatments/aesthetic-medicine/skin",
        children: [
          {
            id: "polynucleotide-skin",
            label: "PN Skin Booster",
            href: "/treatments/aesthetic-medicine/skin/polynucleotide-skin",
          },
          { id: "skin-range", label: "Skin Range", href: "/treatments/aesthetic-medicine/skin/skin-range" },
        ],
      },
      {
        id: "hair",
        label: "Hair",
        description: "Hair restoration treatments",
        href: "/treatments/aesthetic-medicine/hair",
        children: [
          { id: "prp-hair", label: "PRP Hair", href: "/treatments/aesthetic-medicine/hair/prp-hair" },
          { id: "exosome-treatment", label: "Exosome Hair", href: "/treatments/aesthetic-medicine/hair/exosome-treatment" },
          { id: "regenera-treatment", label: "RegeneraAr Hair", href: "/treatments/aesthetic-medicine/hair/regenera-treatment" },
          {
            id: "polynucleotide-hair",
            label: "PN Hair Booster",
            href: "/treatments/aesthetic-medicine/hair/polynucleotide-hair",
          },
        ],
      },
    ],
  },
  {
    id: "intimate-health",
    label: "Intimate Health",
    description: "Discreet, professional intimate wellness treatments",
    href: "/treatments/intimate-health",
    children: [
      {
        id: "male",
        label: "Male",
        description: "Men's intimate health treatments",
        href: "/treatments/intimate-health/male",
        children: [
          { id: "p-shot", label: "P-Shot", href: "/treatments/intimate-health/male/p-shot" },
          { id: "shockwave-therapy", label: "Shockwave Therapy", href: "/treatments/intimate-health/male/shockwave-therapy" },
          { id: "peyronies-disease", label: "Peyronie's Plan", href: "/treatments/intimate-health/male/peyronies-disease" },
          {
            id: "lichen-sclerosis-male",
            label: "Lichen Sclerosus Relief",
            href: "/treatments/intimate-health/male/lichen-sclerosis-male",
          },
        ],
      },
      {
        id: "female",
        label: "Female",
        description: "Women's intimate health treatments",
        href: "/treatments/intimate-health/female",
        children: [
          { id: "prp-shot-women", label: "O-Shot", href: "/treatments/intimate-health/female/prp-shot-women" },
          { id: "ultra-femme-360", label: "Ultra Femme 360", href: "/treatments/intimate-health/female/ultra-femme-360" },
          { id: "btl-emsella-chair", label: "EMSELLA Chair", href: "/treatments/intimate-health/female/btl-emsella-chair" },
          {
            id: "lichen-sclerosis-female",
            label: "Lichen Sclerosus Relief",
            href: "/treatments/intimate-health/female/lichen-sclerosis-female",
          },
        ],
      },
    ],
  },
  {
    id: "pain-management",
    label: "Pain Management",
    description: "Regenerative treatments for chronic pain relief",
    href: "/treatments/pain-management",
    skipCategoryStage: true,
    inlineChildSections: true,
    children: [
      {
        id: "conditions",
        label: "Conditions",
        description: "Treated conditions",
        href: "/treatments/pain-management/conditions",
        children: [
          { id: "knee-treatment", label: "Knee Relief", href: "/treatments/pain-management/conditions/knee-treatment" },
          { id: "hip-treatment", label: "Hip Relief", href: "/treatments/pain-management/conditions/hip-treatment" },
          { id: "elbow-treatment", label: "Elbow Relief", href: "/treatments/pain-management/conditions/elbow-treatment" },
          {
            id: "foot-ankle-treatment",
            label: "Foot & Ankle Relief",
            href: "/treatments/pain-management/conditions/foot-ankle-treatment",
          },
          {
            id: "hand-wrist-treatment",
            label: "Hand & Wrist Relief",
            href: "/treatments/pain-management/conditions/hand-wrist-treatment",
          },
          {
            id: "shoulder-treatment",
            label: "Shoulder Relief",
            href: "/treatments/pain-management/conditions/shoulder-treatment",
          },
        ],
      },
      {
        id: "treatments",
        label: "Treatments",
        description: "Available treatment methods",
        href: "/treatments/pain-management/treatments",
        children: [
          {
            id: "non-surgical-regenerative",
            label: "Non-Surgical Regenerative",
            href: "/treatments/pain-management/treatments/non-surgical-regenerative",
          },
          {
            id: "platelet-rich-plasma",
            label: "PRP Therapy",
            href: "/treatments/pain-management/treatments/platelet-rich-plasma",
          },
          {
            id: "adipose-cell-therapy",
            label: "Adipose Therapy",
            href: "/treatments/pain-management/treatments/adipose-cell-therapy",
          },
          { id: "bmac-therapy", label: "BMAC Therapy", href: "/treatments/pain-management/treatments/bmac-therapy" },
          { id: "physiotherapy", label: "Physiotherapy", href: "/treatments/pain-management/treatments/physiotherapy" },
          {
            id: "arthrosamid-injection",
            label: "ArthrosamidAr",
            href: "/treatments/pain-management/treatments/arthrosamid-injection",
          },
        ],
      },
    ],
  },
  {
    id: "life-optimization",
    label: "Life Optimization",
    description: "Longevity, metabolic, and performance medicine tailored around your biology",
    href: "/treatments/life-optimization",
    children: [
      {
        id: "longevity-programmes",
        label: "Longevity Programmes",
        description: "Cellular diagnostics, peptides, and hormone balancing",
        href: "/treatments/life-optimization/longevity-programmes",
      },
      {
        id: "metabolic-performance",
        label: "Metabolic Performance",
        description: "Advanced labs, IV therapy, and nutrition protocols",
        href: "/treatments/life-optimization/metabolic-performance",
      },
      {
        id: "executive-health",
        label: "Executive Health",
        description: "Concierge screening and proactive prevention plans",
        href: "/treatments/life-optimization/executive-health",
      },
      {
        id: "hormone-optimization",
        label: "Hormone Optimisation",
        description: "Bioidentical therapy with continuous monitoring",
        href: "/treatments/life-optimization/hormone-optimization",
      },
    ],
  },
  {
    id: "private-gp",
    label: "Private GP",
    description: "Doctor-led general practice with concierge access",
    href: "/private-gp",
    children: [
      {
        id: "same-day-appointments",
        label: "Same-Day Appointments",
        description: "Extended consultations in discreet suites",
        href: "/private-gp/same-day-appointments",
      },
      {
        id: "executive-screening",
        label: "Executive Screening",
        description: "Full diagnostics, imaging, and lifestyle coaching",
        href: "/private-gp/executive-screening",
      },
      {
        id: "family-care",
        label: "Family Care",
        description: "Continuity GP support for every life stage",
        href: "/private-gp/family-care",
      },
      {
        id: "health-concierge",
        label: "Health Concierge",
        description: "24/7 doctor access, referrals, and aftercare",
        href: "/private-gp/health-concierge",
      },
    ],
  },
  {
    id: "about-us",
    label: "About Us",
    description: "Additional information and resources",
    href: "/about",
    children: [
      {
        id: "about",
        label: "About",
        description: "Learn about our expert team and world-class clinic",
        href: "/about",
      },
      {
        id: "team",
        label: "Our Team",
        description: "Meet our GMC-registered doctors and specialists",
        href: "/team",
      },
      {
        id: "dr-syed-nadeem-abbas",
        label: "Dr Syed Nadeem Abbas",
        description: "Meet our award-winning aesthetic medicine specialist",
        href: "/dr-syed-nadeem-abbas",
      },
      {
        id: "contact",
        label: "Contact",
        description: "Get in touch with our team",
        href: "/contact",
      },
    ],
  },
]
