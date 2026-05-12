"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "@phosphor-icons/react";

import { cn } from "./utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // base
        "peer size-4 shrink-0 rounded-[4px] border border-border bg-input-background",
        "shadow-xs outline-none transition-shadow",
        // dark
        "dark:bg-input/30",
        // checked / indeterminate — blue fill
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
        // focus ring — 2px var(--ring) offset ring
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // error
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        // disabled — grey, no pointer
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {/* indeterminate → dash; checked → tick */}
        <Check
          size={11}
          weight="bold"
          className="hidden [[data-state=checked]_&]:block"
        />
        <Minus
          size={11}
          weight="bold"
          className="hidden [[data-state=indeterminate]_&]:block"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
