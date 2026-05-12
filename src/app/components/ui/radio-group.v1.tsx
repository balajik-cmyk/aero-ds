"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "./utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    /*
     * Figma structure:
     *   24×24px touch target (rounded-full) — carries hover/pressed bg
     *     └── 16×16px visual ring (centered) — carries border + focus ring
     *           └── Indicator → 8×8px inner filled dot
     */
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // 24px rounded touch target — transparent bg by default
        "group relative size-6 shrink-0 rounded-full outline-none",
        "flex items-center justify-center",
        "transition-colors",
        // hover — light grey wash (#f2f4f7 = var(--muted))
        "hover:bg-muted",
        // pressed
        "active:bg-accent",
        // disabled — no interactions
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {/* 16×16 visual ring — border is the visible "circle" */}
      <span
        className={cn(
          "size-4 rounded-full border border-switch-background bg-background",
          "flex items-center justify-center",
          "transition-[border-color,box-shadow]",
          "dark:bg-input/30 dark:border-muted-foreground/40",
          // selected — border turns primary blue
          "group-data-[state=checked]:border-primary",
          // focus ring on the visual circle when the Item is focused
          "group-focus-visible:ring-[3px] group-focus-visible:ring-ring/50 group-focus-visible:border-ring",
          // error
          "group-aria-invalid:border-destructive group-aria-invalid:ring-destructive/20",
        )}
      >
        <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator">
          {/* 8px inner filled dot — 4px gap to 16px outer ring */}
          <span className="block size-2 rounded-full bg-primary" />
        </RadioGroupPrimitive.Indicator>
      </span>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
