/**
 * HYBRID FORM EXAMPLE
 * 
 * This example demonstrates how to use BOTH:
 * - FormFieldFactory (with react-hook-form validation)
 * - CompactFieldFactory (without react-hook-form, direct value/onChange)
 * 
 * in a SINGLE form component.
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormGenerator, field, section } from "@/components/form-utils/form-factory";
import { CompactFieldsRenderer, compactField } from "@/components/form-utils/form-factory";

// Zod schema for validated section (react-hook-form)
const validatedSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  age: z.number().min(18),
});

// Schema for validated fields (react-hook-form)
const validatedFormSchema = {
  sections: [
    section("validated", "Validated Fields (React Hook Form)", [
      field.text("name", "Full Name", {
        required: true,
        placeholder: "John Doe",
      }),
      field.email("email", "Email Address", {
        required: true,
        placeholder: "john@example.com",
      }),
      field.number("age", "Age", {
        required: true,
        min: 18,
      }),
    ], {
      variant: "card",
      cols: 2,
    })
  ]
};

// Fields for non-validated section (direct value/onChange)
const metadataFields = [
  compactField.text("nickname", "Nickname (Optional)", {
    placeholder: "Your nickname",
  }),
  compactField.select("theme", "Preferred Theme", [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Auto" },
  ]),
  compactField.textarea("notes", "Additional Notes", {
    rows: 3,
    placeholder: "Any additional information...",
  }),
];

export function HybridFormExample() {
  // React Hook Form for validated section
  const form = useForm({
    resolver: zodResolver(validatedSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 18,
    },
  });

  // Direct state for non-validated section
  const [metadata, setMetadata] = useState({
    nickname: "",
    theme: "auto",
    notes: "",
  });

  const updateMetadata = (field, value) => {
    setMetadata(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (validatedData) => {
    const fullData = {
      ...validatedData,
      metadata,
    };
    console.log("Full form data:", fullData);
    alert("Check console for submitted data!");
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Hybrid Form Example</h1>
      <p className="text-muted-foreground">
        This form uses BOTH react-hook-form (with validation) AND direct state management (without validation)
      </p>

      {/* VALIDATED SECTION - Using react-hook-form */}
      <FormGenerator
        schema={validatedFormSchema}
        control={form.control}
        disabled={form.formState.isSubmitting}
      />

      {/* NON-VALIDATED SECTION - Using direct state */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Metadata (No Validation - Direct State)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompactFieldsRenderer
            fields={metadataFields}
            data={metadata}
            updateField={updateMetadata}
            errors={{}}
          />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit Hybrid Form
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
            setMetadata({ nickname: "", theme: "auto", notes: "" });
          }}
        >
          Reset Both Sections
        </Button>
      </div>

      {/* Show current values */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Current Form State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm font-mono">
            <div><strong>Validated (RHF):</strong> {JSON.stringify(form.watch(), null, 2)}</div>
            <div><strong>Metadata (State):</strong> {JSON.stringify(metadata, null, 2)}</div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

/**
 * KEY DIFFERENCES:
 * 
 * 1. FormFieldFactory (react-hook-form):
 *    - Requires: control from useForm()
 *    - Validation: Zod schema validation
 *    - Error handling: Automatic via react-hook-form
 *    - Best for: Forms that need validation, async submission, field dependencies
 * 
 * 2. CompactFieldFactory (direct state):
 *    - Requires: value, onChange, updateField
 *    - Validation: Manual (you handle it)
 *    - Error handling: Manual error prop
 *    - Best for: Simple forms, form builders, dynamic sections without validation
 * 
 * WHEN TO USE WHICH:
 * 
 * - Use FormFieldFactory when:
 *   ✓ You need validation
 *   ✓ You need form submission with react-hook-form
 *   ✓ You need field dependencies
 *   ✓ Creating/editing database entities (products, orders, users)
 * 
 * - Use CompactFieldFactory when:
 *   ✓ Building form editors (like landing page builder)
 *   ✓ Quick prototypes without validation
 *   ✓ Sections that don't need validation
 *   ✓ Dynamic JSON-based forms
 * 
 * - Use BOTH when:
 *   ✓ Some parts need validation, others don't
 *   ✓ Mix static validated fields with dynamic user-defined fields
 *   ✓ Complex forms with multiple data sources
 */

