"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * FormSection component for organizing form fields into logical groups
 * Provides consistent styling and layout for form sections
 */
export function FormSection({
  title,
  description,
  children,
  className,
  variant = "default",
  collapsible = false,
  defaultOpen = true,
  icon,
}) {
  // Render icon - handle both component references and JSX elements
  const renderIcon = () => {
    if (!icon) return null;

    // Check if it's already a valid React element (JSX)
    if (typeof icon === 'object' && icon.$$typeof) {
      // Already a React element, render directly
      return icon;
    }

    // If icon is a function or ForwardRef component, render it as JSX
    // ForwardRef components are objects with {$$typeof, render} structure
    if (typeof icon === 'function' || (typeof icon === 'object' && icon.render)) {
      const IconComponent = icon;
      return <IconComponent className="h-4 w-4" />;
    }

    // Fallback: try to render directly
    return icon;
  };
  if (variant === "card") {
    return (
      <Card className={cn("border-muted", className)}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            {icon && <span className="text-muted-foreground">{renderIcon()}</span>}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-sm">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  if (variant === "subtle") {
    return (
      <div className={cn("space-y-4", className)}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-base font-semibold flex items-center gap-2">
                {icon && <span className="text-muted-foreground">{renderIcon()}</span>}
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }

  // Default variant with separator
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <>
          <div className="space-y-1.5">
            {title && (
              <h3 className="text-base font-semibold flex items-center gap-2">
                {icon && <span className="text-muted-foreground">{renderIcon()}</span>}
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <Separator className="my-4" />
        </>
      )}
      {children}
    </div>
  );
}

/**
 * FormGrid component for responsive grid layouts
 */
export function FormGrid({ children, cols = 2, className }) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[cols] || "grid-cols-1 md:grid-cols-2";

  return (
    <div className={cn("grid gap-4", colsClass, className)}>
      {children}
    </div>
  );
}

/**
 * FormFieldArray wrapper for dynamic field arrays
 */
export function FormFieldArray({
  title,
  description,
  children,
  onAdd,
  addLabel = "Add Item",
  emptyMessage = "No items yet.",
  itemCount = 0,
  className,
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          {title && <h4 className="text-sm font-medium">{title}</h4>}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="shrink-0 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            {addLabel}
          </button>
        )}
      </div>

      {itemCount === 0 && emptyMessage ? (
        <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-lg">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </div>
  );
}

/**
 * FormFieldArrayItem wrapper for individual array items
 */
export function FormFieldArrayItem({
  children,
  onRemove,
  index,
  className,
  title,
}) {
  return (
    <div
      className={cn(
        "relative border rounded-lg p-4 space-y-4 bg-muted/20 hover:bg-muted/30 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 mb-2">
        {title && <h5 className="text-sm font-medium text-muted-foreground">{title}</h5>}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive/10 text-destructive h-8 w-8"
            aria-label="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

