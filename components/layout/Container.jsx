import { cn } from "@/lib/utils"

export function Container({ children, className, maxWidth = "7xl" }) {
  const maxWidthClasses = {
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
  }

  const isFullWidth = maxWidth === "full"
  const baseClass = isFullWidth ? "w-full px-4 sm:px-6 lg:px-10" : "container mx-auto px-4 sm:px-6 lg:px-8"

  return (
    <div
      className={cn(baseClass, !isFullWidth && maxWidthClasses[maxWidth], className)}
    >
      {children}
    </div>
  )
}
