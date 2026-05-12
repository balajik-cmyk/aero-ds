import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckboxGroup } from "@/app/components/ui/checkbox-group";
import { userEvent, within, expect } from "@storybook/test";

const PLATFORMS = [
  { id: "google",    label: "Google",    description: "Google Business Profile" },
  { id: "facebook",  label: "Facebook",  description: "Facebook Business Page" },
  { id: "yelp",      label: "Yelp",      description: "Yelp for Business" },
  { id: "linkedin",  label: "LinkedIn",  description: "LinkedIn Company Page" },
];

const meta: Meta<typeof CheckboxGroup> = {
  title: "UI/CheckboxGroup/Examples",
  component: CheckboxGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    selectAll: { control: "boolean" },
    error: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  args: {
    label: "Platforms",
    items: PLATFORMS,
    defaultValue: ["google"],
  },
};

export const SelectAll: Story = {
  args: {
    label: "Select platforms to monitor",
    items: PLATFORMS,
    selectAll: true,
    defaultValue: ["google", "facebook"],
  },
};

export const AllSelected: Story = {
  args: {
    label: "Select platforms",
    items: PLATFORMS,
    selectAll: true,
    defaultValue: ["google", "facebook", "yelp", "linkedin"],
  },
};

export const ErrorState: Story = {
  args: {
    label: "Select at least one platform",
    items: PLATFORMS,
    selectAll: true,
    error: "Please select at least one platform to continue.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Platforms (disabled)",
    items: PLATFORMS,
    selectAll: true,
    disabled: true,
    defaultValue: ["google"],
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(["google"]);
    return (
      <div className="flex flex-col gap-4">
        <CheckboxGroup
          label="Controlled selection"
          items={PLATFORMS}
          selectAll
          value={value}
          onChange={setValue}
        />
        <p className="text-xs text-muted-foreground">
          Selected: {value.length ? value.join(", ") : "none"}
        </p>
      </div>
    );
  },
};

export const ToggleAll: Story = {
  args: {
    label: "Select platforms",
    items: PLATFORMS,
    selectAll: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectAll = canvas.getByLabelText("Select all");
    await userEvent.click(selectAll);
    await expect(selectAll).toBeChecked();
  },
};
