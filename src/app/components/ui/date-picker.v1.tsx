"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarBlank, X } from "@phosphor-icons/react";
import { DayPicker } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/app/components/ui/utils";
import { Calendar } from "@/app/components/ui/calendar";
import { buttonVariants } from "@/app/components/ui/button";

export interface DatePickerProps {
  /** Controlled selected date. */
  value?: Date;
  /** Default date (uncontrolled). */
  defaultValue?: Date;
  /** Called when the date changes. */
  onChange?: (date: Date | undefined) => void;
  /** Placeholder shown when no date is selected. */
  placeholder?: string;
  /** Minimum selectable date. */
  minDate?: Date;
  /** Maximum selectable date. */
  maxDate?: Date;
  /** Opens the picker by default. */
  defaultOpen?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  className?: string;
  /** Format string for the displayed date (date-fns). Default: "dd MMM yyyy". */
  dateFormat?: string;
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select date",
      minDate,
      maxDate,
      defaultOpen = false,
      disabled,
      className,
      dateFormat = "dd MMM yyyy",
    },
    ref
  ) => {
    const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue);
    const [open, setOpen] = React.useState(defaultOpen);

    const date = controlledValue ?? internalDate;

    const handleSelect = (d: Date | undefined) => {
      if (!controlledValue) setInternalDate(d);
      onChange?.(d);
      if (d) setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect(undefined);
    };

    return (
      <Popover.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            className={cn(
              "flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarBlank size={14} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left">
              {date ? format(date, dateFormat) : placeholder}
            </span>
            {date && !disabled && (
              <span
                role="button"
                aria-label="Clear date"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => e.key === "Enter" && handleClear(e as any)}
                className="rounded p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X size={12} />
              </span>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="z-50 rounded-lg border border-border bg-popover shadow-md animate-in fade-in-0 zoom-in-95"
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              disabled={(d) => {
                if (minDate && d < minDate) return true;
                if (maxDate && d > maxDate) return true;
                return false;
              }}
              initialFocus
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
