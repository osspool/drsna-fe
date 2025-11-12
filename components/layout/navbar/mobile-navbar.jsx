"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { navigationData } from "./nav-data"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MobileNavSheet } from "./mobile-nav-sheet"
import { ModeToggle } from "@/components/custom/ui/mode-toggle"
import { Container } from "@/components/layout/Container"

export function MobileNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[60px] h-[40px]">
              <Image
                src="/dr-sna-clinic-logo.png"
                alt="Dr SNA Clinic"
                width={60}
                height={40}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Mode Toggle & Menu Button */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-white/80 hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {open ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-full max-w-sm bg-black border-r border-white/10 p-0">
          <SheetHeader className="border-b border-white/10 px-6 py-4">
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>
          <MobileNavSheet items={navigationData} onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}
