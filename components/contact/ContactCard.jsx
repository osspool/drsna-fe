import Link from "next/link";
import { IconFeatureCard } from "@/components/common/IconFeatureCard";

/**
 * Contact Information Card Component
 *
 * Extends IconFeatureCard with contact-specific details and action button.
 * Used on contact page for phone, email, and address cards.
 *
 * @param {Object} props
 * @param {Object} props.info - Contact information
 * @param {string} props.info.icon - Icon name (e.g., 'phone', 'mail', 'map-pin')
 * @param {string} props.info.title - Card title
 * @param {string[]} props.info.details - Array of contact details
 * @param {string} props.info.action - Action button text
 * @param {string} props.info.actionLink - Action button link
 * @param {number} [props.index=0] - Card index for animation delay
 */
export function ContactCard({ info, index = 0 }) {
  return (
    <IconFeatureCard
      icon={info.icon}
      title={info.title}
      variant="bordered"
      iconBg="primary"
      iconSize="lg"
      hover={true}
      className="text-center p-8 border-2"
      iconClassName="mx-auto group-hover:rotate-6"
      animationDelay={index * 0.1}
    >
      {/* Contact Details */}
      <div className="space-y-2 mb-6 mt-4">
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
        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
      >
        {info.action}
      </Link>
    </IconFeatureCard>
  );
}
