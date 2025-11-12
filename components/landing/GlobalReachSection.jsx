"use client";

import { motion } from "framer-motion";
import { Globe, Users, Award, Plane, MapPin, Heart } from "lucide-react";
import WorldMap from "@/components/aceternity/world-map";

export function GlobalReachSection() {
  // London coordinates (clinic location)
  const londonLocation = { lat: 51.5074, lng: -0.1278 };

  // Key locations where patients travel from
  const patientLocations = [
    {
      lat: 51.5074,  // London, UK
      lng: -0.1278,
      label: "UK & Europe",
      count: "5,000+",
      description: "Leading destination for European patients",
      icon: "🇬🇧"
    },
    {
      lat: 25.2048,  // Dubai, UAE
      lng: 55.2708,
      label: "Middle East",
      count: "2,000+",
      description: "UAE, Saudi Arabia, and Qatar",
      icon: "🌍"
    },
    {
      lat: 1.3521,  // Singapore
      lng: 103.8198,
      label: "Asia Pacific",
      count: "1,500+",
      description: "Singapore, Hong Kong, Australia",
      icon: "🌏"
    },
    {
      lat: 40.7128,  // New York, USA
      lng: -74.0060,
      label: "North America",
      count: "800+",
      description: "USA and Canada",
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
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-secondary via-secondary/90 to-background overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" />
            Global Excellence
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-6">
            Trusted Worldwide,
            <br />
            <span className="text-primary">Located in London</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Patients travel from across the globe to experience Dr Abbas's
            renowned expertise in aesthetic medicine. Our reputation for natural
            results and personalized care transcends borders.
          </p>
        </motion.div>

        {/* World Map Visualization - Desktop Only */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 hidden md:block"
        >
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden border border-primary/20 shadow-xl bg-gradient-to-br from-card/80 via-card/90 to-card/95">
            {/* Subtle glow effect - much lighter */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

            {/* Map container */}
            <div className="absolute inset-0 p-4 md:p-8">
              <WorldMap
                dots={connections}
                lineColor="hsl(var(--primary))"
                dotColor="#B8860B"
                dotOpacity={0.8}
              />
            </div>

            {/* Simple location markers - no complex animations */}
            {patientLocations.map((location, index) => {
              const x = ((location.lng + 180) * (800 / 360));
              const y = ((90 - location.lat) * (400 / 180));
              const leftPercent = (x / 800) * 100;
              const topPercent = (y / 400) * 100;

              return (
                <div
                  key={index}
                  className="absolute text-white text-xs z-20"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: "translate(-50%, -120%)",
                  }}
                >
                  <div className="bg-card/95 backdrop-blur-md rounded-lg px-3 py-2 border border-primary/40 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{location.icon}</span>
                      <div>
                        <p className="font-bold text-primary text-xs leading-tight">
                          {location.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium">
                          {location.count}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />
          </div>
        </motion.div>

        {/* Patient Regions Grid - Mobile Only */}
        <div className="grid grid-cols-2 gap-4 mb-16 md:hidden">
          {patientLocations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all"
            >
              <div className="text-4xl mb-3">{location.icon}</div>
              <h3 className="text-2xl font-heading font-bold text-primary mb-1">
                {location.count}
              </h3>
              <p className="font-semibold text-foreground text-sm mb-2">
                {location.label}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {location.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {globalStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="glass-card rounded-2xl p-8 border border-border hover:border-primary/40 transition-all duration-300 group"
            >
              <stat.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="text-4xl font-heading font-bold text-foreground mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-primary mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-12">
            Why International Patients Choose{" "}
            <span className="text-primary">Dr SNA Clinic</span>
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {whyPatientsTravelHere.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="glass-card rounded-2xl p-8 border border-border hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6">
                  <reason.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h4 className="text-xl font-heading font-bold text-foreground mb-4">
                  {reason.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
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
