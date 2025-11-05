"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, Award, Plane, MapPin, Heart } from "lucide-react";
import WorldMap from "@/components/aceternity/world-map";
import { useState } from "react";

export function GlobalReachSection() {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  // London coordinates (clinic location)
  const londonLocation = { lat: 51.5074, lng: -0.1278 };

  // Key locations where patients travel from
  const patientLocations = [
    { 
      lat: 51.5074,  // London, UK
      lng: -0.1278,
      label: "UK & Europe", 
      count: "5000+",
      description: "Leading destination for European patients seeking natural aesthetic results",
      icon: "🇬🇧"
    },
    { 
      lat: 25.2048,  // Dubai, UAE
      lng: 55.2708,
      label: "Middle East", 
      count: "2000+",
      description: "Trusted by patients from UAE, Saudi Arabia, and Qatar",
      icon: "🌍"
    },
    { 
      lat: 1.3521,  // Singapore
      lng: 103.8198,
      label: "Asia Pacific", 
      count: "1500+",
      description: "Excellence recognized across Singapore, Hong Kong, and Australia",
      icon: "🌏"
    },
    { 
      lat: 40.7128,  // New York, USA
      lng: -74.0060,
      label: "North America", 
      count: "800+",
      description: "USA and Canada patients choose London's premier aesthetic clinic",
      icon: "🇺🇸"
    },
  ];

  // Create connections from each location to London
  const connections = patientLocations
    .filter(loc => loc.label !== "UK & Europe") // Don't connect London to itself
    .map(location => ({
      start: { lat: location.lat, lng: location.lng },
      end: londonLocation
    }));

  // Helper function to convert lat/lng to x/y for label positioning (matching component's projection)
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const globalStats = [
    {
      icon: Users,
      value: "10,000+",
      label: "International Patients",
      description: "Trusted by patients from over 50 countries",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries Served",
      description: "Global reputation for excellence",
    },
    {
      icon: Award,
      value: "98%",
      label: "Satisfaction Rate",
      description: "Outstanding patient outcomes worldwide",
    },
    {
      icon: Plane,
      value: "24/7",
      label: "Concierge Support",
      description: "Seamless travel and accommodation assistance",
    },
  ];

  const whyPatientsTravelHere = [
    {
      icon: Award,
      title: "World-Class Expertise",
      description:
        "Dr Abbas's training at premier European clinics and distinction in Masters of Aesthetic Plastic Surgery draws patients seeking the highest level of care.",
    },
    {
      icon: Heart,
      title: "Natural, Lasting Results",
      description:
        "Our philosophy of subtle enhancement over dramatic transformation resonates with international patients seeking authentic, refined outcomes.",
    },
    {
      icon: MapPin,
      title: "London's Premier Location",
      description:
        "Located on prestigious Wimpole Street in London's medical district, easily accessible from major international airports.",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0a0908] via-[#1a1814] to-[#2d2620] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold-gradient rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gold-light text-sm font-semibold tracking-wider uppercase mb-4 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Global Excellence
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Trusted Worldwide,
            <br />
            <span className="text-gold-light">Located in London</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Patients travel from across the globe to experience Dr Abbas's
            renowned expertise in aesthetic medicine. Our reputation for natural
            results and personalized care transcends borders.
          </p>
        </motion.div>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="relative h-[600px] rounded-3xl overflow-hidden border-2 border-gold-primary/30 shadow-2xl bg-gradient-to-br from-[#1a1410] via-[#0f0d0a] to-[#1a1814] backdrop-blur-sm">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold-primary/5 via-transparent to-transparent pointer-events-none" />
            
            {/* Map container */}
            <div className="absolute inset-0 p-8">
              <WorldMap 
                dots={connections} 
                lineColor="#cda55c"
              />
            </div>

            {/* Location Labels - Positioned based on lat/lng */}
            {patientLocations.map((location, index) => {
              const isHovered = hoveredLocation === index;
              
              // Convert lat/lng to screen coordinates
              const { x, y } = projectPoint(location.lat, location.lng);
              
              // Calculate percentage position (accounting for the map's aspect ratio and padding)
              const leftPercent = (x / 800) * 100;
              const topPercent = (y / 400) * 100;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.8 + index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute text-white text-sm z-20"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: "translate(-50%, -120%)",
                  }}
                  onMouseEnter={() => setHoveredLocation(index)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  <AnimatePresence mode="wait">
                    {isHovered ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-dark-brown via-[#1a1410] to-dark-brown backdrop-blur-md rounded-xl px-6 py-4 border-2 border-gold-primary shadow-2xl shadow-gold-primary/20 mb-4 min-w-[280px]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">{location.icon}</span>
                          <div>
                            <p className="font-bold text-gold-light text-lg">
                              {location.label}
                            </p>
                            <p className="text-sm text-white/80 font-semibold">
                              {location.count} patients
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed border-t border-white/10 pt-2 mt-2">
                          {location.description}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-dark-brown/95 to-[#1a1410]/95 backdrop-blur-md rounded-lg px-5 py-3 border border-gold-primary/40 shadow-xl shadow-gold-primary/10 mb-4"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">{location.icon}</span>
                          <p className="font-bold text-gold-light text-base">
                            {location.label}
                          </p>
                        </div>
                        <p className="text-xs text-white/70 font-medium">
                          {location.count} patients
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Decorative corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold-primary/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-gold-primary/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-gold-primary/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold-primary/50 rounded-br-lg" />
          </div>

          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center text-white/40 text-sm mt-4 italic"
          >
            Hover over the location markers to learn more
          </motion.p>
        </motion.div>

        {/* Global Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-24">
          {globalStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold-light/50 transition-all group"
            >
              <stat.icon className="w-10 h-10 text-gold-light mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-heading font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-gold-light mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why Patients Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-12">
            Why International Patients Choose{" "}
            <span className="text-gold-light">Dr SNA Clinic</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {whyPatientsTravelHere.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold-primary/50 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center mb-6">
                  <reason.icon className="w-7 h-7 text-dark-brown" />
                </div>
                <h4 className="text-xl font-heading font-bold text-white mb-4">
                  {reason.title}
                </h4>
                <p className="text-white/70 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* International Patient Services */}
      </div>
    </section>
  );
}
