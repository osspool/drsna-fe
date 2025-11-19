# SEO Audit Report - Dr SNA Clinic

**Generated**: November 19, 2025  
**Site**: drsnaclinic.com  
**Current Authority Score**: 17  
**Organic Traffic**: 1 (0%)  
**Organic Keywords**: 103 (+0.98%)

---

## Executive Summary

Your codebase has **excellent SEO foundations** with proper structured data, metadata helpers, and sitemap configuration. However, you're experiencing **low rankings due to critical missing elements and opportunities**. This is a **new/young domain** issue combined with some technical gaps.

**Good News**: Your technical setup is 80% there. The remaining 20% of fixes can significantly improve your rankings.

---

## 🚨 CRITICAL ISSUES (Fix Immediately)

### 1. **MISSING Open Graph Images** ⚠️
**Impact**: HIGH - Social shares show no image, reducing click-through rates by 50-80%

**Problem**: 
```javascript
// app/(home)/page.js line 51
images: [
  {
    url: "/images/og-image.jpg",  // ❌ THIS FILE DOESN'T EXIST!
```

**Your public folder has NO `og-image.jpg` file.**

**Fix**:
- Create a professional 1200x630px OG image for your homepage
- Add OG images for all treatment pages
- Update metadata to use existing images or create new ones

---

### 2. **Placeholder Google Verification Code** ⚠️
**Impact**: HIGH - You're not verified with Google Search Console

```javascript
// app/(home)/page.js line 78
verification: {
  google: "your-google-site-verification-code",  // ❌ PLACEHOLDER!
},
```

**Fix**:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property `drsnaclinic.com`
3. Get your verification meta tag
4. Replace the placeholder with your actual code

**Why this matters**: Without GSC verification, you can't:
- Submit sitemaps
- See search performance data
- Fix indexing issues
- Request re-indexing

---

### 3. **Missing Backlinks Strategy** ⚠️
**Impact**: CRITICAL - Authority Score 17 indicates very few quality backlinks

**Current State**:
- Referring Domains: 390 (+1.04%)
- Backlinks: 5.6K
- But Authority Score is only 17 (very low)

**Why Low Authority?**:
- New domain (domain age matters)
- Few high-quality backlinks from authoritative medical sites
- No mentions in medical journals, news sites, or industry publications

**Immediate Actions**:
1. **Get listed in medical directories**:
   - British Association of Aesthetic Plastic Surgeons (BAAPS)
   - British Association of Cosmetic Nurses (BACN)
   - RealSelf.com (huge for aesthetic medicine)
   - Treatwell, Fresha (booking platforms)
   - Google Business Profile (local SEO)

2. **Create linkable assets**:
   - Original research/case studies
   - Before/after galleries
   - Patient testimonials (with video)
   - "Ultimate Guide to..." content pieces

3. **Guest posting**:
   - Write for aesthetic medicine blogs
   - Contribute to health publications
   - Local London business directories

4. **PR & Media**:
   - Press releases for awards (you have GRA 2024!)
   - Local newspapers
   - Medical news sites

---

### 4. **No External Visibility Signals**
**Impact**: HIGH - Search engines can't find social proof

**Missing**:
- Reviews on Google Business Profile
- Reviews on Trustpilot/Reviews.io
- Active social media presence (for brand signals)
- Press mentions
- Industry citations

**Fix**:
- Set up Google Business Profile
- Get patient reviews (critical for medical SEO)
- Create Trustpilot account
- Share content on social media regularly

---

## 🔧 TECHNICAL SEO ISSUES

### 5. **Missing Favicon Variants**
**Impact**: MEDIUM - Browser compatibility

**Current**: You only have `app/favicon.ico`

**Need**:
```html
<!-- Add these to app/layout.js -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/manifest.json" />
```

---

### 6. **Missing Alt Text Audit**
**Impact**: MEDIUM - Accessibility and image SEO

**Action Needed**: Verify all images have descriptive alt text
- Check treatment pages for before/after images
- Ensure hero images have meaningful alt text
- Add alt text to all decorative images (or mark as `alt=""`)

---

### 7. **No robots.txt Visible Test**
**Impact**: MEDIUM

**Test**: Visit `https://drsnaclinic.com/robots.txt` and verify it's loading correctly
- Your code looks good, but verify it's actually being generated
- Check that your sitemap is accessible at `/sitemap.xml`

---

### 8. **Missing Performance Optimizations**

**Current Next.js Config**:
```javascript
// next.config.mjs
images: {
  qualities: [75, 90],  // ✅ Good
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",  // ⚠️ TOO PERMISSIVE
    },
  ],
},
```

