# Treatment Schema Template
**Comprehensive SEO Schema.org Fields for Medical Procedures**

## 📋 Template for `seo.schema` Block

Use this template when creating or updating treatment JSON files. Copy the entire schema block into your treatment's `seo.schema` field and fill in the relevant values.

```json
{
  "seo": {
    "metaTitle": "Treatment Name London | Alternative Name | Dr. SNA Clinic",
    "h1": "Treatment Name in London",
    "metaDescription": "Compelling 150-160 character description focusing on benefits and outcomes",
    "canonicalUrl": "/treatments/category/subcategory/treatment-slug",
    "keywords": [
      "primary keyword london",
      "secondary keyword",
      "problem-focused keyword",
      "solution keyword UK"
    ],
    "schema": {
      "@type": "MedicalProcedure",
      "procedureType": "NoninvasiveProcedure",
      "bodyLocation": "Specific anatomical location OR array of locations",
      "howPerformed": "Detailed 2-3 sentence explanation of the procedure steps, technique, and delivery method",
      "preparation": "What patients need to do before treatment - fasting, medications, test results",
      "followup": "Post-treatment care instructions, timeline, maintenance schedule",
      "outcome": "Expected results, timeline to see results, duration of effects",
      "medicationRequired": "Any medications used (local anaesthetic, sedation, etc) or 'None'",
      "medicalSpecialty": "Primary specialty (e.g., 'Aesthetic Medicine', 'Regenerative Medicine', 'Pain Management')",
      "relevantSpecialty": "Subspecialty if applicable (e.g., 'Trichology', 'Orthobiologics')",
      "isProprietary": false,
      "treatmentFrequency": "How often treatment is performed (e.g., '3 sessions 4 weeks apart, maintenance every 6 months')",
      "adverseOutcome": "Common side effects - be honest but reassuring",
      "seriousAdverseOutcome": {
        "name": "Rare serious complication (if applicable)",
        "probability": "Less than X%"
      },
      "contraindication": [
        "Absolute contraindication 1",
        "Absolute contraindication 2",
        "Relative contraindication with caution"
      ],
      "typicalTest": [
        "Diagnostic test 1",
        "Diagnostic test 2",
        "Assessment method 3"
      ],
      "clinicalFindings": [
        "Condition treated 1",
        "Condition treated 2",
        "Suitable patient profile"
      ]
    }
  }
}
```

---

## 🎯 Field Descriptions & Best Practices

### **Required Fields (Always Include)**

#### `@type`
- **Value:** `"MedicalProcedure"` (standard for all medical treatments)
- **Purpose:** Tells Google this is a medical procedure for rich snippets

#### `procedureType`
- **Common Values:**
  - `"NoninvasiveProcedure"` - Most aesthetic/regenerative treatments
  - `"SurgicalProcedure"` - Surgical interventions
  - `"DiagnosticProcedure"` - Assessments and tests
- **Purpose:** Categorizes the invasiveness level

#### `bodyLocation`
- **Format:** String OR Array of strings
- **Examples:**
  - Single: `"Scalp"`, `"Face"`, `"Knee joint"`
  - Multiple: `["Knee", "Hip", "Shoulder", "Spine"]`
- **Purpose:** Helps Google understand what body part is treated

#### `howPerformed`
- **Length:** 2-4 sentences (100-200 words)
- **Include:**
  - Collection method (if applicable)
  - Processing technique
  - Delivery method (injection, topical, etc.)
  - Guidance used (ultrasound, visual, etc.)
- **Example:**
  ```
  Blood is drawn from the patient, processed in a dual-spin centrifuge to concentrate platelets 5-6x baseline, then injected into the scalp using meso-gun or micro-needling technique with topical numbing
  ```

#### `preparation`
- **Length:** 1-2 sentences
- **Include:**
  - Pre-treatment requirements
  - Fasting if needed
  - Medication adjustments
  - What to avoid
- **Example:**
  ```
  Clean hair, no topical products on treatment day. Optional topical anaesthetic applied 30 minutes before procedure
  ```

#### `followup`
- **Length:** 2-3 sentences
- **Include:**
  - Immediate aftercare (first 24-48 hours)
  - Session schedule
  - Maintenance frequency
  - Long-term monitoring
- **Example:**
  ```
  Avoid washing hair for 24 hours. LED therapy and homecare regimen provided. Three sessions spaced 4 weeks apart, then maintenance every 6-9 months
  ```

