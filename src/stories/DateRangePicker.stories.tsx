import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DateRangePicker, type DateRange } from "@/app/components/ui/date-range-picker";

const meta: Meta<typeof DateRangePicker> = {
  title: "UI/DateRangePicker/Examples",
  component: DateRangePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  args: { placeholder: "Select date range" },
};

export const WithValue: Story = {
  args: {
    value: {
      from: new Date(2024, 10, 1),
      to:   new Date(2024, 11, 30),
    },
  },
};

export const WithMinMax: Story = {
  args: {
    placeholder: "Last 30 days max",
    maxDate: new Date(),
    minDate: (() => { const d = new Date(); d.setDate(d.getDate() - 90); return d; })(),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: { from: new Date(2024, 10, 1), to: new Date(2024, 11, 30) },
  },
};

export const Controlled: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>();
    return (
      <div className="flex flex-col gap-2">
        <DateRangePicker value={range} onChange={setRange} />
        <p className="text-xs text-muted-foreground">
          {range?.from ? `From: ${range.from.toLocaleDateString()}` : "No start date"}
          {range?.to   ? ` – To: ${range.to.toLocaleDateString()}` : ""}
        </p>
      </div>
    );
  },
};
