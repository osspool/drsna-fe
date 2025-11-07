"use client";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import Combobox from "@/components/custom/combobox";
import { cn } from "@/lib/utils";

const ComboboxInput = ({
  control,
  name,
  label,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyText = "No items found.",
  description,
  required,
  disabled,
  items = [],
  className,
  labelClassName,
  onValueChange,
  renderOption,
  // For direct usage without form
  value,
  onChange,
  ...props
}) => {
  const handleChange = (newValue, field) => {
    if (field) {
      field.onChange(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
    onValueChange?.(newValue);
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
        <Combobox
          options={items}
          value={value}
          onValueChange={onChange}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          emptyText={emptyText}
          disabled={disabled}
          displayKey="label"
          valueKey="value"
          renderOption={renderOption}
          {...props}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    );
  }

  // Using with React Hook Form
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
          <Combobox
            options={items}
            value={field.value}
            onValueChange={(val) => handleChange(val, field)}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            disabled={disabled}
            displayKey="label"
            valueKey="value"
            renderOption={renderOption}
            {...props}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default ComboboxInput;