#### `outcome`
- **Length:** 2-3 sentences
- **Include:**
  - Primary benefit
  - Timeline to see results
  - Duration of effects
  - Secondary benefits
- **Example:**
  ```
  Reduced hair shedding, increased hair thickness and density, reactivation of dormant follicles. Visible results at 8-12 weeks, peak results at 6 months
  ```

---

### **Important Fields (Include When Applicable)**

#### `medicationRequired`
- **Examples:**
  - `"Topical anaesthetic (optional)"`
  - `"Local anaesthetic, optional sedation"`
  - `"None"`
- **Purpose:** Transparency about what's used

#### `medicalSpecialty`
- **Common Values:**
  - `"Aesthetic Medicine"`
  - `"Regenerative Medicine"`
  - `"Pain Management"`
  - `"Dermatology"`
- **Purpose:** E-E-A-T signal for Google

#### `relevantSpecialty`
- **When to Use:** If there's a subspecialty
- **Examples:**
  - `"Trichology"` (for hair treatments)
  - `"Orthobiologics"` (for joint treatments)
  - `"Facial Aesthetics"` (for face procedures)

#### `treatmentFrequency`
- **Format:** Plain English description
- **Examples:**
  - `"3 initial sessions 4 weeks apart, then maintenance every 6-9 months"`
  - `"Single session with optional booster at 6 months"`
  - `"Typically 3-session protocol over 4 weeks, then annual maintenance"`

#### `adverseOutcome`
- **Be Honest:** List common, temporary side effects
- **Tone:** Reassuring but truthful
- **Example:**
  ```
  Temporary scalp tenderness, minor bruising, rare infection
  ```

#### `seriousAdverseOutcome`
- **Only Include If:** There's a rare but serious risk
- **Format:** Object with `name` and `probability`
- **Example:**
  ```json
  {
    "name": "Infection (rare)",
    "probability": "Less than 0.1%"
  }
  ```

#### `contraindication`
- **Format:** Array of strings
- **Include:**
  - Absolute contraindications (never suitable)
  - Relative contraindications (caution required)
- **Example:**
  ```json
  [
    "Active scalp infection",
    "Platelet disorders",
    "Severe anemia",
    "Uncontrolled diabetes",
    "Complete baldness (non-active follicles)"
  ]
  ```

#### `typicalTest`
- **Format:** Array of diagnostic tests
- **Examples:**
  ```json
  [
    "Blood tests",
    "MRI scan",
    "Physical examination",
    "Gait analysis"
  ]
  ```

#### `clinicalFindings`
- **Format:** Array of conditions/diagnoses
- **Purpose:** Shows what this treatment addresses
- **Example:**
  ```json
  [
    "Osteoarthritis Grade 1-4",
    "Meniscal tears",
    "Cartilage damage",
    "Patellar tendinopathy"
  ]
  ```

---

## 📊 Complete Examples by Category

### Example 1: Hair Treatment (PRP Hair)
```json
"schema": {
  "@type": "MedicalProcedure",
  "procedureType": "NoninvasiveProcedure",
  "bodyLocation": "Scalp",
  "howPerformed": "Blood is drawn from the patient, processed in a dual-spin centrifuge to concentrate platelets 5-6x baseline, then injected into the scalp using meso-gun or micro-needling technique with topical numbing",
  "preparation": "Clean hair, no topical products on treatment day. Optional topical anaesthetic applied 30 minutes before procedure",
  "followup": "Avoid washing hair for 24 hours. LED therapy and homecare regimen provided. Three sessions spaced 4 weeks apart, then maintenance every 6-9 months",
  "outcome": "Reduced hair shedding, increased hair thickness and density, reactivation of dormant follicles. Visible results at 8-12 weeks, peak results at 6 months",
  "medicationRequired": "Topical anaesthetic (optional)",
  "medicalSpecialty": "Aesthetic Medicine",
  "relevantSpecialty": "Trichology",
  "isProprietary": false,
  "treatmentFrequency": "3 initial sessions 4 weeks apart, then maintenance every 6-9 months",
  "adverseOutcome": "Temporary scalp tenderness, minor bruising, rare infection",
  "contraindication": [
    "Active scalp infection",
    "Platelet disorders",
    "Severe anemia",
    "Uncontrolled diabetes",
    "Complete baldness (non-active follicles)"
  ]
}
```

