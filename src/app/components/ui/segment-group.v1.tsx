"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/*
 * SegmentGroup — horizontal segmented control, 2–4 mutually exclusive items.
 *
 * Visual: muted pill track → active item = bg-background shadow-sm pill
 * Primitive: Radix ToggleGroup type="single" (keyboard nav, aria-pressed)
 * Tokens: bg-muted, bg-background, text-foreground, text-muted-foreground
 */

const segmentGroupItemVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium",
    "cursor-pointer select-none transition-colors",
    "text-muted-foreground hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    // active state — Radix sets data-state="on"
    "data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-8 px-3   text-sm",
        lg: "h-9 px-4   text-base",
      },
    },
    defaultVariants: { size: "md" },
  }
);

type SegmentGroupContextValue = VariantProps<typeof segmentGroupItemVariants>;
const SegmentGroupContext = React.createContext<SegmentGroupContextValue>({ size: "md" });

export interface SegmentGroupProps
  extends Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Root>, "type"> {
  /** Size of all items. Default: "md". */
  size?: "sm" | "md" | "lg";
}

function SegmentGroup({ className, size = "md", children, ...props }: SegmentGroupProps) {
  return (
    <SegmentGroupContext.Provider value={{ size }}>
      <ToggleGroupPrimitive.Root
        type="single"
        data-slot="segment-group"
        className={cn(
          "inline-flex items-center rounded-md bg-muted p-0.5 gap-0.5",
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </SegmentGroupContext.Provider>
  );
}

export interface SegmentGroupItemProps
  extends React.ComponentProps<typeof ToggleGroupPrimitive.Item> {}

function SegmentGroupItem({ className, ...props }: SegmentGroupItemProps) {
  const { size } = React.useContext(SegmentGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      data-slot="segment-group-item"
      className={cn(segmentGroupItemVariants({ size }), className)}
      {...props}
    />
  );
}

export { SegmentGroup, SegmentGroupItem, segmentGroupItemVariants };
