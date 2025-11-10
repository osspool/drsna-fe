"use client";
import React, { createContext, useContext, useId, useMemo, memo } from "react";
import { cn } from "@/lib/utils";

const FieldContext = createContext(null);

/**
 * Simple field wrapper with consistent structure
 * Structure: Root > InputContainer > (Label, Icon, Control) + Error
 */
export const Root = memo(function FieldRoot({ children, className, disabled = false, invalid = false }) {
  const id = useId();

  const value = useMemo(() => ({
    id,
    disabled,
    invalid,
  }), [id, disabled, invalid]);

  return (
    <FieldContext.Provider value={value}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </FieldContext.Provider>
  );
});

export const Label = memo(function FieldLabel({ children, className }) {
  const ctx = useContext(FieldContext);
  return (
    <label
      htmlFor={ctx?.id}
      className={cn(
        "absolute left-3 top-0 -translate-y-1/2 bg-background px-2",
        "text-xs font-medium text-muted-foreground z-10",
        "group-focus-within:text-primary whitespace-nowrap",
        ctx?.disabled && "opacity-60",
        ctx?.invalid && "text-destructive",
        className
      )}
    >
      {children}
    </label>
  );
});

export const Error = memo(function FieldError({ children, className }) {
  if (!children) return null;
  return (
    <p className={cn("text-xs text-destructive mt-1.5", className)}>
      {children}
    </p>
  );
});

export const Icon = memo(function FieldIcon({ children, className }) {
  return (
    <div className={cn(
      "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10",
      "text-muted-foreground",
      className
    )}>
      {children}
    </div>
  );
});

export const Field = {
  Root,
  Label,
  Error,
  Icon,
};

export default Field;
