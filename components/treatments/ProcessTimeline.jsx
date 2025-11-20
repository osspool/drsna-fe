"use client";

import { CompactTimeline } from "./process-timeline/CompactTimeline";
import { DetailedTimeline } from "./process-timeline/DetailedTimeline";
import { DefaultTimeline } from "./process-timeline/DefaultTimeline";
import { getSchemaMarkup } from "./process-timeline/utils";

export function ProcessTimeline({ data, variant }) {
  if (!data || !data.steps || !data.steps.length) return null;

  const steps = data.steps;
  const resolvedVariant = normalizeVariant(variant ?? data.variant ?? "default");
  const schemaMarkup = getSchemaMarkup(data, steps);

  if (resolvedVariant === "compact-timeline") {
    return (
      <CompactTimeline
        data={data}
        steps={steps}
        schemaMarkup={schemaMarkup}
      />
    );
  }

  if (resolvedVariant === "timeline") {
    return (
      <DetailedTimeline
        data={data}
        steps={steps}
        schemaMarkup={schemaMarkup}
      />
    );
  }

  return (
    <DefaultTimeline
      data={data}
      steps={steps}
      schemaMarkup={schemaMarkup}
      variant={resolvedVariant}
    />
  );
}

function normalizeVariant(value) {
  if (!value) return "default";
  const normalized = value.toString().toLowerCase();

  switch (normalized) {
    case "compact":
    case "compact-timeline":
      return "compact-timeline";
    case "timeline":
    case "detailed":
      return "timeline";
    case "vertical":
      return "vertical";
    default:
      return normalized;
  }
}
