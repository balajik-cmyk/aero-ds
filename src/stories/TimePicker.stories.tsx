import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker, type TimeValue } from "@/app/components/ui/time-picker";

const meta: Meta<typeof TimePicker> = {
  title: "UI/TimePicker",
  component: TimePicker,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant:  { control: "select", options: ["segmented", "combined"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Segmented: Story = {
  args: { variant: "segmented", label: "Time", required: true },
};

export const Combined: Story = {
  args: { variant: "combined", label: "Time", required: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <TimePicker variant="segmented" label="Segmented" required />
      <TimePicker variant="combined"  label="Combined"  required />
      <TimePicker variant="segmented" label="Disabled"  disabled />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [val, setVal] = useState<TimeValue>({ hour: "09", minute: "30", period: "AM" });
    return (
      <div className="flex flex-col gap-2">
        <TimePicker variant="segmented" label="Meeting time" required value={val} onChange={setVal} />
        <p className="text-xs text-muted-foreground">{val.hour}:{val.minute} {val.period}</p>
      </div>
    );
  },
};
