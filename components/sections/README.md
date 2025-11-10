# Sections Architecture

Data-driven, reusable section components following React 19 best practices.

## Overview

This directory contains consolidated section components that follow a **single pattern** for maximum maintainability and minimal code duplication. Each component is data-driven, variant-based, and optimized for React 19.

## Core Principles

1. **Data-Driven**: All sections accept structured data objects
2. **Variant-Based**: Single component, multiple presentations via `variant` prop
3. **React 19 Optimized**: Using modern patterns (useSyncExternalStore, useDeferredValue)
4. **No Backward Compatibility**: Clean, forward-looking architecture
5. **Minimal Code**: Maximum functionality with minimum LOC

## Available Sections

### FAQSection
Accordion-based FAQ section using shadcn UI primitives.

**Variants:**
- `default` - Standard FAQ accordion
- `with-icons` - FAQ with icon support for each item
- `with-cta` - Includes contact CTA at bottom

**Usage:**
```jsx
import { FAQSection } from "@/components/sections/FAQSection";

<FAQSection
  data={faqData}
  variant="with-icons"
  title="Frequently Asked Questions"
  subtitle="Everything you need to know"
/>
```

**Data Structure:**
```javascript
const faqData = [
  {
    id: 1,
    icon: Award, // Optional: Lucide icon component
    question: "Question text",
    answer: "Answer text"
  }
];
```

### StatsSection
Statistics/metrics display with multiple layout options.

**Variants:**
- `default` - Elegant cards with hover effects
- `compact` - Minimal cards with icons
- `cards` - Individual cards with hover effects
- `minimal` - Simple grid with icons (no section wrapper)
- `highlight` - Inline stats for hero sections

**Usage:**
```jsx
import { StatsSection } from "@/components/sections/StatsSection";

<StatsSection
  data={statsData}
  variant="cards"
  title="Quick Treatment Facts"
  badge="At A Glance"
/>
```

**Data Structure:**
```javascript
const statsData = {
  duration: "30 minutes",
  downtime: "None",
  resultsVisible: "3-7 days",
  resultsLast: "3-4 months",
  price: "From £250",
  // Any key-value pairs supported
};
```

**Supported Keys:**
- `duration`, `anesthesia`, `downtime`
- `resultsVisible`, `resultsLast`, `results`, `longevity`
- `painLevel`, `discomfort`, `price`, `sessions`
- `experience`, `patients`, `awards`, `successRate`

### FeaturesSection
Features/benefits section with flexible layouts and icon support.

**Variants:**
- `default` - Simple cards with hover effects
- `cards` - Enhanced cards with icon animations
- `compact` - Minimal cards (3-column grid)
- `list` - Compact list format (no section wrapper)

**Layouts** (for default/cards variants):
- `grid-2` - 2 columns
- `grid-3` - 3 columns (default)
- `grid-4` - 4 columns

**Usage:**
```jsx
import { FeaturesSection } from "@/components/sections/FeaturesSection";

<FeaturesSection
  data={featuresData}
  variant="cards"
  layout="grid-3"
  background="muted"
  showStats={true}
  stats={{ treatments: "5,000+", rating: "5.0" }}
/>
```

**Data Structure:**
```javascript
const featuresData = {
  title: "Why Choose Us",
  subtitle: "Excellence", // Optional badge text
  description: "Description text", // Optional
  features: [ // or 'items'
    {
      icon: "award", // String (kebab-case or camelCase)
      title: "Feature Title",
      description: "Feature description"
    }
  ]
};
```

**Supported Icons:**
All Lucide React icons (award, heart, shield, users, star, check, sparkles, clock, zap, etc.)

## Component Registry

All sections are registered in `components/blocks/BlockRenderer.jsx` for data-driven page building:

```javascript
const blockComponents = {
  // Data-Driven Sections
  stats: StatsSection,
  features: FeaturesSection,
  faq: FAQSection,
  // ... other blocks
};
```

## Migration Notes

**Old Components → New Sections:**
- ❌ `QuickStatsBlock` → ✅ `StatsSection` (variant: "default")
- ❌ `AtAGlanceBlock` → ✅ `StatsSection` (variant: "minimal")
- ❌ `TreatmentStats` → ✅ `StatsSection` (variant: "compact")
- ❌ `BenefitsBlock` → ✅ `FeaturesSection` (variant: "default")
- ❌ `WhyChooseBlock` → ✅ `FeaturesSection` (variant: "cards")
- ❌ `BenefitsSection` → ✅ `FeaturesSection` (variant: "compact")

**No backward compatibility exports** - use new imports directly.

## React 19 Patterns

### Client-Only Rendering
For components requiring browser APIs:

```jsx
import { ClientOnly } from "@/components/custom/ui/client-only";

export const MySection = ({ data }) => {
  return (
    <ClientOnly fallback={<Skeleton />}>
      <MySectionContent data={data} />
    </ClientOnly>
  );
};
```

Uses `useSyncExternalStore` + `useDeferredValue` for optimal SSR/CSR behavior.

### Data-Driven Architecture
All sections follow this pattern:

```jsx
export function MySection({
  data,           // Required: structured data object
  variant,        // Optional: presentation variant
  background,     // Optional: background color
  showStats,      // Optional: feature flags
  ...customProps  // Optional: component-specific props
}) {
  // Validation
  if (!data) return null;

  // Render logic based on variant
  if (variant === "compact") return <CompactVersion />;
  return <DefaultVersion />;
}
```

## Best Practices

1. **Always pass structured data**: Use objects/arrays, not individual props
2. **Use variant prop**: One component, multiple presentations
3. **Keep components pure**: No side effects in render
4. **Early returns for validation**: Check data before rendering
5. **Use semantic HTML**: Proper heading hierarchy, ARIA labels
6. **Optimize for performance**: Lazy load heavy components, memoize expensive calculations

## File Structure

```
components/sections/
├── README.md           # This file
├── FAQSection.jsx      # FAQ accordion
├── StatsSection.jsx    # Statistics/metrics
└── FeaturesSection.jsx # Features/benefits
```

## Performance

- **Code Splitting**: All sections are dynamically imported by BlockRenderer
- **Tree Shaking**: Unused variants are removed in production builds
- **Bundle Size**: ~320-380 LOC reduction from consolidation
- **Render Optimization**: Pure components with early returns

## Testing

Each section should be tested with:
- ✅ Empty/null data handling
- ✅ All variant rendering
- ✅ Responsive layout behavior
- ✅ Accessibility (keyboard nav, ARIA)
- ✅ SSR compatibility

## Future Enhancements

- Add Storybook stories for each variant
- Implement skeleton loaders for async data
- Add animation variants (subtle, normal, dramatic)
- Create theme variants (light, dark, branded)
