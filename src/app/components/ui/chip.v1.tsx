import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

const chipVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium cursor-pointer select-none transition-colors border",
  {
    variants: {
      shape: {
        capsule:   "rounded-full px-3 py-1",
        rectangle: "rounded-md px-3 py-1",
      },
      selected: {
        true:  "bg-primary border-primary text-primary-foreground",
        false: "bg-background border-switch-background text-foreground hover:bg-muted",
      },
    },
    defaultVariants: { shape: "capsule", selected: false },
  }
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chipVariants> {
  /** Controlled selected state. */
  selected?: boolean;
  /** Chip shape. */
  shape?: "capsule" | "rectangle";
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, shape, selected, children, disabled, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      role="checkbox"
      aria-checked={selected ?? false}
      aria-pressed={selected ?? false}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        chipVariants({ shape, selected: selected ?? false }),
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
