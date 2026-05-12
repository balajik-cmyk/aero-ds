import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "./utils";

/*
 * Badge — subtle only, all colors from aero-ds --graph-* tokens.
 * Uses inline style for color (dynamic CSS vars can't be statically analysed by Tailwind).
 *
 * colorPalette → token map (all from theme.css):
 *   blue   → --graph-starfleet-blue    green  → --graph-green
 *   red    → --destructive             teal   → --graph-turquoise
 *   orange → --graph-carrot            purple → --graph-pastel-violet
 *   yellow → --graph-sunflower         pink   → --graph-benevo-pink
 *   cyan   → --graph-turquoise         gray   → --muted-foreground
 */

export type BadgeColorPalette =
  | "gray" | "red" | "orange" | "yellow" | "green"
  | "teal" | "blue" | "cyan" | "purple" | "pink";

const TOKEN: Record<BadgeColorPalette, string> = {
  blue:   "--graph-starfleet-blue",
  red:    "--destructive",
  orange: "--graph-carrot",
  yellow: "--graph-sunflower",
  green:  "--graph-green",
  teal:   "--graph-turquoise",
  cyan:   "--graph-turquoise",
  purple: "--graph-pastel-violet",
  pink:   "--graph-benevo-pink",
  gray:   "--muted-foreground",
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
  "inline-flex items-center justify-center gap-1 whitespace-nowrap shrink-0 w-fit font-medium rounded-sm [&>svg]:pointer-events-none [&>svg]:size-3 overflow-hidden";

const SIZE_CLS: Record<string, string> = {
  xs: "px-1.5 py-px  text-[10px]",
  sm: "px-2   py-0.5 text-[11px]",
  md: "px-2   py-0.5 text-xs",
  lg: "px-2.5 py-1   text-sm",
};

export interface BadgeProps extends React.ComponentProps<"span"> {
  /** Color palette — maps to aero-ds --graph-* tokens. Default: "gray". */
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

  const cssVar = `var(${TOKEN[color]})`;

  return (
    <Comp
      data-slot="badge"
      className={cn(BASE, SIZE_CLS[size], className)}
      style={{
        backgroundColor: `color-mix(in srgb, ${cssVar} 12%, transparent)`,
        color: cssVar,
        ...style,
      }}
      {...props}
    />
  );
}

const badgeVariants = cva(BASE);

export { Badge, badgeVariants };
