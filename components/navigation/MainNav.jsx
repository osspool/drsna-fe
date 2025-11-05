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
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { CategoryMegaMenu } from "./CategoryMegaMenu";
import { MobileNav } from "./MobileNav";
import categories from "@/data/categories.json";
import Image from "next/image";

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

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out text-white",
          isScrolled
            ? "bg-dark-brown/35 backdrop-blur-md shadow-xl border-b border-white/10"
            : "bg-dark-brown border-b border-white/5"
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
                            ? "text-gold-primary hover:text-gold-light data-[state=open]:text-gold-primary" 
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
                    <ul className="grid w-[400px] gap-2 p-6 bg-[#0a0908]/98 backdrop-blur-md rounded-xl shadow-2xl border border-white/5">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/about"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 group"
                          >
                            <div className="text-sm font-medium text-white">
                              About Us
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                              Learn about our expert team and world-class clinic
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/team"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 group"
                          >
                            <div className="text-sm font-medium text-white">
                              Our Team
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                              Meet our GMC-registered doctors and specialists
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/contact"
                            className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 group"
                          >
                            <div className="text-sm font-medium text-white">
                              Contact
                            </div>
                            <p className="line-clamp-2 text-xs leading-relaxed text-white/60">
                              Get in touch with our team
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="tel:02071234567"
                className="text-white/80 hover:text-white text-[14px] transition-colors duration-200 flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">020 7123 4567</span>
              </Link>
              <Link
                href="/booking"
                className="bg-gold-primary hover:bg-gold-dark text-white text-[13px] font-medium px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                Book Consultation
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
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
