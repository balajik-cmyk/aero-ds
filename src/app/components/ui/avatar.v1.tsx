"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";

/*
 * Avatar — color palette uses aero-ds --graph-* tokens exclusively.
 * Subtle style: 12% opacity bg + full-opacity text (matches Figma + Badge system).
 * Dynamic CSS vars use inline style (Tailwind can't statically analyse them).
 */

export type AvatarColorPalette =
  | "gray" | "red" | "orange" | "yellow" | "green"
  | "teal" | "blue" | "cyan" | "purple" | "pink";

export type AvatarSize  = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "full" | "rounded" | "square";

// Same token map as Badge
const TOKEN: Record<AvatarColorPalette, string> = {
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

type AvatarCtx = { size: AvatarSize; shape: AvatarShape };
const AvatarContext = React.createContext<AvatarCtx>({ size: "md", shape: "full" });

const sizeClasses: Record<AvatarSize, string> = {
  xs:    "size-6",
  sm:    "size-8",
  md:    "size-10",
  lg:    "size-12",
  xl:    "size-14",
  "2xl": "size-16",
};

const sizeFontClasses: Record<AvatarSize, string> = {
  xs:    "text-[9px]",
  sm:    "text-xs",
  md:    "text-sm",
  lg:    "text-base",
  xl:    "text-lg",
  "2xl": "text-xl",
};

const shapeClasses: Record<AvatarShape, string> = {
  full:    "rounded-full",
  rounded: "rounded-xl",
  square:  "rounded-none",
};

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function pickColorPalette(name: string): AvatarColorPalette {
  const palettes: AvatarColorPalette[] = [
    "blue","green","orange","purple","teal","yellow","pink","red","cyan",
  ];
  return palettes[name.charCodeAt(0) % palettes.length];
}

function Avatar({
  className,
  size = "md",
  shape = "full",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: AvatarSize;
  shape?: AvatarShape;
}) {
  return (
    <AvatarContext.Provider value={{ size, shape }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn(
          "relative flex shrink-0 overflow-hidden",
          sizeClasses[size],
          shapeClasses[shape],
          className,
        )}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  style,
  colorPalette = "gray",
  name,
  children,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  /** Color palette — maps to aero-ds --graph-* tokens. */
  colorPalette?: AvatarColorPalette;
  /** Derive initials + color automatically from a name string. */
  name?: string;
}) {
  const { size, shape } = React.useContext(AvatarContext);
  const content = name ? getInitials(name) : children;
  const color   = name ? pickColorPalette(name) : colorPalette;
  const cssVar  = `var(${TOKEN[color]})`;

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center font-medium",
        shapeClasses[shape],
        sizeFontClasses[size],
        className,
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${cssVar} 12%, transparent)`,
        color: cssVar,
        ...style,
      }}
      {...props}
    >
      {content}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
