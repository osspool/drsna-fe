"use client";

import * as Icons from "lucide-react";

function toPascalCase(value = "") {
  return value
    .split(/[\s-_]+/)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

function getIconByName(name) {
  if (!name) return null;
  const iconName = toPascalCase(name);
  return Icons[iconName] || null;
}

export function getIconComponent(icon, fallback = "Sparkles") {
  if (typeof icon === "string") {
    return getIconByName(icon) || getIconComponent(fallback);
  }

  if (icon) {
    return icon;
  }

  if (typeof fallback === "string") {
    return getIconByName(fallback) || Icons.Sparkles;
  }

  return fallback || Icons.Sparkles;
}
