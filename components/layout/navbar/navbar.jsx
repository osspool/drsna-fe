"use client"
import { useState, useEffect } from "react"
import { DesktopNavbar } from "./desktop-navbar"
import { MobileNavbar } from "./mobile-navbar"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

export function Navbar() {
  const isMobile = useIsMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isMobile === undefined) return null

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-white",
        isMenuOpen
          ? "bg-black/95 backdrop-blur-md shadow-2xl border-b border-white/10"
          : isScrolled
            ? "bg-black/35 backdrop-blur-md shadow-xl border-b border-white/10"
            : "bg-black/20 border-b border-white/10"
      )}
    >
      {isMobile ? <MobileNavbar /> : <DesktopNavbar onMenuOpenChange={setIsMenuOpen} />}
    </nav>
  )
}
