"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import categories from "@/data/categories.json";
import { contactInfo } from "@/data/contact-info";

export function MobileNav({ isOpen, onClose }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);

  // ESC key to close mobile menu - optimized for performance
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  const formatName = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-[#0a0908]/60 backdrop-blur-md z-40 lg:hidden animate-fade-in"
          />

          {/* Mobile Menu Panel */}
          <div
            className="fixed top-16 right-0 bottom-0 w-full max-w-md bg-[#0a0908]/95 backdrop-blur-2xl shadow-2xl border-l border-white/5 z-50 lg:hidden overflow-y-auto animate-slide-in-right"
          >
            <Container>
              <nav className="py-6">
                {/* Categories */}
                <div className="space-y-1 mb-6">
                  {Object.entries(categories.categories).map(([key, category]) => (
                    <div key={key} className="border-b border-white/10 last:border-0">
                      <button
                        onClick={() =>
                          setExpandedCategory(expandedCategory === key ? null : key)
                        }
                        className="w-full flex items-center justify-between py-3 text-left"
                      >
                        <span className="font-semibold text-base text-white">
                          {category.title}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-white/50 transition-transform duration-200",
                            expandedCategory === key && "rotate-180"
                          )}
                        />
                      </button>

                      {expandedCategory === key && (
                        <div className="overflow-hidden transition-all duration-300 ease-in-out">
                            <div className="pb-4 space-y-2">
                              {/* View All Category Link */}
                              <Link
                                href={`/treatments/${key}`}
                                onClick={onClose}
                                className="block px-3 py-2 text-gold-primary text-sm font-medium rounded-lg hover:bg-white/10 transition-colors"
                              >
                                View All {category.title}
                              </Link>

                              {/* Subcategories */}
                              {Object.entries(category.subcategories).map(
                                ([subKey, subcategory]) => (
                                  <div key={subKey}>
                                    <button
                                      onClick={() =>
                                        setExpandedSubcategory(
                                          expandedSubcategory === subKey ? null : subKey
                                        )
                                      }
                                      className="w-full flex items-center justify-between px-3 py-2 text-left"
                                    >
                                      <span className="font-medium text-sm text-white">
                                        {subcategory.title}
                                      </span>
                                      <ChevronDown
                                        className={cn(
                                          "w-3.5 h-3.5 text-white/50 transition-transform duration-200",
                                          expandedSubcategory === subKey && "rotate-180"
                                        )}
                                      />
                                    </button>

                                    {expandedSubcategory === subKey && (
                                      <ul className="overflow-hidden space-y-0.5 pl-3 mt-1 transition-all duration-300 ease-in-out">
                                          {subcategory.treatments.map((treatment) => (
                                            <li key={treatment}>
                                              <Link
                                                href={`/treatments/${key}/${subKey}/${treatment}`}
                                                onClick={onClose}
                                                className="block px-3 py-1.5 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors"
                                              >
                                                {formatName(treatment)}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* More Links */}
                <div className="space-y-1 mb-6 pt-6 border-t border-white/10">
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="block py-2.5 px-3 font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/team"
                    onClick={onClose}
                    className="block py-2.5 px-3 font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Our Team
                  </Link>
                  <Link
                    href="/dr-syed-nadeem-abbas"
                    onClick={onClose}
                    className="block py-2.5 px-3 font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Dr Syed Nadeem Abbas
                  </Link>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    className="block py-2.5 px-3 font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Contact
                  </Link>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2 pt-6 border-t border-white/10">
                  <Link
                    href={`tel:${contactInfo.phone.primary.number}`}
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {contactInfo.phone.primary.display}
                  </Link>
                  <Link
                    href="/booking"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gold-primary hover:bg-gold-dark text-dark-brown font-medium rounded-lg transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Consultation
                  </Link>
                </div>
              </nav>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
