"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
// import type { NavItem } from "@/lib/nav-data"

const buildColumnClasses = (count) => {
  if (count >= 24) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  if (count >= 12) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  if (count >= 6) return "grid-cols-1 sm:grid-cols-2"
  return "grid-cols-1"
}

// interface TreatmentMenuProps {
//   item: NavItem
//   breadcrumb: NavItem[]
//   onBack: () => void
// }

export function TreatmentMenu({ item, breadcrumb, onBack, onNavigate, inlineChildSections = false }) {
  const treatmentTypes = item.treatmentTypes || []
  const hasTreatmentTypes = treatmentTypes.length > 0
  const children = item.children || []
  const useInlineSections = inlineChildSections || item.inlineChildSections
  const showBackButton = breadcrumb.length > 1

  const handleNavigate = () => {
    if (typeof onNavigate === "function") {
      onNavigate()
    }
  }

  // Group children by treatment type if types exist
  const groupedTreatments = {}
  if (hasTreatmentTypes && children.length > 0 && !useInlineSections) {
    treatmentTypes.forEach((type) => {
      groupedTreatments[type.id] = []
    })
    // Simple grouping logic - in real app, you'd have explicit type assignments
    children.forEach((child, idx) => {
      const typeId = treatmentTypes[idx % treatmentTypes.length]?.id
      if (typeId) {
        groupedTreatments[typeId].push(child)
      }
    })
  } else {
    // No treatment types, show all children directly
    groupedTreatments["all"] = children
  }

  const sectionDefinitions = useInlineSections
    ? children.map((section) => ({
        id: section.id,
        label: section.label,
        description: section.description,
        href: section.href,
        items: section.children || [],
      }))
    : hasTreatmentTypes
      ? treatmentTypes.map((type) => ({
          id: type.id,
          label: type.label,
          description: type.description,
          href: type.href,
          items: groupedTreatments[type.id] || [],
        }))
      : []

  const hasSections = sectionDefinitions.length > 0

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 py-5 min-h-[44px]">
          {showBackButton ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-opacity duration-150 text-sm font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-150" />
              Back to menu
            </button>
          ) : (
            <span className="text-sm font-semibold text-white/80">{item.label}</span>
          )}

          {item.href && (
            <Link
              href={item.href}
              onClick={handleNavigate}
              className="text-xs uppercase tracking-wide text-white/60 hover:text-primary transition-colors duration-150"
            >
              Open page
            </Link>
          )}
        </div>
      </div>

      {/* Treatment content */}
      <div className="px-6 md:px-8 py-8 overflow-y-auto overscroll-contain flex-1">
        <div className="max-w-6xl mx-auto">
          {hasSections ? (
            <div className={`grid gap-8 ${buildColumnClasses(sectionDefinitions.length)}`}>
              {sectionDefinitions.map((section, typeIndex) => (
                <div
                  key={section.id}
                  className="space-y-4 transition-opacity duration-200"
                >
                  {/* Section header */}
                  <div className="space-y-1 border-b border-white/10 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      {section.href ? (
                        <Link
                          href={section.href}
                          onClick={handleNavigate}
                          className="text-primary font-semibold text-base inline-flex items-center gap-2 hover:text-primary/80 transition-colors"
                        >
                          {section.label}
                        </Link>
                      ) : (
                        <h3 className="text-primary font-semibold text-base">{section.label}</h3>
                      )}
                      {section.items.length > 0 && (
                        <span className="text-[11px] uppercase tracking-wide text-white/40">
                          {section.items.length} {section.items.length === 1 ? "item" : "items"}
                        </span>
                      )}
                    </div>
                    {section.description && <p className="text-white/50 text-xs">{section.description}</p>}
                  </div>

                  {/* Section list */}
                  <ul className={`grid gap-y-1.5 gap-x-6 ${buildColumnClasses(section.items.length)}`}>
                    {section.items.map((treatment, index) => (
                      <li key={treatment.id}>
                        <Link
                          href={treatment.href || "#"}
                          onClick={handleNavigate}
                          className="group text-white/80 hover:text-primary transition-all duration-200 text-[13px] py-1.5 px-2 hover:pl-3 hover:bg-white/5 rounded-md flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-primary transition-colors duration-200"></span>
                          {treatment.label}
                        </Link>
                      </li>
                    ))}
                    {section.items.length === 0 && (
                      <li className="text-white/40 text-xs italic">No treatments listed</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            // Direct treatment list (no types)
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={handleNavigate}
                    className="text-primary font-semibold text-lg hover:text-primary/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <h3 className="text-primary font-semibold text-lg">{item.label}</h3>
                )}
                <span className="text-[12px] uppercase tracking-wide text-white/40">
                  {children.length} {children.length === 1 ? "treatment" : "treatments"}
                </span>
              </div>
              <ul className={`grid gap-y-1.5 gap-x-8 ${buildColumnClasses(children.length)}`}>
                {children.map((treatment, index) => (
                  <li
                    key={treatment.id}
                    className="animate-in fade-in slide-in-from-left-1"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    <Link
                      href={treatment.href || "#"}
                      onClick={handleNavigate}
                      className="group text-white/80 hover:text-primary transition-all duration-200 text-[13px] py-1.5 px-2 hover:pl-3 hover:bg-white/5 rounded-md flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-primary transition-colors duration-200"></span>
                      {treatment.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
