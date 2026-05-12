import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Info, CheckCircle, Warning, XCircle } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

const bannerVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        info:    "border-primary/20 bg-primary/5 text-foreground",
        success: "border-[color:var(--graph-green)]/20 bg-[color:var(--graph-green)]/5 text-foreground",
        warning: "border-[color:var(--graph-sunflower)]/30 bg-[color:var(--graph-sunflower)]/5 text-foreground",
        error:   "border-destructive/20 bg-destructive/5 text-foreground",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

const iconMap = {
  info:    <Info size={16} className="text-primary mt-0.5 shrink-0" />,
  success: <CheckCircle size={16} className="text-[color:var(--graph-green)] mt-0.5 shrink-0" />,
  warning: <Warning size={16} className="text-[color:var(--graph-sunflower)] mt-0.5 shrink-0" />,
  error:   <XCircle size={16} className="text-destructive mt-0.5 shrink-0" />,
};

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Optional title shown in bold above description. */
  title?: string;
  /** Show × dismiss button. */
  onDismiss?: () => void;
  /** Optional action element (button/link) shown below description. */
  action?: React.ReactNode;
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = "info", title, onDismiss, action, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      {iconMap[variant!]}
      <div className="flex-1 space-y-1">
        {title && <p className="font-medium leading-none">{title}</p>}
        {children && <p className="text-muted-foreground">{children}</p>}
        {action && <div className="pt-1">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss banner"
          onClick={onDismiss}
          className="shrink-0 rounded p-0.5 hover:bg-foreground/10"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
);
Banner.displayName = "Banner";

export { Banner, bannerVariants };
