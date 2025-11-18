"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/custom/ui/icon";

/**
 * Reusable StatCard Component
 *
 * Reduces repetition across stats sections by providing a consistent
 * card structure with icon, value, label, and optional description.
 *
 * @param {Object} props
 * @param {string} props.icon - Icon name string from icon.jsx ('users', 'award', 'star', etc)
 * @param {string|number} props.value - Main stat value (e.g., "10,000+", "98%", "5.0")
 * @param {string} props.label - Stat label/title
 * @param {string} props.description - Optional description text
 * @param {string} props.variant - Card style: 'default' | 'compact' | 'centered' | 'minimal' | 'large'
 * @param {string} props.iconBg - Icon background color: 'primary' | 'gold' | 'muted' | 'none'
 * @param {string} props.iconSize - Icon size: 'sm' | 'md' | 'lg'
 * @param {boolean} props.hover - Enable hover effect (default: true)
 * @param {string} props.className - Custom card styling
 * @param {string} props.valueClassName - Custom value styling
 * @param {string} props.labelClassName - Custom label styling
 * @param {string} props.descriptionClassName - Custom description styling
 * @param {string} props.iconClassName - Custom icon container styling
 * @param {boolean} props.animate - Enable/disable animation (default: true)
 * @param {number} props.animationDelay - Animation delay in seconds
 */
export function StatCard({
  icon,
  value,
  label,
  description,
  variant = "default",
  iconBg = "primary",
  iconSize = "md",
  hover = true,
  className,
  valueClassName,
  labelClassName,
  descriptionClassName,
  iconClassName,
  animate = true,
  animationDelay = 0,
}) {
  // Card variants
  const cardVariants = {
    default: "bg-card border border-border rounded-2xl p-6",
    compact: "flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border",
    centered: "bg-card rounded-2xl p-6 md:p-8 border border-border text-center",
    minimal: "text-center",
    large: "glass-card rounded-2xl p-8 border border-border",
  };

  // Icon background variants
  const iconBgVariants = {
    primary: "bg-primary/10 text-primary",
    gold: "bg-gold/10 text-gold",
    muted: "bg-muted text-foreground",
    gradient: "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
    none: "",
  };

  // Icon size variants
  const iconSizeClasses = {
    sm: {
      container: "w-8 h-8",
      icon: 16,
    },
    md: {
      container: "w-10 h-10 md:w-12 md:h-12",
      icon: 20,
    },
    lg: {
      container: "w-12 h-12 md:w-14 md:h-14",
      icon: 24,
    },
  };

  const cardClasses = cn(
    cardVariants[variant],
    hover && variant !== "minimal" && "transition-all duration-300 hover:shadow-lg hover:border-primary/40",
    hover && (variant === "default" || variant === "centered" || variant === "large") && "hover:-translate-y-1",
    className
  );

  const iconContainerClasses = cn(
    "rounded-full flex items-center justify-center",
    iconSizeClasses[iconSize].container,
    iconBgVariants[iconBg],
    variant === "centered" || variant === "minimal" ? "mx-auto mb-4" : "",
    variant === "compact" ? "shrink-0" : "",
    variant === "large" && "group-hover:scale-105 transition-transform duration-300",
    iconClassName
  );

  const content = (
    <>
      {/* Layout for compact variant (horizontal) */}
      {variant === "compact" && (
        <>
          {icon && (
            <div className={iconContainerClasses}>
              <Icon name={icon} size={iconSizeClasses[iconSize].icon} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            {label && (
              <div
                className={cn(
                  "text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5",
                  labelClassName
                )}
              >
                {label}
              </div>
            )}
            {value && (
              <div
                className={cn(
                  "text-sm font-heading font-bold text-foreground truncate",
                  valueClassName
                )}
              >
                {value}
              </div>
            )}
          </div>
        </>
      )}

      {/* Layout for centered/minimal/default/large variants (vertical) */}
      {variant !== "compact" && (
        <>
          {icon && (
            <div className={iconContainerClasses}>
              <Icon name={icon} size={iconSizeClasses[iconSize].icon} />
            </div>
          )}

          {/* Value */}
          {value && (
            <div
              className={cn(
                variant === "large" && "text-4xl font-heading font-bold text-foreground mb-2",
                variant === "centered" && "text-lg md:text-xl font-heading font-bold text-foreground mb-2",
                variant === "default" && "text-xl font-semibold text-foreground leading-tight",
                variant === "minimal" && "text-sm text-foreground font-semibold mb-1",
                valueClassName
              )}
            >
              {value}
            </div>
          )}

          {/* Label */}
          {label && (
            <div
              className={cn(
                variant === "large" && "text-lg font-semibold text-primary mb-2",
                variant === "centered" && "text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2",
                variant === "default" && "inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4",
                variant === "minimal" && "text-sm text-muted-foreground",
                labelClassName
              )}
            >
              {variant === "default" ? (
                <span className="text-primary text-[0.65rem] font-semibold tracking-wider uppercase">
                  {label}
                </span>
              ) : (
                label
              )}
            </div>
          )}

          {/* Description (only for large variant or when specified) */}
          {description && (
            <p
              className={cn(
                "text-sm text-muted-foreground leading-relaxed",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </>
      )}
    </>
  );

  // Wrap with animation if enabled
  if (animate) {
    return (
      <div
        className={cn("opacity-0 animate-fade-in-up", cardClasses, variant === "large" && "group")}
        style={{ animationDelay: `${(animationDelay || 0) * 1000}ms` }}
      >
        {content}
      </div>
    );
  }

  return <div className={cn(cardClasses, variant === "large" && "group")}>{content}</div>;
}
