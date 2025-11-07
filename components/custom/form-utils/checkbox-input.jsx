"use client";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

const CheckboxInput = ({
  // Field props
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
  labelClassName,
  
  // Checkbox specific props
  items = [],
  value: propValue,
  onChange: propOnChange,
  onValueChange,
  checkboxClassName,
  itemClassName,
}) => {
  // For direct usage without React Hook Form
  const [localValues, setLocalValues] = useState(propValue || []);
  
  // Update local value when prop value changes
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValues(propValue);
    }
  }, [propValue]);
  
  // Handle direct value changes (without React Hook Form)
  const handleDirectValueChange = (newValues) => {
    setLocalValues(newValues);
    if (propOnChange) {
      propOnChange(newValues);
    }
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  const renderCheckboxes = (field, isDisabled) => {
    // Get values from either form field or direct props
    const values = field ? field.value || [] : localValues || [];
    
    const handleCheckedChange = (itemId, checked) => {
      const newValues = checked 
        ? [...values, itemId]
        : values.filter(value => value !== itemId);
        
      if (field) {
        field.onChange(newValues);
      } else {
        handleDirectValueChange(newValues);
      }
      
      if (onValueChange) {
        onValueChange(newValues);
      }
    };
    
    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className={cn("flex items-center space-x-2", itemClassName)}>
            <Checkbox
              id={`${name}-${item.id}`}
              className={checkboxClassName}
              checked={values.includes(item.id)}
              disabled={isDisabled || item.disabled}
              onCheckedChange={(checked) => handleCheckedChange(item.id, checked)}
            />
            <label 
              htmlFor={`${name}-${item.id}`}
              className="text-sm font-normal cursor-pointer"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
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
        {renderCheckboxes(null, disabled)}
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
          {renderCheckboxes(field, disabled)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default CheckboxInput;
