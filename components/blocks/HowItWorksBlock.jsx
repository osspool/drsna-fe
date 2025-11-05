"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CometCard } from "@/components/aceternity/comet-card";
import { Spotlight } from "@/components/aceternity/spotlight";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { 
  Activity, 
  Layers, 
  Sparkles, 
  Shield,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const iconMap = {
  activity: Activity,
  layers: Layers,
  sparkles: Sparkles,
  shield: Shield,
  zap: Zap,
  heart: Heart,
  "trending-up": TrendingUp,
  check: CheckCircle2,
};

export function HowItWorksBlock({ data }) {
  const { 
    title, 
    subtitle,
    content,
    benefits = [],
    growthFactors = [],
    background = "white",
    variant = "default",
    enabled = true 
  } = data;

  if (!enabled) return null;

  // Dark Glass Variant with Spotlight
  if (variant === "dark-glass") {
    return (
      <Section background="dark" padding="xl" className="relative overflow-hidden bg-linear-to-b from-[#0a0908] via-[#1a1410] to-[#0a0908]">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(198, 146, 85, 0.3)" />
        
        <Container>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-3xl mx-auto relative z-10"
          >
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gold-light mb-6 font-medium">
                {subtitle}
              </p>
            )}
            {content && (
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                {content}
              </p>
            )}
          </motion.div>

          {/* Benefits Grid with Spotlight Cards */}
          {benefits && benefits.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
              {benefits.map((benefit, index) => {
                const IconComponent = iconMap[benefit.icon] || Activity;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CardSpotlight
                      radius={300}
                      color="#c69255"
                      className="h-full bg-neutral-900/50 backdrop-blur-sm border-white/10 p-6 group"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold group-hover:to-gold-dark transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-7 h-7 text-gold-light group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-light transition-colors duration-300">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/60 leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </CardSpotlight>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Growth Factors Section */}
          {growthFactors && growthFactors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <CardSpotlight
                radius={500}
                color="#d4a574"
                spotlightOpacity={0.25}
                className="bg-neutral-950/90 backdrop-blur-sm p-8 lg:p-12 border-gold/30 relative z-10"
              >
                <div className="text-center mb-8 relative z-20">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Key Growth Factors in PRP
                  </h3>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    The powerhouse proteins that drive tissue regeneration and healing
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-20">
                  {growthFactors.map((factor, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-neutral-900/80 rounded-xl p-4 border border-gold/20 hover:border-gold/50 hover:bg-neutral-900 transition-all duration-300 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/40 group-hover:scale-110 transition-all duration-300">
                          <CheckCircle2 className="w-5 h-5 text-gold-light transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white group-hover:text-gold-light transition-colors duration-300">
                          {factor}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardSpotlight>
            </motion.div>
          )}
        </Container>
      </Section>
    );
  }

  return (
    <Section background={background}>
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-dark-brown mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-gold mb-6 font-medium">
              {subtitle}
            </p>
          )}
          {content && (
            <p className="text-base md:text-lg text-dark-brown/70 leading-relaxed max-w-4xl mx-auto">
              {content}
            </p>
          )}
        </motion.div>

        {/* Benefits Grid */}
        {benefits && benefits.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon] || Activity;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-gradient-to-br from-white to-cream/30 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-gold/10 hover:border-gold/30 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-4 group-hover:from-gold group-hover:to-gold-dark transition-all duration-300 group-hover:scale-110">
                        <IconComponent className="w-7 h-7 text-gold group-hover:text-white transition-colors duration-300" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-dark-brown mb-2 group-hover:text-gold transition-colors duration-300">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="text-dark-brown/70 leading-relaxed text-sm">
                        {benefit.description}
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Growth Factors Section */}
        {growthFactors && growthFactors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gold/5 via-gold/10 to-gold/5 rounded-3xl p-8 lg:p-12 border border-gold/20 shadow-xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-dark-brown mb-3">
                Key Growth Factors in PRP
              </h3>
              <p className="text-dark-brown/70 max-w-2xl mx-auto">
                The powerhouse proteins that drive tissue regeneration and healing
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {growthFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5 text-gold group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dark-brown group-hover:text-gold transition-colors duration-300">
                      {factor}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

