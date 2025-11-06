"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CometCard } from "@/components/aceternity/comet-card";
import { BackgroundRippleEffect } from "@/components/aceternity/background-ripple-effect";
import Glow from "@/components/custom/ui/glow";
import { 
  Stethoscope, 
  Dna, 
  Zap, 
  Leaf, 
  MapPin, 
  Award, 
  Check,
  Shield,
  Clock,
  Users,
  Star
} from "lucide-react";

const iconMap = {
  stethoscope: Stethoscope,
  dna: Dna,
  zap: Zap,
  leaf: Leaf,
  "map-pin": MapPin,
  award: Award,
  check: Check,
  shield: Shield,
  clock: Clock,
  users: Users,
};

export function WhyChooseBlock({ data }) {
  const { 
    title, 
    subtitle,
    description,
    features = [], 
    background = "white",
    variant = "grid",
    enabled = true 
  } = data;

  if (!enabled) return null;

  // Compact Grid Variant - Apple/Meta inspired with enhanced effects
  if (variant === "compact-grid") {
    return (
      <Section background={background} padding="none" ripple={false}>
        <div className="relative flex w-full flex-col items-start justify-start overflow-hidden py-16 md:py-24">
          {/* Background Effects */}
          <BackgroundRippleEffect 
            rows={8} 
            cols={27} 
            cellSize={56}
          />
          
          {/* Glow Effect */}
          <Glow 
            variant="center" 
            className="opacity-30"
          />
          
          {/* Content Layer */}
          <Container className="relative z-10 w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 max-w-3xl mx-auto"
            >
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-3 drop-shadow-sm">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-base md:text-lg text-dark-brown/70 drop-shadow-sm">
                  {subtitle}
                </p>
              )}
            </motion.div>

            {/* Compact Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Check;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <CometCard className="h-full">
                      <div className="group h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gold/10 hover:border-gold/30">
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold group-hover:to-gold-dark transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-bold text-dark-brown mb-2 group-hover:text-gold transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-dark-brown/70 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CometCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 flex items-center justify-center gap-8 flex-wrap"
            >
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Award className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-brown">5,000+</p>
                  <p className="text-sm text-dark-brown/60">Treatments</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Star className="w-7 h-7 text-gold fill-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-brown">5.0</p>
                  <p className="text-sm text-dark-brown/60">Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Users className="w-7 h-7 text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-dark-brown">98%</p>
                  <p className="text-sm text-dark-brown/60">Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </Container>
        </div>
      </Section>
    );
  }

  // Default Grid Variant with enhanced effects
  return (
    <Section background={background} padding="default">
      <div className="relative flex w-full flex-col items-start justify-start overflow-hidden">
        {/* Background Effects */}
        <BackgroundRippleEffect 
          rows={8} 
          cols={27} 
          cellSize={56}
        />
        
        {/* Glow Effect */}
        <Glow 
          variant="center" 
          className="opacity-30"
        />
        
        {/* Content Layer */}
        <Container className="relative z-10 w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 max-w-3xl mx-auto"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-3 drop-shadow-sm">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base md:text-lg text-dark-brown/70 drop-shadow-sm">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Check;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <CometCard className="h-full">
                    <div className="group h-full bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gold/10 hover:border-gold/30">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold group-hover:to-gold-dark transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-gold group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-lg font-bold text-dark-brown mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-dark-brown/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CometCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </div>
    </Section>
  );
}

