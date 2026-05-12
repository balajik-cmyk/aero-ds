import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Chip } from "@/app/components/ui/chip";

const meta: Meta<typeof Chip> = {
  title: "UI/Chip/Examples",
  component: Chip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    shape:    { control: "select", options: ["capsule", "rectangle"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { children: "Label", shape: "capsule" },
};

export const Capsule: Story = {
  render: () => {
    const options = ["All", "Google", "Facebook", "Yelp", "LinkedIn"];
    const [selected, setSelected] = useState("All");
    return (
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <Chip key={o} shape="capsule" selected={selected === o} onClick={() => setSelected(o)}>{o}</Chip>
        ))}
      </div>
    );
  },
};

export const Rectangle: Story = {
  render: () => {
    const options = ["Last 7 days", "Last 30 days", "Last 90 days", "Custom"];
    const [selected, setSelected] = useState("Last 30 days");
    return (
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <Chip key={o} shape="rectangle" selected={selected === o} onClick={() => setSelected(o)}>{o}</Chip>
        ))}
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const options = ["Reviews", "Agents", "Inbox", "Campaigns", "Contacts"];
    const [selected, setSelected] = useState<string[]>(["Reviews"]);
    const toggle = (o: string) =>
      setSelected(prev => prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]);
    return (
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <Chip key={o} shape="capsule" selected={selected.includes(o)} onClick={() => toggle(o)}>{o}</Chip>
        ))}
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Chip shape="capsule"   disabled>Disabled</Chip>
      <Chip shape="rectangle" disabled selected>Selected disabled</Chip>
    </div>
  ),
};
