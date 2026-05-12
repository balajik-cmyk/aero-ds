"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "./utils";

export type AvatarColorPalette =
  | "gray"
  | "red"
  | "green"
  | "blue"
  | "teal"
  | "pink"
  | "purple"
  | "cyan"
  | "orange"
  | "yellow";

const colorPaletteClasses: Record<AvatarColorPalette, string> = {
  gray:   "bg-gray-500 text-white",
  red:    "bg-red-800 text-red-100",
  green:  "bg-green-700 text-green-100",
  blue:   "bg-blue-800 text-blue-100",
  teal:   "bg-teal-700 text-teal-100",
  pink:   "bg-pink-800 text-pink-100",
  purple: "bg-purple-700 text-purple-100",
  cyan:   "bg-cyan-700 text-cyan-100",
  orange: "bg-orange-700 text-orange-100",
  yellow: "bg-amber-700 text-amber-100",
};

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  colorPalette = "gray",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  colorPalette?: AvatarColorPalette;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        colorPaletteClasses[colorPalette],
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
