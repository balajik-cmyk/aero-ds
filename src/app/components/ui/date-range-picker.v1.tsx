"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarBlank, X } from "@phosphor-icons/react";
import { type DateRange } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/app/components/ui/utils";
import { Calendar } from "@/app/components/ui/calendar";

export type { DateRange };

export interface DateRangePickerProps {
  /** Controlled date range. */
  value?: DateRange;
  /** Default range (uncontrolled). */
  defaultValue?: DateRange;
  /** Called when range changes. */
  onChange?: (range: DateRange | undefined) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Min selectable date. */
  minDate?: Date;
  /** Max selectable date. */
  maxDate?: Date;
  /** Disabled state. */
  disabled?: boolean;
  className?: string;
  /** date-fns format string. Default: "dd MMM yyyy". */
  dateFormat?: string;
}

const PRESETS = [
  { label: "Today",        days: 0 },
  { label: "Yesterday",    days: 1 },
  { label: "Last 7 days",  days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 60 days", days: 60 },
  { label: "Last 90 days", days: 90 },
];

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      placeholder = "Select date range",
      minDate,
      maxDate,
      disabled,
      className,
      dateFormat = "dd MMM yyyy",
    },
    ref
  ) => {
    const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(defaultValue);
    const [open, setOpen] = React.useState(false);

    const range = controlledValue ?? internalRange;

    const handleSelect = (r: DateRange | undefined) => {
      if (!controlledValue) setInternalRange(r);
      onChange?.(r);
    };

    const handlePreset = (days: number) => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - days);
      const r = days === 0 ? { from: to, to } : { from, to };
      handleSelect(r);
      setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelect(undefined);
    };

    const label = range?.from
      ? range.to
        ? `${format(range.from, dateFormat)} – ${format(range.to, dateFormat)}`
        : format(range.from, dateFormat)
      : placeholder;

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
              "flex h-8 min-w-[220px] items-center gap-2 rounded-md border border-border bg-background px-3 text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              !range?.from && "text-muted-foreground",
              className
            )}
          >
            <CalendarBlank size={14} className="shrink-0 text-muted-foreground" />
            <span className="flex-1 text-left truncate">{label}</span>
            {range?.from && !disabled && (
              <span
                role="button"
                aria-label="Clear date range"
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
            className="z-50 flex rounded-lg border border-border bg-popover shadow-md animate-in fade-in-0 zoom-in-95"
          >
            {/* Presets sidebar */}
            <div className="flex flex-col gap-0.5 border-r border-border p-2 min-w-[140px]">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handlePreset(p.days)}
                  className="rounded px-3 py-1.5 text-left text-xs text-foreground hover:bg-accent transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
            {/* Dual calendar */}
            <Calendar
              mode="range"
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
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
DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
