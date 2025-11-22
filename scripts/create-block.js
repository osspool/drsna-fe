#!/usr/bin/env node

/**
 * Block Scaffold Utility
 *
 * Generates a new block with component, registry entry, and documentation.
 *
 * Usage: npm run block:create block.my-block
 *        npm run block:create section.my-section
 */

const fs = require('fs');
const path = require('path');

const blockId = process.argv[2];

if (!blockId) {
  console.error('❌ Please provide a block ID');
  console.error('Usage: npm run block:create block.my-block');
  process.exit(1);
}

// Parse block ID
const [category, ...nameParts] = blockId.split('.');
const name = nameParts.join('.');

if (!name) {
  console.error('❌ Invalid block ID format. Use: category.name');
  console.error('Examples: block.my-block, section.my-section');
  process.exit(1);
}

// Convert to component name (kebab to PascalCase)
const componentName = name
  .split('-')
  .map(part => part.charAt(0).toUpperCase() + part.slice(1))
  .join('') + (category === 'section' ? 'Section' : 'Block');

// Determine directory
const dirMap = {
  block: 'components/blocks',
  section: 'components/sections',
  landing: 'components/landing',
  hero: 'components/heroes',
  treatment: 'components/treatments',
  contact: 'components/contact',
};

const directory = dirMap[category] || 'components/blocks';
const fileName = `${componentName}.jsx`;
const filePath = path.join(process.cwd(), directory, fileName);

// Check if file exists
if (fs.existsSync(filePath)) {
  console.error(`❌ File already exists: ${filePath}`);
  process.exit(1);
}

// Component template
const componentTemplate = `"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FadeInUp } from "@/components/common/AnimatedWrapper";
import { generateStableKey } from "@/lib/utils";

/**
 * ${componentName} Component
 *
 * [Description of what this component does]
 *
 * @param {Object} props
 * @param {Object} props.data - Block data
 * @param {string} props.data.title - Section title
 * @param {string} [props.data.subtitle] - Optional subtitle
 * @param {Array} [props.data.items] - Array of items to display
 */
export function ${componentName}({ data }) {
  const { title, subtitle, items = [] } = data;

  return (
    <Section padding="xl">
      <Container>
        <FadeInUp>
          <SectionHeader
            title={title}
            subtitle={subtitle}
          />
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {items.map((item, index) => (
            <FadeInUp key={generateStableKey(item, index, "${componentName}-item")} delay={index * 100}>
              <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-all">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
`;

// Registry entry template
const registryEntry = `
// Add to lib/blocks/registry.js imports:
import { ${componentName} } from "@/${directory}/${componentName}";

// Add to blockRegistry object:
'${blockId}': ${componentName},
`;

// Type definition template
const typeDefinition = `
// Add to lib/blocks/types.js:

/**
 * @typedef {Object} ${componentName}Data
 * @property {string} title - Section title
 * @property {string} [subtitle] - Section subtitle
 * @property {Array<{title: string, description: string}>} [items] - Items to display
 */

// Add to blockSchemas:
'${blockId}': ['title'],
`;

// Create directory if it doesn't exist
const dirPath = path.dirname(filePath);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Write component file
fs.writeFileSync(filePath, componentTemplate);

console.log('✅ Block created successfully!');
console.log('');
console.log('📁 Component:', filePath);
console.log('');
console.log('📝 Next steps:');
console.log('');
console.log('1. Add to registry (lib/blocks/registry.js):');
console.log(registryEntry);
console.log('');
console.log('2. Add type definition (lib/blocks/types.js):');
console.log(typeDefinition);
console.log('');
console.log('3. Use in page config:');
console.log(\`
{
  id: '${name}',
  block: '${blockId}',
  mapper: () => ({
    data: {
      title: "Section Title",
      items: []
    }
  })
}
\`);
