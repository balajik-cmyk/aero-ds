import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createColumnHelper } from "@tanstack/react-table";
import { AppDataTable } from "@/app/components/ui/AppDataTable";
import { AppDataTableColumnSettingsTrigger } from "@/app/components/ui/AppDataTableColumnSettingsTrigger";
import { APP_DATA_TABLE_PRIMARY_ROW_LABEL_CLASS } from "@/app/components/ui/appDataTableCellClasses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/components/ui/utils";

const meta: Meta = {
  title: "Components/Text and data display/Table/Examples",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Static primitives ─────────────────────────────────────────────────────────

const invoices = [
  { id: "INV-001", status: "Paid",    method: "Credit Card",   amount: "$250.00" },
  { id: "INV-002", status: "Pending", method: "PayPal",        amount: "$150.00" },
  { id: "INV-003", status: "Paid",    method: "Bank Transfer", amount: "$350.00" },
  { id: "INV-004", status: "Failed",  method: "Credit Card",   amount: "$450.00" },
];

export const Primitives: Story = {
  name: "Static / Primitives",
  render: () => (
    <Table>
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>
              <Badge colorPalette={inv.status === "Paid" ? "green" : inv.status === "Failed" ? "red" : "gray"}>
                {inv.status}
              </Badge>
            </TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// ── TanStack AppDataTable ─────────────────────────────────────────────────────

type DemoRow = {
  id: string; name: string; subtitle: string; status: string;
  assets: number | null; access: string; addedBy: string; addedEmail: string;
};

const rows: DemoRow[] = [
  { id: "1", name: "Google Calendar",            subtitle: "calendar@company.com",          status: "Active", assets: 1,    access: "Private",         addedBy: "Alex Smith", addedEmail: "alex@company.com" },
  { id: "2", name: "Demo – Why AI Will Save the…", subtitle: "This is a demo website",      status: "Active", assets: null, access: "Entire workspace", addedBy: "Alex Smith", addedEmail: "alex@company.com" },
  { id: "3", name: "Compass",                    subtitle: "compass.app",                   status: "Active", assets: 3,    access: "Private",         addedBy: "Alex Smith", addedEmail: "alex@company.com" },
  { id: "4", name: "Slack",                      subtitle: "workspace@company.com",         status: "Paused", assets: 2,    access: "Team only",       addedBy: "Maria Lee",  addedEmail: "maria@company.com" },
  { id: "5", name: "HubSpot",                    subtitle: "crm@company.com",               status: "Active", assets: 5,    access: "Private",         addedBy: "Maria Lee",  addedEmail: "maria@company.com" },
];

const h = createColumnHelper<DemoRow>();

const referenceColumns = [
  h.accessor("name", {
    id: "name", header: "Name", size: 260, minSize: 180, enableSorting: true,
    meta: { settingsLabel: "Name" },
    cell: (info) => (
      <div className="flex flex-col gap-0.5">
        <span className={cn("font-medium", APP_DATA_TABLE_PRIMARY_ROW_LABEL_CLASS)}>{info.getValue()}</span>
        <span className="text-muted-foreground text-xs">{info.row.original.subtitle}</span>
      </div>
    ),
  }),
  h.accessor("status", {
    id: "status", header: "Status", size: 120, enableSorting: true,
    meta: { settingsLabel: "Status" },
    cell: (info) => (
      <Badge colorPalette={info.getValue() === "Active" ? "green" : "gray"} size="sm">
        {info.getValue()}
      </Badge>
    ),
  }),
  h.accessor("assets", {
    id: "assets", header: "Assets", size: 80, enableSorting: true,
    meta: { settingsLabel: "Assets" },
    cell: (info) => <span className="tabular-nums">{info.getValue() ?? "—"}</span>,
  }),
  h.accessor("access", {
    id: "access", header: "Access", size: 160, enableSorting: true,
    meta: { settingsLabel: "Access" },
  }),
  h.accessor("addedBy", {
    id: "addedBy", header: "Added by", size: 200, enableSorting: true,
    meta: { settingsLabel: "Added by" },
    cell: (info) => (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-foreground">{info.getValue()}</span>
        <span className="text-muted-foreground text-xs">{info.row.original.addedEmail}</span>
      </div>
    ),
  }),
];

// Contacts columns
type ContactRow = { name: string; email: string; role: string; reviews: number; status: "Active" | "Inactive" };
const ch = createColumnHelper<ContactRow>();
const contactData: ContactRow[] = [
  { name: "Alice Johnson", email: "alice@company.com", role: "Admin",  reviews: 42, status: "Active" },
  { name: "Bob Smith",     email: "bob@company.com",   role: "Editor", reviews: 18, status: "Active" },
  { name: "Carol White",   email: "carol@company.com", role: "Viewer", reviews: 7,  status: "Inactive" },
  { name: "David Kim",     email: "david@company.com", role: "Editor", reviews: 31, status: "Active" },
  { name: "Elena Santos",  email: "elena@company.com", role: "Admin",  reviews: 55, status: "Active" },
];
const contactColumns = [
  ch.accessor("name",    { id: "name",    header: "Name",    size: 200, meta: { settingsLabel: "Name" }, cell: (i) => <span className={cn(APP_DATA_TABLE_PRIMARY_ROW_LABEL_CLASS)}>{i.getValue()}</span> }),
  ch.accessor("email",   { id: "email",   header: "Email",   size: 220, meta: { settingsLabel: "Email" }, cell: (i) => <span className="text-muted-foreground">{i.getValue()}</span> }),
  ch.accessor("role",    { id: "role",    header: "Role",    size: 110, meta: { settingsLabel: "Role" }, cell: (i) => <Badge colorPalette="gray" size="sm">{i.getValue()}</Badge> }),
  ch.accessor("status",  { id: "status",  header: "Status",  size: 100, meta: { settingsLabel: "Status" }, cell: (i) => <Badge colorPalette={i.getValue() === "Active" ? "green" : "gray"} size="sm">{i.getValue()}</Badge> }),
  ch.accessor("reviews", { id: "reviews", header: "Reviews", size: 90,  meta: { settingsLabel: "Reviews" }, cell: (i) => <span className="tabular-nums">{i.getValue()}</span> }),
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const ReferenceChrome: Story = {
  name: "TanStack / Reference layout",
  render: () => (
    <AppDataTable tableId="story-ref" data={rows} columns={referenceColumns} persist={false} initialSorting={[{ id: "name", desc: false }]} rowDensity="medium" />
  ),
};

export const ContactsTable: Story = {
  name: "TanStack / Contacts",
  render: () => (
    <AppDataTable tableId="story-contacts" data={contactData} columns={contactColumns} persist={false} />
  ),
};

export const ContactsWithToolbar: Story = {
  name: "TanStack / Contacts — with toolbar",
  render: () => (
    <AppDataTable tableId="story-contacts-toolbar" data={contactData} columns={contactColumns} persist={false}
      toolbarTitle={<span className="text-sm font-medium text-foreground">Contacts <span className="text-muted-foreground font-normal">({contactData.length})</span></span>}
    />
  ),
};

export const RowDensityDefault: Story = {
  name: "TanStack / Row density — default",
  render: () => <AppDataTable tableId="story-density-default" data={rows} columns={referenceColumns} persist={false} rowDensity="default" />,
};

export const RowDensityMedium: Story = {
  name: "TanStack / Row density — medium",
  render: () => <AppDataTable tableId="story-density-medium" data={rows} columns={referenceColumns} persist={false} rowDensity="medium" />,
};

export const RowDensityLarge: Story = {
  name: "TanStack / Row density — large",
  render: () => <AppDataTable tableId="story-density-large" data={rows} columns={referenceColumns} persist={false} rowDensity="large" />,
};

export const WithPersistence: Story = {
  name: "TanStack / With session persistence",
  render: () => <AppDataTable tableId="story-persist" data={rows} columns={referenceColumns} persist={true} initialSorting={[{ id: "name", desc: false }]} />,
};

export const ExternalColumnTrigger: Story = {
  name: "TanStack / External column trigger",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-2 border-b border-border pb-4">
          <span className="mr-auto text-sm text-muted-foreground">Column sheet triggered externally</span>
          <AppDataTableColumnSettingsTrigger sheetTitle="Columns" onClick={() => setOpen(true)} />
          <Button size="sm">Primary CTA</Button>
        </div>
        <AppDataTable tableId="story-external-col" data={rows} columns={referenceColumns} persist={false}
          hideColumnsButton columnSheetOpen={open} onColumnSheetOpenChange={setOpen}
        />
      </div>
    );
  },
};

export const StickyLeadingColumns: Story = {
  name: "TanStack / Sticky leading columns",
  render: () => <AppDataTable tableId="story-sticky" data={rows} columns={referenceColumns} persist={false} stickyLeadingColumnCount={3} rowDensity="default" />,
};
