import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

/*
 * Badge — subtle only, all colors from Figma UI color scale (--color-*).
 * Text: var(--color-[name]-100)   Background: var(--color-[name]-10)
 *
 * ⛔ Uses --color-* tokens (UI scale) NOT --graph-* (charts only).
 */

export type BadgeColorPalette =
  | "gray" | "red" | "orange" | "yellow" | "green"
  | "teal" | "blue" | "cyan" | "purple" | "pink";

// Exact Figma color scale tokens (node 238:760)
const TOKENS: Record<BadgeColorPalette, { text: string; bg: string }> = {
  blue:   { text: "--color-blue-100",   bg: "--color-blue-10" },
  red:    { text: "--color-red-100",    bg: "--color-red-10" },
  purple: { text: "--color-purple-100", bg: "--color-purple-10" },
  green:  { text: "--color-green-100",  bg: "--color-green-10" },
  gray:   { text: "--color-gray-100",   bg: "--color-gray-10" },
  yellow: { text: "--color-yellow-100", bg: "--color-yellow-10" },
  orange: { text: "--color-red-90",     bg: "--color-red-20" },   // no orange scale → red-90
  teal:   { text: "--color-blue-90",    bg: "--color-blue-20" },  // no teal scale  → blue-90
  cyan:   { text: "--color-blue-80",    bg: "--color-blue-30" },  // no cyan scale  → blue-80
  pink:   { text: "--color-purple-90",  bg: "--color-purple-20" },// no pink scale  → purple-90
};

// Legacy variant aliases
const LEGACY: Record<string, BadgeColorPalette> = {
  default:     "blue",
  secondary:   "gray",
  destructive: "red",
  success:     "green",
  warning:     "yellow",
};

const BASE =
  "inline-flex items-center justify-center gap-1 whitespace-nowrap shrink-0 w-fit font-medium rounded-sm [&>svg]:pointer-events-none [&>svg]:size-3 transition-colors overflow-hidden";

const SIZE_CLS: Record<string, string> = {
  xs: "px-1.5 py-px  text-[10px]",
  sm: "px-2   py-0.5 text-[11px]",
  md: "px-2   py-0.5 text-xs",
  lg: "px-2.5 py-1   text-sm",
};

export interface BadgeProps extends React.ComponentProps<"span"> {
  /** Color palette — maps to Figma --color-* scale tokens. Default: "gray". */
  colorPalette?: BadgeColorPalette;
  /** Legacy variant alias. */
  variant?: BadgeColorPalette | keyof typeof LEGACY;
  /** Size. Default: "sm". */
  size?: "xs" | "sm" | "md" | "lg";
  asChild?: boolean;
}

function Badge({
  className,
  style,
  colorPalette,
  variant,
  size = "sm",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  const color: BadgeColorPalette =
    colorPalette ??
    (variant && variant in LEGACY ? LEGACY[variant as keyof typeof LEGACY] : undefined) ??
    (variant as BadgeColorPalette) ??
    "gray";

  const { text, bg } = TOKENS[color];

  return (
    <Comp
      data-slot="badge"
      className={cn(BASE, SIZE_CLS[size], className)}
      style={{
        backgroundColor: `var(${bg})`,
        color: `var(${text})`,
        ...style,
      }}
      {...props}
    />
  );
}

const badgeVariants = cva(BASE);

export { Badge, badgeVariants };
