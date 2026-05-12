import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "onboarding" shows an illustration + CTA. "no-results" shows a search icon. "no-data" shows a data icon. */
  variant?: "onboarding" | "no-results" | "no-data";
  /** Main heading text. */
  title: string;
  /** Supporting description. */
  description?: string;
  /** Custom illustration or icon node (onboarding variant). */
  illustration?: React.ReactNode;
  /** Primary CTA button/element. */
  action?: React.ReactNode;
  /** Optional secondary CTA. */
  secondaryAction?: React.ReactNode;
}

function NoResultsIcon({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        <div className="flex gap-1 opacity-30">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
        </div>
        <div className="mt-1 flex gap-1 opacity-30">
          <div className="h-3 w-3 rounded-full bg-muted-foreground" />
          <MagnifyingGlass size={12} className="text-muted-foreground opacity-60" />
        </div>
      </div>
    </div>
  );
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant = "no-results",
      title,
      description,
      illustration,
      action,
      secondaryAction,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 px-6 py-12 text-center",
        className
      )}
      {...props}
    >
      {variant === "onboarding" && illustration && (
        <div className="mb-2">{illustration}</div>
      )}
      {variant !== "onboarding" && (
        <NoResultsIcon className="mb-2 h-10 w-10" />
      )}
      <div className="space-y-1.5 max-w-xs">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
