import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "@/app/components/ui/banner";
import { Button } from "@/app/components/ui/button";

const meta: Meta<typeof Banner> = {
  title: "UI/Banner/Examples",
  component: Banner,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
    onDismiss: { action: "dismissed" },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: { children: "This is an informational message." },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Banner variant="info">Your account settings have been updated.</Banner>
      <Banner variant="success">Review response sent successfully.</Banner>
      <Banner variant="warning">You have 3 reviews pending response.</Banner>
      <Banner variant="error">Failed to send response. Please try again.</Banner>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <Banner variant="info" onDismiss={() => {}}>
      New features are available. Refresh to see them.
    </Banner>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-xl">
      <Banner variant="warning" title="Action required" onDismiss={() => {}}>
        3 reviews from last week have not been responded to yet.
      </Banner>
      <Banner
        variant="info"
        title="Set up complete"
        action={<Button size="sm" variant="outline">View settings</Button>}
      >
        Your Google Business profile is connected.
      </Banner>
    </div>
  ),
};
