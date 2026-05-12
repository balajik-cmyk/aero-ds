"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "./utils";

export type AvatarColorPalette =
  | "gray" | "red" | "orange" | "yellow" | "green"
  | "teal" | "blue" | "cyan" | "purple" | "pink";

export type AvatarSize  = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "full" | "rounded" | "square";

// Figma UI color scale tokens (node 238:760) — text=100 bg=10
const TOKENS: Record<AvatarColorPalette, { text: string; bg: string }> = {
  blue:   { text: "--color-blue-100",   bg: "--color-blue-10" },
  red:    { text: "--color-red-100",    bg: "--color-red-10" },
  purple: { text: "--color-purple-100", bg: "--color-purple-10" },
  green:  { text: "--color-green-100",  bg: "--color-green-10" },
  gray:   { text: "--color-gray-100",   bg: "--color-gray-10" },
  yellow: { text: "--color-yellow-100", bg: "--color-yellow-10" },
  orange: { text: "--color-red-90",     bg: "--color-red-20" },
  teal:   { text: "--color-blue-90",    bg: "--color-blue-20" },
  cyan:   { text: "--color-blue-80",    bg: "--color-blue-30" },
  pink:   { text: "--color-purple-90",  bg: "--color-purple-20" },
};

type AvatarCtx = { size: AvatarSize; shape: AvatarShape };
const AvatarContext = React.createContext<AvatarCtx>({ size: "md", shape: "full" });

const sizeClasses: Record<AvatarSize, string> = {
  xs: "size-6", sm: "size-8", md: "size-10", lg: "size-12", xl: "size-14", "2xl": "size-16",
};
const sizeFontClasses: Record<AvatarSize, string> = {
  xs: "text-[9px]", sm: "text-xs", md: "text-sm", lg: "text-base", xl: "text-lg", "2xl": "text-xl",
};
const shapeClasses: Record<AvatarShape, string> = {
  full: "rounded-full", rounded: "rounded-xl", square: "rounded-none",
};

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function pickColorPalette(name: string): AvatarColorPalette {
  const palettes: AvatarColorPalette[] = ["blue","green","orange","purple","teal","yellow","pink","red","cyan"];
  return palettes[name.charCodeAt(0) % palettes.length];
}

function Avatar({ className, size = "md", shape = "full", ...props }:
  React.ComponentProps<typeof AvatarPrimitive.Root> & { size?: AvatarSize; shape?: AvatarShape }) {
  return (
    <AvatarContext.Provider value={{ size, shape }}>
      <AvatarPrimitive.Root
        data-slot="avatar"
        className={cn("relative flex shrink-0 overflow-hidden", sizeClasses[size], shapeClasses[shape], className)}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, style, colorPalette = "gray", name, children, ...props }:
  React.ComponentProps<typeof AvatarPrimitive.Fallback> & { colorPalette?: AvatarColorPalette; name?: string }) {
  const { size, shape } = React.useContext(AvatarContext);
  const content = name ? getInitials(name) : children;
  const color   = name ? pickColorPalette(name) : colorPalette;
  const { text, bg } = TOKENS[color];
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("flex size-full items-center justify-center font-medium", shapeClasses[shape], sizeFontClasses[size], className)}
      style={{ backgroundColor: `var(${bg})`, color: `var(${text})`, ...style }}
      {...props}
    >
      {content}
    </AvatarPrimitive.Fallback>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
