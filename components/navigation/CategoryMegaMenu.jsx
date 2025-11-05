"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CategoryMegaMenu({ category, categoryKey }) {
  // Get icon based on category
  const getIcon = (icon) => {
    const icons = {
      sparkles: "✨",
      "heart-pulse": "💕",
      activity: "⚡",
    };
    return icons[icon] || "✨";
  };

  // Format treatment name
  const formatName = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [firstSubcategoryKey, firstSubcategory] =
    Object.entries(category.subcategories)[0] || [];
  const popularTreatments = firstSubcategory?.treatments.slice(0, 4) || [];

  const buildTreatmentPath = (catKey, subKey, treatment) => {
    if (subKey) {
      return `/treatments/${catKey}/${subKey}/${treatment}`;
    }
    return `/treatments/${catKey}/${treatment}`;
  };

  return (
    <div className="w-[900px] p-6 bg-black/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/5">
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Featured Category Info */}
        <div className="col-span-4 border-r border-white/10 pr-8">
          <div className="sticky top-0">
            {/* Icon */}
            <div className="text-4xl mb-4">{getIcon(category.icon)}</div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              {category.title}
            </h3>
            <p className="text-white/60 mb-6 leading-relaxed text-sm">
              {category.description}
            </p>

            {/* Popular Treatments */}
            <div className="space-y-1 mb-6">
              <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wide mb-2">
                Popular
              </p>
              {popularTreatments.map((treatment) => (
                <Link
                  key={treatment}
                  href={buildTreatmentPath(
                    categoryKey,
                    firstSubcategoryKey,
                    treatment
                  )}
                  className="group flex items-center justify-between p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm text-white/80  transition-colors">
                    {formatName(treatment)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <Link
              href={`/treatments/${categoryKey}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-primary hover:gap-2 transition-all"
            >
              View All {category.title}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column - Subcategories Grid */}
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
              <div key={subKey}>
                <Link
                  href={`/treatments/${categoryKey}/${subKey}`}
                  className="inline-flex items-center gap-1.5 mb-2 group/heading"
                >
                  <h4 className="text-sm font-semibold text-white group-hover/heading:text-gold-primary transition-colors">
                    {subcategory.title}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 opacity-0 group-hover/heading:opacity-100 transition-opacity" />
                </Link>
                <p className="text-xs text-white/50 mb-3 leading-relaxed">
                  {subcategory.description}
                </p>
                <ul className="space-y-1.5">
                  {subcategory.treatments.slice(0, 6).map((treatment) => (
                    <li key={treatment}>
                      <Link
                        href={buildTreatmentPath(categoryKey, subKey, treatment)}
                        className="text-sm text-white/70 hover:text-white transition-colors block py-0.5"
                      >
                        {formatName(treatment)}
                      </Link>
                    </li>
                  ))}
                  {subcategory.treatments.length > 6 && (
                    <li className="pt-1">
                      <Link
                        href={`/treatments/${categoryKey}/${subKey}`}
                        className="text-sm text-gold-primary font-medium inline-flex items-center gap-1 transition-all group/more"
                      >
                        +{subcategory.treatments.length - 6} more
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
