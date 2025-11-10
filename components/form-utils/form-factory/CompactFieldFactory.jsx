"use client";

import CompactInput from "@/components/form-utils/compact-forms/compact-input";
import CompactTextarea from "@/components/form-utils/compact-forms/compact-textarea";
import CompactSelect from "@/components/form-utils/compact-forms/compact-select";
import CompactSlugField from "@/components/form-utils/compact-forms/compact-slug-field";
import SwitchInput from "@/components/form-utils/switch-input";

/**
 * CompactFieldFactory - Renders compact form fields (not using react-hook-form)
 * Used for forms that use direct value/onChange pattern instead of form control
 */
export function CompactFieldFactory({ field, value, onChange, error, disabled, data }) {
  // Apply input transform if defined
  const displayValue = field.transform?.input
    ? field.transform.input(value ?? field.defaultValue ?? "")
    : (value ?? field.defaultValue ?? "");

  const commonProps = {
    label: field.label,
    value: displayValue,
    onChange: (e) => {
      const val = e?.target?.value ?? e;
      if (field.transform?.output) {
        onChange?.(field.transform.output(val));
      } else {
        onChange?.(val);
      }
    },
    placeholder: field.placeholder,
    description: field.description,
    error: error,
    disabled: disabled || field.disabled,
    className: field.className,
    icon: field.icon,
  };

  // Text Input (default)
  if (!field.type || field.type === "text" || field.type === "email" || field.type === "url" || field.type === "tel") {
    return (
      <CompactInput
        {...commonProps}
        type={field.type || "text"}
        maxLength={field.maxLength}
      />
    );
  }

  // Number Input
  if (field.type === "number") {
    return (
      <CompactInput
        {...commonProps}
        type="number"
        min={field.min}
        max={field.max}
        step={field.step}
      />
    );
  }

  // Textarea
  if (field.type === "textarea") {
    return (
      <CompactTextarea
        {...commonProps}
        rows={field.rows || 3}
        maxLength={field.maxLength}
      />
    );
  }

  // Select
  if (field.type === "select") {
    return (
      <CompactSelect
        label={field.label}
        value={value ?? field.defaultValue ?? ""}
        onValueChange={onChange}
        items={field.options || []}
        description={field.description}
        error={error}
        disabled={disabled || field.disabled}
      />
    );
  }

  // Slug Input (Compact)
  if (field.type === "slug") {
    // Resolve sourceValue - if it's a field name string, get the actual value from data
    const resolvedSourceValue = typeof field.sourceValue === 'string'
      ? data?.[field.sourceValue]
      : field.sourceValue;

    return (
      <CompactSlugField
        label={field.label}
        value={displayValue}
        onChange={(e) => {
          const val = e?.target?.value ?? e;
          if (field.transform?.output) {
            onChange?.(field.transform.output(val));
          } else {
            onChange?.(val);
          }
        }}
        onValueChange={onChange}
        sourceValue={resolvedSourceValue}
        onGenerate={field.onGenerate}
        placeholder={field.placeholder}
        description={field.description}
        error={error}
        disabled={disabled || field.disabled}
        className={field.className}
        icon={field.icon}
      />
    );
  }

  // Switch Input
  if (field.type === "switch") {
    return (
      <SwitchInput
        label={field.label}
        checked={value ?? field.defaultValue ?? false}
        onCheckedChange={onChange}
        description={field.description}
        disabled={disabled || field.disabled}
        labelPosition={field.labelPosition || "right"}
        className={field.className}
      />
    );
  }

  // Fallback
  console.warn(`Unknown compact field type: ${field.type}`);
  return <CompactInput {...commonProps} />;
}

/**
 * CompactFieldsRenderer - Renders multiple compact fields
 */
export function CompactFieldsRenderer({ fields, data, updateField, errors, disabled }) {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        // Support conditional rendering
        if (field.condition && !field.condition(data)) {
          return null;
        }

        return (
          <div key={field.name || index}>
            <CompactFieldFactory
              field={field}
              value={data?.[field.name]}
              onChange={(val) => updateField(field.name, val)}
              error={errors?.[field.name]}
              disabled={disabled}
              data={data}
            />
          </div>
        );
      })}
    </div>
  );
}

/**
 * Helper to create compact field definitions
 */
export const compactField = {
  text: (name, label, props = {}) => ({
    type: "text",
    name,
    label,
    ...props,
  }),
  
  email: (name, label, props = {}) => ({
    type: "email",
    name,
    label,
    placeholder: props.placeholder || "example@email.com",
    ...props,
  }),
  
  url: (name, label, props = {}) => ({
    type: "url",
    name,
    label,
    placeholder: props.placeholder || "https://example.com",
    ...props,
  }),
  
  tel: (name, label, props = {}) => ({
    type: "tel",
    name,
    label,
    placeholder: props.placeholder || "01XXXXXXXXX",
    ...props,
  }),
  
  number: (name, label, props = {}) => ({
    type: "number",
    name,
    label,
    min: 0,
    ...props,
  }),
  
  textarea: (name, label, props = {}) => ({
    type: "textarea",
    name,
    label,
    rows: props.rows || 3,
    ...props,
  }),
  
  select: (name, label, options, props = {}) => ({
    type: "select",
    name,
    label,
    options,
    ...props,
  }),

  slug: (name, label, sourceField, props = {}) => ({
    type: "slug",
    name,
    label,
    sourceValue: sourceField, // Field name to watch
    placeholder: props.placeholder || "my-page-slug",
    ...props,
  }),
};

