"use client";

import { useWatch } from "react-hook-form";
import FormInput from "@/components/form-utils/form-input";
import FormTextarea from "@/components/form-utils/form-textarea";
import SelectInput from "@/components/form-utils/select-input";
import ComboboxInput from "@/components/form-utils/combobox-input";
import SwitchInput from "@/components/form-utils/switch-input";
import TagInput from "@/components/form-utils/tag-input";
import TagChoiceInput from "@/components/form-utils/tag-choice-input";
import CheckboxInput from "@/components/form-utils/checkbox-input";
import RadioInput from "@/components/form-utils/radio-input";
import DateInput from "@/components/form-utils/date-input";
import SlugField from "@/components/form-utils/slug-field";

/**
 * FormFieldFactory - Dynamically renders form fields based on field configuration
 * 
 * @param {Object} field - Field configuration object
 * @param {Object} control - React Hook Form control
 * @param {boolean} disabled - Whether the field is disabled
 * @returns {JSX.Element} - The rendered form field
 */
export function FormFieldFactory({ field, control, disabled = false }) {
  // Build commonProps, only including defined values to prevent React warnings
  const commonProps = {};

  if (control) commonProps.control = control;
  if (field.name) commonProps.name = field.name;
  if (field.label) commonProps.label = field.label;
  if (field.placeholder) commonProps.placeholder = field.placeholder;
  if (field.description) commonProps.description = field.description;
  if (field.required) commonProps.required = field.required;
  if (field.className) commonProps.className = field.className;
  if (field.labelClassName) commonProps.labelClassName = field.labelClassName;

  commonProps.disabled = disabled || field.disabled;

  // Text Input
  if (field.type === "text" || field.type === "email" || field.type === "url" || field.type === "tel") {
    return (
      <FormInput
        {...commonProps}
        type={field.type}
        inputClassName={field.inputClassName}
        IconLeft={field.iconLeft}
        IconRight={field.iconRight}
        AddonLeft={field.addonLeft}
        AddonRight={field.addonRight}
        transform={field.transform}
        {...field.extraProps}
      />
    );
  }

  // Number Input
  if (field.type === "number") {
    return (
      <FormInput
        {...commonProps}
        type="number"
        min={field.min}
        max={field.max}
        step={field.step}
        transform={field.transform || {
          input: (value) => value?.toString() ?? "",
          output: (value) => {
            const parsed = Number(value);
            return Number.isNaN(parsed) ? (field.defaultValue ?? 0) : parsed;
          },
        }}
        IconLeft={field.iconLeft}
        IconRight={field.iconRight}
        AddonLeft={field.addonLeft}
        AddonRight={field.addonRight}
        {...field.extraProps}
      />
    );
  }

  // Textarea
  if (field.type === "textarea") {
    return (
      <FormTextarea
        {...commonProps}
        rows={field.rows || 3}
        {...field.extraProps}
      />
    );
  }

  // Select
  if (field.type === "select") {
    return (
      <SelectInput
        {...commonProps}
        items={field.options || []}
        Icon={field.iconLeft ? () => field.iconLeft : undefined}
        {...field.extraProps}
      />
    );
  }

  // Combobox (Searchable Select with Popover)
  if (field.type === "combobox") {
    return (
      <ComboboxInput
        {...commonProps}
        items={field.options || []}
        searchPlaceholder={field.searchPlaceholder || "Search..."}
        emptyText={field.emptyText || "No items found."}
        renderOption={field.renderOption}
        {...field.extraProps}
      />
    );
  }

  // Switch/Toggle
  if (field.type === "switch" || field.type === "toggle") {
    return (
      <SwitchInput
        {...commonProps}
        labelPosition={field.labelPosition || "right"}
        {...field.extraProps}
      />
    );
  }

  // Checkbox
  if (field.type === "checkbox") {
    return (
      <CheckboxInput
        {...commonProps}
        {...field.extraProps}
      />
    );
  }

  // Radio Group
  if (field.type === "radio") {
    return (
      <RadioInput
        {...commonProps}
        options={field.options || []}
        {...field.extraProps}
      />
    );
  }

  // Tag Input (for arrays of strings)
  if (field.type === "tags") {
    return (
      <TagInput
        {...commonProps}
        {...field.extraProps}
      />
    );
  }

  // Multi-select (tag choice with predefined options)
  if (field.type === "multiselect") {
    return (
      <TagChoiceInput
        {...commonProps}
        items={field.options || []}
        {...field.extraProps}
      />
    );
  }

  // Date Input
  if (field.type === "date") {
    return (
      <DateInput
        {...commonProps}
        {...field.extraProps}
      />
    );
  }

  // Slug Input (with auto-generation)
  if (field.type === "slug") {
    // Watch the source field value for auto-generation
    // field.sourceValue should be the field name (e.g., "title")
    // We need to watch that field's actual value
    const sourceFieldValue = useWatch({
      control,
      name: field.sourceValue,
    });

    return (
      <SlugField
        {...commonProps}
        sourceValue={sourceFieldValue}
        onGenerate={field.onGenerate}
        {...field.extraProps}
      />
    );
  }

  // Custom Render Function
  if (field.type === "custom" && field.render) {
    return field.render({ control, field, disabled });
  }

  // Fallback to text input
  console.warn(`Unknown field type: ${field.type}, falling back to text input`);
  return <FormInput {...commonProps} type="text" />;
}

/**
 * Renders multiple fields in a grid layout
 */
export function FormFieldsRenderer({ fields, control, disabled, cols = 2 }) {
  // Watch all form values for conditional rendering
  const formValues = useWatch({ control });

  if (!fields || fields.length === 0) return null;

  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[cols] || "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`grid gap-4 ${colsClass}`}>
      {fields.map((field, index) => {
        // Support conditional rendering - pass form values instead of control
        if (field.condition && !field.condition(formValues)) {
          return null;
        }

        // Support full-width fields
        const spanClass = field.fullWidth ? "md:col-span-full" : "";

        return (
          <div key={field.name || index} className={spanClass}>
            <FormFieldFactory field={field} control={control} disabled={disabled} />
          </div>
        );
      })}
    </div>
  );
}

