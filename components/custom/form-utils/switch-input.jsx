// components/form-utils/switch-input.jsx
"use client";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";

const SwitchInput = ({
  // Field props
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
  labelClassName,
  
  // Switch specific props
  orientation = "horizontal", // 'horizontal' or 'vertical'
  value: propValue,
  onChange: propOnChange,
  onValueChange,
  switchClassName,
  Icon,
}) => {
  // For direct usage without React Hook Form
  const [localValue, setLocalValue] = useState(propValue || false);
  
  // Update local value when prop value changes
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue);
    }
  }, [propValue]);
  
  // Handle direct value changes (without React Hook Form)
  const handleDirectValueChange = (newValue) => {
    setLocalValue(newValue);
    if (propOnChange) {
      propOnChange(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const renderSwitch = (field, isDisabled) => {
    // Get value from either form field or direct props
    const value = field ? (field.value ?? false) : (localValue ?? false);
    
    const handleCheckedChange = (checked) => {
      if (field) {
        field.onChange(checked);
      } else {
        handleDirectValueChange(checked);
      }
      
      if (onValueChange) {
        onValueChange(checked);
      }
    };
    
    return (
      <Switch
        id={name}
        checked={value}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        className={switchClassName}
      />
    );
  };

  // Direct usage without React Hook Form
  if (!control) {
    return (
      <Field
        className={className}
        data-disabled={disabled}
        orientation={orientation}
      >
        {renderSwitch(null, disabled)}
        <FieldContent>
          {label && (
            <FieldLabel htmlFor={name} className={labelClassName}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FieldLabel>
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
      </Field>
    );
  }

  // Using with React Hook Form - NEW PATTERN with Controller
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          className={className}
          data-disabled={disabled}
          data-invalid={fieldState.invalid}
          orientation={orientation}
        >
          {renderSwitch(field, disabled)}
          <FieldContent>
            {label && (
              <FieldLabel htmlFor={name} className={labelClassName}>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FieldLabel>
            )}
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
};

export default SwitchInput;