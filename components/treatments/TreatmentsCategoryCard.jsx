"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/custom/ui/icon";

export function TreatmentsCategoryCard({ category, index }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/treatments/${category.id}`}>
        <div className="group relative h-full rounded-3xl overflow-hidden bg-card border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-700">
          {/* Image */}
          <div className="relative h-72 md:h-80 overflow-hidden">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/40 to-transparent" />

            {/* Floating Icon */}
            <div className="absolute top-6 md:top-8 right-6 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-card/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <Icon
                name={category.iconName.charAt(0).toLowerCase() + category.iconName.slice(1)}
                size={32}
                className="text-(--icon-color)"
                style={{ '--icon-color': category.color }}
              />
            </div>

            {/* Treatment Count Badge */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 px-3 md:px-4 py-1.5 md:py-2 bg-card/90 backdrop-blur-sm rounded-full">
              <span className="text-foreground font-semibold text-xs md:text-sm">
                {category.treatmentCount}+ Treatments
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors">
              {category.title}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed line-clamp-3">
              {category.description}
            </p>

            {/* Subcategories */}
            {category.subcategories && (
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                {category.subcategories.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary text-muted-foreground text-xs md:text-sm rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center text-primary font-semibold text-sm md:text-base">
              Explore {category.shortTitle}
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
