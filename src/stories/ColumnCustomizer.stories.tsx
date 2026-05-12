import type { Meta, StoryObj } from "@storybook/react";
import { ColumnCustomizer } from "@/app/components/ui/column-customizer";

const COLUMNS = [
  { id: "name",        label: "Name",           group: "Contact",   nonRemovable: true, frozen: true },
  { id: "email",       label: "Email",          group: "Contact" },
  { id: "phone",       label: "Phone",          group: "Contact" },
  { id: "company",     label: "Company",        group: "Contact" },
  { id: "reviews",     label: "Total reviews",  group: "Activity" },
  { id: "rating",      label: "Avg. rating",    group: "Activity" },
  { id: "lastReview",  label: "Last review",    group: "Activity" },
  { id: "responded",   label: "Responded",      group: "Activity" },
  { id: "createdAt",   label: "Created",        group: "Metadata" },
  { id: "updatedAt",   label: "Last updated",   group: "Metadata" },
];

const meta: Meta<typeof ColumnCustomizer> = {
  title: "UI/ColumnCustomizer/Examples",
  component: ColumnCustomizer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    grouped:  { control: "boolean" },
    compact:  { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof ColumnCustomizer>;

export const Default: Story = {
  args: { columns: COLUMNS },
};

export const WithGroupedFields: Story = {
  args: { columns: COLUMNS, grouped: true },
};

export const CompactView: Story = {
  args: { columns: COLUMNS, grouped: true, compact: true },
};

export const WithFrozenColumns: Story = {
  args: {
    columns: COLUMNS.map((c, i) => ({ ...c, frozen: i < 2 })),
    grouped: true,
  },
};

export const EmptySelection: Story = {
  args: {
    columns: COLUMNS.map(c => ({ ...c, visible: c.nonRemovable ?? false })),
    grouped: true,
  },
};
