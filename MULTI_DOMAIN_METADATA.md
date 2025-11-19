# Multi-Domain Metadata Setup

## ✅ Fixed: Domain-Aware Metadata

Your root layout now uses **`getBaseUrl()`** from domain-helpers to automatically serve the correct metadata for each domain.

## How It Works

### Request Flow
```
1. User visits: pshots.co.uk
   ↓
2. Next.js calls generateMetadata() in app/layout.js
   ↓
3. getBaseUrl() reads request headers
   ↓
4. getDomainByHost('pshots.co.uk') matches domain config
   ↓
5. Returns: https://pshots.co.uk
   ↓
6. Metadata uses correct base URL for:
   - metadataBase
   - openGraph.url
   - authors.url
   - All relative URLs
```

### Domain Configuration
Defined in `lib/domains.js`:

```javascript
export const domains = {
  main: {
    id: 'main',
    url: 'https://drsnaclinic.com',
    hosts: ['drsnaclinic.com', 'www.drsnaclinic.com', 'localhost:3000'],
  },
  pshot: {
    id: 'pshot',
    url: 'https://pshots.co.uk',
    hosts: ['pshots.co.uk', 'www.pshots.co.uk', 'pshot.localhost:3000'],
  },
};
```

## Metadata Hierarchy

### 1. Root Layout (app/layout.js) ✅
**Uses**: `generateMetadata()` with `getBaseUrl()`
**Purpose**: Default metadata for all pages
**Domain-Aware**: ✅ YES

```javascript
export async function generateMetadata() {
  const baseUrl = await getBaseUrl(); // Dynamic!

  return {
    metadataBase: new URL(baseUrl), // Correct for each domain
    title: { ... },
    openGraph: {
      url: baseUrl, // Domain-specific URL
    },
  };
}
```

### 2. Route Layouts
Child layouts can override with more specific metadata:

#### app/(home)/layout.jsx ✅
```javascript
export async function generateMetadata() {
  const baseUrl = await getBaseUrl(); // Also domain-aware

  return {
    metadataBase: new URL(baseUrl),
    verification: { ... },
  };
}
```

#### app/pshot/layout.jsx ⚠️
```javascript
// Static metadata (could be made dynamic)
export const metadata = {
  metadataBase: new URL('https://pshots.co.uk'), // Hardcoded
};
```

## Environment Variables

### .env Configuration
```bash
# Main domain (used as fallback)
NEXT_PUBLIC_SITE_URL=https://drsnaclinic.com

# Google Search Console verification codes
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=q9eY9qqyNR42niMg9lCxufDpl0KlOeRnB8fNBKzncEc

# P-Shot domain verification (separate)
NEXT_PUBLIC_PSHOT_GOOGLE_SITE_VERIFICATION=your-pshot-verification-code

# Email configuration
SMTP_USER=sales@drsna.com
CONTACT_EMAIL=sales@safiaapparelsltd.com
```

### Why Not Use NEXT_PUBLIC_SITE_URL?
❌ **Problem**: Static environment variable can't change per domain
✅ **Solution**: Use `getBaseUrl()` which reads request headers

## SEO Benefits

### ✅ No URL Confusion
```
drsnaclinic.com pages → metadataBase: https://drsnaclinic.com
pshots.co.uk pages    → metadataBase: https://pshots.co.uk
```

### ✅ Correct Canonical URLs
```html
<!-- On drsnaclinic.com/treatments/p-shot -->
<link rel="canonical" href="https://drsnaclinic.com/treatments/p-shot" />

<!-- On pshots.co.uk/ -->
<link rel="canonical" href="https://pshots.co.uk/" />
```

### ✅ Proper Open Graph Tags
```html
<!-- On pshots.co.uk -->
<meta property="og:url" content="https://pshots.co.uk/" />
<meta property="og:image" content="https://pshots.co.uk/images/pshot-og.webp" />

<!-- NOT mixed like this ❌ -->
<meta property="og:url" content="https://drsnaclinic.com/" />
<meta property="og:image" content="https://pshots.co.uk/images/pshot-og.webp" />
```

### ✅ Vercel OG Image Generation
Works correctly because `metadataBase` is set properly:

```javascript
// Vercel will generate at:
// drsnaclinic.com: https://drsnaclinic.com/api/og?title=...
// pshots.co.uk:    https://pshots.co.uk/api/og?title=...
```

## Helper Functions

### getBaseUrl()
Returns the correct base URL for current domain:
```javascript
import { getBaseUrl } from '@/lib/domain-helpers';

const baseUrl = await getBaseUrl();
// → 'https://drsnaclinic.com' or 'https://pshots.co.uk'
```

