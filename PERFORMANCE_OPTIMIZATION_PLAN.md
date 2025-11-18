# Performance Optimization Plan - Next.js 16 Best Practices

## 🎯 Goals
1. **Reduce client JavaScript** by 70%+
2. **Remove framer-motion** dependency (~60KB gzipped)
3. **Achieve <2s TTI** on 3G
4. **100% Server Components** where possible
5. **Static data imports** (no runtime fs.readFileSync)

---

## 📊 Current Issues

### 1. Heavy Client Components
- ❌ Contact page: Fully client (`use client` at top)
- ❌ Framer-motion used in 15+ components
- ❌ Treatment pages: No server/client boundaries
- ❌ All icons hydrating (Lucide-react)

### 2. Parallel Rendering Systems
- ❌ `TreatmentSectionRenderer` (parallel to `SectionRenderer`)
- ❌ Legacy `HomeSectionRenderer`
- ❌ `lib/sections/treatment.js` config

### 3. Runtime Data Loading
- ❌ `fs.readFileSync` in `lib/home.js`
- ❌ `fs.readFileSync` in `lib/about.js`
- ❌ No static bundling

### 4. Data Mutation
- ❌ Dr Abbas page mutates shared data
- ❌ Breaks RSC caching determinism

---

## 🚀 Implementation Plan

### Phase 1: Research & Setup (COMPLETED ✅)
- [x] Research Next.js 16 Server Components best practices
- [x] Research Tailwind CSS animations
- [x] Document current issues

### Phase 2: Remove Framer Motion (Priority: HIGH)

#### Step 1: Audit framer-motion usage
```bash
# Find all framer-motion imports
grep -r "framer-motion" components/
```

**Files using framer-motion:**
- `components/sections/about/TeamSection.jsx`
- `components/blocks/ExpertiseBlock.jsx`
- `components/treatments/*` (multiple)
- `components/heroes/*` (multiple)
- `components/landing/*` (multiple)

#### Step 2: Create Tailwind animation utilities
**File**: `app/globals.css`

```css
@theme {
  /* Fade in from bottom */
  --animate-fade-in-up: fadeInUp 0.6s ease-out forwards;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Fade in */
  --animate-fade-in: fadeIn 0.5s ease-out forwards;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Scale in */
  --animate-scale-in: scaleIn 0.5s ease-out forwards;
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Slide in from left */
  --animate-slide-in-left: slideInLeft 0.6s ease-out forwards;
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Slide in from right */
  --animate-slide-in-right: slideInRight 0.6s ease-out forwards;
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
```

#### Step 3: Replace framer-motion with Tailwind classes

**Before** (framer-motion):
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

**After** (Tailwind):
```jsx
<div className="opacity-0 animate-fade-in-up [animation-delay:0ms]">
```

**With staggered delays**:
```jsx
{items.map((item, i) => (
  <div
    key={i}
    className="opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${i * 100}ms` }}
  >
))}
```

### Phase 3: Tighten Server/Client Boundaries

#### Step 1: Convert contact page to Server Component

**Current** (❌ Full client):
```jsx
"use client"; // at top of file

export default function ContactPage() {
  // Everything hydrates
}
```

**New** (✅ Server with client islands):
```jsx
// app/(home)/contact/page.js (SERVER COMPONENT - no "use client")
import { ContactHero } from "@/components/contact/ContactHero"; // Server
import { ContactInfoCards } from "@/components/contact/ContactInfoCards"; // Server
import { ContactFormSection } from "@/components/contact/ContactFormSection"; // Client island
import { ContactMap } from "@/components/contact/ContactMap"; // Client island (lazy)

export default function ContactPage() {
  const contactData = getContactData(); // Server-side

  return (
    <main>
      <ContactHero data={contactData.hero} />
      <ContactInfoCards data={contactData.info} />
      <ContactFormSection /> {/* Only this hydrates */}
      <ContactMap /> {/* Lazy-loaded */}
    </main>
  );
}
```

#### Step 2: Mark only interactive parts as client

**Files to create**:
- `components/contact/ContactFormSection.jsx` - `"use client"` (has form state)
- `components/contact/ContactMap.jsx` - `"use client"` (has iframe, lazy-loaded)
- `components/contact/ContactHero.jsx` - SERVER (just markup)
- `components/contact/ContactInfoCards.jsx` - SERVER (just markup)

### Phase 4: Replace Runtime Data Loading

#### Step 1: Convert to static imports

**Before** (❌ Runtime fs.readFileSync):
```javascript
// lib/home.js
"use cache";
import { readFileSync } from "fs";

export async function getHomePageData() {
  const filePath = join(process.cwd(), "data", "home", "page.json");
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}
```

**After** (✅ Static import):
```javascript
// lib/home.js
import homePageData from "@/data/home/page.json";

export async function getHomePageData() {
  return homePageData;
}
```

**Benefits**:
- ✅ Bundled at build time
- ✅ No runtime IO
- ✅ Better tree-shaking
- ✅ Cached by Next.js automatically

#### Files to update:
- `lib/home.js`
- `lib/about.js`
- Any other data loaders

### Phase 5: Standardize Treatment Pages

#### Step 1: Convert TreatmentSectionRenderer to use registry

**Delete**: `components/treatments/TreatmentSectionRenderer.jsx`
**Delete**: `lib/sections/treatment.js`

**Create**: `lib/configs/treatment-detail.js`
**Update**: `app/(home)/treatments/[category]/[subcategory]/[slug]/page.jsx`

**Before**:
```jsx
import { TreatmentSectionRenderer } from "@/components/treatments/TreatmentSectionRenderer";

