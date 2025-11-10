# Form Factory Quick Reference

Cheat sheet for creating forms with the form factory system.

## Basic Setup

```jsx
import { useForm } from "react-hook-form";
import { FormGenerator, field, section } from "@/components/form-utils/form-factory";

const schema = { sections: [/* ... */] };

function MyForm() {
  const form = useForm();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormGenerator schema={schema} control={form.control} />
      <Button type="submit">Save</Button>
    </form>
  );
}
```

## Field Types Quick Reference

| Field Type | Helper | Common Props |
|------------|--------|--------------|
| Text | `field.text(name, label, props)` | `placeholder`, `required` |
| Email | `field.email(name, label, props)` | `placeholder`, `required` |
| URL | `field.url(name, label, props)` | `placeholder` |
| Phone | `field.tel(name, label, props)` | `placeholder` |
| Number | `field.number(name, label, props)` | `min`, `max`, `step` |
| Textarea | `field.textarea(name, label, props)` | `rows`, `placeholder` |
| Select | `field.select(name, label, options, props)` | `options: [{label, value}]` |
| Switch | `field.switch(name, label, props)` | `description` |
| Checkbox | `field.checkbox(name, label, props)` | - |
| Radio | `field.radio(name, label, options, props)` | `options: [{label, value}]` |
| Tags | `field.tags(name, label, props)` | `placeholder` |
| Date | `field.date(name, label, props)` | - |
| Custom | `field.custom(name, label, render, props)` | `render: function` |

## Section Variants

```jsx
// Card variant (recommended for primary sections)
section("id", "Title", fields, {
  variant: "card",
  icon: <Icon />,
  description: "Help text",
  cols: 2
})

// Default variant (with separator)
section("id", "Title", fields, {
  variant: "default",
  cols: 2
})

// Subtle variant (minimal)
section("id", "Title", fields, {
  variant: "subtle",
  cols: 2
})
```

## Common Patterns

### Basic Section
```jsx
section("basic", "Basic Information", [
  field.text("name", "Name", { required: true }),
  field.email("email", "Email", { required: true }),
], { variant: "card", cols: 2 })
```

### Full-Width Field
```jsx
field.textarea("description", "Description", {
  fullWidth: true,
  rows: 4
})
```

### Field with Icon
```jsx
field.text("price", "Price", {
  iconLeft: <DollarSign className="w-4 h-4" />,
  addonRight: "BDT"
})
```

### Conditional Field
```jsx
field.text("customDomain", "Custom Domain", {
  condition: (control) => control._formValues.planType === "premium"
})
```

### Number with Transform
```jsx
field.number("price", "Price", {
  min: 0,
  transform: {
    input: (v) => v?.toString() ?? "",
    output: (v) => Number(v) || 0
  }
})
```

### Select with Options
```jsx
field.select("status", "Status", [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
])
```

## Field Array Pattern

```jsx
import { useFieldArray } from "react-hook-form";
import { 
  FormFieldArray, 
  FormFieldArrayItem, 
  FormFieldsRenderer 
} from "@/components/form-utils/form-factory";

const getItemFields = (index) => [
  field.text(`items.${index}.name`, "Name"),
  field.number(`items.${index}.quantity`, "Quantity"),
];

// In component:
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
```

## Common Props

### All Fields
- `name` - Field name (required)
- `label` - Field label (required)
- `placeholder` - Placeholder text
- `description` - Help text below field
- `required` - Show asterisk
- `disabled` - Disable field
- `className` - Custom CSS class
- `fullWidth` - Span full width in grid

### Text/Number Fields
- `iconLeft` - Icon on left
- `iconRight` - Icon on right
- `addonLeft` - Text addon on left
- `addonRight` - Text addon on right
- `transform` - Transform input/output

### Number Fields
- `min` - Minimum value
- `max` - Maximum value
- `step` - Step increment

### Textarea Fields
- `rows` - Number of rows

### Select/Radio Fields
- `options` - Array of `{label, value}`

### Switch Fields
- `labelPosition` - `"left"` or `"right"`

## Import Statements

```jsx
// Main components
import { 
  FormGenerator,
  field,
  section 
} from "@/components/form-utils/form-factory";

// For field arrays
import {
  FormFieldArray,
  FormFieldArrayItem,
  FormFieldsRenderer
} from "@/components/form-utils/form-factory";

// For manual sections
import {
  FormSection,
  FormGrid
} from "@/components/form-utils/form-factory";

// React Hook Form
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
```

## Complete Minimal Example

```jsx
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormGenerator, field, section } from "@/components/form-utils/form-factory";

const schema = {
  sections: [
    section("basic", "Basic Info", [
      field.text("name", "Name", { required: true }),
      field.email("email", "Email", { required: true }),
      field.textarea("bio", "Bio", { rows: 3, fullWidth: true }),
    ], { variant: "card", cols: 2 })
  ]
};

export function SimpleForm() {
  const form = useForm({
    defaultValues: { name: "", email: "", bio: "" }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormGenerator schema={schema} control={form.control} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## Tips

1. **Keep schemas in separate files** - Create `*-schema.js` files
2. **Use section variants wisely** - `card` for important, `subtle` for minor
3. **Group related fields** - Use logical sections
4. **Add descriptions** - Help users understand fields
5. **Use conditional fields** - Show/hide based on state
6. **Transform when needed** - Format values properly
7. **Test responsiveness** - Check on mobile devices

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Field not showing | Check name matches schema |
| Validation not working | Ensure zodResolver is configured |
| Array fields broken | Use `useFieldArray` correctly |
| Transform not applied | Check transform object structure |
| Conditional not working | Watch the condition field value |

## Resources

- **Full Docs**: `README.md`
- **Examples**: `EXAMPLES.md`
- **Migration**: `MIGRATION.md`
- **UI Guide**: `UI_SHOWCASE.md`

---

**Pro Tip**: Start with simple forms, then gradually add complexity. The system grows with your needs! 🚀


