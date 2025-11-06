const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/images/treatment'),
  // Quality settings for different formats
  webp: {
    quality: 85, // High quality (80-90 recommended for web)
    effort: 6,   // 0-6, higher = better compression but slower
  },
  jpeg: {
    quality: 85,
    mozjpeg: true, // Use mozjpeg for better compression
  },
  png: {
    quality: 90,
    compressionLevel: 9,
  },
  // Create backup before optimizing
  createBackup: false,
  backupDir: path.join(__dirname, '../public/images/treatment-backup'),
};

// Statistics
const stats = {
  totalFiles: 0,
  optimizedFiles: 0,
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  errors: [],
};

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to get all image files recursively
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

// Create backup of a file
function createBackup(filePath) {
  if (!config.createBackup) return;

  const relativePath = path.relative(config.inputDir, filePath);
  const backupPath = path.join(config.backupDir, relativePath);
  const backupDir = path.dirname(backupPath);

  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  // Copy original file to backup
  fs.copyFileSync(filePath, backupPath);
}

// Helper function to wait (for retries)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely replace file with retry logic
async function safeReplaceFile(originalPath, tempPath, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Close any file handles by deleting and recreating
      if (fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
      }
      
      // Small delay to ensure file is released
      await sleep(100);
      
      // Rename temp to original
      fs.renameSync(tempPath, originalPath);
      return true;
    } catch (error) {
      if (attempt < maxRetries - 1) {
        console.log(`  ⟳ Retry ${attempt + 1}/${maxRetries - 1}...`);
        await sleep(500 * (attempt + 1)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}

// Optimize a single image
async function optimizeImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const originalSize = fs.statSync(filePath).size;
    
    // Create backup before optimizing
    createBackup(filePath);

    // Create a temporary output file with unique name to avoid conflicts
    const tempPath = filePath + `.tmp-${Date.now()}`;

    // Load image with sharp
    let sharpInstance = sharp(filePath);

    // Apply optimization based on file type
    switch (ext) {
      case '.webp':
        await sharpInstance
          .webp({
            quality: config.webp.quality,
            effort: config.webp.effort,
            lossless: false,
          })
          .toFile(tempPath);
        break;

      case '.jpg':
      case '.jpeg':
        await sharpInstance
          .jpeg({
            quality: config.jpeg.quality,
            mozjpeg: config.jpeg.mozjpeg,
          })
          .toFile(tempPath);
        break;

      case '.png':
        await sharpInstance
          .png({
            quality: config.png.quality,
            compressionLevel: config.png.compressionLevel,
          })
          .toFile(tempPath);
        break;

      default:
        console.log(`Skipping unsupported format: ${ext}`);
        return;
    }

    // Verify temp file exists and get size
    if (!fs.existsSync(tempPath)) {
      throw new Error('Optimization failed - temp file not created');
    }

    const optimizedSize = fs.statSync(tempPath).size;

    // Only replace if the optimized version is smaller
    if (optimizedSize < originalSize) {
      // Use retry logic to replace file
      await safeReplaceFile(filePath, tempPath);

      const savedBytes = originalSize - optimizedSize;
      const savedPercent = ((savedBytes / originalSize) * 100).toFixed(2);

      console.log(`✓ ${path.basename(filePath)}`);
      console.log(`  ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (saved ${savedPercent}%)`);

      stats.optimizedFiles++;
      stats.totalOriginalSize += originalSize;
      stats.totalOptimizedSize += optimizedSize;
    } else {
      // Clean up temp file if original is already smaller
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (e) {
        // Ignore cleanup errors
      }
      
      console.log(`⊘ ${path.basename(filePath)} - Original is already optimized`);
      
      stats.totalOriginalSize += originalSize;
      stats.totalOptimizedSize += originalSize;
    }

    stats.totalFiles++;
  } catch (error) {
    console.error(`✗ Error optimizing ${path.basename(filePath)}:`, error.message);
    stats.errors.push({ file: filePath, error: error.message });
  }
}

// Main function
async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');

  // Check if input directory exists
  if (!fs.existsSync(config.inputDir)) {
    console.error(`Error: Input directory not found: ${config.inputDir}`);
    process.exit(1);
  }

  // Create backup directory if needed
  if (config.createBackup && !fs.existsSync(config.backupDir)) {
    fs.mkdirSync(config.backupDir, { recursive: true });
    console.log(`📁 Backup directory created: ${config.backupDir}\n`);
  }

  // Get all image files
  console.log(`📂 Scanning directory: ${config.inputDir}\n`);
  const imageFiles = getAllImageFiles(config.inputDir);

  if (imageFiles.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s) to optimize\n`);
  console.log('Starting optimization...\n');

  // Optimize each image
  for (const filePath of imageFiles) {
    await optimizeImage(filePath);
  }

  // Print summary
  console.log('\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');
  console.log(`Total files processed: ${stats.totalFiles}`);
  console.log(`Files optimized: ${stats.optimizedFiles}`);
  console.log(`Files skipped: ${stats.totalFiles - stats.optimizedFiles}`);
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

  if (config.createBackup) {
    console.log(`\n💾 Original files backed up to: ${config.backupDir}`);
  }

  console.log('\n✨ Optimization complete!\n');
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

