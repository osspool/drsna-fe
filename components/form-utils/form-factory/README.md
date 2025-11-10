# Form Factory System

A comprehensive form generation system that creates beautiful, consistent forms from JSON definitions. This system reduces code redundancy and ensures a consistent UX/UI across all forms in the application.

## Features

- 📝 **JSON-driven**: Define forms using simple JSON schemas
- 🎨 **Consistent UI**: All forms share the same design language
- 🔄 **Reusable**: Zero code duplication across forms
- 🎯 **Type-safe**: Full TypeScript support (when converted)
- 🚀 **Fast Development**: Create complex forms in minutes
- 📱 **Responsive**: Mobile-first design with adaptive layouts
- ♿ **Accessible**: Built on shadcn/ui with accessibility in mind

## Quick Start

### 1. Basic Form with Schema

```jsx
import { FormGenerator, field, section } from "@/components/form-utils/form-factory";

const myFormSchema = {
  sections: [
    section("basic", "Basic Information", [
      field.text("name", "Name", { required: true }),
      field.email("email", "Email", { required: true }),
      field.textarea("bio", "Bio", { rows: 4 }),
    ])
  ]
};

function MyForm() {
  const form = useForm();
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormGenerator 
        schema={myFormSchema} 
        control={form.control} 
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Components

### FormGenerator

Main component that generates forms from schema.

```jsx
<FormGenerator 
  schema={formSchema} 
  control={form.control} 
  disabled={isSubmitting} 
/>
```

### FormSection

Container for grouping related fields with consistent styling.

```jsx
<FormSection
  title="Section Title"
  description="Section description"
  variant="card" // "default" | "card" | "subtle"
  icon={<Icon />}
>
  {/* Field components */}
</FormSection>
```

**Variants:**
- `default`: With separator line
- `card`: Wrapped in a card with border
- `subtle`: Minimal styling, just title and description

### FormGrid

Responsive grid layout for form fields.

```jsx
<FormGrid cols={2}>
  {/* Field components */}
</FormGrid>
```

### FormFieldArray

Container for dynamic field arrays.

```jsx
<FormFieldArray
  title="Items"
  description="Add multiple items"
  onAdd={() => append({})}
  addLabel="Add Item"
  emptyMessage="No items yet"
  itemCount={fields.length}
>
  {fields.map((field, index) => (
    <FormFieldArrayItem
      key={field.id}
      index={index}
      title={`Item ${index + 1}`}
      onRemove={() => remove(index)}
    >
      {/* Field components */}
    </FormFieldArrayItem>
  ))}
</FormFieldArray>
```

### FormFieldFactory

Renders individual form fields based on type.

```jsx
<FormFieldFactory 
  field={{
    type: "text",
    name: "fieldName",
    label: "Field Label",
    required: true
  }}
  control={control}
  disabled={false}
/>
```

## Field Types

### Text Input
```jsx
field.text("fieldName", "Label", {
  placeholder: "Enter text...",
  required: true,
  description: "Helper text",
})
```

### Email Input
```jsx
field.email("email", "Email Address", {
  placeholder: "example@email.com"
})
```

### URL Input
```jsx
field.url("website", "Website URL", {
  placeholder: "https://example.com"
})
```

### Phone Input
```jsx
field.tel("phone", "Phone Number", {
  placeholder: "01XXXXXXXXX"
})
```

### Number Input
```jsx
field.number("price", "Price", {
  min: 0,
  max: 1000,
  step: 0.01
})
```

### Textarea
```jsx
field.textarea("description", "Description", {
  rows: 4,
  placeholder: "Enter description..."
})
```

### Select
```jsx
field.select("category", "Category", [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" }
])
```

### Switch/Toggle
```jsx
field.switch("isActive", "Active", {
  description: "Toggle to enable/disable"
})
```

### Tags Input
```jsx
field.tags("tags", "Tags", {
  placeholder: "Add tags..."
})
```

### Checkbox
```jsx
field.checkbox("agree", "I agree to terms")
```

### Radio Group
```jsx
field.radio("option", "Choose Option", [
  { label: "Option 1", value: "opt1" },
  { label: "Option 2", value: "opt2" }
])
```

### Date Input
```jsx
field.date("startDate", "Start Date")
```

### Custom Field
```jsx
field.custom("customField", "Custom", ({ control, field }) => {
  return <YourCustomComponent control={control} name={field.name} />;
})
```

## Advanced Usage

### Conditional Fields

Show/hide fields based on form state:

```jsx
field.text("conditionalField", "Conditional Field", {
  condition: (control) => {
    const value = control._formValues.someField;
    return value === "showThis";
  }
})
```

### Full-width Fields

Make a field span the entire width:

```jsx
field.textarea("description", "Description", {
  fullWidth: true,
  rows: 4
})
```

### Field Transformations

Transform values on input/output:

```jsx
field.number("price", "Price", {
  transform: {
    input: (value) => value?.toString() ?? "",
    output: (value) => Number(value) || 0
  }
})
```

### Icons and Addons

Add icons or addons to inputs:

```jsx
field.text("price", "Price", {
  iconLeft: <DollarSign className="w-4 h-4" />,
  addonRight: "BDT"
})
```

### Custom Section Rendering

Override section rendering:

```jsx
section("custom", "Custom Section", [], {
  render: ({ control, disabled }) => {
    return <YourCustomContent />;
  }
})
```

## Schema Examples

### User Profile Form

```jsx
import { field, section } from "@/components/form-utils/form-factory";
import { User, Shield, Bell } from "lucide-react";

