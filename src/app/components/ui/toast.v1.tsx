"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, toast, type ToasterProps } from "sonner";

/** Toaster — mount once at app root. Uses graph color tokens for variants. */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--graph-green)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--destructive)",
          "--warning-bg": "var(--popover)",
          "--warning-text": "var(--graph-sunflower)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster, toast };