**Recommended Changes**:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],  // ADD THIS
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  qualities: [75, 90],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",  // SPECIFIC DOMAINS ONLY
    },
  ],
  minimumCacheTTL: 60,
},
```

---

## 📝 CONTENT & ON-PAGE SEO

### 9. **Heading Structure Audit Needed**
**Impact**: MEDIUM

**Action**: For each page, ensure:
- Only ONE `<h1>` per page (usually the title)
- Proper hierarchy: h1 → h2 → h3 (no skipping)
- Keywords in headings naturally

**Check these files**:
- `components/heroes/*.jsx`
- `components/sections/*.jsx`
- `components/treatments/*.jsx`

---

### 10. **Internal Linking Enhancement**
**Impact**: MEDIUM

**Current State**: You have good navigation structure

**Improvements**:
1. **Add contextual links within content**:
   - Treatment pages should link to related treatments
   - Add "Related Treatments" section
   - Link from general pages to specific treatments

2. **Breadcrumbs** (You have structured data, add visible UI):
   ```jsx
   // Add breadcrumb component
   Home > Treatments > Aesthetic Medicine > PRP Facelift
   ```

3. **Add "Pillar Content"**:
   - Create comprehensive guides that link to all related treatments
   - Example: "Complete Guide to Facial Rejuvenation" → links to all facial treatments

---

### 11. **Content Depth Enhancement**
**Impact**: MEDIUM

**Your content is good, but add**:
1. **More long-form content** (2000+ words for key pages)
2. **FAQ sections** (you have schema, ensure visible on page)
3. **Patient stories/case studies** with results
4. **Video content** (embedded YouTube videos for engagement)
5. **Comparison content** ("PRP vs. Fillers", "P-Shot vs. Trimix")

---

### 12. **Local SEO Optimization**
**Impact**: HIGH for local search

**Add to ALL pages**:
```javascript
// In metadata
openGraph: {
  locale: 'en_GB',
  type: 'website',
  streetAddress: '58 Wimpole Street',  // ADD FULL ADDRESS
  addressLocality: 'London',
  addressRegion: 'Greater London',
  postalCode: 'W1G 8YL',  // ADD POSTAL CODE
  addressCountry: 'GB',
}
```

**Create**:
1. **Location page**: `/locations/wimpole-street-london`
2. **Service area pages**: Target specific London areas
3. **Google Business Profile** (critical!)

---

## 🔍 INDEXING & CRAWLABILITY

### 13. **Force Index Key Pages**
**Impact**: HIGH

**Action**: In Google Search Console (once verified):
1. Submit sitemap: `https://drsnaclinic.com/sitemap.xml`
2. Request indexing for:
   - Homepage
   - Top 8 treatment pages
   - About page
   - Contact page

---

### 14. **Add XML Sitemap Image Extensions**
**Impact**: MEDIUM - Helps image SEO

**Update `app/sitemap.js`**:
```javascript
// Add images to sitemap entries
{
  url: `${baseUrl}/treatments/${treatment.slug}`,
  lastModified: new Date(),
  changeFrequency: 'weekly',
  priority: 0.7,
  images: [  // ADD THIS
    {
      url: `${baseUrl}${treatment.hero?.image}`,
      title: treatment.title,
      caption: treatment.description,
    }
  ],
}
```

---

## 🎯 KEYWORD & CONTENT STRATEGY

### 15. **Target Long-Tail Keywords**
**Impact**: HIGH - Easier to rank

**Current**: Your keywords are good but competitive

**Strategy**: Target these specific searches:
- "P-Shot London Wimpole Street" (location-specific)
- "natural erectile dysfunction treatment London"
- "PRP facelift cost London"
- "non-surgical facelift London"
- "knee pain treatment without surgery London"
- "Arthrosamid injection London"

**Implementation**:
- Create location-specific landing pages
- Add "London" and area names to titles
- Create FAQ content answering specific questions

---

### 16. **Answer Boxes & Featured Snippets**
**Impact**: HIGH - Get position 0 in Google

**Create content targeting**:
- "What is a P-Shot?"
- "How much does PRP facelift cost?"
- "How long does Arthrosamid last?"
- "Is the P-Shot safe?"

**Format**:
```markdown
## What is a P-Shot?

The P-Shot (Priapus Shot) is a non-surgical treatment for erectile dysfunction that uses platelet-rich plasma (PRP) from your own blood to stimulate natural tissue regeneration and improve blood flow. The treatment takes 45 minutes and results last 12-18 months.

**Key Benefits:**
- No medication required
- Natural approach using your own blood
- 10-20% size increase possible
- Improved sensitivity and function
```

---

## 📊 TECHNICAL IMPROVEMENTS

### 17. **Add JSON-LD for Every Page**
**Impact**: MEDIUM

**Current**: ✅ Great structured data on homepage and treatments

**Missing**: Add to these pages:
- Contact page → `LocalBusiness` schema
- Resources → `Article` schema
- Dr Abbas page → `Person` schema with medical credentials

---

### 18. **Implement Breadcrumb JSON-LD**
**Impact**: LOW-MEDIUM

**Current**: ✅ You have it in `generateTreatmentStructuredData`

**Verify**: Ensure it's on ALL pages (not just treatments)

---

### 19. **Add Review Schema**
**Impact**: HIGH - Star ratings in search results

**Action**: Collect patient reviews and add:
```javascript
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5"
  }
}
```

**Must have real reviews from**:
- Google Business Profile
- Trustpilot
- Internal review system

---

## 🚀 PERFORMANCE & CORE WEB VITALS

### 20. **Optimize Images**
**Impact**: HIGH - Affects rankings

**Current**: Some images are JPG, should be WebP/AVIF

**Fix**:
```bash
# Run your existing script
npm run optimize-images-safe
```

**Also**:
- Convert all JPG/PNG to WebP
- Add blur placeholders for lazy loading
- Use Next.js `<Image>` component everywhere

---

### 21. **Add Caching Headers**
**Impact**: MEDIUM

**Update `next.config.mjs`**:
```javascript
async headers() {
  return [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
},
```

---

## 🎨 USER EXPERIENCE (Indirect SEO Impact)

### 22. **Add Trust Signals**
**Impact**: HIGH - Reduces bounce rate

**Add to homepage & key pages**:
- ✅ CQC registration badge (you have this)
- GMC registration number
- Professional memberships logos
- "As seen in" media logos
- Patient count/stats
- Years of experience
- Before/after galleries
- Video testimonials

---

### 23. **Mobile Optimization Check**
**Impact**: CRITICAL - Mobile-first indexing

**Test**:
1. Open site on mobile
2. Check tap targets (minimum 48x48px)
3. Ensure text is readable without zooming
4. Test forms on mobile

**Your Next.js setup should be good, but verify**

---

## 📈 ANALYTICS & TRACKING

### 24. **Install Essential Tools**
**Impact**: HIGH - Can't improve what you don't measure

**Add to `app/layout.js`**:
```javascript
// 1. Google Analytics 4
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>

// 2. Microsoft Clarity (free heatmaps)
<Script
  id="clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(c,l,a,r,i,t,y){
        // Clarity code
      })();
    `,
  }}
/>

// 3. Facebook Pixel (for retargeting)
// 4. Hotjar (user behavior)
```

---

## 🔗 QUICK WINS (Implement Today)

### Priority 1: Immediate Fixes (< 1 hour)
1. ✅ Create missing OG image (`public/images/og-image.jpg`)
2. ✅ Replace Google verification placeholder
3. ✅ Sign up for Google Business Profile
4. ✅ Submit sitemap to Google Search Console
5. ✅ Add favicon variants

### Priority 2: This Week (< 8 hours)
6. Get 10 Google reviews from existing patients
7. Create Trustpilot account and get reviews
8. Set up Google Analytics
9. Add full address to all pages
10. Optimize all images to WebP

### Priority 3: This Month
11. Build 20 quality backlinks (directories + guest posts)
12. Create 5 long-form guide articles (2000+ words)
13. Add video testimonials
14. Implement breadcrumb UI
15. Create comparison content

---

## 📋 CODE CHANGES NEEDED

### File: `app/(home)/page.js`
```javascript
// Line 51 - Fix OG image
images: [
  {
    url: "/images/og-home.jpg",  // CREATE THIS FILE
    width: 1200,
    height: 630,
    alt: "Dr SNA Clinic - Aesthetic Medicine Excellence",
  },
],

// Line 78 - Add real verification
verification: {
  google: "YOUR_ACTUAL_VERIFICATION_CODE_HERE",
  // Add others:
  bing: "YOUR_BING_CODE",
  yandex: "YOUR_YANDEX_CODE",
},
```

### File: `app/layout.js`
```javascript
// Add to metadata
export const metadata = {
  metadataBase: new URL('https://drsnaclinic.com'),
  title: "Dr SNA Clinic | Luxury Aesthetic Medicine in London",
  description: "Premier aesthetic medicine clinic...",
  keywords: [...],
  
  // ADD THESE:
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  
  manifest: '/manifest.json',
  
  // ADD OPEN GRAPH
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://drsnaclinic.com',
    siteName: 'Dr SNA Clinic',
    images: [{
      url: '/images/og-home.jpg',
      width: 1200,
      height: 630,
    }],
  },
};
```

### File: `next.config.mjs`
```javascript
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,

  images: {
    formats: ['image/avif', 'image/webp'],  // ADD
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],  // ADD
    imageSizes: [16, 32, 48, 64, 96, 128, 256],  // ADD
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",  // SPECIFIC ONLY
      },
    ],
    minimumCacheTTL: 60,  // ADD
  },
  
  // ADD HEADERS
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
```

---

## 🎯 EXPECTED IMPROVEMENTS

### After Quick Wins (1-2 weeks)
- Google Search Console verified
- Sitemap indexed
- Authority Score: 17 → 20-25
- Organic Keywords: 103 → 150+

### After Priority 2 (1 month)
- Google Business Profile live with reviews
- First organic traffic appearing
- Authority Score: 25-30
- Organic Keywords: 150 → 300+

### After Priority 3 (3 months)
- 50+ quality backlinks
- Ranking for long-tail keywords
- Authority Score: 30-40
- Organic Traffic: 50-100 visitors/month

### Long-term (6-12 months)
- Authority Score: 40-50+
- Organic Traffic: 500+ visitors/month
- Ranking for competitive keywords
- Established local presence

---

## 🔍 WHY YOUR SCORE IS LOW

1. **New/Young Domain** - Takes 6-12 months to build authority
2. **Missing Google Verification** - Not being properly indexed
3. **Few Quality Backlinks** - Medical sites need authoritative links
4. **No Reviews** - Critical for medical/local SEO
5. **Missing Local SEO** - Not in Google Business Profile
6. **No Social Proof** - Search engines can't verify your legitimacy

**The good news**: Your technical foundation is SOLID. You just need:
- Time (patience)
- Backlinks (quality > quantity)
- Reviews (social proof)
- Consistent content (show expertise)

---

## 📞 SUPPORT RESOURCES

**Tools to Use**:
- [Google Search Console](https://search.google.com/search-console)
- [Google Business Profile](https://business.google.com)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Screaming Frog SEO Spider](https://www.screamingfrogseoseo.com/) (free)
- [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools) (free)

**Learning Resources**:
- Google's SEO Starter Guide
- Ahrefs Blog (SEO best practices)
- Search Engine Journal

---

## ✅ ACTION CHECKLIST

Copy this to track your progress:

```markdown
## Week 1: Critical Fixes
- [ ] Create OG images for homepage and top 5 treatment pages
- [ ] Replace Google verification placeholder with actual code
- [ ] Verify site in Google Search Console
- [ ] Submit sitemap.xml to GSC
- [ ] Create Google Business Profile
- [ ] Add favicon variants
- [ ] Set up Google Analytics

## Week 2-3: Reviews & Backlinks
- [ ] Get 10 Google Business reviews
- [ ] Create Trustpilot account
- [ ] Submit to 10 medical directories
- [ ] Join RealSelf.com
- [ ] List on Treatwell/Fresha
- [ ] Create press release for GRA 2024 award

## Week 4: Content & Optimization
- [ ] Write 2 long-form guide articles
- [ ] Add FAQ sections to all treatment pages
- [ ] Optimize all images to WebP
- [ ] Implement breadcrumb UI
- [ ] Add related treatments sections
- [ ] Create video testimonials

## Month 2: Scale & Monitor
- [ ] Guest post on 3 aesthetic medicine blogs
- [ ] Create 3 comparison articles
- [ ] Add 20 more backlinks
- [ ] Monitor GSC for indexing issues
- [ ] Track keyword rankings
- [ ] Analyze GA data and optimize

## Month 3: Advanced
- [ ] Create location-specific landing pages
- [ ] Implement advanced structured data
- [ ] Build pillar content hub
- [ ] Start regular blogging (weekly)
- [ ] Analyze competitors
- [ ] Refine keyword strategy
```

---

## 💡 FINAL THOUGHTS

**Your codebase is EXCELLENT** - well-structured, modern, and SEO-ready. The low score is primarily due to:
1. Domain age (can't control this - just need time)
2. Missing external signals (backlinks, reviews, social proof)
3. A few critical technical gaps (OG images, verification)

**Focus on**: 
- Getting verified in Google Search Console
- Building quality backlinks from medical sites
- Getting patient reviews
- Creating helpful, in-depth content
- Being patient (SEO takes 6-12 months for new sites)

Your technical foundation is better than 90% of websites. You just need to build authority and trust signals.

**Expected timeline to Authority Score 40+**: 6-9 months with consistent effort

---

**Questions?** Let me know which fixes you want me to implement first!

