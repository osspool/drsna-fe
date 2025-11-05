"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export function ContentBlock({ data }) {
  const { heading, content, image, imagePosition = "right", imageAlt, layout = "text-image" } = data;
  const isImageRight = imagePosition === "right";

  if (layout === "text-only") {
    return (
      <Section>
        <Container maxWidth="4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {heading && (
              <h2 className="text-4xl font-heading font-bold mb-6 text-gold">
                {heading}
              </h2>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className={cn(
          "grid md:grid-cols-2 gap-12 items-center",
          isImageRight ? "" : "md:grid-flow-dense"
        )}>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={isImageRight ? "" : "md:col-start-2"}
          >
            {heading && (
              <h2 className="text-4xl font-heading font-bold mb-6 text-gold">
                {heading}
              </h2>
            )}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gold prose-strong:text-gold-dark"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isImageRight ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn(
              "relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-gold-lg",
              isImageRight ? "" : "md:col-start-1 md:row-start-1"
            )}
          >
            <Image
              src={image || "/images/placeholder.jpg"}
              alt={imageAlt || heading || "Treatment image"}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
