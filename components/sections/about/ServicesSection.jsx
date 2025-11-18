import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

/**
 * Services Section
 *
 * Displays signature clinical specialties.
 */
export function ServicesSection({ data }) {
  if (!data) return null;

  return (
    <Section background="muted" padding="xl">
      <Container maxWidth="6xl">
        <SectionHeader
          badge={data.title}
          title={data.subtitle}
          titleClassName="text-3xl md:text-4xl font-heading font-bold"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {data.list && data.list.map((service, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                {service.name}
              </h3>

              {service.description && (
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
              )}

              {/* Ideal For / Designed For */}
              {(service.idealFor || service.designedFor) && (
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    {service.idealFor ? "Ideal for:" : "Designed for:"}
                  </p>
                  <ul className="space-y-2">
                    {(service.idealFor || service.designedFor).map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
