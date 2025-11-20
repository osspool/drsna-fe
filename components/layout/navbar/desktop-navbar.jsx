"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { navigationData } from "./nav-data"
import { MegaMenu } from "./mega-menu"
import { ChevronDown, Phone, Calendar } from "lucide-react"
import { ModeToggle } from "@/components/custom/ui/mode-toggle"
import { MovingBorderButton } from "@/components/aceternity/moving-border"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Container } from "@/components/layout/Container"
import { contactInfo } from "@/data/contact-info"

export function DesktopNavbar({ onMenuOpenChange }) {
  const [activeMenuId, setActiveMenuId] = useState(null)
  const triggerRefs = useRef({})

  useEffect(() => {
    onMenuOpenChange?.(activeMenuId !== null)
  }, [activeMenuId, onMenuOpenChange])

  // Click outside to close menu - optimized for performance
  useEffect(() => {
    if (!activeMenuId) return

    const handleClickOutside = (event) => {
      const megaMenuRoot = document.querySelector('[data-mega-menu-root]')
      const clickedInsideMegaMenu = megaMenuRoot && megaMenuRoot.contains(event.target)
      const clickedTrigger = Object.values(triggerRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      )

      if (!clickedTrigger && !clickedInsideMegaMenu) {
        setActiveMenuId(null)
      }
    }

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setActiveMenuId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [activeMenuId])

  const mainItems = navigationData.filter((item) => !item.children || item.children.length === 0)
  const dropdownItems = navigationData.filter((item) => item.children && item.children.length > 0)

  return (
    <div className="hidden lg:block">
      <Container maxWidth="full">
        <div className="flex items-center gap-6 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-10">
            <div className="relative w-[70px] h-[45px]">
              <Image
                src="/dr-sna-clinic-logo.png"
                alt="Dr SNA Clinic"
                width={70}
                height={45}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Main Navigation */}
          <div className="flex-1 flex items-center justify-center gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-wrap">
            {dropdownItems.map((item) => {
              const isActive = activeMenuId === item.id

              return (
                <div key={item.id} className="group">
                  <button
                    ref={(el) => (triggerRefs.current[item.id] = el)}
                    className={` py-2 text-sm  transition-all duration-300 ease-out flex items-center gap-1.5 rounded-lg ${
                      isActive
                        ? "text-primary "
                        : "text-white/80 hover:text-primary"
                    }`}
                    onClick={() => setActiveMenuId(isActive ? null : item.id)}
                    aria-haspopup="true"
                    aria-expanded={isActive}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              )
            })}

            {mainItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="px-3 py-2 text-[13px] md:text-[14px] font-medium text-white/80 hover:text-primary hover:bg-white/5 transition-all duration-300 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`tel:${contactInfo.phone.primary.number}`}
                    className="text-white/80 hover:text-white text-[14px] transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{contactInfo.phone.primary.display}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Link href="/booking">
              <MovingBorderButton
                borderRadius="1.5rem"
                className="bg-linear-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground text-[13px] font-medium px-4 py-2 border-none"
                containerClassName="h-auto"
                borderClassName="bg-[radial-gradient(circle,var(--primary)_20%,var(--primary-foreground)_40%,transparent_70%)]"
                duration={3000}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </span>
              </MovingBorderButton>
            </Link>
          </div>
        </div>
      </Container>

      {activeMenuId && (
        <MegaMenu
          item={dropdownItems.find((item) => item.id === activeMenuId)}
          isOpen={activeMenuId !== null}
          onClose={() => setActiveMenuId(null)}
        />
      )}
    </div>
  )
}
