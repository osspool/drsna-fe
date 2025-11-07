"use client";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { Field } from "./field";
import { Icon as IconComponent } from "@/components/custom/ui/icon";

/**
 * CompactInput - Enhanced form input with InputGroup support
 * 
 * Features:
 * - Floating label design
 * - InputGroup support with icons, buttons, and text addons
 * - Icon support (legacy, use AddonLeft/AddonRight instead)
 * - Controller integration for react-hook-form
 * - Direct usage without form
 * 
 * @example
 * // With InputGroup addons
 * <CompactInput
 *   control={control}
 *   name="website"
 *   label="Website"
 *   placeholder="example.com"
 *   AddonLeft="https://"
 *   AddonRight={<InputGroupButton><Search /></InputGroupButton>}
 * />
 * 
 * // With legacy icon
 * <CompactInput
 *   label="Email"
 *   placeholder="Enter email"
 *   icon="mail"
 * />
 * 
 * // Direct usage
 * <CompactInput
 *   label="Username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 *   AddonLeft="@"
 * />
 */
const CompactInput = forwardRef(({
  // Form integration
  control,
  name,
  description,
  required,
  
  // Basic props
  label,
  placeholder,
  disabled,
  type = "text",
  
  // Legacy icon support (use AddonLeft/AddonRight instead)
  icon,
  
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
  // Determine if we need InputGroup
  const hasInputGroup = AddonLeft || AddonRight;
  const renderInput = (fieldValue, fieldOnChange, isDisabled, fieldState) => {
    const inputProps = {
      ref,
      id: name,
      type,
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
        // Icon padding - removed hasInputGroup check to support icons with InputGroup
        fieldState?.error && "border-destructive focus-visible:ring-destructive/20",
        inputClassName
      ),
      ...props,
    };

    // With InputGroup
    if (hasInputGroup) {
      return (
        <>
          {/* Icon support even with InputGroup */}
          {icon && (
            <Field.Icon>
              <IconComponent name={icon} size={16} />
            </Field.Icon>
          )}
          <InputGroup>
            {AddonLeft && (
              <InputGroupAddon align="inline-start">
                {typeof AddonLeft === 'string' ? AddonLeft : AddonLeft}
              </InputGroupAddon>
            )}
            <InputGroupInput {...inputProps} className={cn(inputProps.className, icon && "pl-9")} />
            {AddonRight && (
              <InputGroupAddon align="inline-end">
                {typeof AddonRight === 'string' ? AddonRight : AddonRight}
              </InputGroupAddon>
            )}
          </InputGroup>
        </>
      );
    }

    // Legacy: With icon (outside InputGroup)
    if (icon) {
      return (
        <>
          <Field.Icon>
            <IconComponent name={icon} size={16} />
          </Field.Icon>
          <Input {...inputProps} className={cn(inputProps.className, "pl-9")} />
        </>
      );
    }

    // Simple input
    return <Input {...inputProps} />;
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

CompactInput.displayName = "CompactInput";

export default CompactInput;
