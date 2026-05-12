"use client";

import * as React from "react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { InlineMessage } from "@/app/components/ui/inline-message";
import { cn } from "@/app/components/ui/utils";

export interface CheckboxGroupItem {
  /** Unique identifier for this option. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional description below the label. */
  description?: string;
  /** Disable this individual item. */
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** List of options. */
  items: CheckboxGroupItem[];
  /** Currently checked ids (controlled). */
  value?: string[];
  /** Default checked ids (uncontrolled). */
  defaultValue?: string[];
  /** Called with the new array of checked ids on any change. */
  onChange?: (value: string[]) => void;
  /** Group label shown above the list. */
  label?: string;
  /** Show a "Select all" master checkbox. */
  selectAll?: boolean;
  /** Error message shown below the group. */
  error?: string;
  /** Disables the whole group. */
  disabled?: boolean;
  className?: string;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      items,
      value: controlledValue,
      defaultValue = [],
      onChange,
      label,
      selectAll,
      error,
      disabled,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
    const value = controlledValue ?? internalValue;

    const set = (next: string[]) => {
      if (!controlledValue) setInternalValue(next);
      onChange?.(next);
    };

    const toggle = (id: string) =>
      set(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

    const allIds = items.filter((i) => !i.disabled).map((i) => i.id);
    const checkedCount = value.filter((v) => allIds.includes(v)).length;
    const masterState =
      checkedCount === 0 ? false : checkedCount === allIds.length ? true : "indeterminate";

    const toggleAll = () =>
      set(masterState === true ? value.filter((v) => !allIds.includes(v)) : [...value.filter((v) => !allIds.includes(v)), ...allIds]);

    const groupId = React.useId();

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)}>
        {label && (
          <p className="text-sm font-medium text-foreground">{label}</p>
        )}
        {selectAll && (
          <>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox
                id={`${groupId}-all`}
                checked={masterState}
                onCheckedChange={toggleAll}
                disabled={disabled}
                aria-label="Select all"
              />
              <span className="text-sm text-foreground">Select all</span>
            </label>
            <div className="border-t border-border" />
          </>
        )}
        {items.map((item) => (
          <label
            key={item.id}
            htmlFor={`${groupId}-${item.id}`}
            className={cn(
              "flex items-start gap-2 cursor-pointer select-none",
              (disabled || item.disabled) && "cursor-not-allowed opacity-50"
            )}
          >
            <Checkbox
              id={`${groupId}-${item.id}`}
              checked={value.includes(item.id)}
              onCheckedChange={() => toggle(item.id)}
              disabled={disabled || item.disabled}
              aria-invalid={!!error}
              aria-describedby={error ? `${groupId}-error` : undefined}
              className="mt-0.5"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-foreground">{item.label}</span>
              {item.description && (
                <span className="text-xs text-muted-foreground">{item.description}</span>
              )}
            </div>
          </label>
        ))}
        {error && (
          <InlineMessage id={`${groupId}-error`} variant="error">
            {error}
          </InlineMessage>
        )}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

export { CheckboxGroup };
