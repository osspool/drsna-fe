// components/form-utils/compact-forms/compact-date-range-picker.jsx
"use client";
import { forwardRef, useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { Field } from "./field";

/**
 * CompactDateRangePicker - A space-efficient date range picker with floating label
 *
 * Features:
 * - Floating label design for space efficiency
 * - Single date or date range selection
 * - Proper date validation and transformation
 * - Clear button functionality
 * - Form integration via control prop
 * - Direct usage without form
 * - Shows total days for ranges
 * - Uses native JavaScript date formatting (no date-fns dependency)
 * - Compatible with react-day-picker v9
 *
 * @example
 * // With react-hook-form
 * <CompactDateRangePicker
 *   control={control}
 *   name="dateRange"
 *   label="Rental Period"
 *   mode="range"
 * />
 *
 * // Direct usage
 * <CompactDateRangePicker
 *   label="Select Dates"
 *   value={{ from: startDate, to: endDate }}
 *   onChange={setDateRange}
 *   numberOfMonths={2}
 * />
 */
const CompactDateRangePicker = forwardRef(({
  // Form integration props
  control,
  name,
  
  // Label and display props
  label,
  placeholder,
  description,
  required,
  disabled,
  
  // Calendar configuration
  mode = "range", // "single" | "range"
  numberOfMonths = 1,
  
  // Date restrictions
  fromDate,
  toDate,
  disabledDates,
  
  // Display options
  showClearButton = true,
  showTotalDays = false,
  
  // Styling props
  className,
  labelClassName,
  buttonClassName,
  containerClassName,
  
  // Event handlers
  onValueChange,
  
  // Direct usage props (without form)
  value,
  defaultValue,
  onChange,
  error,
  
  
  // Rest props passed to Calendar
  ...props
}, ref) => {
  // With react-hook-form - NEW PATTERN with Controller
  if (control && name) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <CompactDateRangePickerInternal
            ref={ref}
            label={label}
            placeholder={placeholder}
            disabled={disabled}
            mode={mode}
            numberOfMonths={numberOfMonths}
            fromDate={fromDate}
            toDate={toDate}
            disabledDates={disabledDates}
            showClearButton={showClearButton}
            showTotalDays={showTotalDays}
            className={className}
            buttonClassName={buttonClassName}
            labelClassName={labelClassName}
            containerClassName={containerClassName}
            error={fieldState?.error?.message}
            required={required}
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              onValueChange?.(val);
            }}
            {...props}
          />
        )}
      />
    );
  }
  
  // Direct usage without form
  return (
    <CompactDateRangePickerInternal
      ref={ref}
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      mode={mode}
      numberOfMonths={numberOfMonths}
      fromDate={fromDate}
      toDate={toDate}
      disabledDates={disabledDates}
      showClearButton={showClearButton}
      showTotalDays={showTotalDays}
      className={className}
      buttonClassName={buttonClassName}
      labelClassName={labelClassName}
      containerClassName={containerClassName}
      error={error}
      required={required}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onValueChange={onValueChange}
      {...props}
    />
  );
});

