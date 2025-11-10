"use client";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { InputGroup, InputGroupTextarea, InputGroupAddon } from "@/components/ui/input-group";
import { Field } from "./field";

/**
 * CompactTextarea - Enhanced textarea with InputGroup support
 * 
 * Features:
 * - Floating label design
 * - InputGroup support with addons (buttons, text, icons)
 * - Character counter with maxLength
 * - Controller integration for react-hook-form
 * - Direct usage without form
 * 
 * @example
 * // With InputGroup addons
 * <CompactTextarea
 *   control={control}
 *   name="message"
 *   label="Message"
 *   placeholder="Type your message..."
 *   AddonRight={<InputGroupButton>Send</InputGroupButton>}
 *   maxLength={500}
 * />
 * 
 * // Simple usage
 * <CompactTextarea
 *   label="Description"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   rows={4}
 * />
 */
const CompactTextarea = forwardRef(({
  // Form integration
  control,
  name,
  description,
  required,
  
  // Basic props
  label,
  placeholder,
  disabled,
  rows = 3,
  maxLength,
  
  // InputGroup addons (NEW)
  AddonLeft,
  AddonRight,
  
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
  const charCount = value?.length || 0;
  
  // Determine if we need InputGroup
  const hasInputGroup = AddonLeft || AddonRight;

  const renderTextarea = (fieldValue, fieldOnChange, isDisabled, fieldState) => {
    const currentCharCount = fieldValue?.length || 0;
    
    const textareaProps = {
      ref,
      id: name,
      disabled: isDisabled,
      placeholder,
      rows,
      maxLength,
      value: fieldValue || "",
      onChange: (e) => {
        const newValue = e.target.value;
        fieldOnChange?.(newValue);
        onValueChange?.(newValue);
      },
      className: cn(
        "resize-none pt-3",
        fieldState?.error && "border-destructive focus-visible:ring-destructive/20",
        inputClassName
      ),
      ...props,
    };

    // With InputGroup
    if (hasInputGroup) {
      return (
        <>
          <InputGroup>
            {AddonLeft && (
              <InputGroupAddon align="block-start">
                {typeof AddonLeft === 'string' ? AddonLeft : AddonLeft}
              </InputGroupAddon>
            )}
            <InputGroupTextarea {...textareaProps} />
            {AddonRight && (
              <InputGroupAddon align="block-end">
                {typeof AddonRight === 'string' ? AddonRight : AddonRight}
              </InputGroupAddon>
            )}
          </InputGroup>
          {maxLength && currentCharCount > 0 && (
            <div className="text-xs text-muted-foreground mt-1.5 text-right">
              {currentCharCount}/{maxLength}
            </div>
          )}
        </>
      );
    }

    // Simple textarea
    return (
      <>
        <Textarea {...textareaProps} />
        {maxLength && currentCharCount > 0 && (
          <div className="text-xs text-muted-foreground mt-1.5 text-right">
            {currentCharCount}/{maxLength}
          </div>
        )}
      </>
    );
  };

  // With react-hook-form - NEW PATTERN with Controller
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field.Root className={className} disabled={disabled} invalid={!!fieldState?.error}>
            <div className="relative group">
              {label && <Field.Label>{label}</Field.Label>}
              {renderTextarea(field.value, field.onChange, disabled, fieldState)}
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
        {renderTextarea(value, handleDirectChange, disabled, { error })}
      </div>
      {error && <Field.Error>{error}</Field.Error>}
      {description && <p className="text-xs text-muted-foreground mt-1.5">{description}</p>}
    </Field.Root>
  );
});

CompactTextarea.displayName = "CompactTextarea";

export default CompactTextarea;
