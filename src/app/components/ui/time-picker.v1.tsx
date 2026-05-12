"use client";

import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const PERIODS = ["AM", "PM"] as const;

export interface TimeValue {
  hour: string;
  minute: string;
  period: "AM" | "PM";
}

export interface TimePickerProps {
  /** "segmented" = 3 separate selects (HH / MM / AM|PM). "combined" = single dropdown. */
  variant?: "segmented" | "combined";
  /** Controlled value. */
  value?: TimeValue;
  /** Default value (uncontrolled). */
  defaultValue?: TimeValue;
  /** Called on any change. */
  onChange?: (value: TimeValue) => void;
  /** Label shown above — required asterisk rendered separately via InlineMessage. */
  label?: string;
  /** Marks as required. */
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const DEFAULT: TimeValue = { hour: "10", minute: "00", period: "AM" };

const selectCls = cn(
  "appearance-none h-8 rounded-md border border-switch-background bg-background",
  "px-2 pr-6 text-sm text-foreground",
  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ variant = "segmented", value: ctrl, defaultValue = DEFAULT, onChange, label, required, disabled, className }, ref) => {
    const [internal, setInternal] = React.useState<TimeValue>(defaultValue);
    const val = ctrl ?? internal;

    const set = (patch: Partial<TimeValue>) => {
      const next = { ...val, ...patch };
      if (!ctrl) setInternal(next);
      onChange?.(next);
    };

    const timeString = `${val.hour}:${val.minute} ${val.period}`;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)}>
        {label && (
          <label className="text-xs text-foreground">
            {label}{required && <span className="text-destructive ml-0.5">*</span>}
          </label>
        )}

        {variant === "segmented" ? (
          <div className="flex items-center gap-1">
            {/* Hour */}
            <div className="relative">
              <select
                value={val.hour}
                onChange={e => set({ hour: e.target.value })}
                disabled={disabled}
                aria-label="Hour"
                className={cn(selectCls, "w-16")}
              >
                {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
              <CaretDown size={12} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            <span className="text-sm text-muted-foreground">:</span>

            {/* Minute */}
            <div className="relative">
              <select
                value={val.minute}
                onChange={e => set({ minute: e.target.value })}
                disabled={disabled}
                aria-label="Minute"
                className={cn(selectCls, "w-16")}
              >
                {MINUTES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <CaretDown size={12} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* AM/PM */}
            <div className="relative">
              <select
                value={val.period}
                onChange={e => set({ period: e.target.value as "AM" | "PM" })}
                disabled={disabled}
                aria-label="AM or PM"
                className={cn(selectCls, "w-16")}
              >
                {PERIODS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
              <CaretDown size={12} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        ) : (
          /* Combined single select */
          <div className="relative">
            <select
              value={timeString}
              onChange={e => {
                const [time, period] = e.target.value.split(" ");
                const [hour, minute] = time.split(":");
                set({ hour, minute, period: period as "AM" | "PM" });
              }}
              disabled={disabled}
              aria-label="Time"
              className={cn(selectCls, "w-36 pr-8")}
            >
              {HOURS.flatMap(h =>
                ["00", "15", "30", "45"].map(m =>
                  (["AM", "PM"] as const).map(p => {
                    const label = `${h}:${m} ${p}`;
                    return <option key={label} value={label}>{label}</option>;
                  })
                ).flat()
              )}
            </select>
            <CaretDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        )}
      </div>
    );
  }
);
TimePicker.displayName = "TimePicker";

export { TimePicker };
