const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images/drsnaclinic'),
  outputDir: path.join(__dirname, '../public/images/treatment-optimized'),
  // Quality settings for different formats
  webp: {
    quality: 85,
    effort: 6,
  },
  jpeg: {
    quality: 85,
    mozjpeg: true,
  },
  png: {
    quality: 90,
    compressionLevel: 9,
  },
};

const stats = {
  totalFiles: 0,
  optimizedFiles: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  errors: [],
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const originalSize = fs.statSync(inputPath).size;
    
    // Calculate relative path and create output path
    const relativePath = path.relative(config.inputDir, inputPath);
    const outputPath = path.join(config.outputDir, relativePath);
    const outputDirPath = path.dirname(outputPath);

    // Create output directory
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    // Load image with sharp
    let sharpInstance = sharp(inputPath);

    // Apply optimization based on file type
    switch (ext) {
      case '.webp':
        await sharpInstance
          .webp({
            quality: config.webp.quality,
            effort: config.webp.effort,
            lossless: false,
          })
          .toFile(outputPath);
        break;

      case '.jpg':
      case '.jpeg':
        await sharpInstance
          .jpeg({
            quality: config.jpeg.quality,
            mozjpeg: config.jpeg.mozjpeg,
          })
          .toFile(outputPath);
        break;

      case '.png':
        await sharpInstance
          .png({
            quality: config.png.quality,
            compressionLevel: config.png.compressionLevel,
          })
          .toFile(outputPath);
        break;

      default:
        return;
    }

    const optimizedSize = fs.statSync(outputPath).size;
    const savedBytes = originalSize - optimizedSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(2);

    console.log(`✓ ${path.basename(inputPath)}`);
    console.log(`  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (saved ${savedPercent}%)`);

    stats.optimizedFiles++;
    stats.totalOriginalSize += originalSize;
    stats.totalOptimizedSize += optimizedSize;
    stats.totalFiles++;
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(inputPath)}:`, error.message);
    stats.errors.push({ file: inputPath, error: error.message });
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script (Safe Mode)');
  console.log('================================\n');

  if (!fs.existsSync(config.inputDir)) {
    console.error(`Error: Input directory not found: ${config.inputDir}`);
    process.exit(1);
  }

  console.log(`📂 Scanning directory: ${config.inputDir}\n`);
  const imageFiles = getAllImageFiles(config.inputDir);

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to optimize\n`);
  console.log('Starting optimization...\n');

  for (const filePath of imageFiles) {
    await optimizeImage(filePath);
  }

  console.log('\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');
  console.log(`Total files processed: ${stats.totalFiles}`);
  console.log(`Files optimized: ${stats.optimizedFiles}`);
  console.log(`\nOriginal total size: ${formatBytes(stats.totalOriginalSize)}`);
  console.log(`Optimized total size: ${formatBytes(stats.totalOptimizedSize)}`);
  
  const totalSaved = stats.totalOriginalSize - stats.totalOptimizedSize;
  const totalSavedPercent = stats.totalOriginalSize > 0 
    ? ((totalSaved / stats.totalOriginalSize) * 100).toFixed(2)
    : 0;
  
  console.log(`Total saved: ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);

  if (stats.errors.length > 0) {
    console.log('\n⚠️  Errors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${path.basename(file)}: ${error}`);
    });
  }

  console.log(`\n📁 Optimized images saved to: ${config.outputDir}`);
  console.log('\n📋 Next Steps:');
  console.log(`1. Review images in: ${config.outputDir}`);
  console.log('2. Copy optimized images back to original location:');
  console.log('   - Delete original images: public/images/treatment');
  console.log('   - Rename treatment-optimized → treatment');
  console.log('\n✨ Optimization complete!\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

