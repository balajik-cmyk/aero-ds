import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "@/app/components/ui/tag";
import { Star } from "@phosphor-icons/react";

const meta: Meta<typeof Tag> = {
  title: "UI/Tag/Examples",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "success", "warning", "error"] },
    onRemove: { action: "removed" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { children: "Label" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="error">Error</Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag onRemove={() => {}}>Google</Tag>
      <Tag variant="primary" onRemove={() => {}}>Reviews</Tag>
      <Tag variant="success" onRemove={() => {}}>Active</Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag icon={<Star size={10} />}>Starred</Tag>
      <Tag variant="primary" icon={<Star size={10} />} onRemove={() => {}}>
        Featured
      </Tag>
    </div>
  ),
};
