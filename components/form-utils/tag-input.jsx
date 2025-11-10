"use client";
import { useState, useRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import { X, Plus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

const TagInput = ({
  control,
  name,
  label,
  description,
  placeholder = "Add tag...",
  required,
  disabled,
  className,
  labelClassName,
  inputClassName,
  maxTags,
  allowDuplicates = false,
  // Suggestions dropdown
  suggestions = [],
  suggestionLimit = 8,
  // For direct usage without form
  value: propValue = [],
  onChange: propOnChange,
  onValueChange,
  // Additional props for bulk input
  delimiter = ",",
  validateTag,
  transformTag,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  // Parse and validate multiple tags from a string
  const parseMultipleTags = useCallback((input) => {
    if (!input.trim()) return [];
    
    // Split by delimiter and clean up each tag
    return input
      .split(delimiter)
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => transformTag ? transformTag(tag) : tag)
      .filter(tag => !validateTag || validateTag(tag));
  }, [delimiter, validateTag, transformTag]);

  // Add multiple tags at once
  const handleAddMultipleTags = useCallback((tags, newTags, field) => {
    if (!newTags || newTags.length === 0) return tags;
    
    let updatedTags = [...tags];
    let addedCount = 0;
    
    for (const newTag of newTags) {
      // Skip empty tags
      if (!newTag.trim()) continue;
      
      const trimmedTag = newTag.trim();
      
      // Check for duplicates if not allowed
      if (!allowDuplicates && updatedTags.includes(trimmedTag)) {
        continue;
      }
      
      // Check max tags limit
      if (maxTags && updatedTags.length >= maxTags) {
        break;
      }
      
      updatedTags.push(trimmedTag);
      addedCount++;
    }
    
    // Only update if we actually added tags
    if (addedCount > 0) {
      if (field) {
        field.onChange(updatedTags);
      } else if (propOnChange) {
        propOnChange(updatedTags);
      }
      
      onValueChange?.(updatedTags);
    }
    
    return updatedTags;
  }, [allowDuplicates, maxTags, propOnChange, onValueChange]);

  // Handle single tag addition (backward compatible)
  const handleAddTag = useCallback((tags, newTag, field) => {
    const tagsToAdd = parseMultipleTags(newTag);
    const updatedTags = handleAddMultipleTags(tags, tagsToAdd, field);
    setInputValue("");
    return updatedTags;
  }, [parseMultipleTags, handleAddMultipleTags]);

  const handleRemoveTag = useCallback((tags, indexToRemove, field) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    
    if (field) {
      field.onChange(updatedTags);
    } else if (propOnChange) {
      propOnChange(updatedTags);
    }
    
    onValueChange?.(updatedTags);
    
    return updatedTags;
  }, [propOnChange, onValueChange]);

  // Handle input change to process comma-separated values in real-time
  const handleInputChange = useCallback((e, tags, field) => {
    const value = e.target.value;
    
    // Check if the input contains delimiters
    if (value.includes(delimiter)) {
      // Process all complete tags (everything before the last delimiter)
      const parts = value.split(delimiter);
      const completeTags = parts.slice(0, -1);
      const remainingInput = parts[parts.length - 1];
      
      if (completeTags.length > 0) {
        handleAddMultipleTags(tags, completeTags.map(t => t.trim()).filter(t => t), field);
      }
      
      // Keep only the part after the last delimiter
      setInputValue(remainingInput);
    } else {
      setInputValue(value);
    }
  }, [delimiter, handleAddMultipleTags]);

  // Handle paste events for bulk input
  const handlePaste = useCallback((e, tags, field) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedTags = parseMultipleTags(pastedText);
    
    if (pastedTags.length > 0) {
      handleAddMultipleTags(tags, pastedTags, field);
      setInputValue("");
    }
  }, [parseMultipleTags, handleAddMultipleTags]);

  const handleKeyDown = useCallback((e, tags, field) => {
    if (e.key === "Enter" || e.key === delimiter) {
      e.preventDefault();
      handleAddTag(tags, inputValue, field);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      e.preventDefault();
      handleRemoveTag(tags, tags.length - 1, field);
    }
  }, [delimiter, inputValue, handleAddTag, handleRemoveTag]);

  // Memoize placeholder text for better UX
  const getPlaceholder = useCallback((tagsCount) => {
    if (tagsCount === 0) {
      return placeholder.includes("comma") ? placeholder : `${placeholder} (separate with ${delimiter} for multiple)`;
    }
    return "Add another...";
  }, [placeholder, delimiter]);

  // Memoize whether we can add more tags
  const canAddMoreTags = useCallback((tagsLength) => {
    return !maxTags || tagsLength < maxTags;
  }, [maxTags]);

  const renderTagInput = ({ field, disabled: isDisabled, error }) => {
    const tags = field ? field.value || [] : propValue || [];
    const showInput = !isDisabled && canAddMoreTags(tags.length);
    const normalizedInput = (inputValue || "").toLowerCase().trim();
    const filteredSuggestions = useMemo(() => {
      if (!normalizedInput) return [];
      const input = normalizedInput;
      const existingSet = new Set(tags.map((t) => t.toLowerCase()));
      return suggestions
        .filter(Boolean)
        .map((s) => (transformTag ? transformTag(s) : s))
        .filter((s) => s.toLowerCase().includes(input))
        .filter((s) => allowDuplicates || !existingSet.has(s.toLowerCase()))
        .slice(0, suggestionLimit);
    }, [normalizedInput, suggestions, tags, allowDuplicates, suggestionLimit, transformTag]);

    return (
      <>
        {/* Tags Display Area */}
        {tags.length > 0 && (
          <div className={cn(
            "flex flex-wrap gap-1.5 mb-3",
            "p-2.5 rounded-md bg-muted/30 border border-border/50"
          )}>
            {tags.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="secondary"
                className={cn(
                  "group flex items-center gap-1.5 px-2.5 py-1",
                  "bg-background border border-border shadow-sm",
                  "hover:border-primary/50 transition-all duration-200",
                  "animate-in fade-in-0 zoom-in-95",
                  isDisabled && "opacity-60"
                )}
              >
                <Tag className="h-3 w-3 text-muted-foreground" />
                <span className="max-w-[200px] truncate text-sm font-medium" title={tag}>
                  {tag}
                </span>
                {!isDisabled && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-4 w-4 p-0 ml-0.5",
                      "text-muted-foreground/60 hover:text-destructive",
                      "hover:bg-destructive/10 rounded-sm",
                      "transition-colors"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tags, index, field);
                    }}
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </Badge>
            ))}
          </div>
        )}

        {/* Input Field with InputGroup */}
        {showInput && (
          <div className="space-y-3">
            <InputGroup className={cn(error && "border-destructive")}>
              <InputGroupAddon align="inline-start">
                <Tag className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupInput
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => handleInputChange(e, tags, field)}
                onKeyDown={(e) => handleKeyDown(e, tags, field)}
                onPaste={(e) => handlePaste(e, tags, field)}
                placeholder={getPlaceholder(tags.length)}
                disabled={isDisabled}
                aria-label="Add new tag"
                aria-invalid={!!error}
                {...props}
              />
              {inputValue.trim() && (
                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => handleAddTag(tags, inputValue, field)}
                    aria-label="Add tag"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </InputGroupAddon>
              )}
            </InputGroup>

            {/* Suggestions list */}
            {filteredSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 rounded-md bg-muted/30 border border-dashed">
                <span className="text-xs text-muted-foreground font-medium w-full mb-1">
                  Suggestions:
                </span>
                {filteredSuggestions.map((sug) => (
                  <Button
                    key={sug}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-7 px-2.5 text-xs",
                      "hover:border-primary/50 hover:bg-primary/5",
                      "transition-all duration-200"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddMultipleTags(tags, [sug], field);
                      setInputValue("");
                    }}
                    aria-label={`Add ${sug}`}
                  >
                    {sug}
                    <Plus className="h-3 w-3 ml-1.5 opacity-70" />
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Status indicators */}
        {maxTags && (
          <div className={cn(
            "text-xs font-medium mt-2 flex items-center gap-1.5",
            tags.length >= maxTags ? "text-destructive" : "text-muted-foreground"
          )}>
            <div className={cn(
              "h-1.5 w-1.5 rounded-full",
              tags.length >= maxTags ? "bg-destructive" : "bg-muted-foreground/50"
            )} />
            {tags.length}/{maxTags} tags
          </div>
        )}
      </>
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
        <FieldContent>
          {renderTagInput({ field: null, disabled, error: null })}
          {description && <FieldDescription>{description}</FieldDescription>}
        </FieldContent>
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
              {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>
          )}
          <FieldContent>
            {renderTagInput({ field, disabled, error: fieldState?.error?.message })}
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </FieldContent>
        </Field>
      )}
    />
  );
};

export default TagInput;

// PropTypes for better documentation
TagInput.defaultProps = {
  placeholder: "Add tag...",
  allowDuplicates: false,
  delimiter: ",",
  value: [],
}; 