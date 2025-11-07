"use client";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Field } from "./field";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

/**
 * CompactSelect - Simple, clean select dropdown
 * 
 * @example
 * <CompactSelect
 *   label="Status"
 *   items={[
 *     { value: "active", label: "Active" },
 *     { value: "inactive", label: "Inactive" }
 *   ]}
 * />
 */
const CompactSelect = forwardRef(({
  // Form integration
  control,
  name,
  description,
  required,
  
  // Basic props
  label,
  placeholder = "Select option",
  disabled,
  items = [],
  
  // Styling
  className,
  
  // Events
  onValueChange,
  
  // Direct usage
  value,
  error,
  
  ...props
}, ref) => {
  // With react-hook-form - NEW PATTERN with Controller
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field.Root disabled={disabled} invalid={!!fieldState?.error}>
            <div className="relative group">
              {label && <Field.Label>{label}</Field.Label>}
              <Select
                value={field.value}
                onValueChange={(val) => {
                  field.onChange(val);
                  onValueChange?.(val);
                }}
                disabled={disabled}
                {...props}
              >
                <SelectTrigger 
                  ref={ref}
                  id={name}
                  className={cn(
                    "h-11",
                    fieldState?.error && "border-destructive focus:ring-destructive/20",
                    className
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {fieldState?.error && <Field.Error>{fieldState.error.message}</Field.Error>}
            {description && <p className="text-xs text-muted-foreground mt-1.5">{description}</p>}
          </Field.Root>
        )}
      />
    );
  }
  
  // Direct usage
  return (
    <Field.Root disabled={disabled} invalid={!!error}>
      <div className="relative group">
        {label && <Field.Label>{label}</Field.Label>}
        <Select
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          {...props}
        >
          <SelectTrigger 
            ref={ref}
            className={cn(
              "h-11",
              error && "border-destructive focus:ring-destructive/20",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <Field.Error>{error}</Field.Error>}
    </Field.Root>
  );
});

CompactSelect.displayName = "CompactSelect";

export default CompactSelect;
