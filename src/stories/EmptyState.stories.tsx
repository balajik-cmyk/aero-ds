import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/app/components/ui/empty-state";
import { Button } from "@/app/components/ui/button";

// Illustration-only assets — card graphic without hardcoded text
// Fetched from Figma sub-nodes (237×205px), text/CTA rendered by component
import illusApproval from "./assets/empty-state/illus-approval.png";
import illusListings  from "./assets/empty-state/illus-listings.png";
import illusReports   from "./assets/empty-state/illus-reports.png";
import illusInbox     from "./assets/empty-state/illus-inbox.png";
import illusContacts  from "./assets/empty-state/illus-contacts.png";

const Illus = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="w-[218px] h-auto" draggable={false} />
);

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

// ── Onboarding — illustration from Figma, text from component ────────────────

export const CreateApproval: Story = {
  name: "Onboarding / Create approval",
  args: {
    variant: "onboarding",
    illustration: <Illus src={illusApproval} alt="" />,
    title: "Create your first approval",
    description: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    action: <Button size="sm">Create approval</Button>,
  },
};

export const AddLocations: Story = {
  name: "Onboarding / Add locations",
  args: {
    variant: "onboarding",
    illustration: <Illus src={illusListings} alt="" />,
    title: "Add your locations",
    description: "Start adding your business locations to start tracking your reviews online & analyse all of it from one place in Reviews.",
    action: <Button size="sm">Add location</Button>,
  },
};

export const DashboardWidgets: Story = {
  name: "Onboarding / Dashboard widgets",
  args: {
    variant: "onboarding",
    illustration: <Illus src={illusReports} alt="" />,
    title: "Your dashboard, your way",
    description: "Add widgets to your dashboard from an extensive collection across reviews, social and more.",
    action: <Button size="sm">Add widgets</Button>,
  },
};

export const CreateInbox: Story = {
  name: "Onboarding / Create inbox",
  args: {
    variant: "onboarding",
    illustration: <Illus src={illusInbox} alt="" />,
    title: "Create your first approval",
    description: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    action: <Button size="sm">Create approval</Button>,
  },
};

export const AddContact: Story = {
  name: "Onboarding / Add contact",
  args: {
    variant: "onboarding",
    illustration: <Illus src={illusContacts} alt="" />,
    title: "Add contact",
    description: "Add a contact or upload .csv to upload contacts in bulk.",
    action: <Button size="sm">Add a contact</Button>,
    secondaryAction: <Button size="sm" variant="outline">Bulk import</Button>,
  },
};

// ── No data states ───────────────────────────────────────────────────────────

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

// ── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="grid grid-cols-3 gap-4">
        {[
          { illus: illusApproval, title: "Create your first approval", desc: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.", cta: "Create approval" },
          { illus: illusListings,  title: "Add your locations", desc: "Start adding your business locations to start tracking your reviews online.", cta: "Add location" },
          { illus: illusReports,   title: "Your dashboard, your way", desc: "Add widgets to your dashboard from an extensive collection across reviews, social and more.", cta: "Add widgets" },
        ].map(({ illus, title, desc, cta }) => (
          <div key={title} className="border border-border rounded-lg bg-background overflow-hidden">
            <EmptyState variant="onboarding" illustration={<Illus src={illus} alt="" />} title={title} description={desc} action={<Button size="sm">{cta}</Button>} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-border rounded-lg bg-background overflow-hidden">
          <EmptyState variant="onboarding" illustration={<Illus src={illusInbox} alt="" />} title="Create your first approval" description="Streamline collaboration in one place for all stakeholders." action={<Button size="sm">Create approval</Button>} />
        </div>
        <div className="border border-border rounded-lg bg-background overflow-hidden">
          <EmptyState variant="onboarding" illustration={<Illus src={illusContacts} alt="" />} title="Add contact" description="Add a contact or upload .csv to upload contacts in bulk." action={<Button size="sm">Add a contact</Button>} secondaryAction={<Button size="sm" variant="outline">Bulk import</Button>} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {[
          { v: "no-results" as const, t: "No results found",  d: "Try searching with other keywords." },
          { v: "no-data"    as const, t: "No data available", d: "This report does not have any data yet. Try checking back later." },
          { v: "no-results" as const, t: "No results found",  d: "Try searching with other keywords." },
          { v: "no-data"    as const, t: "No data available", d: "This report does not have any data yet. Try checking back later." },
        ].map(({ v, t, d }, i) => (
          <div key={i} className="border border-border rounded-lg bg-background">
            <EmptyState variant={v} title={t} description={d} />
          </div>
        ))}
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
