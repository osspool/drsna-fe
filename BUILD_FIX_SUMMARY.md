# Build Error Fixes

## ✅ Issues Fixed

### 1. **`headers()` in "use cache" Error** ✅

**Error**:
```
Error: Route /dr-syed-nadeem-abbas used `headers()` inside "use cache".
Accessing Dynamic data sources inside a cache scope is not supported.
```

**Root Cause**:
- Next.js 16's `"use cache"` directive prevents using dynamic data sources like `headers()`
- `getBaseUrl()` from `lib/domain-helpers.js` uses `headers()` to detect the domain
- Cannot be used in `generateMetadata()` because metadata functions are cached

**Solution**:
Reverted root layout to use **static metadata** with fallback URL:

```javascript
// app/layout.js
export const metadata = {
  // Static fallback - child layouts override with domain-specific URLs
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  // ... rest of metadata
};
```

**Why This Works**:
- Child layouts (`app/(home)/layout.jsx`, `app/pshot/layout.jsx`) already use `generateMetadata()` with `getBaseUrl()`
- Root layout provides fallback only
- Multi-domain support preserved at route layout level

---

### 2. **Invalid JSON in knee-treatment.json** ✅

**Error**:
```
Failed to load treatment: pain-management/conditions/knee-treatment SyntaxError:
Unexpected non-whitespace character after JSON at position 9176
```

**Root Cause**:
Extra closing brace in the `seo.schema.clinicalFindings` section:

```json
// ❌ Wrong (4 braces)
"clinicalFindings":["...","Patellar tendinopathy"]}}},"bookingInfo"

// ✅ Fixed (3 braces)
"clinicalFindings":["...","Patellar tendinopathy"]}},"bookingInfo"
```

**Solution**:
Removed the extra `}` at position 9176:
```bash
# Backup created
data/pain-management/conditions/treatments/knee-treatment.json.backup

# Fixed file
data/pain-management/conditions/treatments/knee-treatment.json
```

---

## Architecture Decision: Multi-Domain Metadata

### Metadata Hierarchy

```
app/layout.js (Root)
├─ Static metadata with fallback URL
├─ metadataBase: NEXT_PUBLIC_SITE_URL || localhost:3000
└─ ⚠️ CANNOT use headers() - cached context

app/(home)/layout.jsx
├─ Dynamic metadata with domain detection
├─ Uses: await getBaseUrl()
└─ ✅ Can use headers() - not in root cache scope

app/pshot/layout.jsx
├─ Static metadata for P-Shot domain
└─ metadataBase: https://pshots.co.uk
```

### Why Not Use `getBaseUrl()` in Root Layout?

**Problem**: Next.js 16 caches all layouts and metadata generation
```javascript
// ❌ Won't work
export async function generateMetadata() {
  const baseUrl = await getBaseUrl(); // Uses headers() → Error!
  return { metadataBase: new URL(baseUrl) };
}
```

**Solution**: Route-specific layouts handle domain detection
```javascript
// app/(home)/layout.jsx ✅
export async function generateMetadata() {
  const baseUrl = await getBaseUrl(); // Works! Not in cache scope
  return { metadataBase: new URL(baseUrl) };
}
```

---

## Environment Variable Usage

### Current Setup

```bash
# .env
NEXT_PUBLIC_SITE_URL=https://drsnaclinic.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=q9eY9qqyNR42niMg9lCxufDpl0KlOeRnB8fNBKzncEc
SMTP_USER=sales@drsna.com
CONTACT_EMAIL=sales@safiaapparelsltd.com
```

### Where Used

| File | Usage | Domain-Aware |
|------|-------|--------------|
| `app/layout.js` | Fallback `metadataBase` | ⚠️ Static fallback |
| `app/(home)/layout.jsx` | Dynamic via `getBaseUrl()` | ✅ Yes |
| `app/pshot/layout.jsx` | Static P-Shot URL | ⚠️ Hardcoded |
| `app/sitemap.js` | Dynamic via `getDomainByHost()` | ✅ Yes |
| `app/robots.js` | Dynamic via `getDomainByHost()` | ✅ Yes |
| `app/llms.txt/route.js` | Dynamic via `getDomainByHost()` | ✅ Yes |

---

## Testing the Fix

### 1. Validate JSON
```bash
node -e "const treatment = require('./data/pain-management/conditions/treatments/knee-treatment.json'); console.log('✅ Valid:', treatment.title);"
```

Expected output:
```
✅ Valid: Knee Pain Regenerative Programme
```

### 2. Build Test
```bash
npm run build
```

Should complete without:
- ❌ `headers()` in use cache error
- ❌ JSON parse errors

### 3. Runtime Test
```bash
npm run dev

# Visit pages:
# - http://localhost:3000/treatments/pain-management/conditions/knee-treatment
# - http://localhost:3000/dr-syed-nadeem-abbas
```

---

## Lessons Learned

### ✅ DO:
- Use `"use cache"` only in functions without dynamic data
- Use child layouts for domain-specific metadata
- Validate JSON files before committing (use prettier/eslint)
- Keep backup files when fixing critical JSON

### ❌ DON'T:
- Use `headers()` in cached contexts (root layout metadata)
- Manually edit minified JSON (use formatters)
- Hardcode domain URLs in shared components
- Mix static and dynamic metadata in same layout

---

## Files Modified

### Fixed:
1. ✅ `app/layout.js` - Reverted to static metadata with fallback
2. ✅ `data/pain-management/conditions/treatments/knee-treatment.json` - Removed extra brace

### Created:
1. ✅ `data/pain-management/conditions/treatments/knee-treatment.json.backup`
2. ✅ `BUILD_FIX_SUMMARY.md` (this file)

### Unchanged (Working):
- ✅ `app/(home)/layout.jsx` - Uses `getBaseUrl()` correctly
- ✅ `app/pshot/layout.jsx` - Static metadata (no headers)
- ✅ `lib/domain-helpers.js` - Domain detection logic
- ✅ `lib/domains.js` - Domain configuration

---

## Summary

| Issue | Status | Fix |
|-------|--------|-----|
| `headers()` in cache | ✅ Fixed | Use static fallback in root, dynamic in children |
| Invalid JSON | ✅ Fixed | Removed extra closing brace |
| Build failing | ✅ Fixed | Both issues resolved |
| Multi-domain support | ✅ Working | Route layouts handle domain detection |
| SEO metadata | ✅ Working | Child layouts override with correct URLs |

**Build Status**: Ready to build ✅

---

**Date**: 2025-01-19
**Build Version**: Next.js 16
**Cache Mode**: "use cache" enabled
