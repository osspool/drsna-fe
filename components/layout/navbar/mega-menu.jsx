"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
// import type { NavItem } from "@/lib/nav-data"
import { ChevronRight, ArrowLeft, Smile, User, Droplet, ScanLine, ClipboardList, Syringe, Info, Users, UserCheck, Mail } from "lucide-react"
import { TreatmentMenu } from "./treatment-menu"

// Icon mapping for megamenu items
const iconMap = {
  smile: Smile,
  user: User,
  droplet: Droplet,
  "scan-line": ScanLine,
  "clipboard-list": ClipboardList,
  syringe: Syringe,
  info: Info,
  users: Users,
  "user-check": UserCheck,
  mail: Mail,
}

// interface MegaMenuProps {
//   item: NavItem
//   isOpen: boolean
//   onClose: () => void
// }

// interface MenuLevel {
//   category: NavItem
//   breadcrumb: NavItem[]
// }

export function MegaMenu({ item, isOpen, onClose }) {
  const [menuStack, setMenuStack] = useState([{ category: item, breadcrumb: [item] }])

  useEffect(() => {
    setMenuStack([{ category: item, breadcrumb: [item] }])
  }, [item])

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return
    const html = document.documentElement
    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = html.style.overflow

    document.body.style.overflow = "hidden"
    html.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalBodyOverflow
      html.style.overflow = originalHtmlOverflow
    }
  }, [isOpen])

  const currentLevel = menuStack[menuStack.length - 1]
  const isRootLevel = menuStack.length === 1
  const forceInlineTreatmentView = isRootLevel && currentLevel.category.skipCategoryStage

  const handleDrillIn = (child) => {
    const hasTreatments =
      (child.children && child.children.length > 0) || (child.treatmentTypes && child.treatmentTypes.length > 0)
    if (hasTreatments) {
      setMenuStack([
        ...menuStack,
        {
          category: child,
          breadcrumb: [...currentLevel.breadcrumb, child],
        },
      ])
    }
  }

  const handleGoBack = () => {
    if (!isRootLevel) {
      setMenuStack(menuStack.slice(0, -1))
    }
  }

  const displayChildren = currentLevel.category.children || []
  const isTreatmentView =
    (currentLevel.category.children && currentLevel.category.children.length > 0) ||
    (currentLevel.category.treatmentTypes && currentLevel.category.treatmentTypes.length > 0)
  const shouldShowTreatmentMenu = isTreatmentView && (!isRootLevel || forceInlineTreatmentView)

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed top-16 inset-x-0 bottom-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed top-16 inset-x-0 z-50 pointer-events-none">
        <div
          className="pointer-events-auto w-full overflow-hidden overscroll-contain"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="h-full flex flex-col overflow-hidden bg-gradient-to-b from-black via-black/98 to-black/95 animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Header with breadcrumb and back button */}
            {shouldShowTreatmentMenu ? (
              <TreatmentMenu
                item={currentLevel.category}
                breadcrumb={currentLevel.breadcrumb}
                onBack={handleGoBack}
                onNavigate={onClose}
                inlineChildSections={currentLevel.category.inlineChildSections}
              />
            ) : (
              <>
                {!isRootLevel && (
                  <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
                    <button
                      onClick={handleGoBack}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                      Back to menu
                    </button>

                    <div className="text-xs text-white/60">
                      {currentLevel.breadcrumb.map((bc, idx) => (
                        <span key={bc.id}>
                          {idx > 0 && <span className="text-white/30 mx-2">/</span>}
                          <span className={idx === currentLevel.breadcrumb.length - 1 ? "text-primary font-medium" : ""}>
                            {bc.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Menu content area with scroll */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-8 py-10">
                  {displayChildren.length > 0 ? (
                    <div className="grid gap-6 max-w-6xl mx-auto w-full [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
                      {displayChildren.map((child, index) => {
                        const hasChildren =
                          (child.children && child.children.length > 0) ||
                          (child.treatmentTypes && child.treatmentTypes.length > 0)
                        const Icon = child.icon ? iconMap[child.icon] : null

                        const content = (
                          <>
                            <div className="w-full flex flex-col items-center gap-4 pt-6">
                              {Icon && (
                                <Icon className="w-10 h-10 transition-colors duration-200 text-primary/70 group-hover:text-primary" />
                              )}
                              <span className="text-base font-medium transition-colors duration-200 text-white group-hover:text-primary">
                                {child.label}
                              </span>
                            </div>
                            {child.href && (
                              <div className="mt-6">
                                <Link
                                  href={child.href}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    onClose?.()
                                  }}
                                  className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-wide text-white/60 hover:text-primary hover:border-primary/60 transition-colors"
                                >
                                  View page
                                  <ChevronRight className="h-3 w-3" />
                                </Link>
                              </div>
                            )}
                          </>
                        )

                        return hasChildren ? (
                          <div
                            key={child.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleDrillIn(child)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                handleDrillIn(child)
                              }
                            }}
                            className="group relative flex flex-col items-center text-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 cursor-pointer border border-white/20 hover:border-primary/50 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 rounded-2xl px-6 pb-6"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationFillMode: "backwards",
                            }}
                          >
                            <div className="absolute top-4 left-4 text-[11px] uppercase tracking-wide text-white/30">
                              Explore
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 absolute top-4 right-4" />
                            {content}
                          </div>
                        ) : (
                          <a
                            key={child.id}
                            href={child.href}
                            onClick={onClose}
                            className="group relative p-8 text-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 cursor-pointer border border-white/20 hover:border-primary/50 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 rounded-xl"
                            style={{
                              animationDelay: `${index * 50}ms`,
                              animationFillMode: "backwards",
                            }}
                          >
                            {content}
                          </a>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-white/50 text-sm text-center py-8">No items available</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
