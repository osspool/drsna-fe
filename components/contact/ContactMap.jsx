"use client";

import Link from "next/link";
import { Navigation } from "lucide-react";
import { Suspense } from "react";
import { MapSkeleton } from "@/components/common/skeletons";

/**
 * Contact Map Component (Client Island)
 *
 * Lazy-loaded client component that renders the Google Maps iframe.
 * Extracted as a client island to prevent the entire contact page from being client-side.
 */
export default function ContactMap() {
  return (
    <div className="bg-card rounded-3xl overflow-hidden shadow-xl border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground">
              Our Location
            </h3>
          </div>
          <Link
            href="https://maps.google.com?q=48+Wimpole+Street+Marylebone+London+W1G+8SF+UK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
          >
            Get Directions
          </Link>
        </div>
      </div>
      <div className="aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5858558087814!2d-0.14918492345024!3d51.51804097181662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad554c335c1%3A0x4a61a58b0e66ff42!2s48%20Wimpole%20St%2C%20London%20W1G%208SF%2C%20UK!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dr. SNA Clinic Location"
        />
      </div>
    </div>
  );
}
