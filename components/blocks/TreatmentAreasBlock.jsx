"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import * as Icons from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function TreatmentAreasBlock({ data }) {
  const { title, subtitle, areas } = data;

  return (
    <Section background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas?.map((area, index) => {
            const iconName = area.icon?.split('-').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join('');
            const Icon = Icons[iconName] || Icons.MapPin;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex"
              >
                <div className="flex flex-col h-full w-full rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-primary-lg transition-all duration-500">
                  {/* Image */}
                  {area.image && (
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <Image
                        src={area.image}
                        alt={area.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />

                      {/* Icon Overlay */}
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                      {area.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                      {area.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                      {area.price && (
                        <span className="text-primary font-heading font-bold text-lg">
                          {area.price}
                        </span>
                      )}
                      {area.duration && (
                        <span className="text-sm text-muted-foreground">
                          {area.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

