"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import categoriesData from "@/data/categories.json";

const categories = categoriesData.categories || {};

const formatFromSlug = (value = "") =>
  value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getCategoryTitle = (categoryId) =>
  categories[categoryId]?.title ?? formatFromSlug(categoryId);

const getSubcategoryTitle = (categoryId, subcategoryId) =>
  categories[categoryId]?.subcategories?.[subcategoryId]?.title ??
  formatFromSlug(subcategoryId);

export function TreatmentHero({ treatment, params }) {
  const categoryTitle = getCategoryTitle(params?.category);
  const subcategoryTitle = getSubcategoryTitle(params?.category, params?.subcategory);

  const breadcrumbItems = [
    { label: "Treatments", href: "/treatments" },
  ];

  if (params?.category) {
    breadcrumbItems.push({
      label: categoryTitle,
      href: `/treatments/${params.category}`,
    });
  }

  if (params?.subcategory) {
    breadcrumbItems.push({
      label: subcategoryTitle,
      href: `/treatments/${params.category}/${params.subcategory}`,
    });
  }

  breadcrumbItems.push({ label: treatment.title });

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden pt-28 pb-12 sm:pt-40 sm:pb-20 bg-black">
      {/* Background Image */}
      {treatment.hero?.backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={treatment.hero.backgroundImage}
              alt={treatment.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/75 z-0" />
        </>
      )}

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          {/* Breadcrumb */}
          <Breadcrumb className="mb-4 sm:mb-6 text-white/70">
            <BreadcrumbList className="text-white/70 text-xs sm:text-sm">
              {breadcrumbItems.map((item, index) => (
                <Fragment key={`${item.href ?? item.label}-${index}`}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink
                        asChild
                        className="hover:text-primary transition-colors"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="text-primary font-semibold">
                        {item.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator className="text-white/30" />
                  )}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          {/* Badge */}
          {treatment.hero?.badge && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full mb-4 sm:mb-6"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary fill-primary flex-shrink-0" />
              <span className="text-primary text-[10px] sm:text-sm font-semibold tracking-wider uppercase">
                {treatment.hero.badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 leading-tight"
          >
            {treatment.hero?.headline || treatment.title}
          </motion.h1>

          {/* Tagline */}
          {treatment.tagline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-primary mb-4 sm:mb-6 font-light leading-relaxed"
            >
              {treatment.tagline}
            </motion.p>
          )}

          {/* Subheadline */}
          {treatment.hero?.subheadline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mb-6 sm:mb-8 leading-relaxed"
            >
              {treatment.hero.subheadline}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Button
              asChild
              className="btn-primary-gradient h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold group"
            >
              <Link href="/booking">
                Book Consultation
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              className="h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold glass-card border-2 border-white/30 text-white hover:bg-primary hover:border-primary shadow-lg transition-all"
            >
              <Link href="#pricing">
                View Pricing
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

