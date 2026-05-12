"use client";

import * as React from "react";
import { CaretRight, CaretDown } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

export interface TreeNode {
  /** Unique node id. */
  id: string;
  /** Display label. */
  label: string;
  /** Icon to show left of label. */
  icon?: React.ReactNode;
  /** Child nodes. */
  children?: TreeNode[];
  /** Disable this node. */
  disabled?: boolean;
}

export interface TreeProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  /** Root-level nodes. */
  nodes: TreeNode[];
  /** Selected node ids (controlled). */
  selectedIds?: string[];
  /** Default selected ids (uncontrolled). */
  defaultSelectedIds?: string[];
  /** Called with the new set of selected ids. */
  onSelect?: (ids: string[]) => void;
  /** Allow multiple selection. */
  multiSelect?: boolean;
  /** Default expanded node ids. */
  defaultExpandedIds?: string[];
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  selectedIds: string[];
  expandedIds: string[];
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  multiSelect?: boolean;
}

function TreeItem({ node, level, selectedIds, expandedIds, onToggleExpand, onSelect, multiSelect }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.includes(node.id);
  const isSelected = selectedIds.includes(node.id);

  return (
    <li role="treeitem" aria-selected={isSelected} aria-expanded={hasChildren ? isExpanded : undefined} aria-disabled={node.disabled}>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded px-2 py-1 text-sm cursor-pointer select-none transition-colors",
          isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted text-foreground",
          node.disabled && "cursor-not-allowed opacity-50"
        )}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={() => {
          if (node.disabled) return;
          if (hasChildren) onToggleExpand(node.id);
          onSelect(node.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!node.disabled) { if (hasChildren) onToggleExpand(node.id); onSelect(node.id); }
          }
          if (e.key === "ArrowRight" && hasChildren && !isExpanded) onToggleExpand(node.id);
          if (e.key === "ArrowLeft"  && hasChildren && isExpanded)  onToggleExpand(node.id);
        }}
        tabIndex={node.disabled ? -1 : 0}
      >
        <span className="w-4 shrink-0 text-muted-foreground">
          {hasChildren
            ? isExpanded ? <CaretDown size={12} /> : <CaretRight size={12} />
            : null}
        </span>
        {node.icon && <span className="shrink-0">{node.icon}</span>}
        <span className="truncate">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <ul role="group">
          {node.children!.map(child => (
            <TreeItem key={child.id} node={child} level={level + 1} selectedIds={selectedIds} expandedIds={expandedIds} onToggleExpand={onToggleExpand} onSelect={onSelect} multiSelect={multiSelect} />
          ))}
        </ul>
      )}
    </li>
  );
}

const Tree = React.forwardRef<HTMLUListElement, TreeProps>(
  ({ nodes, selectedIds: controlledSelected, defaultSelectedIds = [], onSelect, multiSelect, defaultExpandedIds = [], className, ...props }, ref) => {
    const [internalSelected, setInternalSelected] = React.useState<string[]>(defaultSelectedIds);
    const [expandedIds, setExpandedIds] = React.useState<string[]>(defaultExpandedIds);

    const selectedIds = controlledSelected ?? internalSelected;

    const handleSelect = (id: string) => {
      const next = multiSelect
        ? selectedIds.includes(id) ? selectedIds.filter(s => s !== id) : [...selectedIds, id]
        : selectedIds.includes(id) ? [] : [id];
      if (!controlledSelected) setInternalSelected(next);
      onSelect?.(next);
    };

    const handleToggleExpand = (id: string) =>
      setExpandedIds(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

    return (
      <ul
        ref={ref}
        role="tree"
        aria-multiselectable={multiSelect}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {nodes.map(node => (
          <TreeItem key={node.id} node={node} level={0} selectedIds={selectedIds} expandedIds={expandedIds} onToggleExpand={handleToggleExpand} onSelect={handleSelect} multiSelect={multiSelect} />
        ))}
      </ul>
    );
  }
);
Tree.displayName = "Tree";

export { Tree };
