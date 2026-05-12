import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "@/app/components/ui/search";
import { useState } from "react";

const meta: Meta<typeof Search> = {
  title: "UI/Search/Examples",
  component: Search,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    shortcut: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: { placeholder: "Search...", className: "w-64" },
};

export const WithShortcut: Story = {
  args: { placeholder: "Search...", shortcut: "⌘K", className: "w-64" },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("birdeye reviews");
    return (
      <Search
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        className="w-64"
        placeholder="Search..."
      />
    );
  },
};

export const Disabled: Story = {
  args: { placeholder: "Search...", disabled: true, className: "w-64" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      <Search placeholder="Default search..." />
      <Search placeholder="With shortcut..." shortcut="⌘K" />
      <Search placeholder="Disabled..." disabled />
    </div>
  ),
};
