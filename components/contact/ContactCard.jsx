"use client";

import Link from "next/link";

/**
 * Contact Information Card Component
 * Displays contact details with icon, title, details list, and action button
 * Used on contact page for phone, email, and address cards
 */
export function ContactCard({ info, index = 0 }) {
  const Icon = info.icon;

  return (
    <div className="group bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/30 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon className="w-8 h-8 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-heading font-bold text-foreground mb-4">
          {info.title}
        </h3>

        {/* Details */}
        <div className="space-y-2 mb-6">
          {info.details.map((detail, idx) => (
            <p key={idx} className="text-muted-foreground">
              {detail}
            </p>
          ))}
        </div>

        {/* Action Button */}
        <Link
          href={info.actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all shadow-lg group-hover:shadow-xl"
        >
          {info.action}
        </Link>
      </div>
    </div>
  );
}
