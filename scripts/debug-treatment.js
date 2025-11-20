
const { join } = require('path');
const { readFileSync } = require('fs');

// Mock resolvePresets since we can't easily import it if it uses other imports
// But wait, we can try to require it if it's a commonjs module or use dynamic import
// Let's try to replicate the logic or just read the file and see if it has "preset" keys

async function test() {
    try {
        const { resolvePresets } = await import('../lib/presets.js');

        const category = "aesthetic-medicine";
        const subcategory = "face";
        const slug = "cheek-augmentation";

        const filePath = join(
            process.cwd(),
            "data",
            category,
            subcategory,
            "treatments",
            `${slug}.json`
        );

        console.log(`Attempting to read: ${filePath}`);
        const fileContent = readFileSync(filePath, "utf-8");
        const treatment = JSON.parse(fileContent);
        console.log("File read successfully. JSON parsed.");

        console.log("Attempting to resolve presets...");
        const resolved = resolvePresets(treatment);
        console.log("Presets resolved successfully!");
        console.log("Result preview:", JSON.stringify(resolved).substring(0, 100));

    } catch (error) {
        console.error("ERROR:", error);
    }
}

test();
