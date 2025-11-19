import fs from 'fs';
import path from 'path';

// Note: Cannot use "use cache" with filesystem operations
// This module provides server-side only utilities for data discovery

/**
 * Automatic Data Discovery System
 * 
 * Scans the data directory structure to automatically discover:
 * - All categories
 * - All subcategories
 * - All treatments
 * 
 * NO MANUAL REGISTRATION REQUIRED!
 * Just add a JSON file in the correct location and it's automatically discovered.
 */

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Check if a directory exists and is accessible
 */
function dirExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

/**
 * Get all subdirectories in a directory
 */
function getSubdirectories(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !name.startsWith('.') && !name.startsWith('_'));
  } catch {
    return [];
  }
}

/**
 * Get all JSON files in a directory
 */
function getJsonFiles(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isFile() && dirent.name.endsWith('.json'))
      .map(dirent => dirent.name.replace('.json', ''));
  } catch {
    return [];
  }
}

/**
 * Automatically discover all categories by scanning data directory
 * Categories are top-level directories with a category.json file
 */
export function scanCategories() {
  const categories = [];
  const topLevelDirs = getSubdirectories(DATA_DIR);
  
  for (const dir of topLevelDirs) {
    const categoryPath = path.join(DATA_DIR, dir);
    const categoryJsonPath = path.join(categoryPath, 'category.json');
    
    // Check if it has a category.json file (indicates it's a category)
    if (fs.existsSync(categoryJsonPath)) {
      categories.push({
        id: dir,
        path: categoryPath,
      });
    }
  }
  
  return categories;
}

/**
 * Automatically discover all subcategories within a category
 */
export function scanSubcategories(categoryId) {
  const subcategories = [];
  const categoryPath = path.join(DATA_DIR, categoryId);
  
  if (!dirExists(categoryPath)) return subcategories;
  
  const subdirs = getSubdirectories(categoryPath);
  
  for (const subdir of subdirs) {
    const subcategoryPath = path.join(categoryPath, subdir);
    const subcategoryJsonPath = path.join(subcategoryPath, 'subcategory.json');
    
    // Check if it has a subcategory.json file
    if (fs.existsSync(subcategoryJsonPath)) {
      subcategories.push({
        category: categoryId,
        subcategory: subdir,
        path: subcategoryPath,
      });
    }
  }
  
  return subcategories;
}

/**
 * Automatically discover all treatments within a subcategory
 */
export function scanTreatments(categoryId, subcategoryId) {
  const treatments = [];
  const treatmentsPath = path.join(DATA_DIR, categoryId, subcategoryId, 'treatments');
  
  if (!dirExists(treatmentsPath)) return treatments;
  
  const treatmentFiles = getJsonFiles(treatmentsPath);
  
  for (const slug of treatmentFiles) {
    treatments.push({
      category: categoryId,
      subcategory: subcategoryId,
      slug: slug,
      path: path.join(treatmentsPath, `${slug}.json`),
    });
  }
  
  return treatments;
}

/**
 * Get ALL subcategories across all categories
 * Automatically discovered - no manual registration needed
 */
export function getAllSubcategories() {
  const allSubcategories = [];
  const categories = scanCategories();
  
  for (const category of categories) {
    const subcategories = scanSubcategories(category.id);
    allSubcategories.push(...subcategories);
  }
  
  return allSubcategories;
}

/**
 * Get ALL treatments across all categories and subcategories
 * Automatically discovered - no manual registration needed
 */
export function getAllTreatments() {
  const allTreatments = [];
  const categories = scanCategories();
  
  for (const category of categories) {
    const subcategories = scanSubcategories(category.id);
    
    for (const subcategory of subcategories) {
      const treatments = scanTreatments(category.id, subcategory.subcategory);
      allTreatments.push(...treatments);
    }
  }
  
  return allTreatments;
}

/**
 * Get treatment paths for sitemap (minimal format)
 */
export function getAllTreatmentPaths() {
  return getAllTreatments().map(t => ({
    category: t.category,
    subcategory: t.subcategory,
    slug: t.slug,
  }));
}

/**
 * Get subcategory paths for sitemap (minimal format)
 */
export function getAllSubcategoryPaths() {
  return getAllSubcategories().map(s => ({
    category: s.category,
    subcategory: s.subcategory,
  }));
}

/**
 * Verify a treatment file exists
 */
export function treatmentExists(categoryId, subcategoryId, slug) {
  const treatmentPath = path.join(DATA_DIR, categoryId, subcategoryId, 'treatments', `${slug}.json`);
  return fs.existsSync(treatmentPath);
}

/**
 * Get statistics about the data structure
 * Useful for debugging/monitoring
 */
export function getDataStats() {
  const categories = scanCategories();
  const subcategories = getAllSubcategories();
  const treatments = getAllTreatments();
  
  return {
    totalCategories: categories.length,
    totalSubcategories: subcategories.length,
    totalTreatments: treatments.length,
    categories: categories.map(c => c.id),
    breakdown: categories.map(cat => ({
      category: cat.id,
      subcategories: scanSubcategories(cat.id).length,
      treatments: scanSubcategories(cat.id).reduce((total, sub) => {
        return total + scanTreatments(cat.id, sub.subcategory).length;
      }, 0),
    })),
  };
}

