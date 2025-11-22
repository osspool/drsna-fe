"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { navigationData } from "./nav-data"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { MobileNavSheet } from "./mobile-nav-sheet"
import { ModeToggle } from "@/components/custom/ui/mode-toggle"
import { Container } from "@/components/layout/Container"
import { Button } from "@/components/ui/button"

export function MobileNavbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[60px] h-[40px]">
              <Image
                src="/dr-sna-clinic-logo.png"
                alt="Dr SNA Clinic"
                fill
                priority
                sizes="60px"
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
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-full max-w-sm bg-royal-blue border-r border-white/10 p-0">
          <SheetHeader className="border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </SheetHeader>
          <MobileNavSheet items={navigationData} onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
