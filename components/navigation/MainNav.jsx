"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CategoryMegaMenu } from "./CategoryMegaMenu";
import { MobileNav } from "./MobileNav";
import categories from "@/data/categories.json";
import Image from "next/image";
import { ModeToggle } from "../custom/ui/mode-toggle";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { contactInfo } from "@/data/contact-info";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key to close mobile menu - optimized for performance
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-white",
          isScrolled
            ? "bg-black/35 backdrop-blur-md shadow-xl border-b border-white/10"
            : "bg-black/20 border-b border-white/10"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 relative">
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

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                {/* Direct Category Navigation - Apple Style */}
                {Object.entries(categories.categories).map(([key, category]) => {
                  const isActive = pathname?.startsWith(`/treatments/${key}`);
                  return (
                    <NavigationMenuItem key={key}>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent hover:bg-transparent font-normal text-[14px] h-auto py-1.5 px-3 transition-colors duration-200 border-none shadow-none",
                          isActive
                            ? "text-primary hover:text-primary/80 data-[state=open]:text-primary"
                            : "text-white/80 hover:text-white data-[state=open]:text-white"
                        )}
                      >
                        {category.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
                        <CategoryMegaMenu category={category} categoryKey={key} />
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}

                {/* About & Contact in "More" dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white/80 hover:text-white data-[state=open]:text-white font-normal text-[14px] h-auto py-1.5 px-3 transition-colors duration-200 border-none shadow-none">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
                    <ul className="grid w-[400px] gap-2 p-6 bg-card/98 backdrop-blur-md rounded-xl shadow-2xl border border-border">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about-us"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent group"
                          >
                            <div className="text-sm font-medium text-foreground">
                              About Us
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              Learn about our expert team and world-class clinic
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about-us#team"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent group"
                          >
                            <div className="text-sm font-medium text-foreground">
                              Our Team
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              Meet our GMC-registered doctors and specialists
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/dr-syed-nadeem-abbas"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent group"
                          >
                            <div className="text-sm font-medium text-foreground">
                              Dr Syed Nadeem Abbas
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              Meet our award-winning aesthetic medicine specialist
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent group"
                          >
                            <div className="text-sm font-medium text-foreground">
                              Contact
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              Get in touch with our team
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/resources"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent group"
                          >
                            <div className="text-sm font-medium text-foreground">
                              Resources
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              Evidence-led guides for hair fall, intimacy, and longevity
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
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

            {/* Mobile CTA - Mode Toggle & Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <ModeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
