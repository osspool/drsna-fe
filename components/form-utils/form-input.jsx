// components/form-utils/form-input.jsx
"use client";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  type = "text",
  className,
  labelClassName,
  inputClassName,
  inputGroupClassName,
  IconLeft,
  IconRight,
  AddonLeft,
  AddonRight,
  onValueChange,
  transform,
  // For direct usage without form
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e, field) => {
    const newValue = transform?.output 
      ? transform.output(e.target.value) 
      : e.target.value;
    
    if (field) {
      field.onChange(newValue);
    } else if (onChange) {
      onChange(newValue);
    }
    
    onValueChange?.(newValue);
  };

  // Determine if we need InputGroup (has icons or addons)
  const hasInputGroup = IconLeft || IconRight || AddonLeft || AddonRight;

  const renderInput = (field, isDisabled, fieldState) => {
    const rawValue = field
      ? (transform?.input ? transform.input(field.value) : field.value)
      : (transform?.input ? transform.input(value) : value);
    const safeValue = rawValue ?? "";

    const inputProps = {
      ...(field || {}),
      id: name,
      type,
      disabled: isDisabled,
      placeholder,
      value: safeValue,
      onChange: (e) => handleChange(e, field),
      "aria-invalid": fieldState?.invalid,
      ...props,
    };

    if (hasInputGroup) {
      return (
        <InputGroup className={cn(inputGroupClassName)}>
          {(AddonLeft || IconLeft) && (
            <InputGroupAddon align="inline-start">
              {AddonLeft || IconLeft}
            </InputGroupAddon>
          )}
          <InputGroupInput {...inputProps} className={inputClassName} />
          {(AddonRight || IconRight) && (
            <InputGroupAddon align="inline-end">
              {AddonRight || IconRight}
            </InputGroupAddon>
          )}
        </InputGroup>
      );
    }

    return <Input {...inputProps} className={inputClassName} />;
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
        {renderInput(null, disabled, null)}
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
          {renderInput(field, disabled, fieldState)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
};

export default FormInput;