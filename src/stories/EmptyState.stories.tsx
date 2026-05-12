import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/app/components/ui/empty-state";
import { Button } from "@/app/components/ui/button";

const meta: Meta<typeof EmptyState> = {
  title: "UI/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["onboarding", "no-results", "no-data"] },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoResults: Story = {
  args: {
    variant: "no-results",
    title: "No results found",
    description: "Try searching with other keywords.",
  },
};

export const NoData: Story = {
  args: {
    variant: "no-data",
    title: "No data available",
    description: "This report does not have any data yet. Try checking back later.",
  },
};

export const Onboarding: Story = {
  args: {
    variant: "onboarding",
    title: "Create your first approval",
    description:
      "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    action: <Button size="sm">Create approval</Button>,
  },
};

export const OnboardingWithTwoCTAs: Story = {
  render: () => (
    <EmptyState
      variant="onboarding"
      title="Add contact"
      description="Add a contact or upload a .csv to upload contacts in bulk."
      action={<Button size="sm">Add a contact</Button>}
      secondaryAction={<Button size="sm" variant="outline">Bulk import</Button>}
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="border border-border rounded-lg">
        <EmptyState
          variant="no-results"
          title="No results found"
          description="Try searching with other keywords."
        />
      </div>
      <div className="border border-border rounded-lg">
        <EmptyState
          variant="no-data"
          title="No data available"
          description="This report does not have any data yet."
        />
      </div>
      <div className="border border-border rounded-lg">
        <EmptyState
          variant="onboarding"
          title="Add your locations"
          description="Start adding your business locations to track reviews."
          action={<Button size="sm">Add location</Button>}
        />
      </div>
    </div>
  ),
};
