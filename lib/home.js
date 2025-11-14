"use cache";

import { readFileSync } from "fs";
import { join } from "path";

export async function getHomePageData() {
  try {
    const filePath = join(process.cwd(), "data", "home", "page.json");
    const fileContent = readFileSync(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load home page data", error);
    return null;
  }
}
