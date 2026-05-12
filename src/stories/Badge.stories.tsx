import type { Meta, StoryObj } from "@storybook/react";
import { Badge, type BadgeColorPalette } from "@/app/components/ui/badge";

const COLORS: BadgeColorPalette[] = [
  "gray","red","orange","yellow","green","teal","blue","cyan","purple","pink"
];

const meta: Meta<typeof Badge> = {
  title: "Components/Status indicators/Badge/Examples",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant:      { control: "select", options: ["solid","subtle","outline","surface","plain","default","secondary","destructive","success","warning"] },
    colorPalette: { control: "select", options: COLORS },
    size:         { control: "select", options: ["xs","sm","md","lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const Solid: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} variant="solid" colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};

export const Subtle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} variant="subtle" colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} variant="outline" colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};

export const Surface: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} variant="surface" colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};

export const Plain: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} variant="plain" colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["solid","subtle","outline","surface","plain"] as const).map(v => (
        <div key={v} className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-xs text-muted-foreground shrink-0">{v}</span>
          {COLORS.map(c => (
            <Badge key={c} variant={v} colorPalette={c}>{c}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="xs" variant="subtle" colorPalette="blue">xs</Badge>
      <Badge size="sm" variant="subtle" colorPalette="blue">sm</Badge>
      <Badge size="md" variant="subtle" colorPalette="blue">md</Badge>
      <Badge size="lg" variant="subtle" colorPalette="blue">lg</Badge>
    </div>
  ),
};

export const Semantic: Story = {
  name: "Semantic / legacy",
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="subtle" colorPalette="purple">Purple</Badge>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">Review response agent</span>
        <Badge variant="subtle" colorPalette="green">Active</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">Campaign bot</span>
        <Badge variant="subtle" colorPalette="orange">Paused</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">NPS agent</span>
        <Badge variant="subtle" colorPalette="red">Error</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">Inbox manager</span>
        <Badge variant="solid" colorPalette="blue">New</Badge>
      </div>
    </div>
  ),
};
