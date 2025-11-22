"use client";

import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Award, BadgeCheck, GraduationCap, Users } from "lucide-react";
import { generateStableKey } from "@/lib/utils";

/**
 * Team Section
 *
 * Displays team members with credentials, memberships, and images.
 * Compact professional layout with balanced spacing.
 */
export function TeamSection({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Section background="muted" padding="xl">
      <Container>
        <SectionHeader
          badge="Our Team"
          title="Meet Our Experts"
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        <div className="space-y-12">
          {data.map((member, index) => (
            <div
              key={generateStableKey(member, index, "team-member")}
              className="opacity-0 animate-fade-in-up bg-card rounded-3xl overflow-hidden border border-border shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Image - 1 column on desktop (33%) */}
                {member.image && (
                  <div className="relative h-[400px] md:h-[500px] lg:h-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center"
                      priority={index === 0}
                    />
                    {/* Gradient overlay for better text contrast on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
                  </div>
                )}

                {/* Content - 2 columns on desktop (67%) */}
                <div className={`lg:col-span-2 p-6 md:p-8 lg:p-10 flex flex-col ${member.image ? '' : 'lg:col-span-3'}`}>
                  {/* Header - Compact */}
                  <div className="mb-6">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg md:text-xl text-primary font-semibold mb-4">{member.role}</p>

                    {/* Highlights - Compact Badge Pills */}
                    {member.highlights && member.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {member.highlights.map((highlight, i) => (
                          <span
                            key={generateStableKey(highlight, i, "team-highlight")}
                            className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20"
                          >
                            <BadgeCheck className="w-3.5 h-3.5" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bio - Compact */}
                  {member.bio && (
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  )}

                  {/* Credentials & Memberships - Stacked Vertically */}
                  <div className="space-y-5 flex-grow">
                    {/* Credentials - Compact List */}
                    {member.credentials && (
                      <div className="border-l-4 border-primary pl-4">
                        <h4 className="text-base font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          {member.credentials.title}
                        </h4>
                        <ul className="space-y-2">
                          {member.credentials.list.map((item, i) => (
                            <li key={generateStableKey(item, i, "team-credential")} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Memberships - Compact List */}
                    {member.memberships && (
                      <div className="border-l-4 border-primary/60 pl-4">
                        <h4 className="text-base font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                          <Users className="w-5 h-5 text-primary" />
                          {member.memberships.title}
                        </h4>
                        <ul className="space-y-2">
                          {member.memberships.list.map((item, i) => (
                            <li key={generateStableKey(item, i, "team-membership")} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Summary - Compact */}
                  {member.summary && (
                    <div className="mt-6 pt-5 border-t border-border">
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed italic">
                        {member.summary}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