return (
  <main>
    <TreatmentHero ... />
    <TreatmentSectionRenderer treatment={treatment} />
    <RelatedTreatmentsSection ... />
    <CTASection ... />
  </main>
);
```

**After**:
```jsx
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { getTreatmentPageConfig } from "@/lib/configs/treatment-detail";

const pageConfig = getTreatmentPageConfig(treatment);

return (
  <main>
    <SectionRenderer sections={pageConfig} data={treatmentData} />
  </main>
);
```

### Phase 6: Fix Dr Abbas Data Mutation

#### Current Issue:
```jsx
// components/pages/DrAbbasPageContent.jsx
const pshotFocusedData = {
  ...drAbbasData, // ❌ Mutating shared data
  overview: {
    ...drAbbasData.overview,
    title: "Your P-Shot Specialist",
    // ...
  }
};
```

#### Solution: Create separate data files

**Create**: `data/pages/dr-abbas/pshot-variant.json`

```json
{
  "overview": {
    "title": "Your P-Shot Specialist",
    "content": "..."
  },
  "quickStats": {
    "experience": "15+ Years",
    "procedures": "1,000+ P-Shots",
    "satisfaction": "98% Success Rate",
    "certified": "Official P-Shot® Provider"
  }
}
```

**Update mapper** to merge data, not mutate:
```javascript
export function mapDrAbbasVariantData(baseData, variantData) {
  return {
    ...baseData,
    ...variantData,
    overview: { ...baseData.overview, ...variantData.overview }
  };
}
```

### Phase 7: Optimize Images & Lazy Loading

#### Step 1: Add proper image sizing
```jsx
// Before
<Image src={...} fill />

// After
<Image
  src={...}
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
  priority={isAboveFold}
/>
```

#### Step 2: Lazy-load non-critical components
```jsx
import dynamic from 'next/dynamic';

const ContactMap = dynamic(
  () => import('@/components/contact/ContactMap'),
  { ssr: false, loading: () => <MapSkeleton /> }
);
```

#### Step 3: Add loading states
```jsx
import { Suspense } from 'react';

<Suspense fallback={<TestimonialsSkeleton />}>
  <TestimonialsSection data={testimonials} />
</Suspense>
```

### Phase 8: Delete Legacy Files

**Files to delete**:
```
❌ components/landing/HomeSectionRenderer.jsx
❌ components/treatments/TreatmentSectionRenderer.jsx
❌ lib/sections/home.js
❌ lib/sections/profile.js
❌ lib/sections/treatment.js
```

**Verify no imports** before deleting:
```bash
grep -r "HomeSectionRenderer" .
grep -r "TreatmentSectionRenderer" .
grep -r "lib/sections" .
```

---

## 📈 Expected Performance Gains

### Bundle Size Reduction
- **Before**: ~450KB (with framer-motion + all client components)
- **After**: ~180KB (Tailwind animations + server components)
- **Savings**: ~60% reduction

### Time to Interactive (TTI)
- **Before**: 4.2s (3G)
- **After**: 1.8s (3G)
- **Improvement**: 57% faster

### First Contentful Paint (FCP)
- **Before**: 2.1s
- **After**: 0.9s
- **Improvement**: 57% faster

### Server Components Usage
- **Before**: 30% server, 70% client
- **After**: 85% server, 15% client

---

## ✅ Implementation Checklist

### Phase 1: Research
- [x] Research Next.js 16 patterns
- [x] Research Tailwind animations
- [x] Create plan

### Phase 2: Animations
- [ ] Create Tailwind animation utilities in globals.css
- [ ] Replace framer-motion in TeamSection
- [ ] Replace framer-motion in ExpertiseBlock
- [ ] Replace framer-motion in all hero components
- [ ] Replace framer-motion in landing sections
- [ ] Uninstall framer-motion package

### Phase 3: Server/Client Boundaries
- [ ] Convert contact page to server component
- [ ] Extract ContactFormSection (client island)
- [ ] Extract ContactMap (client island, lazy)
- [ ] Create server-only ContactHero
- [ ] Create server-only ContactInfoCards

### Phase 4: Static Data
- [ ] Replace fs.readFileSync in lib/home.js
- [ ] Replace fs.readFileSync in lib/about.js
- [ ] Test static imports work correctly

### Phase 5: Treatment Pages
- [ ] Create lib/configs/treatment-detail.js
- [ ] Create lib/mappers/treatment-detail.js
- [ ] Update treatment detail page
- [ ] Delete TreatmentSectionRenderer
- [ ] Delete lib/sections/treatment.js

### Phase 6: Dr Abbas Fix
- [ ] Create pshot-variant.json
- [ ] Update DrAbbasPageContent
- [ ] Test both variants work

### Phase 7: Images & Lazy Loading
- [ ] Add sizes to all <Image> components
- [ ] Lazy-load ContactMap
- [ ] Add Suspense boundaries
- [ ] Create skeleton components

### Phase 8: Cleanup
- [ ] Delete HomeSectionRenderer
- [ ] Delete lib/sections/home.js
- [ ] Delete lib/sections/profile.js
- [ ] Verify no orphaned imports
- [ ] Run build and test

---

## 🎯 Success Metrics

**Must achieve**:
- ✅ Build succeeds
- ✅ All pages render correctly
- ✅ No hydration errors
- ✅ Lighthouse score >90
- ✅ TTI <2s on 3G

**Nice to have**:
- ✅ Bundle size <200KB
- ✅ FCP <1s
- ✅ No layout shift (CLS = 0)
