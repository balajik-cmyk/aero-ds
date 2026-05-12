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
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        // base — 16×16 circle
        // border uses --switch-background (#cbced4) — matches Figma borders/primary/2 (#cccccc)
        // --border (rgba 0,0,0,0.1) is too faint on white backgrounds
        "aspect-square size-4 shrink-0 rounded-full border border-switch-background bg-background",
        "shadow-xs outline-none transition-[color,box-shadow]",
        "dark:bg-input/30 dark:border-muted-foreground/40",
        // selected — border turns primary blue (outer ring)
        "data-[state=checked]:border-primary",
        // focus ring — 3px offset ring matches Figma focus state
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // error
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        // disabled — grey, no pointer
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        {/* Inner filled dot — 8px, 4px gap to the 16px outer ring */}
        <span className="block size-2 rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
