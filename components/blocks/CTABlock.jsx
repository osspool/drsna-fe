"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MovingBorderButton } from "@/components/aceternity/moving-border";

export function CTABlock({ data }) {
  const { style = "gradient", heading, description, buttons, trustSignals } = data;

  const backgrounds = {
    gradient: "bg-gold-gradient",
    dark: "bg-dark-gradient text-white",
    light: "bg-cream"
  };

  return (
    <Section padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn(
            "rounded-2xl p-12 md:p-16 text-center shadow-gold-lg",
            backgrounds[style]
          )}
        >
          <h2 className={cn(
            "text-3xl md:text-4xl font-heading font-bold mb-6",
            style === "gradient" || style === "light" ? "text-dark-brown" : "text-white"
          )}>
            {heading}
          </h2>

          {description && (
            <p className={cn(
              "text-base md:text-lg mb-8 max-w-2xl mx-auto",
              style === "gradient" || style === "light" ? "text-dark-brown/80" : "text-white/90"
            )}>
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {buttons && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {buttons.map((button, index) => (
                button.variant === "primary" ? (
                  <MovingBorderButton
                    key={index}
                    as={Link}
                    href={button.link}
                    borderRadius="1.5rem"
                    className={cn(
                      "text-lg px-8 py-6 font-semibold",
                      style === "dark" 
                        ? "bg-gradient-to-br from-[#1a1814] to-[#2d2620] text-white" 
                        : "bg-dark-brown text-white hover:bg-dark-brown/90"
                    )}
                    containerClassName="w-full sm:w-auto"
                  >
                    <span className="flex items-center gap-2">
                      {button.text}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </MovingBorderButton>
                ) : (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    variant="outline"
                    className={cn(
                      "text-lg px-8 py-6",
                      style === "dark" ? "border-gold/40 text-white hover:bg-gold/20" : "border-dark-brown text-dark-brown hover:bg-dark-brown hover:text-white"
                    )}
                  >
                    <Link href={button.link}>
                      {button.text}
                    </Link>
                  </Button>
                )
              ))}
            </div>
          )}

          {/* Trust Signals */}
          {trustSignals && trustSignals.length > 0 && (
            <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-current/20">
              {trustSignals.map((signal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className={cn(
                    "w-5 h-5",
                    style === "dark" ? "text-gold-light" : "text-gold-dark"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    style === "dark" ? "text-white" : "text-dark-brown"
                  )}>
                    {signal}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
