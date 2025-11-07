// components/form-utils/date-input.jsx
"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DateInput Component
 *
 * A simplified date input using react-day-picker v9 with Popover
 * - Works with React Hook Form via Controller
 * - Can be used standalone without form control
 * - Uses native browser date formatting (no date-fns)
 */
const DateInput = ({
  control,
  name,
  label,
  description,
  placeholder = "Pick a date",
  required,
  disabled,
  className,
  labelClassName,
  inputClassName,
  minDate,
  maxDate,
  onValueChange,
  // For direct usage without form
  value: propValue,
  onChange: propOnChange,
  Icon = CalendarIcon,
  allowClear = true,
}) => {
  // Convert value to Date object
  const toDate = (val) => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    // Handle YYYY-MM-DD format
    if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-").map(Number);
      const dt = new Date(y, (m || 1) - 1, d || 1);
      return isNaN(dt.getTime()) ? undefined : dt;
    }
    const dt = new Date(val);
    return isNaN(dt.getTime()) ? undefined : dt;
  };

  // Check if date should be disabled
  const isDateDisabled = (date) => {
    if (!date) return false;
    if (minDate && date < toDate(minDate)) return true;
    if (maxDate && date > toDate(maxDate)) return true;
    return false;
  };

  // Render the date picker UI
  const renderDateInput = (field, isDisabled) => {
    const value = field ? field.value : propValue;
    const selected = toDate(value);
    const [open, setOpen] = React.useState(false);

    const handleSelect = (date) => {
      if (field) field.onChange(date);
      else if (propOnChange) propOnChange(date);
      onValueChange?.(date);
      setOpen(false);
    };

    const handleClear = (e) => {
      e?.stopPropagation?.();
      if (field) field.onChange(undefined);
      else if (propOnChange) propOnChange(undefined);
      onValueChange?.(undefined);
    };

    const displayText = selected
      ? selected.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : placeholder;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selected && "text-muted-foreground",
              inputClassName
            )}
            disabled={isDisabled}
          >
            <Icon className="mr-2 h-4 w-4" />
            {displayText}
            {allowClear && selected && !isDisabled && (
              <X
                className="ml-auto h-4 w-4 opacity-50 hover:opacity-100"
                onClick={handleClear}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            defaultMonth={selected}
            selected={selected}
            onSelect={handleSelect}
            disabled={isDateDisabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  };

  // Direct usage without React Hook Form
  if (!control) {
    return (
      <Field className={className} data-disabled={disabled}>
        {label && (
          <FieldLabel htmlFor={name} className={labelClassName}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FieldLabel>
        )}
        {renderDateInput(null, disabled)}
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    );
  }

  // Using with React Hook Form via Controller
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
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          )}
          {renderDateInput(field, disabled)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default DateInput;