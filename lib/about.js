"use cache";

import { readFileSync } from "fs";
import { join } from "path";

export async function getAboutPageData() {
  try {
    const filePath = join(process.cwd(), "data", "home", "about", "page.json");
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load about page data", error);
    return null;
  }
}
