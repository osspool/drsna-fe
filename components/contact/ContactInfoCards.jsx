/**
 * Contact Information Cards Section
 *
 * Displays contact methods in a grid layout.
 * Each card animates individually using IconFeatureCard's built-in animation.
 *
 * @param {Object} props
 * @param {Array} props.data.cards - Array of contact info objects
 */

import { Container } from "@/components/layout/Container";
import { ContactCard } from "@/components/contact/ContactCard";

export function ContactInfoCards({ data }) {
  const { cards } = data;

  return (
    <section className="py-16 md:py-20 bg-background">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((info, index) => (
            <ContactCard key={index} info={info} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
