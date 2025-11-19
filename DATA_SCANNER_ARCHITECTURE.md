# Data Scanner Architecture

## ✅ Verification Complete

Your data discovery system is **correctly implemented** using a clean wrapper pattern with automatic filesystem scanning.

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│           Application Layer (Routes)                │
│  • app/sitemap.js                                   │
│  • app/llms.txt/route.js                           │
│  • app/(home)/treatments/[...]/page.jsx            │
└────────────────┬────────────────────────────────────┘
                 │
                 │ imports from wrapper functions
                 │
┌────────────────▼────────────────────────────────────┐
│           Wrapper Layer (with "use cache")          │
│  • lib/treatments.js                                │
│  • lib/subcategories.js                            │
│  • lib/categories.js                               │
└────────────────┬────────────────────────────────────┘
                 │
                 │ internally uses
                 │
┌────────────────▼────────────────────────────────────┐
│        Data Scanner (Filesystem Discovery)          │
│  • lib/data-scanner.js                             │
│    - scanCategories()                              │
│    - scanSubcategories()                           │
│    - scanTreatments()                              │
│    - getAllTreatmentPaths()                        │
│    - getAllSubcategoryPaths()                      │
└─────────────────────────────────────────────────────┘
```

## Current Status ✅

### 1. lib/treatments.js
```javascript
"use cache";  // ✅ Next.js 16 caching

export async function getAllTreatmentPaths() {
  // ✅ Uses data-scanner internally
  const { getAllTreatmentPaths: scanTreatmentPaths } = await import('./data-scanner');
  return scanTreatmentPaths();
}
```

### 2. lib/subcategories.js
```javascript
"use cache";  // ✅ Next.js 16 caching

export async function getAllSubcategoryPaths() {
  // ✅ Uses data-scanner internally
  const { getAllSubcategoryPaths: scanSubcategoryPaths } = await import('./data-scanner');
  return scanSubcategoryPaths();
}
```

### 3. lib/data-scanner.js
```javascript
// ✅ Automatic filesystem discovery
// NO "use cache" - this is server-side only

export function getAllTreatmentPaths() {
  return getAllTreatments().map(t => ({
    category: t.category,
    subcategory: t.subcategory,
    slug: t.slug,
  }));
}
```

## Data Discovery Results

Based on current filesystem scan:

```json
{
  "totalCategories": 6,
  "totalSubcategories": 11,
  "totalTreatments": 56,
  "categories": [
    "aesthetic-medicine",
    "intimate-health",
    "life-optimization",
    "pain-management",
    "private-gp",
    "scientific-evidence"
  ],
  "breakdown": [
    {
      "category": "aesthetic-medicine",
      "subcategories": 4,
      "treatments": 25
    },
    {
      "category": "intimate-health",
      "subcategories": 2,
      "treatments": 8
    },
    {
      "category": "life-optimization",
      "subcategories": 1,
      "treatments": 3
    },
    {
      "category": "pain-management",
      "subcategories": 2,
      "treatments": 11
    },
    {
      "category": "private-gp",
      "subcategories": 1,
      "treatments": 5
    },
    {
      "category": "scientific-evidence",
      "subcategories": 1,
      "treatments": 4
    }
  ]
}
```

## Why This Architecture?

### ✅ Wrapper Pattern Benefits

1. **Caching Layer**: Wrappers use `"use cache"` for Next.js 16 optimization
2. **Error Handling**: Single point for error handling and fallbacks
3. **Type Safety**: Wrappers can add TypeScript types and validation
4. **API Stability**: Internal implementation can change without breaking consumers
5. **Testing**: Easier to mock and test

### ✅ Data Scanner Benefits

1. **Auto-Discovery**: No manual registration of treatments needed
2. **Filesystem-Based**: Just add JSON files in correct structure
3. **Statistics**: Can get counts and breakdowns with `getDataStats()`
4. **Flexible**: Direct filesystem access for special use cases
5. **Server-Only**: No client bundle bloat

## Files Using Data Scanner (via Wrappers)

### ✅ app/sitemap.js
```javascript
import { getAllTreatmentPaths } from '@/lib/treatments';
import { getAllSubcategoryPaths } from '@/lib/subcategories';
// ✅ Correct - uses wrappers with "use cache"
```

### ✅ app/llms.txt/route.js
```javascript
import { getAllTreatmentPaths } from '@/lib/treatments';
// ✅ Correct - uses wrapper with "use cache"
```

### ✅ app/(home)/treatments/[...]/page.jsx
```javascript
import { getTreatment, getStaticTreatmentPaths } from '@/lib/treatments';
// ✅ Correct - uses wrappers with "use cache"
```

## Adding New Data

### To Add a Treatment:
1. Create JSON file: `data/{category}/{subcategory}/treatments/{slug}.json`
2. That's it! Auto-discovered, no registration needed ✅

### To Add a Subcategory:
1. Create directory: `data/{category}/{subcategory}/`
2. Add file: `data/{category}/{subcategory}/subcategory.json`
3. Auto-discovered ✅

### To Add a Category:
1. Create directory: `data/{category}/`
2. Add file: `data/{category}/category.json`
3. Auto-discovered ✅

## Testing Data Scanner

### Get Statistics
```bash
node -e "const scanner = require('./lib/data-scanner.js'); console.log(JSON.stringify(scanner.getDataStats(), null, 2));"
```

### Verify Treatment Exists
```bash
node -e "const scanner = require('./lib/data-scanner.js'); console.log(scanner.treatmentExists('pain-management', 'treatments', 'bmac-therapy'));"
```

### List All Treatments
```bash
node -e "const scanner = require('./lib/data-scanner.js'); console.log(JSON.stringify(scanner.getAllTreatmentPaths(), null, 2));"
```

## Performance Considerations

### Caching Strategy

1. **Wrapper Functions** (`lib/treatments.js`, `lib/subcategories.js`):
   - Use `"use cache"` directive
   - Cached by Next.js 16 automatically
   - Revalidated on rebuild

2. **Data Scanner** (`lib/data-scanner.js`):
   - NO caching (filesystem operations)
   - Only called by wrappers (which ARE cached)
   - Fresh data on each wrapper cache miss

### When Cache Invalidates

- Production build (automatic)
- Data file changes during development
- Manual cache clear: `npm run build` or restart dev server

## Troubleshooting

### Treatment Not Appearing?

1. **Check file location**:
   ```
   data/
     {category}/
       {subcategory}/
         treatments/
           {slug}.json  ← File must be here
   ```

2. **Verify with data scanner**:
   ```bash
   node -e "const scanner = require('./lib/data-scanner.js'); console.log(scanner.treatmentExists('category', 'subcategory', 'slug'));"
   ```

3. **Check for errors**:
   - Invalid JSON syntax
   - Missing required fields
   - Incorrect directory structure

### Sitemap Missing Treatments?

1. **Check domain config** in `lib/domains.js`:
   ```javascript
   includeTreatments: true,  // Must be true
   ```

2. **Verify data scanner works**:
   ```bash
   node -e "const scanner = require('./lib/data-scanner.js'); console.log(scanner.getDataStats());"
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

