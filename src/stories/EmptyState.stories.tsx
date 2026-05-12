import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/app/components/ui/empty-state";
import { Button } from "@/app/components/ui/button";

const meta: Meta<typeof EmptyState> = {
  title: "Components/Status indicators/EmptyState/Examples",
  component: EmptyState,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["onboarding", "no-results", "no-data"] },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

// ── Onboarding (with illustration) — Figma node 13801:5290 ──────────────────

export const CreateApproval: Story = {
  name: "Onboarding / Create approval",
  args: {
    variant: "onboarding",
    title: "Create your first approval",
    description: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    action: <Button size="sm">Create approval</Button>,
  },
};

export const AddLocations: Story = {
  name: "Onboarding / Add locations",
  args: {
    variant: "onboarding",
    title: "Add your locations",
    description: "Start adding your business locations to start tracking your reviews online & analyse all of it from one place in Reviews.",
    action: <Button size="sm">Add location</Button>,
  },
};

export const DashboardWidgets: Story = {
  name: "Onboarding / Dashboard widgets",
  args: {
    variant: "onboarding",
    title: "Your dashboard, your way",
    description: "Add widgets to your dashboard from an extensive collection across reviews, social and more.",
    action: <Button size="sm">Add widgets</Button>,
  },
};

export const AddContact: Story = {
  name: "Onboarding / Add contact",
  args: {
    variant: "onboarding",
    title: "Add contact",
    description: "Add a contact or upload .csv to upload contacts in bulk.",
    action: <Button size="sm">Add a contact</Button>,
    secondaryAction: <Button size="sm" variant="outline">Bulk import</Button>,
  },
};

// ── No results / No data ─────────────────────────────────────────────────────

export const NoResults: Story = {
  name: "No results found",
  args: {
    variant: "no-results",
    title: "No results found",
    description: "Try searching with other keywords.",
  },
};

export const NoData: Story = {
  name: "No data available",
  args: {
    variant: "no-data",
    title: "No data available",
    description: "This report does not have any data yet. Try checking back later.",
  },
};

// ── All variants — mirrors Figma layout ─────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Create your first approval", desc: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.", cta: "Create approval" },
          { title: "Add your locations", desc: "Start adding your business locations to start tracking your reviews online & analyse all of it from one place in Reviews.", cta: "Add location" },
          { title: "Your dashboard, your way", desc: "Add widgets to your dashboard from an extensive collection across reviews, social and more.", cta: "Add widgets" },
        ].map(({ title, desc, cta }) => (
          <div key={title} className="border border-border rounded-lg bg-background">
            <EmptyState variant="onboarding" title={title} description={desc} action={<Button size="sm">{cta}</Button>} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="onboarding" title="Create your first approval" description="Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates." action={<Button size="sm">Create approval</Button>} />
        </div>
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="onboarding" title="Add contact" description="Add a contact or upload .csv to upload contacts in bulk." action={<Button size="sm">Add a contact</Button>} secondaryAction={<Button size="sm" variant="outline">Bulk import</Button>} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="no-results" title="No results found" description="Try searching with other keywords." />
        </div>
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="no-data" title="No data available" description="This report does not have any data yet. Try checking back later." />
        </div>
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="no-results" title="No results found" description="Try searching with other keywords." />
        </div>
        <div className="border border-border rounded-lg bg-background">
          <EmptyState variant="no-data" title="No data available" description="This report does not have any data yet. Try checking back later." />
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  name: "In context",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-4 w-[480px]">
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Reviews</span>
          <span className="text-xs text-muted-foreground">0 results</span>
        </div>
        <EmptyState variant="no-results" title="No results found" description="Try searching with other keywords." />
      </div>
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">Performance report</span>
        </div>
        <EmptyState variant="no-data" title="No data available" description="This report does not have any data yet. Try checking back later." />
      </div>
    </div>
  ),
};
