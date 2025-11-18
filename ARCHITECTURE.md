# Project Architecture

## Overview

This Next.js application uses a **centralized block registry system** with config-driven page rendering for maximum code reusability, maintainability, and scalability.

## Architecture Principles

1. **Single Block Registry** - All reusable components registered once
2. **Config-Driven Pages** - Pages reference blocks by ID with mappers
3. **Clean Data Organization** - Page data organized by type
4. **Separation of Concerns** - Mappers handle data transformation
5. **Theme Consistency** - Global CSS variables used throughout

---

## Directory Structure

```
├── lib/
│   ├── blocks/
│   │   └── registry.js           # Central block registry
│   ├── configs/                   # Page configurations
│   │   ├── home.js               # Home page config
│   │   ├── about.js              # About page config
│   │   ├── pshot.js              # P-Shot page config
│   │   └── dr-abbas.js           # Dr Abbas page config
│   ├── mappers/                   # Data transformation functions
│   │   ├── home.js
│   │   ├── about.js
│   │   └── profile.js
│   └── sections/                  # Legacy (being phased out)
│
├── data/
│   ├── home/                      # Home page data
│   │   ├── page.json
│   │   └── about/
│   │       └── page.json          # About page data
│   ├── pages/                     # Other page data
│   │   ├── pshot/
│   │   │   ├── landing-data.js
│   │   │   └── site-config.js
│   │   └── dr-abbas/
│   │       └── page.js
│   ├── aesthetic-medicine/        # Treatment category data
│   ├── intimate-health/
│   └── ...
│
├── components/
│   ├── blocks/                    # Content blocks
│   │   ├── OverviewBlock.jsx
│   │   ├── ExpertiseBlock.jsx
│   │   ├── GalleryBlock.jsx
│   │   └── ...
│   ├── heroes/                    # Hero sections
│   │   ├── landing/
│   │   ├── treatments/
│   │   └── specialty/
│   ├── sections/                  # Common sections
│   │   ├── TestimonialsSection.jsx
│   │   ├── FAQSection.jsx
│   │   └── CTASection.jsx
│   ├── landing/                   # Landing-specific sections
│   ├── treatments/                # Treatment-specific sections
│   └── common/
│       └── SectionRenderer.jsx    # Universal renderer
│
└── app/
    ├── (home)/                    # Main site pages
    │   ├── page.js                # Home page
    │   ├── about-us/
    │   ├── contact/
    │   └── treatments/
    └── pshot/                     # P-Shot landing site
        ├── layout.jsx             # Custom layout
        └── page.jsx

```

---

## Core Concepts

### 1. Central Block Registry (`lib/blocks/registry.js`)

Single source of truth for all reusable components.

```javascript
// Import components once
import { HeroSectionV2 } from "@/components/heroes/landing/HeroSectionV2";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

// Register with semantic IDs
export const blockRegistry = {
  'hero.landing': HeroSectionV2,
  'section.testimonials': TestimonialsSection,
  // ... all other blocks
};

// Helper function
export function getBlock(blockId) {
  return blockRegistry[blockId];
}
```

**Benefits:**
- ✅ Import each component once
- ✅ Reference by semantic ID
- ✅ Easy to discover available blocks
- ✅ Type-safe (can add TypeScript)

### 2. Page Configurations (`lib/configs/`)

Clean, declarative page structure.

```javascript
// lib/configs/home.js
import * as mappers from '@/lib/mappers/home';

export const homePageConfig = [
  {
    id: 'hero',
    block: 'hero.landing',           // Reference block by ID
    dataKey: 'hero',                 // Data path in page data
    mapper: mappers.mapHomeHeroProps // Transform function
  },
  {
    id: 'testimonials',
    block: 'section.testimonials',
    dataKey: 'testimonials',
    condition: (data) => data.testimonials?.length > 0, // Optional render condition
    mapper: mappers.mapHomeTestimonialsProps
  },
  // ... more sections
];
```

