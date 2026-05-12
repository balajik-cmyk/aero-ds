import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/app/components/ui/empty-state";
import { Button } from "@/app/components/ui/button";

// Illustrations pulled from Figma node 13801:5290 — full card PNGs
import imgApproval from "./assets/empty-state/approval.png";
import imgListings  from "./assets/empty-state/listings.png";
import imgReports   from "./assets/empty-state/reports.png";
import imgInbox     from "./assets/empty-state/inbox.png";
import imgContacts  from "./assets/empty-state/contacts.png";

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

// ── Onboarding — Figma illustrations (full card, text+CTA already in image) ──
// No title/description/action props — they're baked into the illustration PNG.

export const CreateApproval: Story = {
  name: "Onboarding / Create approval",
  render: () => <img src={imgApproval} alt="Create your first approval" className="w-[600px]" draggable={false} />,
};

export const AddLocations: Story = {
  name: "Onboarding / Add locations",
  render: () => <img src={imgListings} alt="Add your locations" className="w-[600px]" draggable={false} />,
};

export const DashboardWidgets: Story = {
  name: "Onboarding / Dashboard widgets",
  render: () => <img src={imgReports} alt="Your dashboard, your way" className="w-[600px]" draggable={false} />,
};

export const CreateInbox: Story = {
  name: "Onboarding / Create inbox",
  render: () => <img src={imgInbox} alt="Create your first approval — inbox" className="w-[600px]" draggable={false} />,
};

export const AddContact: Story = {
  name: "Onboarding / Add contact",
  render: () => <img src={imgContacts} alt="Add contact" className="w-[600px]" draggable={false} />,
};

// ── No data states (component renders icon + text) ───────────────────────────

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

      {/* Row 1 — 3 onboarding full-card illustrations */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { src: imgApproval, alt: "Create your first approval" },
          { src: imgListings,  alt: "Add your locations" },
          { src: imgReports,   alt: "Your dashboard, your way" },
        ].map(({ src, alt }) => (
          <div key={alt} className="border border-border rounded-lg bg-background overflow-hidden">
            <img src={src} alt={alt} className="w-full" draggable={false} />
          </div>
        ))}
      </div>

      {/* Row 2 — 2 onboarding */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { src: imgInbox,    alt: "Create your first approval — inbox" },
          { src: imgContacts, alt: "Add contact" },
        ].map(({ src, alt }) => (
          <div key={alt} className="border border-border rounded-lg bg-background overflow-hidden">
            <img src={src} alt={alt} className="w-full" draggable={false} />
          </div>
        ))}
      </div>

      {/* Row 3 — no-data states (icon-based, no illustration) */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { variant: "no-results" as const, title: "No results found",  desc: "Try searching with other keywords." },
          { variant: "no-data"    as const, title: "No data available", desc: "This report does not have any data yet. Try checking back later." },
          { variant: "no-results" as const, title: "No results found",  desc: "Try searching with other keywords." },
          { variant: "no-data"    as const, title: "No data available", desc: "This report does not have any data yet. Try checking back later." },
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