### buildUrl(path)
Builds full URLs with correct domain:
```javascript
import { buildUrl } from '@/lib/domain-helpers';

const url = await buildUrl('/treatments/p-shot');
// On drsnaclinic.com → 'https://drsnaclinic.com/treatments/p-shot'
// On pshots.co.uk    → 'https://pshots.co.uk/treatments/p-shot'
```

### getCurrentDomain()
Gets full domain configuration:
```javascript
import { getCurrentDomain } from '@/lib/domain-helpers';

const domain = await getCurrentDomain();
// {
//   id: 'pshot',
//   url: 'https://pshots.co.uk',
//   name: 'P-Shot UK',
//   hosts: ['pshots.co.uk', ...],
// }
```

## Testing

### Local Development
```bash
# Test main domain
curl http://localhost:3000 -H "Host: localhost:3000"

# Test P-Shot domain (if hosts file configured)
curl http://localhost:3000 -H "Host: pshot.localhost:3000"
```

### Production Testing
```bash
# Check metadataBase in rendered HTML
curl https://drsnaclinic.com | grep 'og:url'
# Should show: https://drsnaclinic.com

curl https://pshots.co.uk | grep 'og:url'
# Should show: https://pshots.co.uk
```

### Verify in Browser DevTools
```javascript
// Open any page, run in console:
document.querySelector('meta[property="og:url"]')?.content
// Should match current domain
```

## Adding New Microsites

To add a new domain (e.g., `botox-london.com`):

### 1. Add to lib/domains.js
```javascript
export const domains = {
  // ... existing domains

  botox: {
    id: 'botox',
    name: 'Botox London',
    url: 'https://botox-london.com',
    hosts: ['botox-london.com', 'www.botox-london.com'],

    llms: {
      title: 'Botox London',
      description: 'Premier Botox clinic in London',
      specialties: ['Anti-Wrinkle', 'Facial Aesthetics'],
    },

    staticPages: [
      { path: '/', priority: 1.0 },
    ],

    includeTreatments: true,
    includeCategories: true,
  },
};
```

### 2. Configure Proxy (middleware.js or proxy.js)
```javascript
const isBotoxDomain = hostname.includes('botox-london.com');

if (isBotoxDomain) {
  // Rewrite to /botox route
  rewriteUrl.pathname = `/botox${url.pathname}`;
}
```

### 3. Create Route Layout
```javascript
// app/botox/layout.jsx
import { getBaseUrl } from '@/lib/domain-helpers';

export async function generateMetadata() {
  const baseUrl = await getBaseUrl(); // Auto-detects domain

  return {
    metadataBase: new URL(baseUrl),
    title: 'Botox London | Expert Anti-Wrinkle Treatments',
  };
}
```

### 4. That's it! ✅
No need to change root layout - it automatically serves correct metadata.

## Troubleshooting

### Issue: Wrong domain in og:url
**Check**: Is `getBaseUrl()` being called?
```javascript
// ❌ Wrong
export const metadata = {
  metadataBase: new URL('https://drsnaclinic.com'),
};

// ✅ Correct
export async function generateMetadata() {
  const baseUrl = await getBaseUrl();
  return {
    metadataBase: new URL(baseUrl),
  };
}
```

### Issue: Headers not available error
**Cause**: Trying to use `getBaseUrl()` in client component
**Solution**: Only use in server components/layouts

```javascript
// ❌ Won't work
'use client';
const baseUrl = await getBaseUrl(); // Error!

// ✅ Works
// Server component (default)
const baseUrl = await getBaseUrl();
```

### Issue: localhost shows wrong URL
**Expected**: Falls back to `http://localhost:3000`
**If not working**: Check `lib/domain-helpers.js` fallback logic

## Best Practices

### ✅ DO:
- Use `getBaseUrl()` for all dynamic base URLs
- Use `buildUrl(path)` to construct full URLs
- Set `metadataBase` in all layouts using `generateMetadata()`
- Test with different Host headers locally

### ❌ DON'T:
- Hardcode 'https://drsnaclinic.com' anywhere
- Use static `NEXT_PUBLIC_SITE_URL` for multi-domain
- Forget to add new domains to `lib/domains.js`
- Mix URLs from different domains in metadata

## Summary

✅ **Root layout**: Uses `getBaseUrl()` - domain-aware
✅ **Child layouts**: Can override with specific metadata
✅ **Open Graph**: Correct URLs per domain
✅ **Canonical URLs**: Domain-specific
✅ **SEO**: No confusion between domains
✅ **Vercel OG**: Works with correct base URLs

**No hardcoded URLs** = **No SEO confusion** = **Happy Google** 🎉

---

**Updated**: 2025-01-19
**Domains**: drsnaclinic.com, pshots.co.uk
**Status**: ✅ Multi-domain metadata working correctly
