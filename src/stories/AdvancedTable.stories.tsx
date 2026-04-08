import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/app/components/ui/badge";

import { DataTable } from "@/components/Table";
import type { TableColumn } from "@/types/table";

type CustomerRow = {
  id: string;
  location: string;
  businessName: string;
  createdOn: string;
  createdAt: Date;
  createdBy: string;
  status: "Demo" | "Active" | "Paused";
};

const rows: CustomerRow[] = [
  {
    id: "1",
    location: "Australia",
    businessName: "Final Testing",
    createdOn: "Jan 30, 2024",
    createdAt: new Date("2024-01-30"),
    createdBy: "Ansh Gupta",
    status: "Demo",
  },
  {
    id: "2",
    location: "Abu Dhabi 1",
    businessName: "Acme Retail",
    createdOn: "Feb 02, 2024",
    createdAt: new Date("2024-02-02"),
    createdBy: "Maya Lee",
    status: "Active",
  },
  {
    id: "3",
    location: "New York",
    businessName: "Northwind Dental",
    createdOn: "Feb 08, 2024",
    createdAt: new Date("2024-02-08"),
    createdBy: "Ben Ortiz",
    status: "Paused",
  },
  {
    id: "4",
    location: "London",
    businessName: "Shoreline Spa",
    createdOn: "Feb 12, 2024",
    createdAt: new Date("2024-02-12"),
    createdBy: "Iris Chen",
    status: "Active",
  },
  {
    id: "5",
    location: "Singapore",
    businessName: "Meridian Care",
    createdOn: "Feb 18, 2024",
    createdAt: new Date("2024-02-18"),
    createdBy: "Tariq Khan",
    status: "Demo",
  },
  {
    id: "6",
    location: "Toronto",
    businessName: "Pilot Foods",
    createdOn: "Feb 22, 2024",
    createdAt: new Date("2024-02-22"),
    createdBy: "Ava Brooks",
    status: "Active",
  },
  {
    id: "7",
    location: "Berlin",
    businessName: "Harbor Fitness",
    createdOn: "Mar 01, 2024",
    createdAt: new Date("2024-03-01"),
    createdBy: "Jon Park",
    status: "Paused",
  },
];

const columns: TableColumn<CustomerRow>[] = [
  { key: "location", header: "Location", sortable: true, filterable: true, minWidth: "180px" },
  { key: "businessName", header: "Business name", sortable: true, filterable: true, minWidth: "220px" },
  {
    key: "createdOn",
    header: "Created on",
    sortable: true,
    minWidth: "160px",
    sortAccessor: (row) => row.createdAt,
  },
  { key: "createdBy", header: "Created by", sortable: true, filterable: true, minWidth: "180px" },
  {
    key: "status",
    header: "Status",
    sortable: true,
    filterable: true,
    minWidth: "140px",
    render: (row) => (
      <Badge
        variant={
          row.status === "Active"
            ? "default"
            : row.status === "Paused"
              ? "secondary"
              : "outline"
        }
      >
        {row.status}
      </Badge>
    ),
  },
];

const meta: Meta<typeof DataTable<CustomerRow>> = {
  title: "Data Display/AdvancedTable",
  component: DataTable<CustomerRow>,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={rows}
      caption="Imported table variant"
      rowKey={(row) => row.id}
      stickyHeader
      rowActions={(row) => [
        { label: `View ${row.businessName}` },
        { label: "Pause", disabled: row.status === "Paused" },
        { label: "Archive", destructive: true },
      ]}
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={[]}
      caption="Imported table variant"
      emptyTitle="No businesses found"
      emptySubtitle="Try a different search query."
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={rows}
      loading
      caption="Imported table variant"
    />
  ),
};
