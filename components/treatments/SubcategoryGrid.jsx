"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";

export function SubcategoryGrid({ subcategories, categoryId }) {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <section id="treatments" className="py-16 md:py-20 bg-linear-to-b from-white to-cream">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-wider uppercase">
              Our Treatments
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-heading font-bold text-dark-brown mb-3"
          >
            Explore Our Specialties
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-dark-brown/60 max-w-3xl mx-auto"
          >
            Choose from our range of specialized treatment areas, each expertly designed to address your unique needs
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {subcategories.map((subcategory, index) => (
            <SubcategoryCard
              key={subcategory.id}
              subcategory={subcategory}
              categoryId={categoryId}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SubcategoryCard({ subcategory, categoryId, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/treatments/${categoryId}/${subcategory.id}`}>
        <div className="group relative h-full rounded-3xl overflow-hidden bg-white border-2 border-dark-brown/10 hover:border-transparent hover:shadow-2xl transition-all duration-700">
          {/* Image Section */}
          {subcategory.image && (
            <div className="relative h-56 overflow-hidden">
              <Image
                src={subcategory.image}
                alt={subcategory.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-dark-brown/30 to-transparent" />

              {/* Featured Badge */}
              {subcategory.featured && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-gold/90 backdrop-blur-sm rounded-full">
                  <span className="text-white font-semibold text-xs">Featured</span>
                </div>
              )}

              {/* Treatment Count */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full">
                  <span className="text-dark-brown font-semibold text-xs">
                    {subcategory.treatmentCount} {subcategory.treatmentCount === 1 ? 'Treatment' : 'Treatments'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-2xl font-heading font-bold text-dark-brown mb-2 group-hover:text-gold transition-colors">
              {subcategory.title}
            </h3>

            {/* Short Description */}
            {subcategory.shortDescription && (
              <p className="text-sm text-dark-brown/60 mb-2">
                {subcategory.shortDescription}
              </p>
            )}

            {/* Description */}
            <p className="text-sm text-dark-brown/70 leading-relaxed mb-4">
              {subcategory.description}
            </p>

            {/* CTA */}
            <div className="flex items-center text-gold font-semibold text-sm">
              Explore {subcategory.title} Treatments
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Color Accent */}
          {subcategory.color && (
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
              style={{ backgroundColor: subcategory.color }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
}
