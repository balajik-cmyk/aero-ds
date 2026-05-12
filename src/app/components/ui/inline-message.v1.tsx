import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle, Warning, XCircle } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

const inlineMessageVariants = cva("flex items-start gap-1.5 text-xs", {
  variants: {
    variant: {
      info:    "text-primary",
      success: "text-[color:var(--graph-green)]",
      warning: "text-[color:var(--graph-sunflower)]",
      error:   "text-destructive",
    },
  },
  defaultVariants: { variant: "info" },
});

const iconMap = {
  info:    <Info size={12} className="mt-px shrink-0" />,
  success: <CheckCircle size={12} className="mt-px shrink-0" />,
  warning: <Warning size={12} className="mt-px shrink-0" />,
  error:   <XCircle size={12} className="mt-px shrink-0" />,
};

export interface InlineMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof inlineMessageVariants> {}

const InlineMessage = React.forwardRef<HTMLParagraphElement, InlineMessageProps>(
  ({ className, variant = "info", children, ...props }, ref) => (
    <p
      ref={ref}
      role={variant === "error" ? "alert" : "status"}
      className={cn(inlineMessageVariants({ variant }), className)}
      {...props}
    >
      {iconMap[variant!]}
      <span>{children}</span>
    </p>
  )
);
InlineMessage.displayName = "InlineMessage";

export { InlineMessage, inlineMessageVariants };