### Example 2: Joint Treatment (BMAC)
```json
"schema": {
  "@type": "MedicalProcedure",
  "procedureType": "NoninvasiveProcedure",
  "bodyLocation": ["Knee", "Hip", "Shoulder", "Spine", "Elbow", "Wrist"],
  "howPerformed": "Bone marrow is aspirated from the iliac crest under local anaesthetic, concentrated using lab-grade centrifuge, and injected under ultrasound guidance into damaged joints or tissues",
  "preparation": "Medical clearance, blood tests, fasting 4 hours before procedure. Local anaesthetic with optional conscious sedation",
  "followup": "Initial rest for 72 hours, then progressive rehabilitation with physiotherapy. Follow-up imaging at 12 weeks",
  "outcome": "Cartilage regeneration, reduced inflammation, pain relief, improved joint function. Results develop over 8-12 weeks",
  "medicationRequired": "Local anaesthetic, optional sedation",
  "medicalSpecialty": "Regenerative Medicine",
  "relevantSpecialty": "Orthobiologics",
  "isProprietary": false,
  "seriousAdverseOutcome": {
    "name": "Infection (rare)",
    "probability": "Less than 0.1%"
  },
  "typicalTest": [
    "MRI scan",
    "Blood tests",
    "Physical examination"
  ],
  "contraindication": [
    "Active infection",
    "Severe anemia",
    "Coagulation disorders",
    "Active cancer"
  ]
}
```

### Example 3: Facial Treatment (Dermal Fillers)
```json
"schema": {
  "@type": "MedicalProcedure",
  "procedureType": "NoninvasiveProcedure",
  "bodyLocation": ["Face", "Cheeks", "Lips", "Jawline"],
  "howPerformed": "Hyaluronic acid filler is injected using fine needles or cannula into specific facial areas to restore volume, define contours, or smooth wrinkles. Numbing cream applied beforehand",
  "preparation": "Avoid blood thinners 48 hours before. Clean face, no makeup on treatment day",
  "followup": "Avoid exercise, alcohol, and extreme heat for 24 hours. Minor swelling resolves in 2-3 days. Results last 12-18 months",
  "outcome": "Immediate volume restoration, smoother skin, defined facial contours. Full settling at 2 weeks",
  "medicationRequired": "Topical anaesthetic cream",
  "medicalSpecialty": "Aesthetic Medicine",
  "relevantSpecialty": "Facial Aesthetics",
  "isProprietary": false,
  "treatmentFrequency": "Single session, top-ups every 12-18 months",
  "adverseOutcome": "Temporary swelling, bruising, tenderness at injection sites",
  "contraindication": [
    "Pregnancy or breastfeeding",
    "Active skin infection",
    "Allergy to hyaluronic acid",
    "Autoimmune conditions affecting skin"
  ]
}
```

---

## ✅ Quality Checklist

Before saving your treatment JSON, verify:

- [ ] `@type` is set to `"MedicalProcedure"`
- [ ] `procedureType` accurately describes invasiveness
- [ ] `bodyLocation` is specific (not just "body")
- [ ] `howPerformed` is 2-4 sentences with technique details
- [ ] `preparation` includes patient instructions
- [ ] `followup` includes aftercare AND maintenance
- [ ] `outcome` specifies timeline and duration
- [ ] `medicationRequired` is transparent
- [ ] `contraindication` array has 3-5 items
- [ ] All descriptions are patient-friendly (avoid jargon)
- [ ] No placeholder text like "TBD" or "TODO"

---

## 🚀 SEO Impact

Properly filled schema fields enable:

✅ **Rich Snippets in Google Search**
- Procedure type badge
- Body location indication
- Expected results preview
- Duration and recovery time

✅ **Medical Knowledge Graph**
- Google understands your treatment
- Shows in relevant health searches
- Appears in "People also ask"

✅ **Voice Search Optimization**
- Clear outcome descriptions
- Conversational language
- Answers common questions

✅ **E-E-A-T Signals**
- Medical specialty indication
- Contraindication transparency
- Professional outcome expectations

---

## 📝 Notes

- **Be Specific:** Don't just say "face" - say "Cheeks, Lips, Nasolabial Folds"
- **Be Honest:** Include contraindications and adverse outcomes
- **Be Patient-Friendly:** Write for patients, not doctors
- **Be Consistent:** Use same format across all treatments
- **Update Regularly:** Review every 6 months for accuracy

---

**Last Updated:** November 19, 2025  
**Maintained By:** SEO Team  
**Contact:** Review `lib/seo-helpers.js` for implementation details

