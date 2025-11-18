# Dr. SNA Clinic Architecture Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [Unified Architecture Pattern](#unified-architecture-pattern)
3. [Project Structure](#project-structure)
4. [Core Concepts](#core-concepts)
5. [Animation System](#animation-system)
6. [Performance Optimization](#performance-optimization)
7. [Adding New Content](#adding-new-content)
8. [Best Practices](#best-practices)

---

## Overview

This Next.js 14 project uses a **unified, block-based architecture** for maximum code reusability and maintainability. All pages follow the same pattern: **JSON → Mapper → Config → Renderer**.

### Key Benefits
- ✅ **Beginner-Friendly**: Clear separation of data, logic, and presentation
- ✅ **DRY Principle**: Reusable blocks eliminate duplication
- ✅ **Easy Content Updates**: Change JSON files without touching code
- ✅ **Type-Safe**: JSDoc documentation for all components
- ✅ **Performance**: Lazy-loading and image optimization built-in

---

## Unified Architecture Pattern

Every page follows this flow:

```
JSON Data → Mapper → Config → SectionRenderer → Rendered Page
```

### 1. JSON Data (`/data/`)
Raw content stored in JSON files. Easy for non-developers to edit.

```json
// data/contact.json
{
  "hero": {
    "title": "Contact Us",
    "description": "Get in touch with our team"
  },
  "contactInfo": [...]
}
```

### 2. Mapper (`/lib/mappers/`)
Transforms raw JSON into component-ready props.

```javascript
// lib/mappers/contact.js
export function mapContactPageData(data) {
  return {
    hero: {
      title: data.hero.title,
      variant: 'subcategory'
    },
    contactInfo: data.contactInfo
  };
}
```

### 3. Config (`/lib/configs/`)
Defines which sections render and in what order.

```javascript
// lib/configs/contact.js
export const contactSections = [
  {
    id: 'hero',
    block: 'hero.category',  // References block registry
    mapper: () => ({ data: data.hero })
  },
  {
    id: 'contact-info',
    block: 'contact.info-cards',
    mapper: () => ({ data: { cards: data.contactInfo } })
  }
];
```

### 4. Page (`/app/`)
Loads data, gets config, renders sections.

```javascript
// app/(home)/contact/page.js
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { contactSections, getContactData } from "@/lib/configs/contact";

export default function ContactPage() {
  const data = getContactData();
  return (
    <main>
      <SectionRenderer sections={contactSections} data={data} />
    </main>
  );
}
```

---

## Project Structure

```
clinic/
├── app/                          # Next.js 14 App Router
│   └── (home)/                   # Main site pages
│       ├── page.jsx              # Home page
│       ├── contact/page.js       # Contact page
│       ├── treatments/           # Treatment pages
│       └── about-us/page.jsx     # About page
│
├── components/                   # React components
│   ├── common/                   # Reusable primitives
│   │   ├── AnimatedWrapper.jsx   # Animation primitives
│   │   ├── SectionRenderer.jsx   # Universal renderer
│   │   ├── IconFeatureCard.jsx   # Base card component
│   │   └── skeletons/            # Loading states
│   ├── blocks/                   # Content blocks
│   ├── sections/                 # Page sections
│   ├── heroes/                   # Hero sections
│   ├── landing/                  # Landing page sections
│   ├── treatments/               # Treatment-specific components
│   └── contact/                  # Contact-specific components
│
├── data/                         # JSON content files
│   ├── home/                     # Home page data
│   ├── contact.json              # Contact page data
│   ├── treatments-listing.json   # Treatments listing data
│   ├── aesthetic-medicine/       # Category data
│   └── intimate-health/          # Category data
│
├── lib/                          # Utilities and configuration
│   ├── blocks/
│   │   └── registry.js           # Central block registry
│   ├── configs/                  # Page configurations
│   │   ├── home.js
│   │   ├── contact.js
│   │   ├── treatments.js
│   │   └── category.js
│   ├── mappers/                  # Data transformers
│   │   ├── home.js
│   │   ├── contact.js
│   │   ├── treatments.js
│   │   └── category.js
│   └── seo-helpers.js            # SEO utilities
│
└── public/                       # Static assets
    └── images/                   # Optimized images
```

---

## Core Concepts

### Block Registry (`lib/blocks/registry.js`)

The **single source of truth** for all reusable components. Every component is registered with a semantic ID.

```javascript
export const blockRegistry = {
  // Heroes
  'hero.landing': HeroSection,
  'hero.category': CategoryHero,

  // Sections
  'section.features': FeaturesSection,
  'section.testimonials': TestimonialsSection,

  // Blocks
  'block.overview': OverviewBlock,
  'block.gallery': GalleryBlock,

  // Contact
  'contact.info-cards': ContactInfoCards,
};
```

**Lazy-Loaded Blocks** (for performance):
- `PShotFeaturedSection` - Heavy featured section
- `DrAbbasSection` - Doctor profile section
- `TreatmentBentoSection` - Bento grid section
- `GalleryBlock` - Image gallery
- `TestimonialsSection` - Testimonials carousel
- `ProcessTimeline` - Process timeline

### SectionRenderer (`components/common/SectionRenderer.jsx`)

Universal component that renders sections from config:

```javascript
<SectionRenderer
  sections={contactSections}  // Array of section configs
  data={pageData}             // Page data
/>
```

### Conditional Rendering

Sections can have conditions:

```javascript
{
  id: 'testimonials',
  block: 'section.testimonials',
  mapper: () => ({ data: data.testimonials }),
  condition: (pageData) => pageData.testimonials?.length > 0
}
```

---

## Animation System

### Animation Primitives (`components/common/AnimatedWrapper.jsx`)

Reusable animation components replace manual class strings:

**Available Primitives:**

#### `<FadeIn>`
```jsx
<FadeIn delay={200}>
  <div>Fades in content</div>
</FadeIn>
```

#### `<FadeInUp>`
```jsx
<FadeInUp delay={100}>
  <h1>Slides up while fading in</h1>
</FadeInUp>
```

#### `<SlideIn>`
```jsx
<SlideIn direction="left" delay={300}>
  <div>Slides in from direction</div>
</SlideIn>
```
Directions: `left`, `right`, `up`, `down`

#### `<ScaleIn>`
```jsx
<ScaleIn delay={200}>
  <div>Scales in from center</div>
</ScaleIn>
```

#### `<StaggerChildren>`
```jsx
<StaggerChildren staggerDelay={100} animation="fadeInUp">
  {items.map((item, i) => (
    <div key={i}>{item.name}</div>
  ))}
</StaggerChildren>
```
Animations: `fadeInUp`, `slideInLeft`, `slideInRight`

### Why Animation Primitives?

**Before:**
```jsx
<div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
  Content
</div>
```

**After:**
```jsx
<FadeInUp delay={200}>
  Content
</FadeInUp>
```

**Benefits:**
- ✅ No duplicate class strings
- ✅ Centralized timing control
- ✅ Easier to modify globally
- ✅ Better readability

---

## Performance Optimization

### 1. Image Optimization

All `<Image>` components have proper `sizes` prop:

```jsx
<Image
  src="/images/hero.jpg"
  alt="Hero"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"  // Critical!
  priority  // For above-fold images
/>
```

**Common sizes patterns:**
- Full width: `sizes="100vw"`
- Two columns: `sizes="(max-width: 768px) 100vw, 50vw"`
- Three columns: `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Avatar: `sizes="48px"`

### 2. Lazy Loading

Heavy below-fold sections are dynamically imported in `lib/blocks/registry.js`:

```javascript
const PShotFeaturedSection = dynamic(
  () => import('@/components/landing/PShotFeaturedSection').then(mod => ({ default: mod.PShotFeaturedSection })),
  {
    loading: () => <SectionSkeleton />,
    ssr: true
  }
);
```

### 3. Skeleton Loaders

All lazy-loaded components have skeleton states in `components/common/skeletons/`:
- `GallerySkeleton`
- `TestimonialsSkeleton`
- `ProcessTimelineSkeleton`
- `SectionSkeleton`
- `MapSkeleton`

---

## Adding New Content

### Adding a New Page

**Step 1:** Create JSON data file
```javascript
// data/new-page.json
{
  "hero": {
    "title": "New Page",
    "description": "Page description"
  },
  "sections": [...]
}
```

**Step 2:** Create mapper
```javascript
// lib/mappers/new-page.js
export function mapNewPageData(data) {
  return {
    hero: { ...data.hero },
    sections: data.sections
  };
}
```

**Step 3:** Create config
```javascript
// lib/configs/new-page.js
import newPageData from '@/data/new-page.json';
import { mapNewPageData } from '@/lib/mappers/new-page';

const data = mapNewPageData(newPageData);

export const newPageSections = [
  {
    id: 'hero',
    block: 'hero.category',
    mapper: () => ({ data: data.hero })
  },
  // Add more sections...
];
```

**Step 4:** Create page
```javascript
// app/(home)/new-page/page.jsx
import { SectionRenderer } from "@/components/common/SectionRenderer";
import { newPageSections } from "@/lib/configs/new-page";

export default function NewPage() {
  return (
    <main>
      <SectionRenderer sections={newPageSections} />
    </main>
  );
}
```

### Adding a New Block Component

**Step 1:** Create component with JSDoc
```javascript
// components/blocks/NewBlock.jsx
/**
 * New Block Component
 *
 * Description of what this block does.
 *
 * @param {Object} props
 * @param {Object} props.data - Block data
 * @param {string} props.data.title - Block title
 * @param {string} [props.data.subtitle] - Optional subtitle
 */
export function NewBlock({ data }) {
  return (
    <Section>
      <Container>
        <FadeInUp>
          <h2>{data.title}</h2>
        </FadeInUp>
        {data.subtitle && (
          <FadeInUp delay={100}>
            <p>{data.subtitle}</p>
          </FadeInUp>
        )}
      </Container>
    </Section>
  );
}
```

**Step 2:** Register in block registry
```javascript
// lib/blocks/registry.js
import { NewBlock } from "@/components/blocks/NewBlock";

export const blockRegistry = {
  // ... existing blocks
  'block.new': NewBlock,
};
```

**Step 3:** Use in page config
```javascript
// lib/configs/some-page.js
export const somePageSections = [
  {
    id: 'new-section',
    block: 'block.new',
    mapper: () => ({
      data: {
        title: "Section Title",
        subtitle: "Optional subtitle"
      }
    })
  }
];
```

---

## Best Practices

### ✅ Do's

1. **Use animation primitives** instead of manual class strings
   ```jsx
   // Good
   <FadeInUp delay={100}>
     <h1>Title</h1>
   </FadeInUp>

   // Bad
   <h1 className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
     Title
   </h1>
   ```

2. **Always add JSDoc** to components
   ```jsx
   /**
    * Component Description
    * @param {Object} props
    * @param {string} props.title - The title
    */
   ```

3. **Use proper image sizes**
   ```jsx
   <Image sizes="(max-width: 768px) 100vw, 50vw" ... />
   ```

4. **Follow the unified pattern** for all pages
   ```
   JSON → Mapper → Config → SectionRenderer
   ```

5. **Register all reusable components** in block registry

### ❌ Don'ts

1. **Don't hardcode content** in components - use JSON data

2. **Don't create inline data objects** in page files

3. **Don't use manual animation class strings**

4. **Don't skip the mapper layer** - always transform data

5. **Don't forget loading states** for lazy-loaded components

6. **Don't mix concerns** - keep data, logic, and presentation separate

---

## Component Patterns

### Reusable Base Components

#### IconFeatureCard
Base card component extended by specific use cases:

```jsx
import { IconFeatureCard } from "@/components/common/IconFeatureCard";

// Extend for specific use
export function ContactCard({ info }) {
  return (
    <IconFeatureCard
      icon={info.icon}
      title={info.title}
      variant="bordered"
      iconBg="primary"
      animationDelay={0.1}
    >
      {/* Custom content */}
      <div>{info.details}</div>
    </IconFeatureCard>
  );
}
```

### Section Wrapper Pattern

```jsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export function MySection({ data }) {
  return (
    <Section padding="xl" background="secondary">
      <Container>
        {/* Section content */}
      </Container>
    </Section>
  );
}
```

---

## Troubleshooting

### Build Errors

**Issue:** "Block not found in registry"
- **Solution:** Check that component is imported and registered in `lib/blocks/registry.js`

**Issue:** "File has not been read yet"
- **Solution:** For Write tool, either read the file first or ensure it's a new file

### Runtime Errors

**Issue:** Animation not working
- **Solution:** Verify animation primitive is imported from `@/components/common/AnimatedWrapper`

**Issue:** Image not loading
- **Solution:** Check that `sizes` prop is present and path is correct

---

## Summary

This architecture provides:

✅ **Consistency**: All pages follow the same pattern
✅ **Maintainability**: Changes propagate automatically
✅ **Performance**: Lazy-loading and optimization built-in
✅ **Developer Experience**: Clear structure, documented components
✅ **Content Management**: Easy JSON-based updates

The codebase is designed to be beginner-friendly while maintaining professional-grade architecture. Every decision prioritizes clarity over cleverness, making it easy for anyone to contribute.

---

For questions or contributions, refer to the inline JSDoc comments in each component file.
