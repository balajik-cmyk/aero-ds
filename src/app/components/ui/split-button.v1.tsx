import * as React from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/components/ui/utils";
import { type VariantProps } from "class-variance-authority";

export interface SplitButtonItem {
  /** Display label. */
  label: string;
  /** Optional description shown below label. */
  description?: string;
  /** Called when this item is clicked. */
  onClick: () => void;
  /** Disable this item. */
  disabled?: boolean;
}

export interface SplitButtonProps
  extends VariantProps<typeof buttonVariants> {
  /** Label for the primary action button. */
  children: React.ReactNode;
  /** Called when the primary button is clicked. */
  onClick?: () => void;
  /** Dropdown menu items. */
  items: SplitButtonItem[];
  /** Disable both buttons. */
  disabled?: boolean;
  className?: string;
  /** Controls dropdown open state externally. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  ({ children, onClick, items, disabled, variant = "default", size = "default", className, open, onOpenChange }, ref) => (
    <div ref={ref} className={cn("inline-flex", className)}>
      <Button
        variant={variant}
        size={size}
        disabled={disabled}
        onClick={onClick}
        className="rounded-r-none border-r-0 focus-visible:z-10"
      >
        {children}
      </Button>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            aria-label="More options"
            className="rounded-l-none px-2 focus-visible:z-10"
          >
            <CaretDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {items.map((item, i) => (
            <DropdownMenuItem key={i} onClick={item.onClick} disabled={item.disabled}>
              <div className="flex flex-col gap-0.5">
                <span>{item.label}</span>
                {item.description && (
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
);
SplitButton.displayName = "SplitButton";

export { SplitButton };
