import type { ReactNode } from "react";

export type TableSortDirection = "asc" | "desc";

export type TableColumn<Row> = {
  key: keyof Row | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  align?: "left" | "center" | "right";
  render?: (row: Row, rowIndex: number) => ReactNode;
  sortAccessor?: (row: Row) => string | number | boolean | Date | null | undefined;
  filterAccessor?: (row: Row) => string;
};

export type TableRowAction<Row> = {
  label: string;
  onSelect?: (row: Row) => void;
  disabled?: boolean;
  destructive?: boolean;
};

export type TablePaginationState = {
  page: number;
  pageSize: number;
};

export type DataTableProps<Row> = {
  columns: TableColumn<Row>[];
  data: Row[];
  caption?: string;
  loading?: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  searchPlaceholder?: string;
  enableSearch?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  stickyHeader?: boolean;
  rowKey?: (row: Row, index: number) => string;
  onRowClick?: (row: Row) => void;
  rowActions?: (row: Row) => TableRowAction<Row>[];
};
