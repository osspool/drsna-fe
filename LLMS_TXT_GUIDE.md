# llms.txt Implementation Guide

## Overview

This project now includes automatic `llms.txt` generation for LLM-friendly website crawling, following the specification at [llmstxt.org](https://llmstxt.org/).

## What is llms.txt?

`llms.txt` is an emerging standard (like `robots.txt` for AI) that provides structured information to help Large Language Models understand and use your website content more effectively.

### Benefits:
- ✅ **Better AI Understanding**: Helps ChatGPT, Claude, and other LLMs accurately describe your services
- ✅ **Structured Context**: Provides curated overview instead of having AI parse entire HTML pages
- ✅ **Medical Accuracy**: Ensures AI tools have correct information about treatments, safety, and procedures
- ✅ **Brand Positioning**: Controls how AI models describe your clinic and expertise

## Implementation

### File Location
```
app/llms.txt/route.js
```

### Access URLs
- **Main Clinic**: `https://drsnaclinic.com/llms.txt`
- **P-Shot Domain**: `https://pshots.co.uk/llms.txt`
- **Local Dev**: `http://localhost:3000/llms.txt`

## Architecture

### Multi-Domain Support

The implementation is **domain-aware** and automatically serves different content based on the requesting domain:

```javascript
// Uses existing domain configuration
import { getDomainByHost } from '@/lib/domains';

// Serves domain-specific content
if (domain.id === 'pshot') {
  content = await generatePShotLLMContent(domain);
} else {
  content = await generateMainClinicLLMContent(domain);
}
```

### Domain Configuration

Each domain in `lib/domains.js` now includes LLM metadata:

```javascript
llms: {
  title: 'Dr SNA Clinic',
  description: 'Premier aesthetic medicine clinic...',
  specialties: ['Aesthetic Medicine', 'Regenerative Medicine', ...],
  keyDifferentiators: ['GMC-registered specialist', ...]
}
```

## Content Structure

Follows the [llms.txt specification](https://llmstxt.org/):

```markdown
# Site Name

> Brief description in blockquote

Detailed information about the site and services

## Main Pages

- [Page Name](url): Description of page

## Treatment Categories

- [Category Name](url): Category description

## Featured Treatments

- [Treatment Name](url): Treatment description

## Optional

- [Sitemap](url): Complete page index
- [Robots](url): Crawling permissions
```

## What's Included

### Main Clinic (drsnaclinic.com)

1. **Overview**: Clinic description, specialties, medical credentials
2. **Main Pages**: Homepage, about, treatments, contact, resources
3. **Treatment Categories**: Dynamically generated from `/data/categories.json`
4. **Featured Treatments**: Top 8-12 treatments with descriptions
5. **Clinical Information**: Safety, pricing, consultation process
6. **Usage Guidelines**: How LLMs should reference the clinic

### P-Shot Domain (pshots.co.uk)

1. **Overview**: P-Shot specialist focus, experience level
2. **Main Pages**: Homepage sections (about, results, pricing, FAQ)
3. **Treatment Information**: P-Shot details, candidacy, process
4. **Why Choose**: Unique selling points and expertise
5. **Related Treatments**: Shockwave, fillers, hormones
6. **Medical Context**: Procedure details, expected outcomes

## Dynamic Content

The llms.txt file automatically includes:

- ✅ **Live Treatment Data**: Pulls from your JSON files
- ✅ **Category Information**: Updates when you add categories
- ✅ **Domain-Specific URLs**: Correct base URLs for each domain
- ✅ **Cache-Control**: 1-hour cache for performance

## Testing

### Local Testing

```bash
# Start dev server
npm run dev

# Test main domain
curl http://localhost:3000/llms.txt

# Test P-Shot domain (if configured)
curl http://pshot.localhost:3000/llms.txt
```

### Production Testing

```bash
# Main clinic
curl https://drsnaclinic.com/llms.txt

# P-Shot domain
curl https://pshots.co.uk/llms.txt
```

## Validation

### Manual Validation

Check that your llms.txt file:
- ✅ Starts with a single H1 title
- ✅ Uses markdown formatting
- ✅ Has organized H2 sections
- ✅ Contains descriptive link text with URLs
- ✅ Includes "## Optional" section for secondary content

### Automated Testing

```javascript
// Check format
const response = await fetch('http://localhost:3000/llms.txt');
const text = await response.text();

console.log('Has H1 title:', text.startsWith('# '));
console.log('Has sections:', text.includes('## '));
console.log('Content type:', response.headers.get('content-type'));
```

## Updating Content

### Add New Treatment Category

1. Add to `data/categories.json`
2. llms.txt automatically updates (no code changes needed)

### Update Domain Information

Edit `lib/domains.js`:

```javascript
llms: {
  title: 'Your Clinic Name',
  description: 'Your updated description',
  specialties: ['New Specialty', ...],
  keyDifferentiators: ['New differentiator', ...]
}
```

### Modify llms.txt Structure

Edit `app/llms.txt/route.js`:

```javascript
async function generateMainClinicLLMContent(domain) {
  // Customize sections, add new content, change order
  return `# ${domain.llms.title}

> ${domain.llms.description}

## Your New Section

- [New Link](url): Description
`;
}
```

## Performance

- **Cache Duration**: 1 hour (`max-age=3600`)
- **Generation**: Runs on-demand (Next.js 16 server component)
- **Size**: Typically 2-5KB (small, text-only)
- **Impact**: Minimal server load, highly cacheable

## SEO & AI Impact

### Current Adoption (2025)

- ⚠️ **Limited Support**: OpenAI, Google, Anthropic don't officially support it yet
- ✅ **Future-Proofing**: Early adoption positions you for when they do
- ✅ **Best Practice**: Shows technical sophistication
- ✅ **Developer-Friendly**: Helps AI coding assistants understand your project

### Complementary to Other Standards

Works alongside:
- `robots.txt` - Crawling permissions
- `sitemap.xml` - Page discovery
- Schema.org - Structured data
- Meta tags - Page-level SEO

## Best Practices

### Do's ✅

- ✅ Keep descriptions concise and accurate
- ✅ Use patient-friendly language
- ✅ Include medical disclaimers where appropriate
- ✅ Update when adding major new services
- ✅ Link to canonical URLs
- ✅ Emphasize GMC registration and CQC regulation

### Don'ts ❌

- ❌ Don't use marketing hype or exaggerated claims
- ❌ Don't include sensitive patient information
- ❌ Don't list every single page (be selective)
- ❌ Don't use complex HTML (stick to markdown)
- ❌ Don't forget to update after major site changes

## Next.js 16 Specifics

### Route Handler

Uses Next.js App Router route handlers:

```javascript
// app/llms.txt/route.js
export async function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
```

### No Metadata File Support (Yet)

Unlike `robots.txt` and `sitemap.xml`, llms.txt doesn't have first-class Next.js metadata file support yet. We use a route handler instead.

When Next.js adds native support, migration will be:

```javascript
// Future: app/llms.ts (metadata file)
export default function llms() {
  return {
    title: 'Dr SNA Clinic',
    sections: [...]
  }
}
```

## Maintenance

### Monthly Review

- Check for broken links
- Update treatment descriptions
- Add new featured treatments
- Verify medical accuracy

### When to Update

- ✅ Adding new treatment category
- ✅ Launching new service line
- ✅ Changing clinic positioning
- ✅ Adding certifications/accreditations
- ✅ Major website restructure

## Support & Resources

- **Specification**: https://llmstxt.org/
- **Examples**: https://nextjs.org/docs/llms.txt
- **Discussion**: https://github.com/vercel/next.js/discussions/80692
- **Implementation Guide**: This file

## Questions?

### Why use llms.txt if AI doesn't support it yet?

Future-proofing. When OpenAI/Anthropic add support, you'll already be ready. Plus, it's a useful internal reference for how AI should describe your clinic.

### Does this replace SEO?

No! It complements traditional SEO. Keep your meta tags, schema.org markup, and sitemap.xml. This is an additional layer.

### How often should I update it?

Quarterly or when adding major new services. It's cached for 1 hour, so changes appear quickly.

### Can I customize per subdomain?

Yes! The implementation is already multi-domain. Add more domain configs in `lib/domains.js`.

---

**Last Updated**: 2025-01-19
**Version**: 1.0
**Author**: Claude (AI Assistant)
