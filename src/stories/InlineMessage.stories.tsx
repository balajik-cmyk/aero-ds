import type { Meta, StoryObj } from "@storybook/react";
import { InlineMessage } from "@/app/components/ui/inline-message";

const meta: Meta<typeof InlineMessage> = {
  title: "UI/InlineMessage",
  component: InlineMessage,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "error"] },
  },
};

export default meta;
type Story = StoryObj<typeof InlineMessage>;

export const Default: Story = {
  args: { children: "Use at least 8 characters." },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <InlineMessage variant="error">This field is required.</InlineMessage>
      <InlineMessage variant="warning">Check this value before saving.</InlineMessage>
      <InlineMessage variant="success">Looks good!</InlineMessage>
      <InlineMessage variant="info">Use at least 8 characters.</InlineMessage>
    </div>
  ),
};

export const InFormContext: Story = {
  render: () => (
    <div className="flex flex-col gap-1 w-64">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email address
      </label>
      <input
        id="email"
        type="email"
        aria-describedby="email-error"
        aria-invalid="true"
        placeholder="you@example.com"
        className="h-8 rounded-md border border-destructive bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <InlineMessage id="email-error" variant="error">
        Enter a valid email address.
      </InlineMessage>
    </div>
  ),
};
