# Cloudflare CDN Setup Guide for Next.js 16

## Overview
This guide covers integrating Cloudflare CDN with your Next.js 16 application for improved performance, security, and global content delivery.

---

## 🚀 Setup Methods

### Method 1: Cloudflare as Reverse Proxy (Recommended)

This is the most common approach - Cloudflare sits in front of your Next.js app.

#### Step 1: Add Domain to Cloudflare

1. Sign up/login at [cloudflare.com](https://cloudflare.com)
2. Click "Add a Site"
3. Enter your domain (e.g., `drsnaclinic.com`)
4. Choose a plan (Free tier works great)
5. Cloudflare will scan your DNS records

#### Step 2: Update DNS Nameservers

1. Copy the nameservers provided by Cloudflare
2. Go to your domain registrar
3. Replace your current nameservers with Cloudflare's
4. Wait for DNS propagation (usually 24-48 hours, but often faster)

#### Step 3: Configure DNS Records

In Cloudflare Dashboard → DNS → Records:

- **A Record**: Point `@` to your server IP
- **CNAME Record**: Point `www` to your domain or server
- **CNAME Record**: Point `pshot.drsnaclinic.com` to your server (for P-Shot subdomain)

#### Step 4: SSL/TLS Settings

1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode to **Full (strict)**
3. Enable **Always Use HTTPS**
4. Enable **Automatic HTTPS Rewrites**

#### Step 5: Configure Page Rules (Optional but Recommended)

Go to **Rules** → **Page Rules** and create:

**Rule 1: Cache Static Assets**
- URL Pattern: `*drsnaclinic.com/_next/static/*`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: Respect Existing Headers

**Rule 2: Cache Images**
- URL Pattern: `*drsnaclinic.com/images/*`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month

**Rule 3: Don't Cache API Routes**
- URL Pattern: `*drsnaclinic.com/api/*`
- Settings:
  - Cache Level: Bypass

**Rule 4: Don't Cache HTML Pages (for ISR)**
- URL Pattern: `*drsnaclinic.com/*`
- Settings:
  - Cache Level: Standard
  - Edge Cache TTL: Respect Existing Headers

---

## ⚙️ Next.js Configuration for Cloudflare

### Update `next.config.mjs`

Your config has been updated with Cloudflare optimizations:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,

  // Cloudflare optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Cloudflare will handle image optimization via Workers
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Headers for Cloudflare caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 🔒 Security Settings

### Web Application Firewall (WAF)

1. Go to **Security** → **WAF**
2. Enable **Managed Rules** (Free tier includes basic rules)
3. For Pro plan: Enable OWASP Core Ruleset

### Bot Fight Mode

1. Go to **Security** → **Bots**
2. Enable **Super Bot Fight Mode** (Pro plan) or **Bot Fight Mode** (Free)

### Rate Limiting

1. Go to **Security** → **Rate Limifying**
2. Create rules for:
   - API endpoints: Limit to 100 requests/minute per IP
   - Contact forms: Limit to 5 submissions/hour per IP

---

## 📊 Performance Optimizations

### Speed Settings

1. Go to **Speed** → **Optimization**
2. Enable:
   - ✅ **Auto Minify**: JavaScript, CSS, HTML
   - ✅ **Brotli**: Compression
   - ✅ **Rocket Loader**: Defer JavaScript (optional, test first)
   - ✅ **Mirage**: Image optimization (Pro plan)

### Caching

1. Go to **Caching** → **Configuration**
2. Set **Caching Level**: Standard
3. Set **Browser Cache TTL**: 4 hours
4. Enable **Always Online**: Yes

### Image Optimization (Pro Plan)

1. Go to **Speed** → **Polish**
2. Enable **Lossless** or **Lossy** compression
3. Enable **WebP** conversion

---

## 🌍 Cloudflare Workers (Advanced)

For edge computing and advanced optimizations:

### Install Wrangler CLI

```bash
npm install -g wrangler
```

### Create a Worker for Next.js

Create `cloudflare-worker.js`:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Add security headers
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    
    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-Frame-Options', 'DENY');
    newResponse.headers.set('X-XSS-Protection', '1; mode=block');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return newResponse;
  }
};
```

---

## 🔍 Verification

### Test CDN is Working

1. Check if Cloudflare is active:
   ```bash
   curl -I https://drsnaclinic.com
   ```
   Look for `CF-Cache-Status` header

2. Check DNS propagation:
   ```bash
   nslookup drsnaclinic.com
   ```
   Should show Cloudflare nameservers

3. Test caching:
   - Visit your site
   - Check Network tab in DevTools
   - Look for `CF-Cache-Status: HIT` on static assets

### Performance Testing

Use these tools:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **Cloudflare Analytics**: Dashboard → Analytics → Web Analytics

---

## 📝 Environment Variables

Update your deployment platform (Vercel, etc.) with:

```env
# Cloudflare-specific (if using Workers)
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Ensure your app knows it's behind Cloudflare
NEXT_PUBLIC_CDN_URL=https://drsnaclinic.com
```

---

## 🚨 Common Issues & Solutions

### Issue: Mixed Content Warnings
**Solution**: Ensure all assets use HTTPS. Cloudflare's "Always Use HTTPS" should handle this.

### Issue: Images Not Loading
**Solution**: Check `next.config.mjs` image domains. Cloudflare may need to be added to `remotePatterns`.

### Issue: API Routes Not Working
**Solution**: Ensure API routes are not cached. Add Page Rule to bypass cache for `/api/*`.

### Issue: ISR Not Working
**Solution**: Cloudflare respects `Cache-Control` headers. Ensure your ISR pages have correct headers.

### Issue: WebSocket Connections
**Solution**: Cloudflare supports WebSockets. Ensure your Next.js app is configured correctly.

---

## 📈 Monitoring

### Cloudflare Analytics

1. Go to **Analytics** → **Web Analytics**
2. Enable for your domain
3. Monitor:
   - Page views
   - Bandwidth savings
   - Cache hit ratio
   - Security events

### Real User Monitoring (Pro Plan)

1. Go to **Analytics** → **Web Analytics**
2. Enable **Real User Monitoring**
3. Get detailed performance metrics

---

## 🎯 Best Practices

1. **Always test in staging first** before applying to production
2. **Monitor cache hit ratio** - aim for >80% on static assets
3. **Use Cloudflare Analytics** to track improvements
4. **Keep SSL/TLS on Full (strict)** for security
5. **Regularly review WAF logs** for security threats
6. **Use Page Rules sparingly** - they're limited on free tier
7. **Test API routes** after enabling caching rules

---

## 🔗 Useful Links

- [Cloudflare Next.js Documentation](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Cloudflare Cache Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/)
- [Cloudflare Workers Examples](https://developers.cloudflare.com/workers/examples/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

---

## ✅ Checklist

- [ ] Domain added to Cloudflare
- [ ] Nameservers updated at registrar
- [ ] DNS records configured
- [ ] SSL/TLS set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] Page Rules configured
- [ ] WAF enabled
- [ ] Bot protection enabled
- [ ] Speed optimizations enabled
- [ ] Caching configured
- [ ] Next.js config updated
- [ ] Performance tested
- [ ] Analytics enabled

---

**Last Updated**: 2024
**Next.js Version**: 16.0.1

