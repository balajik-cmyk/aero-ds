import * as React from "react";
import { Check, Warning } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/components/ui/utils";

export type StepStatus = "upcoming" | "current" | "completed" | "error";

export interface Step {
  /** Unique step id. */
  id: string;
  /** Step label. */
  label: string;
  /** Optional short description below label. */
  description?: string;
  /** Override status for this step (defaults to position relative to currentStep). */
  status?: StepStatus;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of step definitions. */
  steps: Step[];
  /** Index (0-based) of the current active step. */
  currentStep?: number;
  /** "horizontal" (default) or "vertical". */
  orientation?: "horizontal" | "vertical";
}

const circleVariants = cva(
  "flex items-center justify-center rounded-full text-xs font-medium ring-2 shrink-0",
  {
    variants: {
      status: {
        upcoming:  "h-7 w-7 bg-background text-muted-foreground ring-border",
        current:   "h-7 w-7 bg-primary text-primary-foreground ring-primary",
        completed: "h-7 w-7 bg-primary text-primary-foreground ring-primary",
        error:     "h-7 w-7 bg-destructive text-destructive-foreground ring-destructive",
      },
    },
  }
);

function resolveStatus(index: number, currentStep: number, override?: StepStatus): StepStatus {
  if (override) return override;
  if (index < currentStep) return "completed";
  if (index === currentStep) return "current";
  return "upcoming";
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep = 0, orientation = "horizontal", className, ...props }, ref) => {
    const isVertical = orientation === "vertical";

    return (
      <div
        ref={ref}
        role="list"
        aria-label="Steps"
        className={cn(
          isVertical ? "flex flex-col gap-0" : "flex items-start gap-0",
          className
        )}
        {...props}
      >
        {steps.map((step, i) => {
          const status = resolveStatus(i, currentStep, step.status);
          const isLast = i === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div
                role="listitem"
                aria-current={status === "current" ? "step" : undefined}
                className={cn(
                  "flex",
                  isVertical ? "flex-col items-start gap-1" : "flex-col items-center"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={circleVariants({ status })}>
                    {status === "completed" && <Check size={14} weight="bold" />}
                    {status === "error"     && <Warning size={14} weight="bold" />}
                    {(status === "current" || status === "upcoming") && (
                      <span>{i + 1}</span>
                    )}
                  </div>
                  {isVertical && (
                    <div className="flex flex-col">
                      <span className={cn("text-sm font-medium", status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                        {step.label}
                      </span>
                      {step.description && (
                        <span className="text-xs text-muted-foreground">{step.description}</span>
                      )}
                    </div>
                  )}
                </div>
                {!isVertical && (
                  <span className={cn("mt-1.5 text-xs text-center max-w-[80px] leading-tight", status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                    {step.label}
                  </span>
                )}
              </div>
              {!isLast && (
                <div className={cn(
                  "shrink-0",
                  isVertical
                    ? "ml-3.5 h-6 w-px bg-border"
                    : "mt-3.5 flex-1 h-px bg-border mx-2"
                )} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

export { Stepper };
