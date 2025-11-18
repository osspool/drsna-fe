"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/custom/ui/icon";

/**
 * Reusable IconFeatureCard Component
 *
 * Reduces repetition across feature sections by providing a consistent
 * card structure with icon, title, and description.
 *
 * @param {Object} props
 * @param {string} props.icon - Icon name string from icon.jsx ('check', 'star', 'shield', etc)
 * @param {string} props.title - Card heading text
 * @param {string} props.description - Card description text
 * @param {string} props.variant - Card style: 'default' | 'glass' | 'bordered' | 'minimal'
 * @param {string} props.iconBg - Icon background color: 'primary' | 'gold' | 'muted' | 'none'
 * @param {string} props.iconSize - Icon size: 'sm' | 'md' | 'lg'
 * @param {boolean} props.hover - Enable hover effect (default: true)
 * @param {string} props.className - Custom card styling
 * @param {string} props.titleClassName - Custom title styling
 * @param {string} props.descriptionClassName - Custom description styling
 * @param {string} props.iconClassName - Custom icon styling
 * @param {boolean} props.animate - Enable/disable animation (default: true)
 * @param {number} props.animationDelay - Animation delay in seconds
 * @param {React.ReactNode} props.children - Additional content below description
 */
export function IconFeatureCard({
  icon,
  title,
  description,
  variant = "default",
  iconBg = "primary",
  iconSize = "md",
  hover = true,
  className,
  titleClassName,
  descriptionClassName,
  iconClassName,
  animate = true,
  animationDelay = 0,
  children,
}) {
  // Card variants
  const cardVariants = {
    default: "bg-card border border-border rounded-2xl p-6",
    glass: "bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6",
    bordered: "border-2 border-border rounded-2xl p-6",
    minimal: "p-6",
  };

  // Icon background variants
  const iconBgVariants = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-gold/10 text-gold",
    muted: "bg-muted text-foreground",
    none: "",
  };

  // Icon size variants
  const iconSizeClasses = {
    sm: {
      container: "w-10 h-10",
      icon: 20,
    },
    md: {
      container: "w-12 h-12",
      icon: 24,
    },
    lg: {
      container: "w-16 h-16",
      icon: 28,
    },
  };

  const cardClasses = cn(
    cardVariants[variant],
    hover && "transition-all duration-300 hover:shadow-lg hover:scale-105",
    className
  );

  const iconContainerClasses = cn(
    "rounded-xl flex items-center justify-center mb-4",
    iconSizeClasses[iconSize].container,
    iconBgVariants[iconBg],
    iconClassName
  );

  const content = (
    <>
      {/* Icon */}
      {icon && (
        <div className={iconContainerClasses}>
          <Icon name={icon} size={iconSizeClasses[iconSize].icon} />
        </div>
      )}

      {/* Title */}
      {title && (
        <h3
          className={cn(
            "text-xl font-heading font-bold text-foreground mb-2",
            titleClassName
          )}
        >
          {title}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}

      {/* Additional content */}
      {children}
    </>
  );

  // Wrap with motion if animation is enabled
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: animationDelay }}
        className={cardClasses}
      >
        {content}
      </motion.div>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
