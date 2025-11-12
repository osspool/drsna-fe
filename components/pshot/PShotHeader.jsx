"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PShotHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme } = useTheme();

  const treatments = [
    { label: "P-Shot®", href: "/" },
    { label: "Shockwave Therapy", href: "/shockwave-therapy" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-primary/20">
      {/* Top Bar - Contact Info */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+447955836986"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">+44 7955 836986</span>
              </a>
              <a
                href="mailto:info@drsnaclinic.com"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden lg:inline">info@drsnaclinic.com</span>
              </a>
            </div>
            <div className="hidden md:block text-xs text-muted-foreground">
              <span className="font-semibold text-primary">World-Class Treatment</span> • Wimpole Street, London
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex flex-col">
              <div className="font-heading text-2xl md:text-3xl font-bold leading-tight">
                <span className="text-primary">P-Shot</span>
                <span className="text-foreground">®</span>
              </div>
              <div className="text-xs text-muted-foreground font-medium tracking-wide">
                by Dr Syed Nadeem Abbas
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            {treatments.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/dr-syed-nadeem-abbas"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Dr Abbas
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:text-primary hover:bg-muted">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg"
            >
              <Link href="/contact">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <div className="px-4 py-2 text-xs font-semibold text-primary uppercase tracking-wide">
                Treatments
              </div>
              {treatments.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 pl-8 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/dr-syed-nadeem-abbas"
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dr Abbas
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 px-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-24">
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 font-semibold"
                  size="lg"
                >
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
