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
        inlineChildSections: true,
        children: [
          {
            id: "featured-pain-management",
            label: "Featured Regenerative Care",
            description: "Minimal, high-impact therapies led by Dr Abbas.",
            children: [
              {
                id: "stem-cell-treatment",
                label: "Stem Cell Therapy",
                href: "/treatments/pain-management/treatments/stem-cell-treatment",
              },
              {
                id: "arthrosamid-injection",
                label: "Arthrosamid Injections",
                href: "/treatments/pain-management/treatments/arthrosamid-injection",
              },
              {
                id: "physiotherapy",
                label: "Specialist Physiotherapy",
                href: "/treatments/pain-management/treatments/physiotherapy",
              },
            ],
          },
          {
            id: "regenerative-programmes",
            label: "Orthobiologic Programmes",
            description: "Biologic injections, cushioning gels, and rehab-driven care plans.",
            children: [
              {
                id: "platelet-rich-plasma",
                label: "PRP Therapy",
                href: "/treatments/pain-management/treatments/platelet-rich-plasma",
              },
              {
                id: "non-surgical-regenerative",
                label: "Non-Surgical Regenerative",
                href: "/treatments/pain-management/treatments/non-surgical-regenerative",
              },
              {
                id: "adipose-cell-therapy",
                label: "Adipose Therapy",
                href: "/treatments/pain-management/treatments/adipose-cell-therapy",
              },
              {
                id: "bmac-therapy",
                label: "BMAC Therapy",
                href: "/treatments/pain-management/treatments/bmac-therapy",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "gp-services",
    label: "GP Services",
    description: "Comprehensive private GP care and life optimization programs",
    href: "/treatments/private-gp",
    children: [
      {
        id: "private-gp",
        label: "Private GP",
        description: "Doctor-led general practice with concierge access",
        href: "/treatments/private-gp",
        skipCategoryStage: true,
        children: [
          {
            id: "health-screening",
            label: "Health Screening",
            description: "Advanced screening with same-day GP review",
            href: "/treatments/private-gp/services/health-screening",
          },
          {
            id: "illness",
            label: "Illness",
            description: "Rapid access consultations for acute concerns",
            href: "/treatments/private-gp/services/illness",
          },
          {
            id: "test-and-scan",
            label: "Test & Scan",
            description: "Point-of-care diagnostics, labs, and imaging",
            href: "/treatments/private-gp/services/test-and-scan",
          },
          {
            id: "gp-services-pricing",
            label: "GP Services Pricing",
            description: "Transparent consultation, membership, and procedure fees",
            href: "/treatments/private-gp/services/gp-services-pricing",
          },
          {
            id: "referrals-and-forms",
            label: "Referrals and Forms",
            description: "Specialist referrals, medical letters, visas, and more",
            href: "/treatments/private-gp/services/referrals-and-forms",
          },
        ],
      },
      {
        id: "life-optimization",
        label: "Life Optimization",
        description: "Longevity, metabolic, and performance medicine tailored around your biology",
        href: "/treatments/life-optimization",
        skipCategoryStage: true,
        children: [
          {
            id: "iv-vitamin-therapy",
            label: "IV Vitamin Therapy",
            description: "Targeted drips for cellular hydration and recovery",
            href: "/treatments/life-optimization/services/iv-vitamin-therapy",
          },
          {
            id: "medicated-weight-management",
            label: "Medicated Weight Management",
            description: "Doctor-supervised weight plans with pharmacological support",
            href: "/treatments/life-optimization/services/medicated-weight-management",
          },
          {
            id: "medical-nutrition-therapy",
            label: "Medical Nutrition Therapy",
            description: "Precision nutrition protocols designed by physicians",
            href: "/treatments/life-optimization/services/medical-nutrition-therapy",
          },
        ],
      },
    ],
  },
  {
    id: "about-us",
    label: "About Us",
    description: "Additional information and resources",
    href: "/about-us",
    children: [
      {
        id: "about",
        label: "About",
        description: "Learn about our expert team and world-class clinic",
        href: "/about-us",
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
      {
        id: "resources",
        label: "Resources",
        description: "Evidence-led guides for hair fall, intimacy, and longevity",
        href: "/resources",
      },
    ],
  },
]