**Benefits:**
- ✅ Easy to reorder sections
- ✅ Easy to add/remove sections  - ✅ Clear section dependencies
- ✅ Conditional rendering support

### 3. Data Mappers (`lib/mappers/`)

Pure functions that transform page data into component props.

```javascript
// lib/mappers/home.js

/**
 * Transform home hero data to HeroSectionV2 props
 */
export function mapHomeHeroProps(data) {
  return {
    data: data.hero,
    variant: "landing"
  };
}

/**
 * Transform testimonials data
 */
export function mapHomeTestimonialsProps(data) {
  return {
    data: data.testimonials,
    title: "What Our Patients Say"
  };
}
```

**Benefits:**
- ✅ Reusable data transformations
- ✅ Easy to test
- ✅ No component imports
- ✅ Type-safe transformations

### 4. Section Renderer (`components/common/SectionRenderer.jsx`)

Universal component renderer.

```javascript
import { getBlock } from "@/lib/blocks/registry";

export function SectionRenderer({ sections, data }) {
  return (
    <>
      {sections.map((section) => {
        // Get component from registry
        const Component = getBlock(section.block);

        // Transform data with mapper
        const props = section.mapper(data);

        // Render if conditions met
        if (section.condition && !section.condition(data)) {
          return null;
        }

        return <Component key={section.id} {...props} />;
      })}
    </>
  );
}
```

---

## Block Registry Organization

### Block ID Naming Convention

Format: `category.name` or `category.subcategory.name`

```javascript
{
  // ===== HEROES =====
  'hero.landing': HeroSectionV2,
  'hero.landing-v1': HeroSection,
  'hero.category': CategoryHero,
  'hero.treatment': TreatmentHero,
  'hero.pshot': PShotHero,

  // ===== LANDING SECTIONS =====
  'landing.award-spotlight': AwardSpotlightSection,
  'landing.clinic-showcase': ClinicShowcaseSection,
  'landing.featured-treatments': FeaturedTreatments,

  // ===== CONTENT BLOCKS =====
  'block.overview': OverviewBlock,
  'block.expertise': ExpertiseBlock,
  'block.gallery': GalleryBlock,

  // ===== COMMON SECTIONS =====
  'section.testimonials': TestimonialsSection,
  'section.faq': FAQSection,
  'section.cta': CTASection,
  'section.stats': StatsSection,
  'section.features': FeaturesSection,

  // ===== TREATMENT SECTIONS =====
  'treatment.process-timeline': ProcessTimeline,
  'treatment.related': RelatedTreatmentsSection,

  // ===== SPECIALTY SECTIONS =====
  'specialty.doctor-credentials': DoctorCredentials,
}
```

---

## Usage Examples

### Example 1: Home Page

```javascript
// app/(home)/page.js
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { homePageConfig } from "@/lib/configs/home";
import { getHomePageData } from "@/lib/home";

export default async function HomePage() {
  const homeData = await getHomePageData();

  return (
    <main>
      <SectionRenderer sections={homePageConfig} data={homeData} />
    </main>
  );
}
```

### Example 2: About Page

```javascript
// app/(home)/about-us/page.jsx
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { aboutPageConfig } from "@/lib/configs/about";
import { getAboutPageData } from "@/lib/about";

export default async function AboutUsPage() {
  const aboutData = await getAboutPageData();

  return (
    <main>
      <SectionRenderer sections={aboutPageConfig} data={aboutData} />
    </main>
  );
}
```

### Example 3: Adding a New Section

1. **Add to block registry** (if new component):
```javascript
// lib/blocks/registry.js
import { NewSection } from "@/components/sections/NewSection";

export const blockRegistry = {
  // ... existing blocks
  'section.new': NewSection,
};
```

2. **Add mapper function**:
```javascript
// lib/mappers/home.js
export function mapNewSectionProps(data) {
  return {
    data: data.newSection,
    variant: "default"
  };
}
```

