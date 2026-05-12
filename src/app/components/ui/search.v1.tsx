import * as React from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

export interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Keyboard shortcut shown inside the input (e.g. "⌘K"). */
  shortcut?: string;
  /** Called when the clear × button is clicked. */
  onClear?: () => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  ({ className, shortcut, onClear, value, onChange, ...props }, ref) => {
    const hasValue = value !== undefined ? String(value).length > 0 : false;

    return (
      <div className={cn("relative flex items-center", className)}>
        <MagnifyingGlass
          size={14}
          className="pointer-events-none absolute left-3 text-muted-foreground"
        />
        <input
          ref={ref}
          type="search"
          role="searchbox"
          value={value}
          onChange={onChange}
          className={cn(
            "h-8 w-full rounded-md border border-border bg-background pl-8 pr-3 text-sm",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            (shortcut || hasValue) && "pr-16"
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={onClear}
            className="absolute right-2 rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X size={12} />
          </button>
        )}
        {shortcut && !hasValue && (
          <kbd className="pointer-events-none absolute right-2 hidden select-none rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:flex">
            {shortcut}
          </kbd>
        )}
      </div>
    );
  }
);
Search.displayName = "Search";

export { Search };
