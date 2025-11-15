"use client"
import { useState } from "react"
import { DesktopNavbar } from "./desktop-navbar"
import { MobileNavbar } from "./mobile-navbar"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-white border-b border-white/10",
        isMenuOpen ? "bg-royal-blue shadow-2xl" : "bg-royal-blue-900 shadow-xl"
      )}
    >
      <MobileNavbar />
      <DesktopNavbar onMenuOpenChange={setIsMenuOpen} />
    </nav>
  )
}
