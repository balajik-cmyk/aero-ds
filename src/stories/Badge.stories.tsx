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
    colorPalette: { control: "select", options: COLORS },
    size:         { control: "select", options: ["xs","sm","md","lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "Badge", colorPalette: "blue" },
};
export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {COLORS.map(c => <Badge key={c} colorPalette={c}>{c}</Badge>)}
    </div>
  ),
};
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="xs" colorPalette="blue">xs</Badge>
      <Badge size="sm" colorPalette="blue">sm</Badge>
      <Badge size="md" colorPalette="blue">md</Badge>
      <Badge size="lg" colorPalette="blue">lg</Badge>
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
    </div>
  ),
};
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">Review agent</span>
        <Badge colorPalette="green">Active</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">Campaign bot</span>
        <Badge colorPalette="orange">Paused</Badge>
      </div>
      <div className="flex items-center justify-between p-3 rounded-lg border border-border">
        <span className="text-sm text-foreground">NPS agent</span>
        <Badge colorPalette="red">Error</Badge>
      </div>
    </div>
  ),
};
