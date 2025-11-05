"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem, Menu as NavMenu, HoveredLink } from "@/components/aceternity/navbar-menu";
import categories from "@/data/categories.json";
import { cn } from "@/lib/utils";

export function NewHeader() {
  const [active, setActive] = useState(null);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gold-primary/10">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group z-50">
              <div className="text-2xl font-heading font-bold">
                <span className="bg-gold-gradient bg-clip-text text-transparent">
                  Dr SNA
                </span>
                <span className="text-dark-brown"> Clinic</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavMenu setActive={setActive}>
                {/* Aesthetic Medicine */}
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Aesthetic Medicine"
                >
                  <div className="flex flex-col space-y-4 text-sm w-[400px]">
                    {Object.entries(categories.categories["aesthetic-medicine"].subcategories).map(
                      ([key, subcategory]) => (
                        <div key={key} className="text-left">
                          <p className="text-sm font-semibold mb-2 text-gold">
                            {subcategory.title}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {subcategory.treatments.slice(0, 6).map((treatment) => (
                              <HoveredLink
                                key={treatment}
                                href={`/treatments/aesthetic-medicine/${treatment}`}
                              >
                                {treatment
                                  .split("-")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                              </HoveredLink>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                    <Link
                      href="/treatments/aesthetic-medicine"
                      className="text-gold font-semibold hover:underline text-center"
                    >
                      View All Treatments →
                    </Link>
                  </div>
                </MenuItem>

                {/* Intimate Health */}
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Intimate Health"
                >
                  <div className="flex flex-col space-y-4 text-sm w-[350px]">
                    {Object.entries(categories.categories["intimate-health"].subcategories).map(
                      ([key, subcategory]) => (
                        <div key={key} className="text-left">
                          <p className="text-sm font-semibold mb-2 text-gold">
                            {subcategory.title}
                          </p>
                          <div className="space-y-1">
                            {subcategory.treatments.map((treatment) => (
                              <HoveredLink
                                key={treatment}
                                href={`/treatments/intimate-health/${treatment}`}
                              >
                                {treatment
                                  .split("-")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                              </HoveredLink>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </MenuItem>

                {/* Pain Management */}
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Pain Management"
                >
                  <div className="flex flex-col space-y-4 text-sm w-[350px]">
                    {Object.entries(categories.categories["pain-management"].subcategories).map(
                      ([key, subcategory]) => (
                        <div key={key} className="text-left">
                          <p className="text-sm font-semibold mb-2 text-gold">
                            {subcategory.title}
                          </p>
                          <div className="space-y-1">
                            {subcategory.treatments.map((treatment) => (
                              <HoveredLink
                                key={treatment}
                                href={`/treatments/pain-management/${treatment}`}
                              >
                                {treatment
                                  .split("-")
                                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                              </HoveredLink>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </MenuItem>

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onMouseEnter={() => setActive("More")}
                    className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white flex items-center gap-1"
                  >
                    More
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {active === "More" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 pt-4"
                    >
                      <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl p-4">
                        <div className="space-y-1 w-40">
                          <HoveredLink href="/about">About Us</HoveredLink>
                          <HoveredLink href="/team">Our Team</HoveredLink>
                          <HoveredLink href="/blog">Blog</HoveredLink>
                          <HoveredLink href="/contact">Contact</HoveredLink>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </NavMenu>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                className="text-gold hover:bg-gold/10"
              >
                <Link href="tel:+442071234567">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Us
                </Link>
              </Button>
              <Button
                asChild
                className="btn-gold"
              >
                <Link href="/booking">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-dark-brown hover:text-gold transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gold-primary/10"
          >
            <div className="container-custom py-6 space-y-4">
              <div className="space-y-2">
                <Link
                  href="/treatments/aesthetic-medicine"
                  className="block py-2 text-dark-brown hover:text-gold font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Aesthetic Medicine
                </Link>
                <Link
                  href="/treatments/intimate-health"
                  className="block py-2 text-dark-brown hover:text-gold font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Intimate Health
                </Link>
                <Link
                  href="/treatments/pain-management"
                  className="block py-2 text-dark-brown hover:text-gold font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pain Management
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-dark-brown hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block py-2 text-dark-brown hover:text-gold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              <div className="pt-4 space-y-3 border-t border-gold-primary/20">
                <Button asChild variant="outline" className="w-full">
                  <Link href="tel:+442071234567">
                    <Phone className="w-4 h-4 mr-2" />
                    020 7123 4567
                  </Link>
                </Button>
                <Button asChild className="w-full btn-gold">
                  <Link href="/booking">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