export const userProfileSchema = {
  sections: [
    section("personal", "Personal Information", [
      field.text("firstName", "First Name", { required: true }),
      field.text("lastName", "Last Name", { required: true }),
      field.email("email", "Email", { required: true }),
      field.tel("phone", "Phone Number"),
      field.textarea("bio", "Bio", { rows: 4, fullWidth: true }),
    ], {
      icon: <User className="w-4 h-4" />,
      variant: "card",
      cols: 2
    }),
    
    section("security", "Security", [
      field.switch("twoFactorEnabled", "Two-Factor Authentication"),
      field.switch("emailNotifications", "Email Notifications"),
    ], {
      icon: <Shield className="w-4 h-4" />,
      variant: "card"
    }),
  ]
};
```

### Product Form

```jsx
export const productFormSchema = {
  sections: [
    section("general", "General", [
      field.text("title", "Title", { required: true }),
      field.text("slug", "Slug", { required: true }),
      field.select("status", "Status", STATUS_OPTIONS),
      field.number("price", "Price", { min: 0, required: true }),
      field.textarea("description", "Description", { 
        rows: 6, 
        fullWidth: true 
      }),
    ], {
      variant: "card",
      cols: 2
    }),
    
    section("media", "Media", [
      field.url("imageUrl", "Image URL"),
      field.tags("gallery", "Gallery URLs"),
    ], {
      variant: "card",
      cols: 2
    }),
  ]
};
```

## Form Array Examples

For dynamic fields (payment providers, delivery zones, etc.):

```jsx
import { useFieldArray } from "react-hook-form";
import { FormFieldArray, FormFieldArrayItem, FormFieldsRenderer } from "./form-factory";

// In your form schema file
export const getItemFields = (index) => [
  field.text(`items.${index}.name`, "Name"),
  field.number(`items.${index}.quantity`, "Quantity"),
];

// In your form component
function MyForm() {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });
  
  return (
    <FormFieldArray
      title="Items"
      onAdd={() => append({ name: "", quantity: 0 })}
      addLabel="Add Item"
      itemCount={fields.length}
    >
      {fields.map((field, index) => (
        <FormFieldArrayItem
          key={field.id}
          index={index}
          title={`Item ${index + 1}`}
          onRemove={() => remove(index)}
        >
          <FormFieldsRenderer
            fields={getItemFields(index)}
            control={form.control}
            cols={2}
          />
        </FormFieldArrayItem>
      ))}
    </FormFieldArray>
  );
}
```

## Best Practices

1. **Keep schemas in separate files**: Create `*-form-schema.js` files
2. **Use helpers**: Leverage `field.*` and `section` helpers for better DX
3. **Group logically**: Organize fields into logical sections
4. **Be descriptive**: Add descriptions to help users understand fields
5. **Use variants wisely**: Choose appropriate section variants for visual hierarchy
6. **Responsive columns**: Use `cols` prop appropriately (1-4)
7. **Validate properly**: Use Zod schemas with react-hook-form
8. **Show errors**: Always include `<FormErrorSummary />` in forms

## Migration Guide



