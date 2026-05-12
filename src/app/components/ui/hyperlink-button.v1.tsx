import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

const hyperlinkButtonVariants = cva(
  "inline-flex items-center gap-1 underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "text-sm",
        sm:      "text-xs",
        lg:      "text-base",
      },
      variant: {
        default:     "text-primary",
        muted:       "text-muted-foreground hover:text-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: { size: "default", variant: "default" },
  }
);

export interface HyperlinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof hyperlinkButtonVariants> {
  /** Render as a child element (e.g. <a href="...">). */
  asChild?: boolean;
}

const HyperlinkButton = React.forwardRef<HTMLButtonElement, HyperlinkButtonProps>(
  ({ className, size, variant, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(hyperlinkButtonVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);
HyperlinkButton.displayName = "HyperlinkButton";

export { HyperlinkButton, hyperlinkButtonVariants };
