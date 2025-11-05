"use client";

import { motion } from "framer-motion";
import { Clock, Zap, TrendingUp, Calendar, DollarSign, BedDouble } from "lucide-react";
import { Container } from "@/components/layout/Container";

const iconMap = {
  duration: Clock,
  discomfort: Zap,
  results: TrendingUp,
  longevity: Calendar,
  price: DollarSign,
  downtime: BedDouble,
};

export function AtAGlanceBlock({ data }) {
  const items = [
    { key: "duration", label: "Duration", value: data.duration },
    { key: "discomfort", label: "Discomfort", value: data.discomfort },
    { key: "results", label: "Results", value: data.results },
    { key: "longevity", label: "Longevity", value: data.longevity },
    { key: "price", label: "Price", value: data.price },
    { key: "downtime", label: "Downtime", value: data.downtime },
  ];

  return (
    <div className="bg-cream border-y border-gold-primary/20">
      <Container>
        <div className="py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-heading font-bold text-center mb-8 text-gold"
          >
            Treatment Summary
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {items.map((item, index) => {
              const Icon = iconMap[item.key];
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                      <Icon className="w-6 h-6 text-dark-brown" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-dark-brown mb-1">{item.label}</h3>
                  <p className="text-sm text-dark-brown/70">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
