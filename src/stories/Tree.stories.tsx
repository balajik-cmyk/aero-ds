import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tree } from "@/app/components/ui/tree";
import { Folder, File, Star } from "@phosphor-icons/react";

const NODES = [
  {
    id: "reviews",
    label: "Reviews",
    icon: <Folder size={14} />,
    children: [
      { id: "google",   label: "Google",   icon: <File size={14} /> },
      { id: "yelp",     label: "Yelp",     icon: <File size={14} /> },
      { id: "facebook", label: "Facebook", icon: <File size={14} /> },
    ],
  },
  {
    id: "agents",
    label: "Agents",
    icon: <Folder size={14} />,
    children: [
      { id: "responder",  label: "Review Responder", icon: <Star size={14} /> },
      { id: "inbox",      label: "Inbox Manager",    icon: <Star size={14} /> },
      { id: "campaigns",  label: "Campaign Bot",     icon: <Star size={14} />, disabled: true },
    ],
  },
  { id: "dashboard", label: "Dashboard", icon: <File size={14} /> },
];

const meta: Meta<typeof Tree> = {
  title: "UI/Tree",
  component: Tree,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    multiSelect: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Tree>;

export const Default: Story = {
  args: {
    nodes: NODES,
    defaultExpandedIds: ["reviews"],
    defaultSelectedIds: ["google"],
    className: "w-56",
  },
};

export const Selectable: Story = {
  render: () => {
    const [selected, setSelected] = useState(["google"]);
    return (
      <div className="flex flex-col gap-3">
        <Tree
          nodes={NODES}
          defaultExpandedIds={["reviews", "agents"]}
          selectedIds={selected}
          onSelect={setSelected}
          className="w-56"
        />
        <p className="text-xs text-muted-foreground">Selected: {selected.join(", ") || "none"}</p>
      </div>
    );
  },
};

export const MultiSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="flex flex-col gap-3">
        <Tree
          nodes={NODES}
          defaultExpandedIds={["reviews", "agents"]}
          selectedIds={selected}
          onSelect={setSelected}
          multiSelect
          className="w-56"
        />
        <p className="text-xs text-muted-foreground">
          Selected ({selected.length}): {selected.join(", ") || "none"}
        </p>
      </div>
    );
  },
};

export const Expandable: Story = {
  args: {
    nodes: NODES,
    defaultExpandedIds: [],
    className: "w-56",
  },
};
