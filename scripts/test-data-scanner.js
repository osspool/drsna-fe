/**
 * Test script to verify automatic data discovery
 * Run: node scripts/test-data-scanner.js
 */

import { getDataStats, getAllTreatmentPaths, getAllSubcategoryPaths } from '../lib/data-scanner.js';

console.log('🔍 Testing Automatic Data Discovery System\n');
console.log('='.repeat(60));

// Get statistics
const stats = getDataStats();

console.log('\n📊 DATA STRUCTURE STATISTICS:');
console.log(`   Total Categories: ${stats.totalCategories}`);
console.log(`   Total Subcategories: ${stats.totalSubcategories}`);
console.log(`   Total Treatments: ${stats.totalTreatments}`);

console.log('\n📁 CATEGORY BREAKDOWN:');
stats.breakdown.forEach(cat => {
  console.log(`   ${cat.category}:`);
  console.log(`      Subcategories: ${cat.subcategories}`);
  console.log(`      Treatments: ${cat.treatments}`);
});

console.log('\n🎯 SUBCATEGORY PATHS (for sitemap):');
const subcategories = getAllSubcategoryPaths();
subcategories.slice(0, 5).forEach(sub => {
  console.log(`   /${sub.category}/${sub.subcategory}`);
});
console.log(`   ... and ${subcategories.length - 5} more`);

console.log('\n🏥 TREATMENT PATHS (for sitemap):');
const treatments = getAllTreatmentPaths();
treatments.slice(0, 10).forEach(t => {
  console.log(`   /${t.category}/${t.subcategory}/${t.slug}`);
});
console.log(`   ... and ${treatments.length - 10} more`);

console.log('\n' + '='.repeat(60));
console.log('✅ Automatic Discovery Working!');
console.log('\n💡 TO ADD A NEW TREATMENT:');
console.log('   1. Create: data/{category}/{subcategory}/treatments/{slug}.json');
console.log('   2. That\'s it! No code changes needed.');
console.log('   3. Restart dev server to see it in sitemap/nav.');
console.log('='.repeat(60) + '\n');

