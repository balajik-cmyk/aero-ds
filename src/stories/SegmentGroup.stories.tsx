import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SegmentGroup, SegmentGroupItem } from "@/app/components/ui/segment-group";

const meta: Meta<typeof SegmentGroup> = {
  title: "Components/Forms and input/SegmentGroup/Examples",
  component: SegmentGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size:     { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof SegmentGroup>;

export const Default: Story = {
  render: () => (
    <SegmentGroup defaultValue="week">
      <SegmentGroupItem value="day">Day</SegmentGroupItem>
      <SegmentGroupItem value="week">Week</SegmentGroupItem>
      <SegmentGroupItem value="month">Month</SegmentGroupItem>
    </SegmentGroup>
  ),
};

export const TwoItems: Story = {
  name: "Two items",
  render: () => (
    <SegmentGroup defaultValue="list">
      <SegmentGroupItem value="list">List</SegmentGroupItem>
      <SegmentGroupItem value="grid">Grid</SegmentGroupItem>
    </SegmentGroup>
  ),
};

export const FourItems: Story = {
  name: "Four items",
  render: () => (
    <SegmentGroup defaultValue="week">
      <SegmentGroupItem value="day">Day</SegmentGroupItem>
      <SegmentGroupItem value="week">Week</SegmentGroupItem>
      <SegmentGroupItem value="month">Month</SegmentGroupItem>
      <SegmentGroupItem value="year">Year</SegmentGroupItem>
    </SegmentGroup>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("reviews");
    return (
      <div className="flex flex-col items-center gap-3">
        <SegmentGroup value={value} onValueChange={v => v && setValue(v)}>
          <SegmentGroupItem value="reviews">Reviews</SegmentGroupItem>
          <SegmentGroupItem value="responses">Responses</SegmentGroupItem>
          <SegmentGroupItem value="analytics">Analytics</SegmentGroupItem>
        </SegmentGroup>
        <p className="text-xs text-muted-foreground">
          Selected: <span className="text-foreground">{value}</span>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      {(["sm", "md", "lg"] as const).map(size => (
        <div key={size} className="flex items-center gap-3">
          <span className="w-6 text-xs text-muted-foreground">{size}</span>
          <SegmentGroup size={size} defaultValue="b">
            <SegmentGroupItem value="a">Option A</SegmentGroupItem>
            <SegmentGroupItem value="b">Option B</SegmentGroupItem>
            <SegmentGroupItem value="c">Option C</SegmentGroupItem>
          </SegmentGroup>
        </div>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SegmentGroup defaultValue="week" disabled>
      <SegmentGroupItem value="day">Day</SegmentGroupItem>
      <SegmentGroupItem value="week">Week</SegmentGroupItem>
      <SegmentGroupItem value="month">Month</SegmentGroupItem>
    </SegmentGroup>
  ),
};

export const InContext: Story = {
  name: "In context",
  parameters: { layout: "padded" },
  render: () => {
    const [view, setView] = useState("list");
    return (
      <div className="w-[480px] rounded-lg border border-border bg-background overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">Reviews</span>
          <SegmentGroup size="sm" value={view} onValueChange={v => v && setView(v)}>
            <SegmentGroupItem value="list">List</SegmentGroupItem>
            <SegmentGroupItem value="grid">Grid</SegmentGroupItem>
          </SegmentGroup>
        </div>
        <div className="p-4 text-xs text-muted-foreground">
          Showing {view} view
        </div>
      </div>
    );
  },
};
