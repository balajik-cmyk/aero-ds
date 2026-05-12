import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "@/app/components/ui/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Loading/Spinner/Examples",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    label: { control: "text" },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Spinner size="sm" label="Loading..." />
      <Spinner size="md" label="Fetching data" />
      <Spinner size="lg" label="Please wait" />
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center justify-center h-32 rounded-lg border border-border bg-muted">
        <Spinner size="lg" label="Loading content" />
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="xs" />
        <span>Saving changes...</span>
      </div>
    </div>
  ),
};
