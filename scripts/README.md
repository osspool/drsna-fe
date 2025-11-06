# Image Optimization Script

This script optimizes images in the `public/images/treatment` directory using Sharp.

## Features

- ✅ Optimizes WebP, JPEG, and PNG images
- ✅ Maintains high quality (85% quality for WebP/JPEG)
- ✅ Preserves original filenames and directory structure
- ✅ Creates automatic backups before optimization
- ✅ Recursively processes all subdirectories
- ✅ Shows detailed statistics and savings
- ✅ Only replaces files if optimization reduces size

## Usage

Run the optimization script:

```bash
npm run optimize-images
```

## Configuration

You can customize the optimization settings by editing `scripts/optimize-images.js`:

```javascript
const config = {
  // Quality settings
  webp: {
    quality: 85,  // 80-90 recommended for high quality
    effort: 6,    // 0-6, higher = better compression
  },
  jpeg: {
    quality: 85,
    mozjpeg: true,
  },
  png: {
    quality: 90,
    compressionLevel: 9,
  },
  
  // Backup settings
  createBackup: true,  // Set to false to skip backup
  backupDir: '../public/images/treatment-backup',
};
```

## Output Example

```
🖼️  Image Optimization Script
================================

📁 Backup directory created: public/images/treatment-backup

📂 Scanning directory: public/images/treatment

Found 10 image(s) to optimize

Starting optimization...

✓ anti-wrinkle-1.webp
  450 KB → 320 KB (saved 28.89%)
✓ anti-wrinkle-2.webp
  380 KB → 280 KB (saved 26.32%)
...

================================
📊 Optimization Summary
================================

Total files processed: 10
Files optimized: 8
Files skipped: 2

Original total size: 4.2 MB
Optimized total size: 3.1 MB
Total saved: 1.1 MB (26.19%)

💾 Original files backed up to: public/images/treatment-backup

✨ Optimization complete!
```

## Restoring Backups

If you need to restore the original images:

1. The backups are stored in `public/images/treatment-backup`
2. Simply copy them back to `public/images/treatment`

## Notes

- The script only replaces images if optimization reduces file size
- Images that are already well-optimized will be skipped
- Original files are always backed up (unless disabled in config)
- Supports recursive directory processing

