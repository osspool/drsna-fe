// components/form-utils/form-textarea.jsx
"use client";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const FormTextarea = ({
  // Field props
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
  labelClassName,
  
  // Textarea specific props
  placeholder,
  value: propValue,
  onChange: propOnChange,
  onValueChange,
  textareaClassName,
  rows = 3,
  ...props
}) => {
  // For direct usage without React Hook Form
  const [localValue, setLocalValue] = useState(propValue || "");
  
  // Update local value when prop value changes
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue);
    }
  }, [propValue]);
  
  // Handle direct value changes (without React Hook Form)
  const handleDirectValueChange = (value) => {
    setLocalValue(value);
    if (propOnChange) {
      propOnChange(value);
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const renderTextarea = (field, isDisabled) => {
    // Get value from either form field or direct props
    const value = field ? field.value : localValue;
    
    const handleChange = (e) => {
      const newValue = e.target.value;
      
      if (field) {
        field.onChange(e);
      } else {
        handleDirectValueChange(newValue);
      }
      
      if (onValueChange) {
        onValueChange(newValue);
      }
    };
    
    return (
      <Textarea
        {...(field || {})}
        value={value ?? ""}
        placeholder={placeholder}
        disabled={isDisabled}
        className={cn(
          "overflow-auto resize-none",
          textareaClassName
        )}
        rows={rows}
        onChange={handleChange}
        {...props}
      />
    );
  };

  // Direct usage without React Hook Form
  if (!control) {
    return (
      <Field className={className} data-disabled={disabled}>
        {label && (
          <FieldLabel htmlFor={name} className={labelClassName}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FieldLabel>
        )}
        {renderTextarea(null, disabled)}
        {description && <FieldDescription>{description}</FieldDescription>}
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
        >
          {label && (
            <FieldLabel htmlFor={name} className={labelClassName}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FieldLabel>
          )}
          {renderTextarea(field, disabled)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default FormTextarea;