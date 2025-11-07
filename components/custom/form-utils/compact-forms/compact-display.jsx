// components/form-utils/compact-forms/compact-display.jsx
"use client";
import { cn } from "@/lib/utils";

/**
 * InfoDisplay - A compact read-only display component for showing key-value pairs
 * 
 * @example
 * <InfoDisplay label="Subtotal" value={150} prefix="$" />
 * <InfoDisplay label="Tax Rate" value={8.5} suffix="%" />
 */
export const InfoDisplay = ({ 
  label, 
  value, 
  prefix, 
  suffix, 
  className,
  labelClassName,
  valueClassName,
  icon
}) => {
  return (
    <div className={cn("flex items-center justify-between py-2 px-1 rounded-md hover:bg-accent/50 transition-colors", className)}>
      <div className="flex items-center gap-2">
        {icon && (
          <span className="flex items-center justify-center w-4 h-4 text-muted-foreground">
            {icon}
          </span>
        )}
        <span className={cn("text-sm text-muted-foreground", labelClassName)}>
          {label}
        </span>
      </div>
      <span className={cn("text-sm font-semibold", valueClassName)}>
        {prefix && <span className="mr-0.5">{prefix}</span>}
        {value}
        {suffix && <span className="ml-0.5">{suffix}</span>}
      </span>
    </div>
  );
};

/**
 * CompactItemCard - A compact card for displaying items with quantity controls
 * 
 * @example
 * <CompactItemCard
 *   title="Product Name"
 *   subtitle="Category"
 *   quantity={2}
 *   price={100}
 *   unitPrice={50}
 *   onQuantityChange={(qty) => updateQuantity(qty)}
 *   onRemove={() => removeItem()}
 * />
 */
export const CompactItemCard = ({ 
  title,
  subtitle,
  description,
  quantity,
  price,
  unitPrice,
  image,
  onQuantityChange,
  onRemove,
  showQuantityControls = true,
  className,
  actions
}) => {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg border",
      "bg-card hover:bg-accent/30 transition-colors",
      "shadow-sm hover:shadow-md",
      className
    )}>
      {/* Image */}
      {image && (
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted shrink-0 border">
          {typeof image === 'string' ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            image
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-foreground">{title}</p>
        {(subtitle || description) && (
          <div className="flex items-center gap-2 mt-1">
            {subtitle && (
              <span className="text-xs text-muted-foreground font-medium">{subtitle}</span>
            )}
            {subtitle && description && (
              <span className="text-xs text-muted-foreground">•</span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground truncate">
                {description}
              </span>
            )}
          </div>
        )}
        {unitPrice !== undefined && quantity !== undefined && (
          <div className="text-xs text-muted-foreground mt-1 font-medium">
            {formatCurrency(unitPrice)} × {quantity}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {showQuantityControls && onQuantityChange && (
          <QuantityControl
            value={quantity}
            onChange={onQuantityChange}
            min={1}
            size="sm"
          />
        )}
        
        {price !== undefined && (
          <div className="text-sm font-bold min-w-[70px] text-right text-foreground">
            {formatCurrency(price)}
          </div>
        )}
        
        {/* Actions */}
        {actions || (onRemove && (
          <button
            type="button"
            className="p-2 rounded-md hover:bg-destructive/10 hover:text-destructive transition-all border border-transparent hover:border-destructive/20"
            onClick={onRemove}
            aria-label="Remove item"
          >
            <X className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * QuantityControl - Compact quantity input with increment/decrement buttons
 */
const QuantityControl = ({ 
  value = 1, 
  onChange, 
  min = 0, 
  max, 
  size = "md",
  className 
}) => {
  const handleIncrement = () => {
    if (max === undefined || value < max) {
      onChange?.(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange?.(value - 1);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-9 w-9 text-sm",
    lg: "h-10 w-10 text-base"
  };

  const inputSizeClasses = {
    sm: "h-8 w-12 text-sm",
    md: "h-9 w-14 text-sm",
    lg: "h-10 w-16 text-base"
  };

  return (
    <div className={cn("flex items-center shadow-sm", className)}>
      <button
        type="button"
        className={cn(
          "rounded-l-md border border-r-0 hover:bg-accent transition-all",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "font-medium flex items-center justify-center",
          "active:scale-95 hover:border-primary/50",
          sizeClasses[size]
        )}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value) || min;
          if (val >= min && (max === undefined || val <= max)) {
            onChange?.(val);
          }
        }}
        min={min}
        max={max}
        className={cn(
          "border-y text-center font-semibold bg-background",
          "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "focus:relative focus:z-10",
          inputSizeClasses[size]
        )}
      />
      <button
        type="button"
        className={cn(
          "rounded-r-md border border-l-0 hover:bg-accent transition-all",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "font-medium flex items-center justify-center",
          "active:scale-95 hover:border-primary/50",
          sizeClasses[size]
        )}
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

/**
 * CompactSection - A section wrapper with optional icon and collapsible behavior
 */
export const CompactSection = ({ 
  title, 
  icon: Icon, 
  children, 
  className,
  badge,
  collapsible = false,
  defaultOpen = true,
  actions
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className={cn("bg-card rounded-lg border shadow-sm", className)}>
      {title && (
        <div 
          className={cn(
            "flex items-center justify-between px-4 py-3.5 border-b bg-muted/30",
            collapsible && "cursor-pointer hover:bg-accent/50 transition-colors"
          )}
          onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
        >
          <div className="flex items-center gap-2.5">
            {Icon && (
              <div className="flex items-center justify-center w-5 h-5">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            {badge && (
              <span className="ml-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                {badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            {collapsible && (
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform duration-200 text-muted-foreground",
                !isOpen && "-rotate-90"
              )} />
            )}
          </div>
        </div>
      )}
      {(!collapsible || isOpen) && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Helper function for currency formatting
const formatCurrency = (amount, currency = "৳") => {
  if (typeof amount === 'number') {
    return `${currency}${amount.toFixed(2)}`;
  }
  return `${currency}${amount}`;
};

// Import necessary icons
import * as React from "react";
import { X, ChevronDown } from "lucide-react";

// Export the QuantityControl component
export { QuantityControl };

export default {
  InfoDisplay,
  CompactItemCard,
  CompactSection,
  QuantityControl
};
