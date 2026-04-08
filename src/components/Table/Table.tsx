import { useEffect, useMemo, useState } from "react";
import { CaretDown, CaretUp, DotsThree, MagnifyingGlass } from "@phosphor-icons/react";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { cn } from "@/app/components/ui/utils";
import type {
  DataTableProps,
  TableColumn,
  TablePaginationState,
  TableSortDirection,
} from "@/types/table";

const DEFAULT_PAGE_SIZES = [5, 10, 25, 50];

function stringifyValue(value: unknown) {
  if (value == null) {
    return "";
  }
  if (value instanceof Date) {
    return value.getTime().toString();
  }
  return String(value);
}

function compareValues(a: unknown, b: unknown) {
  if (a == null && b == null) {
    return 0;
  }
  if (a == null) {
    return -1;
  }
  if (b == null) {
    return 1;
  }
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    return Number(a) - Number(b);
  }
  return stringifyValue(a).localeCompare(stringifyValue(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

function getColumnValue<Row>(row: Row, column: TableColumn<Row>) {
  if (column.sortAccessor) {
    return column.sortAccessor(row);
  }
  return (row as Record<string, unknown>)[String(column.key)];
}

function getColumnFilterValue<Row>(row: Row, column: TableColumn<Row>) {
  if (column.filterAccessor) {
    return column.filterAccessor(row);
  }
  return stringifyValue((row as Record<string, unknown>)[String(column.key)]);
}

export function DataTable<Row>({
  columns,
  data,
  caption,
  loading = false,
  emptyTitle = "No results found",
  emptySubtitle = "Try adjusting your search or filters.",
  searchPlaceholder = "Search rows",
  enableSearch = true,
  enablePagination = true,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  defaultPageSize = DEFAULT_PAGE_SIZES[1],
  stickyHeader = false,
  rowKey,
  onRowClick,
  rowActions,
}: DataTableProps<Row>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<TableSortDirection>("asc");
  const [pagination, setPagination] = useState<TablePaginationState>({
    page: 1,
    pageSize: defaultPageSize,
  });

  useEffect(() => {
    setPagination((current) => ({ ...current, page: 1 }));
  }, [query, sortKey, sortDirection]);

  const filteredData = useMemo(() => {
    if (!enableSearch || !query.trim()) {
      return data;
    }
    const normalizedQuery = query.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((column) => {
        if (column.filterable === false) {
          return false;
        }
        return getColumnFilterValue(row, column).toLowerCase().includes(normalizedQuery);
      }),
    );
  }, [columns, data, enableSearch, query]);

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return filteredData;
    }
    const activeColumn = columns.find((column) => String(column.key) === sortKey);
    if (!activeColumn) {
      return filteredData;
    }
    const sorted = [...filteredData].sort((left, right) =>
      compareValues(getColumnValue(left, activeColumn), getColumnValue(right, activeColumn)),
    );
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [columns, filteredData, sortDirection, sortKey]);

  const totalPages = enablePagination
    ? Math.max(1, Math.ceil(sortedData.length / pagination.pageSize))
    : 1;

  const currentPage = Math.min(pagination.page, totalPages);

  const paginatedData = useMemo(() => {
    if (!enablePagination) {
      return sortedData;
    }
    const start = (currentPage - 1) * pagination.pageSize;
    return sortedData.slice(start, start + pagination.pageSize);
  }, [currentPage, enablePagination, pagination.pageSize, sortedData]);

  const handleSort = (column: TableColumn<Row>) => {
    if (!column.sortable) {
      return;
    }
    const nextKey = String(column.key);
    if (sortKey === nextKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(nextKey);
    setSortDirection("asc");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          {caption ? <p className="text-sm font-medium text-foreground">{caption}</p> : null}
          <p className="text-sm text-muted-foreground">
            {filteredData.length} row{filteredData.length === 1 ? "" : "s"}
          </p>
        </div>
        {enableSearch ? (
          <div className="relative w-full md:max-w-sm">
            <MagnifyingGlass className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9"
            />
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="max-h-[32rem] overflow-auto">
          <UITable>
            <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-card shadow-[0_1px_0_theme(colors.border)]")}>
              <TableRow className="hover:bg-transparent">
                {columns.map((column) => {
                  const active = sortKey === String(column.key);
                  return (
                    <TableHead
                      key={String(column.key)}
                      className={cn(
                        "h-12 bg-card px-4",
                        column.align === "right" && "text-right",
                        column.align === "center" && "text-center",
                      )}
                      style={{ width: column.width, minWidth: column.minWidth }}
                    >
                      <button
                        type="button"
                        onClick={() => handleSort(column)}
                        className={cn(
                          "inline-flex items-center gap-2 text-left",
                          column.sortable ? "cursor-pointer" : "cursor-default",
                          column.align === "right" && "ml-auto",
                        )}
                      >
                        <span>{column.header}</span>
                        {column.sortable ? (
                          active && sortDirection === "desc" ? (
                            <CaretDown className="size-4 text-primary" />
                          ) : (
                            <CaretUp className={cn("size-4", active ? "text-primary" : "text-muted-foreground")} />
                          )
                        ) : null}
                      </button>
                    </TableHead>
                  );
                })}
                {rowActions ? <TableHead className="w-14 px-4 text-right" /> : null}
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length + (rowActions ? 1 : 0)} className="h-28 text-center text-muted-foreground">
                    Loading table data...
                  </TableCell>
                </TableRow>
              ) : paginatedData.length ? (
                paginatedData.map((row, rowIndex) => {
                  const actions = rowActions?.(row) ?? [];
                  const resolvedKey = rowKey?.(row, rowIndex) ?? `${currentPage}-${rowIndex}`;
                  return (
                    <TableRow
                      key={resolvedKey}
                      className={cn(onRowClick && "cursor-pointer")}
                      onClick={() => onRowClick?.(row)}
                    >
                      {columns.map((column) => {
                        const content = column.render
                          ? column.render(row, rowIndex)
                          : stringifyValue((row as Record<string, unknown>)[String(column.key)]);

                        return (
                          <TableCell
                            key={String(column.key)}
                            className={cn(
                              "px-4 py-3 align-middle",
                              column.align === "right" && "text-right",
                              column.align === "center" && "text-center",
                            )}
                          >
                            {content}
                          </TableCell>
                        );
                      })}
                      {rowActions ? (
                        <TableCell className="px-4 py-3 text-right" onClick={(event) => event.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label="Row actions">
                                <DotsThree className="size-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {actions.map((action) => (
                                <DropdownMenuItem
                                  key={action.label}
                                  disabled={action.disabled}
                                  onClick={() => action.onSelect?.(row)}
                                  className={cn(action.destructive && "text-destructive")}
                                >
                                  {action.label}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      ) : null}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length + (rowActions ? 1 : 0)} className="h-28 px-4 text-center">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{emptyTitle}</p>
                      <p className="text-sm text-muted-foreground">{emptySubtitle}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </UITable>
        </div>
      </div>

      {enablePagination ? (
        <div className="flex flex-col gap-3 border-t border-border pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page</span>
            <select
              value={pagination.pageSize}
              onChange={(event) =>
                setPagination({
                  page: 1,
                  pageSize: Number(event.target.value),
                })
              }
              className="rounded-md border border-input bg-background px-2 py-1 text-foreground"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination((current) => ({ ...current, page: Math.max(1, current.page - 1) }))}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPagination((current) => ({
                  ...current,
                  page: Math.min(totalPages, current.page + 1),
                }))
              }
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
