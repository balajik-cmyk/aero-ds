import type { Meta, StoryObj } from "@storybook/react";
import { SplitButton } from "@/app/components/ui/split-button";

const ITEMS = [
  { label: "Save as draft",    description: "Save without publishing",    onClick: () => {} },
  { label: "Schedule",         description: "Set a publish date & time",   onClick: () => {} },
  { label: "Save as template", description: "Reuse this configuration",    onClick: () => {} },
];

const meta: Meta<typeof SplitButton> = {
  title: "Components/Forms and input/SplitButton/Examples",
  component: SplitButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive", "outline", "secondary", "ghost"] },
    size:    { control: "select", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof SplitButton>;

export const Default: Story = {
  args: {
    children: "Send response",
    onClick: () => {},
    items: ITEMS,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <SplitButton variant="default"     items={ITEMS} onClick={() => {}}>Publish</SplitButton>
      <SplitButton variant="secondary"   items={ITEMS} onClick={() => {}}>Save</SplitButton>
      <SplitButton variant="outline"     items={ITEMS} onClick={() => {}}>Export</SplitButton>
      <SplitButton variant="destructive" items={ITEMS} onClick={() => {}}>Delete</SplitButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <SplitButton size="sm"      items={ITEMS} onClick={() => {}}>Small</SplitButton>
      <SplitButton size="default" items={ITEMS} onClick={() => {}}>Default</SplitButton>
      <SplitButton size="lg"      items={ITEMS} onClick={() => {}}>Large</SplitButton>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    children: "Send response",
    onClick: () => {},
    items: ITEMS.slice(0, 2),
  },
};

export const Disabled: Story = {
  args: {
    children: "Send response",
    disabled: true,
    onClick: () => {},
    items: ITEMS,
  },
};
