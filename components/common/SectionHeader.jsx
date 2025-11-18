"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/custom/ui/icon";

/**
 * Reusable SectionHeader Component
 *
 * Reduces repetition across block components by providing a consistent
 * header structure with optional badge, title, and subtitle.
 *
 * @param {Object} props
 * @param {string} props.badge - Optional badge text
 * @param {string} props.badgeIcon - Icon name string from icon.jsx ('sparkles', 'star', 'arrow-left-right', etc)
 * @param {string} props.badgeVariant - Badge color variant: 'primary' | 'gold' | 'custom'
 * @param {string} props.badgeClassName - Custom badge styling
 * @param {string} props.title - Main heading text
 * @param {string} props.subtitle - Subtitle/description text
 * @param {string} props.align - Text alignment: 'center' | 'left' | 'right'
 * @param {string} props.titleClassName - Custom title styling
 * @param {string} props.subtitleClassName - Custom subtitle styling
 * @param {string} props.className - Custom container styling
 * @param {number} props.maxWidth - Max width for subtitle (1, 2, 3, 4 = xl to 4xl)
 * @param {string} props.spacing - Bottom margin: 'sm' | 'md' | 'lg' | 'xl'
 * @param {boolean} props.animate - Enable/disable animation (default: true)
 * @param {React.ReactNode} props.children - Additional content below subtitle
 */
export function SectionHeader({
  badge,
  badgeIcon,
  badgeVariant = "primary",
  badgeClassName,
  title,
  subtitle,
  align = "center",
  titleClassName,
  subtitleClassName,
  className,
  maxWidth = 3,
  spacing = "lg",
  animate = true,
  children,
}) {

  // Text alignment classes
  const alignmentClasses = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
  };

  // Max width classes for subtitle
  const maxWidthClasses = {
    1: "max-w-xl",
    2: "max-w-2xl",
    3: "max-w-3xl",
    4: "max-w-4xl",
  };

  // Spacing classes
  const spacingClasses = {
    sm: "mb-8",
    md: "mb-12",
    lg: "mb-16",
    xl: "mb-20",
  };

  const containerClasses = cn(
    alignmentClasses[align],
    spacingClasses[spacing],
    className
  );

  const subtitleMaxWidth = align === "center" ? `${maxWidthClasses[maxWidth]} mx-auto` : maxWidthClasses[maxWidth];

  const content = (
    <>
      {/* Badge */}
      {badge && (
        <div className="mb-6">
          <Badge
            variant={badgeVariant === 'primary' ? 'default' : badgeVariant === 'gold' ? 'secondary' : 'default'}
            className={cn(
              "px-6 py-2 text-sm font-semibold tracking-wider uppercase",
              badgeVariant === 'gold' && "bg-primary/10 border-primary/20 text-primary",
              badgeVariant === 'primary' && "bg-foreground/10 border-foreground/20 text-foreground",
              badgeClassName
            )}
          >
            {badgeIcon && <Icon name={badgeIcon} size={16} />}
            {badge}
          </Badge>
        </div>
      )}

      {/* Title */}
      {title && (
        <h2
          className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-4",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl text-foreground",
            subtitleMaxWidth,
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Additional content */}
      {children}
    </>
  );

  // Wrap with animation if enabled
  if (animate) {
    return (
      <div className={cn("opacity-0 animate-fade-in-up", containerClasses)}>
        {content}
      </div>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
