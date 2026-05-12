import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DatePicker } from "@/app/components/ui/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "UI/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    dateFormat: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: { placeholder: "Select date", className: "w-48" },
};

export const WithValue: Story = {
  args: { value: new Date(2024, 10, 15), className: "w-48" },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: true, placeholder: "Select date", className: "w-48" },
};

export const WithMinMax: Story = {
  args: {
    placeholder: "Select date",
    minDate: new Date(),
    className: "w-48",
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: new Date(2024, 10, 15), className: "w-48" },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="flex flex-col gap-2">
        <DatePicker value={date} onChange={setDate} className="w-48" />
        <p className="text-xs text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "none"}
        </p>
      </div>
    );
  },
};
