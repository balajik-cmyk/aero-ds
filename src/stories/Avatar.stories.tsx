import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, type AvatarColorPalette } from "@/app/components/ui/avatar";

const COLORS: AvatarColorPalette[] = [
  "gray","red","orange","yellow","green","teal","blue","cyan","purple","pink"
];

const meta: Meta<typeof Avatar> = {
  title: "Components/Images and icons/Avatar/Examples",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size:  { control: "select", options: ["xs","sm","md","lg","xl","2xl"] },
    shape: { control: "select", options: ["full","rounded","square"] },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback colorPalette="blue">AB</AvatarFallback>
    </Avatar>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {COLORS.map(c => (
        <Avatar key={c}>
          <AvatarFallback colorPalette={c}>AB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["xs","sm","md","lg","xl","2xl"] as const).map(s => (
        <Avatar key={s} size={s}>
          <AvatarFallback colorPalette="blue">AB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const WithOnlineDot: Story = {
  render: () => (
    <div className="flex gap-3">
      {(["green","blue","orange","purple"] as AvatarColorPalette[]).map(c => (
        <div key={c} className="relative inline-flex">
          <Avatar>
            <AvatarFallback colorPalette={c}>AB</AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[var(--graph-green)] ring-2 ring-background" />
        </div>
      ))}
    </div>
  ),
};

export const AutoColor: Story = {
  name: "Auto color from name",
  render: () => (
    <div className="flex flex-wrap gap-3">
      {["Alice B","Carlos D","Emma F","George H","Irene J","Kevin L","Maya N"].map(name => (
        <Avatar key={name}>
          <AvatarFallback name={name} />
        </Avatar>
      ))}
    </div>
  ),
};

export const WithPhoto: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/100?img=1" alt="User" />
        <AvatarFallback colorPalette="blue">AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/100?img=2" alt="User" />
        <AvatarFallback colorPalette="green">CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/broken.jpg" alt="User" />
        <AvatarFallback colorPalette="orange">EF</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="full"><AvatarFallback colorPalette="blue">AB</AvatarFallback></Avatar>
      <Avatar shape="rounded"><AvatarFallback colorPalette="green">AB</AvatarFallback></Avatar>
      <Avatar shape="square"><AvatarFallback colorPalette="purple">AB</AvatarFallback></Avatar>
    </div>
  ),
};
