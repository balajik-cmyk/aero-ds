import type { Meta, StoryObj } from "@storybook/react";
import { HyperlinkButton } from "@/app/components/ui/hyperlink-button";
import { ArrowRight } from "@phosphor-icons/react";

const meta: Meta<typeof HyperlinkButton> = {
  title: "UI/HyperlinkButton/Examples",
  component: HyperlinkButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant:  { control: "select", options: ["default", "muted", "destructive"] },
    size:     { control: "select", options: ["sm", "default", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof HyperlinkButton>;

export const Default: Story = {
  args: { children: "View all reviews" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <HyperlinkButton variant="default">View all reviews</HyperlinkButton>
      <HyperlinkButton variant="muted">Learn more</HyperlinkButton>
      <HyperlinkButton variant="destructive">Delete account</HyperlinkButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HyperlinkButton size="sm">Small</HyperlinkButton>
      <HyperlinkButton size="default">Default</HyperlinkButton>
      <HyperlinkButton size="lg">Large</HyperlinkButton>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <HyperlinkButton className="inline-flex items-center gap-1">
      View full report <ArrowRight size={14} />
    </HyperlinkButton>
  ),
};

export const AsLink: Story = {
  render: () => (
    <HyperlinkButton asChild>
      <a href="#" onClick={e => e.preventDefault()}>Open in new tab</a>
    </HyperlinkButton>
  ),
};

export const Disabled: Story = {
  args: { children: "View all reviews", disabled: true },
};
