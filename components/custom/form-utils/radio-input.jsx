"use client";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";

const RadioInput = ({
  // Field props
  control,
  name,
  label,
  description,
  required,
  disabled,
  className,
  labelClassName,
  
  // Radio specific props
  choices = [],
  value: propValue,
  onChange: propOnChange,
  onValueChange,
  radioGroupClassName,
  radioItemClassName,
  orientation = "vertical", // vertical | horizontal
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
  const handleDirectValueChange = (newValue) => {
    setLocalValue(newValue);
    if (propOnChange) {
      propOnChange(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const renderRadioGroup = (field, isDisabled) => {
    // Get value from either form field or direct props
    const value = field ? field.value : localValue;
    
    const handleValueChange = (newValue) => {
      if (field) {
        field.onChange(newValue);
      } else {
        handleDirectValueChange(newValue);
      }
      
      if (onValueChange) {
        onValueChange(newValue);
      }
    };
    
    return (
      <RadioGroup
        value={value}
        onValueChange={handleValueChange}
        className={cn(
          orientation === "horizontal" 
            ? "flex flex-row flex-wrap gap-4" 
            : "flex flex-col space-y-2",
          radioGroupClassName
        )}
      >
        {choices.map((choice) => (
          <div 
            key={choice.value}
            className={cn(
              "flex items-center space-x-2 space-y-0",
              radioItemClassName
            )}
          >
            <RadioGroupItem 
              id={`${name}-${choice.value}`}
              value={choice.value} 
              disabled={isDisabled || choice.disabled}
            />
            <label 
              htmlFor={`${name}-${choice.value}`}
              className="text-sm font-normal cursor-pointer"
            >
              {choice.label}
            </label>
          </div>
        ))}
      </RadioGroup>
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
        {renderRadioGroup(null, disabled)}
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
          {renderRadioGroup(field, disabled)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default RadioInput;