// Internal component that handles the actual rendering
const CompactDateRangePickerInternal = forwardRef(({
  label,
  placeholder = "Select dates",
  mode,
  numberOfMonths,
  fromDate,
  toDate,
  disabledDates,
  showClearButton,
  showTotalDays,
  error,
  className,
  buttonClassName,
  labelClassName,
  containerClassName,
  disabled,
  required,
  value,
  defaultValue,
  onChange,
  onValueChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Draft selection state used inside the popover (not applied until user confirms)
  const [draftValue, setDraftValue] = useState(() => {
    if (mode === "single") {
      return undefined;
    }
    return { from: undefined, to: undefined };
  });
  
  // Simple date conversion helper
  const convertToDate = (dateValue) => {
    if (!dateValue) return undefined;
    try {
      const date = new Date(dateValue);
      return !isNaN(date.getTime()) ? date : undefined;
    } catch {
      return undefined;
    }
  };

  // Convert string dates to Date objects for calendar (applied value)
  const calendarValue = mode === "single" 
    ? convertToDate(value)
    : {
        from: convertToDate(value?.from),
        to: convertToDate(value?.to)
      };

  // Initialize draft when popover opens (avoid re-initializing on every render)
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "single") {
      setDraftValue(calendarValue || undefined);
      return;
    }
    setDraftValue({ from: calendarValue?.from, to: calendarValue?.to });
  }, [isOpen]);

  // Calculate total days for range mode
  const calculateTotalDays = (from, to) => {
    if (!from || !to) return null;
    try {
      if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
      // Add 1 to include both start and end days
      const diffTime = to.getTime() - from.getTime();
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return days > 0 ? days : null;
    } catch (error) {
      console.error('Error calculating days:', error);
      return null;
    }
  };

  // Format display value based on mode
  const getDisplayValue = () => {
    const formatDate = (date, options = { month: "short", day: "numeric", year: "numeric" }) => {
      try {
        return date.toLocaleDateString("en-US", options);
      } catch {
        return "";
      }
    };

    if (mode === "single") {
      if (!calendarValue) return "";
      return formatDate(calendarValue);
    }

    // Range mode
    if (!calendarValue?.from) return "";

    try {
      if (calendarValue.to) {
        // If same year, show year only once
        const fromYear = calendarValue.from.getFullYear();
        const toYear = calendarValue.to.getFullYear();

        if (fromYear === toYear) {
          const fromStr = formatDate(calendarValue.from, { month: "short", day: "numeric" });
          const toStr = formatDate(calendarValue.to, { month: "short", day: "numeric", year: "numeric" });
          return `${fromStr} - ${toStr}`;
        }

        const fromStr = formatDate(calendarValue.from);
        const toStr = formatDate(calendarValue.to);
        return `${fromStr} - ${toStr}`;
      }

      return formatDate(calendarValue.from);
    } catch {
      return "";
    }
  };

  const displayValue = getDisplayValue();
  const hasValue = mode === "single" 
    ? !!calendarValue 
    : !!(calendarValue?.from || calendarValue?.to);
    
  const totalDays = mode === "range" && showTotalDays && calendarValue?.from && calendarValue?.to 
    ? calculateTotalDays(calendarValue.from, calendarValue.to) 
    : null;

  const handleClear = (e) => {
    e?.stopPropagation();
    const emptyValue = mode === "single" ? undefined : { from: undefined, to: undefined };
    // Clear both draft and applied immediately when using the trigger clear (X)
    if (mode === "single") {
      setDraftValue(undefined);
    } else {
      setDraftValue({ from: undefined, to: undefined });
    }
    onChange?.(emptyValue);
    onValueChange?.(emptyValue);
    setIsOpen(false);
  };

  // Update draft selection on calendar select; do not apply yet
  const handleSelect = (val) => {
    if (mode === "single") {
      setDraftValue(val || undefined);
      return;
    }
    const safe = val || { from: undefined, to: undefined };
    setDraftValue({ from: safe.from, to: safe.to });
  };

  // Apply the draft selection to the external value and close
  const handleApply = () => {
    let outputValue;
    if (mode === "single") {
      outputValue = draftValue ? draftValue.toISOString().slice(0, 10) : undefined;
    } else {
      outputValue = {
        from: draftValue?.from ? draftValue.from.toISOString().slice(0, 10) : undefined,
        to: draftValue?.to ? draftValue.to.toISOString().slice(0, 10) : undefined,
      };
    }
    onChange?.(outputValue);
    onValueChange?.(outputValue);
    setIsOpen(false);
  };

  const isDateDisabled = (date) => {
    if (!date || isNaN(date.getTime())) return true;
    if (disabled) return true;
    if (fromDate && date < fromDate) return true;
    if (toDate && date > toDate) return true;
    if (disabledDates?.some(d => d.getTime() === date.getTime())) return true;
    return false;
  };

  return (
    <Field.Root className={containerClassName} disabled={disabled} invalid={!!error}>
      {label && (
        <Field.Label className={labelClassName}>
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </Field.Label>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "h-10 w-full justify-start font-normal",
              label && "pt-2", // Extra padding when label is present
              "transition-all duration-200",
              "border-input bg-background",
              "hover:border-primary/50 hover:bg-accent/5",
              "focus:border-primary focus:ring-2 focus:ring-primary/20",
              "data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-primary/20",
              !hasValue && "text-muted-foreground",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20",
              disabled && "opacity-50 cursor-not-allowed bg-muted/50",
              buttonClassName
            )}
            type="button"
          >
            <CalendarIcon className={cn(
              "h-4 w-4 mr-2 shrink-0 transition-colors",
              hasValue ? "opacity-70 text-primary" : "opacity-50"
            )} />
            <span className="truncate flex-1 text-left">
              {displayValue || placeholder}
            </span>
            {totalDays && (
              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium animate-in fade-in slide-in-from-left-1 duration-200">
                {totalDays} {totalDays === 1 ? 'day' : 'days'}
              </span>
            )}
            {showClearButton && hasValue && !disabled && (
              <X 
                className="h-4 w-4 ml-auto opacity-50 hover:opacity-100 shrink-0 transition-all hover:text-destructive" 
                onClick={handleClear}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 shadow-xl border border-border/50 animate-in fade-in-0 zoom-in-95 w-[--radix-popover-trigger-width] max-w-[22rem] sm:w-auto sm:max-w-none max-h-[85vh] overflow-auto"
          align="center"
          sideOffset={6}
          onInteractOutside={(e) => {
            // Prevent closing when clicking the trigger button
            const target = e.target;
            if (target?.closest('[role="combobox"]')) {
              e.preventDefault();
            }
          }}
        >
          <div className="p-3 bg-background rounded-lg">
            {/* Simplified UI: single calendar view without extra header */}
            <Calendar
              mode={mode}
              selected={draftValue}
              onSelect={handleSelect}
              defaultMonth={
                mode === "range"
                  ? (draftValue?.from || calendarValue?.from || fromDate || new Date())
                  : (draftValue || calendarValue || fromDate || new Date())
              }
              numberOfMonths={numberOfMonths}
              fromDate={fromDate}
              toDate={toDate}
              disabled={isDateDisabled}
              initialFocus
              className="rounded-md [--cell-size:2rem] sm:[--cell-size:2.625rem] w-full"
              classNames={{
                root: "w-full",
                months: "flex flex-col w-full",
                month: "w-full",
              }}
              {...props}
            />
            {mode === "range" && draftValue?.from && !draftValue?.to && (
              <div className="mt-3 pt-3 border-t border-border/50">
                <p className="text-xs text-muted-foreground text-center font-medium animate-pulse">
                  👆 Please select an end date
                </p>
              </div>
            )}
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  // Clear immediately and apply
                  const emptyValue = mode === "single" ? undefined : { from: undefined, to: undefined };
                  if (mode === "single") {
                    setDraftValue(undefined);
                  } else {
                    setDraftValue({ from: undefined, to: undefined });
                  }
                  onChange?.(emptyValue);
                  onValueChange?.(emptyValue);
                  setIsOpen(false);
                }}
                type="button"
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={handleApply}
                type="button"
                disabled={mode === "range" ? !(draftValue?.from || draftValue?.to) : false}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <Field.Error>{error}</Field.Error>}
    </Field.Root>
  );
});

CompactDateRangePicker.displayName = "CompactDateRangePicker";
CompactDateRangePickerInternal.displayName = "CompactDateRangePickerInternal";

export default CompactDateRangePicker;