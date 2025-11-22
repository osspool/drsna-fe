"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icon } from "@/components/custom/ui/icon";
import { cn } from "@/lib/utils";
import { getSectionHeaderProps } from "@/lib/section-presets";

export function FeaturesGridBlock({ data, id, background = "default", padding = "lg" }) {
  const headerProps = getSectionHeaderProps(data, 'pshot.benefits');
  const features = data.features || data.items || [];

  return (
    <Section id={id} background={background} padding={padding}>
      <Container>
        <SectionHeader {...headerProps} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon name={feature.icon} size={24} />
                </div>
                <CardTitle className="text-xl mb-2 text-foreground">{feature.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

