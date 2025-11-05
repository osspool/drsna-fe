# Dr SNA Clinic - Luxury Medical Aesthetic Website

A sophisticated, modern medical aesthetic clinic website built with Next.js 16, featuring a luxurious gold theme (#cda55c), dynamic content management, and beautiful animations.

## ✨ Features

### 🎨 Luxury Design System
- **Custom Gold Gradient Theme** with multiple gradient variations
- **Premium Typography**: Playfair Display (headings), Inter (body), Cormorant Garamond (accents)
- **Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Mobile-first, works beautifully on all devices

### 📦 Dynamic Content Blocks
8 reusable content block components for building treatment pages

### 🏗️ Smart Architecture
- **JSON-Driven Content** - All treatment data in structured JSON files
- **Dynamic Routing** - Automatic page generation from data
- **Component-Based** - Highly reusable, composable components
- **SEO Optimized** - Schema markup, meta tags, OpenGraph

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Key Files

- `ARCHITECTURE.md` - Detailed architecture documentation
- `PROJECT_SUMMARY.md` - Quick reference guide
- `data/categories.json` - Treatment categories structure
- `data/treatments/` - Treatment data files
- `components/blocks/` - Reusable content blocks

## 🎨 Color Theme

```css
--gold-primary: #cda55c
--gold-gradient: linear-gradient(135deg, #cda55c 0%, #d4af69 50%, #e6c89f 100%)
```

## 📝 Creating Treatment Pages

1. Create JSON file in `data/treatments/`
2. Add treatment to `data/categories.json`
3. Page automatically available at `/treatments/[category]/[slug]`

See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for detailed guide.

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui + Radix UI
- Framer Motion
- Lucide React

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Full architecture guide
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Quick reference

---

Built with ❤️ using Next.js, Tailwind CSS, shadcn/ui, and Framer Motion
