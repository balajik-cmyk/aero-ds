"use client";

import * as React from "react";
import { DotsSixVertical, Eye, EyeSlash, Lock } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";
import { Search } from "@/app/components/ui/search";
import { Button } from "@/app/components/ui/button";

export interface ColumnField {
  /** Unique column id. */
  id: string;
  /** Display label. */
  label: string;
  /** Group this column belongs to. */
  group?: string;
  /** Cannot be removed or hidden. */
  nonRemovable?: boolean;
  /** Pinned to the left — cannot be moved. */
  frozen?: boolean;
  /** Currently visible. */
  visible?: boolean;
}

export interface ColumnCustomizerProps {
  /** All available columns. */
  columns: ColumnField[];
  /** Called when visibility or order changes. */
  onChange?: (columns: ColumnField[]) => void;
  /** Show column groups as headers. */
  grouped?: boolean;
  /** Compact row size. */
  compact?: boolean;
  className?: string;
}

const ColumnCustomizer = React.forwardRef<HTMLDivElement, ColumnCustomizerProps>(
  ({ columns: initialColumns, onChange, grouped, compact, className }, ref) => {
    const [columns, setColumns] = React.useState<ColumnField[]>(
      initialColumns.map(c => ({ visible: true, ...c }))
    );
    const [query, setQuery] = React.useState("");

    const update = (next: ColumnField[]) => {
      setColumns(next);
      onChange?.(next);
    };

    const toggleVisible = (id: string) =>
      update(columns.map(c => c.id === id && !c.nonRemovable ? { ...c, visible: !c.visible } : c));

    const filtered = columns.filter(c =>
      c.label.toLowerCase().includes(query.toLowerCase())
    );

    const groups = grouped
      ? [...new Set(filtered.map(c => c.group ?? ""))]
      : [""];

    return (
      <div ref={ref} className={cn("flex flex-col gap-2 w-72", className)}>
        <Search
          value={query}
          onChange={e => setQuery(e.target.value)}
          onClear={() => setQuery("")}
          placeholder="Search columns..."
          className="w-full"
        />
        <div className="rounded-lg border border-border overflow-hidden">
          {groups.map(group => (
            <div key={group}>
              {grouped && group && (
                <div className="bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground border-b border-border">
                  {group}
                </div>
              )}
              {filtered
                .filter(c => (grouped ? (c.group ?? "") === group : true))
                .map(col => (
                  <div
                    key={col.id}
                    className={cn(
                      "flex items-center gap-2 border-b border-border last:border-0 bg-background hover:bg-muted/50 transition-colors",
                      compact ? "px-2 py-1.5" : "px-3 py-2"
                    )}
                  >
                    {col.frozen ? (
                      <Lock size={12} className="text-muted-foreground shrink-0" />
                    ) : (
                      <DotsSixVertical size={14} className="text-muted-foreground shrink-0 cursor-grab" />
                    )}
                    <span className={cn(
                      "flex-1 text-sm truncate",
                      col.visible ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {col.label}
                    </span>
                    {col.frozen && (
                      <span className="text-xs text-muted-foreground px-1.5 py-0.5 rounded bg-muted">Pinned</span>
                    )}
                    <button
                      type="button"
                      aria-label={col.visible ? `Hide ${col.label}` : `Show ${col.label}`}
                      disabled={col.nonRemovable}
                      onClick={() => toggleVisible(col.id)}
                      className="shrink-0 p-0.5 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {col.visible
                        ? <Eye size={14} />
                        : <EyeSlash size={14} />
                      }
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-xs text-muted-foreground">
            {columns.filter(c => c.visible).length} of {columns.length} visible
          </span>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-7"
            onClick={() => update(initialColumns.map(c => ({ visible: true, ...c })))}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
);
ColumnCustomizer.displayName = "ColumnCustomizer";

export { ColumnCustomizer };
