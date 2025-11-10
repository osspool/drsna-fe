"use client";

import { FormSection, FormGrid } from "./FormSection";
import { FormFieldsRenderer } from "./FormFieldFactory";

/**
 * FormGenerator - Generates complete forms from JSON schema
 * 
 * Schema Structure:
 * {
 *   sections: [
 *     {
 *       id: "basic",
 *       title: "Basic Information",
 *       description: "Enter basic details",
 *       icon: <Icon />,
 *       variant: "default" | "card" | "subtle",
 *       fields: [
 *         {
 *           name: "fieldName",
 *           type: "text" | "number" | "select" | "textarea" | "switch" | "tags" | etc,
 *           label: "Field Label",
 *           placeholder: "Placeholder text",
 *           description: "Field description",
 *           required: true,
 *           disabled: false,
 *           options: [], // For select/radio
 *           transform: { input: fn, output: fn }, // For custom transformations
 *           condition: (control) => boolean, // Conditional rendering
 *           fullWidth: true, // Span full width in grid
 *           // ... other field-specific props
 *         }
 *       ],
 *       cols: 2, // Number of columns in grid
 *     }
 *   ]
 * }
 * 
 * @param {Object} schema - Form schema configuration
 * @param {Object} control - React Hook Form control
 * @param {boolean} disabled - Global disabled state
 * @returns {JSX.Element} - The rendered form sections
 */
export function FormGenerator({ schema, control, disabled = false }) {
  if (!schema?.sections || schema.sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {schema.sections.map((section, index) => {
        // Support conditional section rendering
        if (section.condition && !section.condition(control)) {
          return null;
        }

        return (
          <FormSection
            key={section.id || index}
            title={section.title}
            description={section.description}
            icon={section.icon}
            variant={section.variant || "default"}
            className={section.className}
          >
            {section.render ? (
              // Custom section renderer
              section.render({ control, disabled, section })
            ) : (
              // Auto-generate fields from schema
              <FormFieldsRenderer
                fields={section.fields}
                control={control}
                disabled={disabled}
                cols={section.cols || 2}
              />
            )}
          </FormSection>
        );
      })}
    </div>
  );
}

/**
 * Helper function to create field definitions with better DX
 */
export const field = {
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
  
  combobox: (name, label, options, props = {}) => ({
    type: "combobox",
    name,
    label,
    options,
    searchPlaceholder: props.searchPlaceholder || "Search...",
    emptyText: props.emptyText || "No items found.",
    ...props,
  }),
  
  switch: (name, label, props = {}) => ({
    type: "switch",
    name,
    label,
    labelPosition: "right",
    ...props,
  }),
  
  tags: (name, label, props = {}) => ({
    type: "tags",
    name,
    label,
    placeholder: props.placeholder || "Add tags...",
    ...props,
  }),

  multiselect: (name, label, options, props = {}) => ({
    type: "multiselect",
    name,
    label,
    options,
    placeholder: props.placeholder || "Select options...",
    ...props,
  }),

  checkbox: (name, label, props = {}) => ({
    type: "checkbox",
    name,
    label,
    ...props,
  }),
  
  radio: (name, label, options, props = {}) => ({
    type: "radio",
    name,
    label,
    options,
    ...props,
  }),
  
  date: (name, label, props = {}) => ({
    type: "date",
    name,
    label,
    ...props,
  }),

  slug: (name, label, sourceValue, props = {}) => ({
    type: "slug",
    name,
    label,
    sourceValue,
    placeholder: props.placeholder || "my-page-slug",
    ...props,
  }),

  custom: (name, label, render, props = {}) => ({
    type: "custom",
    name,
    label,
    render,
    ...props,
  }),
};

/**
 * Helper to create section definitions
 */
export const section = (id, title, fields, props = {}) => ({
  id,
  title,
  fields,
  cols: props.cols || 2,
  ...props,
});

