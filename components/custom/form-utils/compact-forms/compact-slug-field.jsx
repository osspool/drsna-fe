"use client";

import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Field } from "./field";
import { Icon as IconComponent } from "@/components/custom/ui/icon";
import { Wand2 } from "lucide-react";

/**
 * Generates a URL-friendly slug from a string
 */
function generateSlug(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * CompactSlugField - Compact slug input with auto-generation
 *
 * Features:
 * - Compact design with floating label
 * - Auto-generate slug from source field
 * - Manual editing support
 * - InputGroup with generate button
 * - Controller integration for react-hook-form
 *
 * @example
 * <CompactSlugField
 *   control={control}
 *   name="slug"
 *   label="URL Slug"
 *   sourceValue={name}
 *   description="This will be your subdomain: example.com/your-slug"
 *   icon="globe"
 * />
 */
const CompactSlugField = forwardRef(({
  // Form integration
  control,
  name,
  description,
  required,

  // Basic props
  label,
  placeholder = "my-page-slug",
  disabled,

  // Icon support (for compact layout)
  icon,

  // Slug generation
  sourceValue, // The value to generate slug from (e.g., page name)
  onGenerate, // Custom generate callback

  // Styling
  className,
  inputClassName,

  // Events
  onValueChange,

  // Direct usage
  value,
  onChange,
  error,

  ...props
}, ref) => {

  const handleGenerate = (currentValue, fieldOnChange) => {
    const newSlug = onGenerate ? onGenerate(sourceValue) : generateSlug(sourceValue);
    fieldOnChange?.(newSlug);
    onValueChange?.(newSlug);
  };

  const renderInput = (fieldValue, fieldOnChange, isDisabled, fieldState) => {
    const inputProps = {
      ref,
      id: name,
      type: "text",
      disabled: isDisabled,
      placeholder,
      value: fieldValue || "",
      onChange: (e) => {
        const newValue = e.target.value;
        fieldOnChange?.(newValue);
        onValueChange?.(newValue);
      },
      className: cn(
        "h-11",
        fieldState?.error && "border-destructive focus-visible:ring-destructive/20",
        inputClassName
      ),
      ...props,
    };

    return (
      <>
        {/* Icon support (outside InputGroup) */}
        {icon && (
          <Field.Icon>
            <IconComponent name={icon} size={16} />
          </Field.Icon>
        )}

        <InputGroup>
          <InputGroupInput {...inputProps} className={cn(inputProps.className, icon && "pl-9")} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="sm"
              onClick={() => handleGenerate(fieldValue, fieldOnChange)}
              disabled={isDisabled || !sourceValue}
              title="Generate slug from name"
            >
              <Wand2 className="h-4 w-4" />
              Generate
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </>
    );
  };

  // With react-hook-form
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field.Root className={className} disabled={disabled} invalid={!!fieldState?.error}>
            <div className="relative group">
              {label && <Field.Label>{label}</Field.Label>}
              {renderInput(field.value, field.onChange, disabled, fieldState)}
            </div>
            {fieldState?.error && <Field.Error>{fieldState.error.message}</Field.Error>}
            {description && <p className="text-xs text-muted-foreground mt-1.5">{description}</p>}
          </Field.Root>
        )}
      />
    );
  }

  // Direct usage (without react-hook-form)
  const handleDirectChange = (newValue) => {
    onChange?.({ target: { value: newValue } });
    onValueChange?.(newValue);
  };

  return (
    <Field.Root className={className} disabled={disabled} invalid={!!error}>
      <div className="relative group">
        {label && <Field.Label>{label}</Field.Label>}
        {renderInput(value, handleDirectChange, disabled, { error })}
      </div>
      {error && <Field.Error>{error}</Field.Error>}
      {description && <p className="text-xs text-muted-foreground mt-1.5">{description}</p>}
    </Field.Root>
  );
});

CompactSlugField.displayName = "CompactSlugField";

export default CompactSlugField;
export { generateSlug };
