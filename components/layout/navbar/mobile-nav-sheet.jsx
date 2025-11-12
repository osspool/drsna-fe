"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react"

const createRootStack = (items) => [
  {
    id: "root",
    label: "Menu",
    description: null,
    items,
  },
]

export function MobileNavSheet({ items, onClose }) {
  const [stack, setStack] = useState(() => createRootStack(items))

  useEffect(() => {
    setStack(createRootStack(items))
  }, [items])

  const currentLevel = stack[stack.length - 1]
  const showBackButton = stack.length > 1

  const handleDrillIn = (item) => {
    if (!item.children || item.children.length === 0) return
    setStack((prev) => [
      ...prev,
      { id: item.id, label: item.label, description: item.description, href: item.href, items: item.children },
    ])
  }

  const handleBack = () => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev))
  }

  const handleNavigate = () => {
    onClose?.()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-3 flex items-center justify-between gap-3">
        {showBackButton ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <span className="text-xs uppercase tracking-wide text-white/40">{currentLevel.label}</span>
        )}

        {currentLevel.href ? (
          <Link
            href={currentLevel.href}
            onClick={handleNavigate}
            className="text-xs uppercase tracking-wide text-white/60 hover:text-amber-300 transition-colors"
          >
            Open page
          </Link>
        ) : (
          <span className="text-xs uppercase tracking-wide text-white/30">Menu</span>
        )}
      </div>

      {currentLevel.id !== "root" && (
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-medium text-base">{currentLevel.label}</h3>
          {currentLevel.description && <p className="text-white/50 text-xs mt-1">{currentLevel.description}</p>}
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-white/10">
          {currentLevel.items.map((item) => {
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.id} className="px-6 py-3 text-white">
                <div className="flex items-center gap-3">
                  {hasChildren ? (
                    <button
                      onClick={() => handleDrillIn(item)}
                      className="flex-1 text-left font-medium text-sm flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-amber-300 transition-colors" />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={handleNavigate}
                      className="flex-1 font-medium text-sm flex items-center gap-2 hover:text-amber-300 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      {item.label}
                    </Link>
                  )}

                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Action */}
      <div className="border-t border-white/10 p-6">
        <Link
          href="/contact"
          onClick={handleNavigate}
          className="w-full inline-flex justify-center bg-amber-400 text-black font-medium py-3 rounded-lg hover:bg-amber-300 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}
