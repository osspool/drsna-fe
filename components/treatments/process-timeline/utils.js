"use client";

import { Sparkles, icons } from "lucide-react";

export function getIconComponent(icon) {
  if (!icon) return Sparkles;

  const pascal = icon
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");

  return icons[pascal] || Sparkles;
}

export function durationToISO(duration) {
  if (!duration) return null;
  const match = duration.toLowerCase().match(/(\d+)\s*(hour|hr|hours|minute|min|mins)/);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  if (Number.isNaN(value)) return null;
  const unit = match[2];
  if (unit.startsWith("hour") || unit.startsWith("hr")) {
    return `PT${value}H`;
  }
  return `PT${value}M`;
}

function buildHowToSchema(data, steps) {
  if (!data?.title || !steps?.length) return null;

  const schemaSteps = steps
    .filter((step) => step?.title || step?.description)
    .map((step, index) => {
      const name = step.title || `Step ${step.number || index + 1}`;
      return {
        "@type": "HowToStep",
        position: index + 1,
        name,
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: step.description || name,
          },
        ],
        ...(step.duration && { timeRequired: durationToISO(step.duration) }),
      };
    });

  if (!schemaSteps.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.title,
    description: data.subtitle || data.description,
    totalTime: durationToISO(data.totalDuration),
    step: schemaSteps,
  };
}

export function getSchemaMarkup(data, steps) {
  const schema = buildHowToSchema(data, steps);
  return schema ? JSON.stringify(schema) : null;
}