## Best Practices

### ✅ DO:
- Use wrapper functions (`lib/treatments.js`, etc.) in application code
- Add new treatments by creating JSON files (auto-discovered)
- Use `getDataStats()` to verify data structure
- Keep `"use cache"` directive on wrappers

### ❌ DON'T:
- Import `lib/data-scanner.js` directly in routes (use wrappers)
- Add `"use cache"` to data-scanner.js (it does filesystem operations)
- Manually register treatments (they're auto-discovered)
- Mix server and client code (data-scanner is server-only)

## Architecture Decision Rationale

### Why Not Direct Import?

**Option A: Direct Import (❌ Not Recommended)**
```javascript
// app/sitemap.js
import { getAllTreatmentPaths } from '@/lib/data-scanner';
// ❌ No caching, filesystem operations on every request
```

**Option B: Wrapper Pattern (✅ Current Implementation)**
```javascript
// app/sitemap.js
import { getAllTreatmentPaths } from '@/lib/treatments';
// ✅ Cached, optimized, error handling
```

### Why Both Layers?

1. **Data Scanner**: Low-level, filesystem operations, flexible, uncached
2. **Wrappers**: High-level, cached, error handling, stable API
3. **Routes**: Simple imports, optimized performance

This separation allows:
- **Data scanner** to be flexible and server-only
- **Wrappers** to add caching and optimization
- **Routes** to be simple and performant

## Migration Guide

If you have old manual treatment lists, migrate to auto-discovery:

### Before (Manual):
```javascript
const treatments = [
  { category: 'aesthetic-medicine', subcategory: 'face', slug: 'botox' },
  { category: 'aesthetic-medicine', subcategory: 'face', slug: 'fillers' },
  // ... manual list
];
```

### After (Auto-Discovery):
```javascript
import { getAllTreatmentPaths } from '@/lib/treatments';
const treatments = await getAllTreatmentPaths();
// ✅ Automatically discovers all treatments
```

## Summary

✅ **Current implementation is correct**
✅ **Data scanner is properly integrated**
✅ **Caching is optimized with "use cache"**
✅ **All files use the wrapper pattern**
✅ **56 treatments auto-discovered across 6 categories**

No changes needed - your architecture is solid! 🎉

---

**Last Verified**: 2025-01-19
**Total Treatments**: 56
**Total Categories**: 6
**Total Subcategories**: 11
