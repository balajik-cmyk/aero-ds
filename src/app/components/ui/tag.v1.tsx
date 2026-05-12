import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-foreground",
        primary: "border-primary/20 bg-primary/10 text-primary",
        success: "border-transparent bg-[color:var(--graph-green)]/10 text-[color:var(--graph-green)]",
        warning: "border-transparent bg-[color:var(--graph-sunflower)]/10 text-[color:var(--graph-sunflower)]",
        error: "border-transparent bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** Icon shown before the label. */
  icon?: React.ReactNode;
  /** Shows × button and calls this when clicked. */
  onRemove?: () => void;
  /** Disables the remove button. */
  disabled?: boolean;
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, icon, onRemove, disabled, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant }), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          aria-label="Remove tag"
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-0.5 shrink-0 rounded-full p-0.5 hover:bg-foreground/10 disabled:pointer-events-none disabled:opacity-50"
        >
          <X size={10} />
        </button>
      )}
    </span>
  )
);
Tag.displayName = "Tag";

export { Tag, tagVariants };
