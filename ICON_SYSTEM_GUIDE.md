# Icon System Guide

## Two Icon Systems

Your project has **two different icon systems** - be aware which one you're using:

### 1. Dynamic Icon System (Recommended) ✅

**File**: `lib/icon-utils.js`

**Features**:
- ✅ Works with ALL Lucide icons automatically
- ✅ Converts kebab-case to PascalCase (`"align-center"` → `AlignCenter`)
- ✅ No manual registration needed
- ✅ Fallback to Sparkles icon if not found

**Usage**:
```javascript
import { getIconComponent } from '@/lib/icon-utils';

// In your component
const IconComponent = getIconComponent('align-center'); // Works!
const IconComponent = getIconComponent('heart-pulse'); // Works!
const IconComponent = getIconComponent('any-lucide-icon'); // Works!
```

**How it works**:
```javascript
function toPascalCase(value = "") {
  return value
    .split(/[\s-_]+/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

// "align-center" → "AlignCenter"
// "heart-pulse" → "HeartPulse"
// "user-check" → "UserCheck"
```

### 2. Static Icon Map ⚠️

**File**: `components/custom/ui/icon.jsx`

**Features**:
- ⚠️ Only works with manually registered icons
- ⚠️ Must import and add each icon to the map
- ⚠️ Throws warning if icon not found: `Icon "name" not found`

**Usage**:
```javascript
import { Icon } from '@/components/custom/ui/icon';

// In your component
<Icon name="align-center" size={24} /> // Works NOW (just added)
<Icon name="some-new-icon" size={24} /> // ❌ Won't work until added to map
```

**How to add new icons**:
1. Import the icon from lucide-react:
   ```javascript
   import { NewIcon } from "lucide-react";
   ```

2. Add to iconMap (both kebab-case and camelCase):
   ```javascript
   const iconMap = {
     newIcon: NewIcon,
     'new-icon': NewIcon,
   };
   ```

## Recently Fixed Icons

### ✅ AlignCenter Icon
- **Used in**: Intimate health subcategory (corrective care)
- **Purpose**: Represents alignment/straightening for Peyronie's treatment
- **Fix**: Added to `components/custom/ui/icon.jsx`

```javascript
import { AlignCenter } from "lucide-react";

const iconMap = {
  alignCenter: AlignCenter,
  'align-center': AlignCenter, // kebab-case version
};
```

## Icon Naming Conventions

### In JSON Data Files
Use **kebab-case** (lowercase with hyphens):
```json
{
  "icon": "align-center",
  "icon": "heart-pulse",
  "icon": "user-check"
}
```

### Lucide Icon Names
Lucide uses **PascalCase**:
- `AlignCenter`
- `HeartPulse`
- `UserCheck`

### Automatic Conversion
The `toPascalCase` function in `lib/icon-utils.js` handles this:
```
"align-center" → "AlignCenter"
"heart-pulse" → "HeartPulse"
"user-check" → "UserCheck"
```

## Finding Available Icons

### Option 1: Lucide Website
Visit [https://lucide.dev/icons/](https://lucide.dev/icons/)

### Option 2: Command Line
```bash
node -e "const lucide = require('lucide-react'); console.log(Object.keys(lucide).filter(k => k.toLowerCase().includes('align')));"
```

### Option 3: Check Import
All Lucide icons are exported from `lucide-react`:
```javascript
import * as Icons from "lucide-react";
console.log(Icons.AlignCenter); // Check if exists
```

## Troubleshooting

### "Icon 'name' not found" Warning

**Cause**: Using static `Icon` component with unregistered icon

**Solution 1** (Quick Fix):
Add icon to `components/custom/ui/icon.jsx`:
```javascript
import { YourIcon } from "lucide-react";

const iconMap = {
  'your-icon': YourIcon,
};
```

**Solution 2** (Better):
Use dynamic system from `lib/icon-utils.js`:
```javascript
import { getIconComponent } from '@/lib/icon-utils';
const IconComponent = getIconComponent('your-icon');
```

### Icon Not Appearing

1. **Check the icon name** exists in Lucide:
   ```bash
   node -e "const Icons = require('lucide-react'); console.log(Icons.YourIconName);"
   ```

2. **Check capitalization**:
   - JSON data: `"icon": "align-center"` ✅
   - Lucide: `AlignCenter` ✅
   - Not: `"icon": "AlignCenter"` ❌

3. **Check which system you're using**:
   - Static map: Must add manually
   - Dynamic utils: Works automatically

## Best Practices

### ✅ DO:
- Use kebab-case in JSON data files
- Use dynamic `getIconComponent` for flexibility
- Add commonly used icons to static map for performance
- Keep icon names semantic and descriptive

### ❌ DON'T:
- Mix PascalCase and kebab-case in data files
- Forget to add both camelCase and kebab-case to static map
- Use icons that don't exist in Lucide
- Hardcode icon components in multiple places

## Migration Guide

If you have components using the static Icon map and want to migrate to dynamic:

### Before:
```javascript
import { Icon } from '@/components/custom/ui/icon';

function MyComponent() {
  return <Icon name="heart-pulse" size={24} />;
}
```

### After:
```javascript
import { getIconComponent } from '@/lib/icon-utils';

function MyComponent() {
  const IconComponent = getIconComponent('heart-pulse');
  return <IconComponent size={24} />;
}
```

## Performance Considerations

### Static Map
- ✅ Slightly faster (direct import)
- ❌ Larger bundle if importing many icons
- ❌ Manual maintenance required

### Dynamic Utils
- ⚠️ Tiny overhead for string conversion
- ✅ Smaller bundle (tree-shaking)
- ✅ No maintenance needed

## Common Icons Reference

### Medical/Health Icons
```
"stethoscope", "heart-pulse", "activity", "syringe",
"microscope", "flask-conical", "pill", "thermometer"
```

### UI/Navigation Icons
```
"arrow-right", "arrow-left", "chevron-right", "menu",
"x", "check", "check-circle", "external-link"
```

### Alignment/Layout Icons
```
"align-center", "align-left", "align-right", "align-justify",
"align-center-horizontal", "align-center-vertical"
```

### Status/Action Icons
```
"shield-check", "alert-circle", "info", "sparkles",
"star", "award", "target", "lock"
```

---

**Last Updated**: 2025-01-19
**Icon Count**: 1000+ available in Lucide
**Systems**: 2 (static map + dynamic utils)
