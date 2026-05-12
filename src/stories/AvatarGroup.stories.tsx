import type { Meta, StoryObj } from "@storybook/react";
import { AvatarGroup } from "@/app/components/ui/avatar-group";

const AVATARS = [
  { id: "1", fallback: "JD", src: "" },
  { id: "2", fallback: "AS", src: "" },
  { id: "3", fallback: "RK", src: "" },
  { id: "4", fallback: "ML", src: "" },
  { id: "5", fallback: "PQ", src: "" },
  { id: "6", fallback: "TW", src: "" },
];

const meta: Meta<typeof AvatarGroup> = {
  title: "UI/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    max:  { control: { type: "range", min: 1, max: 6 } },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: { avatars: AVATARS.slice(0, 3) },
};

export const WithMax: Story = {
  args: { avatars: AVATARS, max: 4 },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm" avatars={AVATARS} max={4} />
      <AvatarGroup size="md" avatars={AVATARS} max={4} />
      <AvatarGroup size="lg" avatars={AVATARS} max={4} />
    </div>
  ),
};

export const Mixed: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <AvatarGroup avatars={AVATARS.slice(0, 2)} />
      <AvatarGroup avatars={AVATARS.slice(0, 4)} max={3} />
      <AvatarGroup avatars={AVATARS} max={3} />
    </div>
  ),
};
