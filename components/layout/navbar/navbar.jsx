"use client"
import { useState } from "react"
import { DesktopNavbar } from "./desktop-navbar"
import { MobileNavbar } from "./mobile-navbar"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function Navbar() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (isMobile === undefined) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-white border-b border-white/10",
        isMenuOpen ? "bg-black shadow-2xl" : "bg-black/95 shadow-xl"
      )}
    >
      {isMobile ? <MobileNavbar /> : <DesktopNavbar onMenuOpenChange={setIsMenuOpen} />}
    </nav>
  )
}
