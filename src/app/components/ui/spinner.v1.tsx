import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

const spinnerVariants = cva(
  "inline-block rounded-full border-2 border-current border-t-transparent animate-spin text-primary",
  {
    variants: {
      size: {
        xs: "h-4 w-4 border-[1.5px]",
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-10 w-10 border-[3px]",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  /** Visible text label shown next to the spinner. Also used as aria-label when no children. */
  label?: string;
  /** 0–100 for determinate mode. Omit for indeterminate (continuous spin). */
  value?: number;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, label, value, ...props }, ref) => {
    const isDeterminate = value !== undefined;

    return (
      <span
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label={label ?? "Loading"}
        aria-valuenow={isDeterminate ? value : undefined}
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? 100 : undefined}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <span className={cn(spinnerVariants({ size }))} />
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
      </span>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