3. **Add to page config**:
```javascript
// lib/configs/home.js
export const homePageConfig = [
  // ... existing sections
  {
    id: 'newSection',
    block: 'section.new',
    dataKey: 'newSection',
    mapper: mappers.mapNewSectionProps
  },
];
```

4. **Add data to JSON**:
```json
// data/home/page.json
{
  "hero": { ... },
  "newSection": {
    "title": "New Section",
    "content": "..."
  }
}
```

---

## Data Organization

### Page Data Structure

```
data/
├── home/                    # Home page & related pages
│   ├── page.json           # Main home page data
│   └── about/
│       └── page.json       # About page data
│
├── pages/                   # Standalone pages
│   ├── pshot/              # P-Shot landing page
│   │   ├── landing-data.js
│   │   └── site-config.js
│   └── dr-abbas/           # Dr Abbas profile page
│       └── page.js
│
└── [category]/             # Treatment category data
    ├── category.json
    └── [subcategory]/
        ├── subcategory.json
        └── treatments/
            └── [slug].json
```

---

## Theme System

All components use global CSS variables from `app/globals.css`:

```css
:root {
  --background: ...;
  --foreground: ...;
  --primary: ...;
  --muted: ...;
  --muted-foreground: ...;
  --border: ...;
  /* ... */
}
```

**Usage in components:**
```jsx
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

**Never use custom colors** - always use theme variables for consistency.

---

## Best Practices

### 1. Adding New Pages

✅ **DO:**
- Create config in `lib/configs/[page].js`
- Create mappers in `lib/mappers/[page].js`
- Organize data in `data/pages/[page]/` or `data/home/[page]/`
- Use existing blocks from registry
- Use global theme colors

❌ **DON'T:**
- Import components directly in pages
- Create new components when existing ones work
- Define custom colors
- Duplicate mapper logic

### 2. Creating New Blocks

✅ **DO:**
- Make components reusable with props
- Use theme variables for colors
- Add to block registry with semantic ID
- Document props with JSDoc
- Support variants when appropriate

❌ **DON'T:**
- Hardcode content
- Use inline styles
- Create page-specific components
- Import other blocks directly

### 3. Data Management

✅ **DO:**
- Keep data close to its page
- Use consistent naming conventions
- Validate data structure
- Use TypeScript types (future)

❌ **DON'T:**
- Mix data and components
- Scatter data across folders
- Use inconsistent formats

---

## Migration Guide

### From Old to New System

**Old way:**
```javascript
// components/landing/HomeSectionRenderer.jsx
import { HeroSectionV2 } from "@/components/heroes/landing/HeroSectionV2";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
// ... 10+ more imports

export function HomeSectionRenderer({ homeData }) {
  return (
    <>
      <HeroSectionV2 {...homeData.hero} />
      <TestimonialsSection data={homeData.testimonials} />
      {/* ... */}
    </>
  );
}
```

**New way:**
```javascript
// app/(home)/page.js
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { homePageConfig } from "@/lib/configs/home";

export default async function HomePage() {
  const homeData = await getHomePageData();
  return <SectionRenderer sections={homePageConfig} data={homeData} />;
}
```

---

## Future Enhancements

- [ ] TypeScript types for configs and mappers
- [ ] Visual config editor
- [ ] A/B testing support
- [ ] Analytics integration
- [ ] Block variants system
- [ ] Dynamic block loading
- [ ] Block preview mode

---

## Troubleshooting

### Block not found
```
Block "section.xyz" not found in registry
```
**Solution:** Add the block to `lib/blocks/registry.js`

### Component not rendering
**Check:**
1. Is the block ID correct in config?
2. Does the mapper return correct props?
3. Is the data available at the dataKey path?
4. Does the condition pass (if any)?

### Import errors
**Check:**
1. Is the data path correct after reorganization?
2. Update imports from `@/data/pshot/` to `@/data/pages/pshot/`
3. Update imports from `@/data/dr-abbas` to `@/data/pages/dr-abbas/page`

---

## Contact & Support

For questions or contributions, please refer to the project documentation or contact the development team.
