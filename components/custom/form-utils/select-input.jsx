"use client"
import { cn } from "@/lib/utils"
import { Controller } from "react-hook-form"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

/**
 * SelectInput - Enhanced select component with Shadcn v2 pattern
 * 
 * Features:
 * - Automatic scrolling for long lists
 * - Grouped options support
 * - Search/filter capability
 * - Controller integration for react-hook-form
 * - Direct usage without form
 * 
 * @example
 * // With react-hook-form
 * <SelectInput
 *   control={control}
 *   name="category"
 *   label="Category"
 *   items={CATEGORY_OPTIONS}
 *   required
 * />
 * 
 * // With grouped options
 * <SelectInput
 *   control={control}
 *   name="country"
 *   label="Country"
 *   groups={[
 *     { label: "Asia", items: [...] },
 *     { label: "Europe", items: [...] }
 *   ]}
 * />
 */
const SelectInput = ({
  control,
  items = [],
  groups = [], // NEW: Support for grouped options
  name,
  label,
  placeholder = "Select option",
  allOption,
  description,
  required,
  disabled,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  Icon,
  valueKey = "value",
  displayKey = "label",
  onValueChange,
  value: propValue,
  defaultOpen,
  position = "popper",
  maxHeight = "320px", // NEW: Configurable max height
  sideOffset = 4, // NEW: Distance from trigger
}) => {
  // Create a new array with the "All" option if provided
  const displayItems = allOption ? [allOption, ...items] : items
  
  // For direct usage without React Hook Form
  const [localValue, setLocalValue] = useState(propValue || "")
  
  // Update local value when prop value changes
  useEffect(() => {
    if (propValue !== undefined) {
      setLocalValue(propValue)
    }
  }, [propValue])
  
  // Handle direct value changes (without React Hook Form)
  const handleDirectValueChange = (newValue) => {
    setLocalValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  const renderSelect = (field, isDisabled) => {
    // Use field value if React Hook Form is used, otherwise use local state
    const value = field ? field.value?.toString() : localValue?.toString()
    
    const handleChange = (newValue) => {
      if (field) {
        field.onChange(newValue)
      } else {
        setLocalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    // Render grouped options
    const renderGroupedContent = () => {
      if (groups.length === 0) return null
      
      return groups.map((group, groupIdx) => (
        <SelectGroup key={`group-${groupIdx}`}>
          {group.label && <SelectLabel>{group.label}</SelectLabel>}
          {group.items.map((item, idx) => {
            const itemValue = item[valueKey]?.toString() || `item-${groupIdx}-${idx}`
            return (
              <SelectItem
                key={itemValue}
                value={itemValue}
                className={cn("cursor-pointer", itemClassName)}
                disabled={item.disabled}
              >
                {item[displayKey]}
              </SelectItem>
            )
          })}
        </SelectGroup>
      ))
    }

    // Render flat options
    const renderFlatContent = () => {
      if (displayItems.length === 0) {
        return (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No options available
          </div>
        )
      }

      return displayItems.map((item, idx) => {
        const itemValue = item[valueKey]?.toString() || `item-${idx}`
        return (
          <SelectItem
            key={itemValue}
            value={itemValue}
            className={cn("cursor-pointer", itemClassName)}
            disabled={item.disabled}
          >
            {item[displayKey]}
          </SelectItem>
        )
      })
    }

    return (
      <Select
        onValueChange={handleChange}
        value={(value || "").toString()}
        disabled={isDisabled}
        defaultOpen={defaultOpen}
      >
        <SelectTrigger className={cn("w-full", triggerClassName)}>
          {Icon && <Icon className="mr-2 h-4 w-4 text-primary" />}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent 
          className={cn(contentClassName)}
          position={position}
          sideOffset={sideOffset}
          style={{ maxHeight }}
        >
          {groups.length > 0 ? renderGroupedContent() : renderFlatContent()}
        </SelectContent>
      </Select>
    )
  }

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
        {renderSelect(null, disabled)}
        {description && <FieldDescription>{description}</FieldDescription>}
      </Field>
    )
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
          {renderSelect(field, disabled)}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}

export default SelectInput

