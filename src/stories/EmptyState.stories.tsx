import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/app/components/ui/empty-state";
import { Button } from "@/app/components/ui/button";

// Illustrations pulled directly from Figma node 13801:5290
// Stored locally in src/stories/assets/empty-state/
import imgApproval from "./assets/empty-state/approval.png";
import imgListings  from "./assets/empty-state/listings.png";
import imgReports   from "./assets/empty-state/reports.png";
import imgInbox     from "./assets/empty-state/inbox.png";
import imgContacts  from "./assets/empty-state/contacts.png";

const Illustration = ({ src, alt }: { src: string; alt: string }) => (
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

// ── Onboarding — with Figma illustrations ───────────────────────────────────

export const CreateApproval: Story = {
  name: "Onboarding / Create approval",
  args: {
    variant: "onboarding",
    title: "Create your first approval",
    description: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    illustration: <Illustration src={imgApproval} alt="Create approval illustration" />,
    action: <Button size="sm">Create approval</Button>,
  },
};

export const AddLocations: Story = {
  name: "Onboarding / Add locations",
  args: {
    variant: "onboarding",
    title: "Add your locations",
    description: "Start adding your business locations to start tracking your reviews online & analyse all of it from one place in Reviews.",
    illustration: <Illustration src={imgListings} alt="Add locations illustration" />,
    action: <Button size="sm">Add location</Button>,
  },
};

export const DashboardWidgets: Story = {
  name: "Onboarding / Dashboard widgets",
  args: {
    variant: "onboarding",
    title: "Your dashboard, your way",
    description: "Add widgets to your dashboard from an extensive collection across reviews, social and more.",
    illustration: <Illustration src={imgReports} alt="Dashboard widgets illustration" />,
    action: <Button size="sm">Add widgets</Button>,
  },
};

export const CreateInbox: Story = {
  name: "Onboarding / Create inbox",
  args: {
    variant: "onboarding",
    title: "Create your first approval",
    description: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.",
    illustration: <Illustration src={imgInbox} alt="Inbox illustration" />,
    action: <Button size="sm">Create approval</Button>,
  },
};

export const AddContact: Story = {
  name: "Onboarding / Add contact",
  args: {
    variant: "onboarding",
    title: "Add contact",
    description: "Add a contact or upload .csv to upload contacts in bulk.",
    illustration: <Illustration src={imgContacts} alt="Add contact illustration" />,
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

// ── All variants — mirrors Figma layout ─────────────────────────────────────

export const AllVariants: Story = {
  name: "All variants",
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">

      {/* Row 1 — 3 onboarding */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { title: "Create your first approval", desc: "Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates.", img: imgApproval, alt: "Approval", cta: "Create approval" },
          { title: "Add your locations", desc: "Start adding your business locations to start tracking your reviews online & analyse all of it from one place in Reviews.", img: imgListings, alt: "Listings", cta: "Add location" },
          { title: "Your dashboard, your way", desc: "Add widgets to your dashboard from an extensive collection across reviews, social and more.", img: imgReports, alt: "Reports", cta: "Add widgets" },
        ].map(({ title, desc, img, alt, cta }) => (
          <div key={title} className="border border-border rounded-lg bg-background">
            <EmptyState
              variant="onboarding"
              title={title}
              description={desc}
              illustration={<Illustration src={img} alt={alt} />}
              action={<Button size="sm">{cta}</Button>}
            />
          </div>
        ))}
      </div>

      {/* Row 2 — 2 onboarding */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-border rounded-lg bg-background">
          <EmptyState
            variant="onboarding"
            title="Create your first approval"
            description="Streamline collaboration in one place for all stakeholders, by assigning them tasks and receiving updates."
            illustration={<Illustration src={imgInbox} alt="Inbox" />}
            action={<Button size="sm">Create approval</Button>}
          />
        </div>
        <div className="border border-border rounded-lg bg-background">
          <EmptyState
            variant="onboarding"
            title="Add contact"
            description="Add a contact or upload .csv to upload contacts in bulk."
            illustration={<Illustration src={imgContacts} alt="Contacts" />}
            action={<Button size="sm">Add a contact</Button>}
            secondaryAction={<Button size="sm" variant="outline">Bulk import</Button>}
          />
        </div>
      </div>

      {/* Row 3 — no-data states */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { variant: "no-results" as const, title: "No results found", desc: "Try searching with other keywords." },
          { variant: "no-data" as const,    title: "No data available", desc: "This report does not have any data yet. Try checking back later." },
          { variant: "no-results" as const, title: "No results found", desc: "Try searching with other keywords." },
          { variant: "no-data" as const,    title: "No data available", desc: "This report does not have any data yet. Try checking back later." },
        ].map(({ variant, title, desc }, i) => (
          <div key={i} className="border border-border rounded-lg bg-background">
            <EmptyState variant={variant} title={title} description={desc} />
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
