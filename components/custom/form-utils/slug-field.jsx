"use client";

import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
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
 * SlugField - Standard slug input with auto-generation
 *
 * Features:
 * - Standard form layout with label above input
 * - Auto-generate slug from source field
 * - Manual editing support
 * - InputGroup with generate button
 * - Controller integration for react-hook-form
 *
 * @example
 * <SlugField
 *   control={control}
 *   name="slug"
 *   label="URL Slug"
 *   sourceValue={titleValue}
 *   description="This will be used in the course URL"
 *   required
 * />
 */
const SlugField = forwardRef(({
  // Form integration
  control,
  name,
  description,
  required,

  // Basic props
  label,
  placeholder = "my-page-slug",
  disabled,

  // Slug generation
  sourceValue, // The value to generate slug from (e.g., page name)
  onGenerate, // Custom generate callback

  // Styling
  className,
  inputClassName,
  labelClassName,

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
      "aria-invalid": fieldState?.invalid,
      ...props,
    };

    return (
      <InputGroup>
        <InputGroupInput {...inputProps} className={inputClassName} />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="sm"
            onClick={() => handleGenerate(fieldValue, fieldOnChange)}
            disabled={isDisabled || !sourceValue}
            title="Generate slug from source"
          >
            <Wand2 className="h-4 w-4" />
            Generate
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  };

  // With react-hook-form
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field className={className} data-disabled={disabled} data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel htmlFor={name} className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FieldLabel>
            )}
            {renderInput(field.value, field.onChange, disabled, fieldState)}
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
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
    <Field className={className} data-disabled={disabled}>
      {label && (
        <FieldLabel htmlFor={name} className={labelClassName}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
      )}
      {renderInput(value, handleDirectChange, disabled, { error })}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError errors={[error]} />}
    </Field>
  );
});

SlugField.displayName = "SlugField";

export default SlugField;
export { generateSlug };
