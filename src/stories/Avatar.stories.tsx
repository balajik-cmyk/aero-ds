import type { Meta, StoryObj } from "@storybook/react";
import { User } from "@phosphor-icons/react";
import { Avatar, AvatarImage, AvatarFallback, type AvatarColorPalette } from "@/app/components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Images and icons/Avatar/Examples",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

const PALETTES: AvatarColorPalette[] = [
  "gray", "red", "green", "blue", "teal",
  "pink", "purple", "cyan", "orange", "yellow",
];

export const Colors: Story = {
  name: "Colors",
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        Use the <code className="bg-muted px-1 rounded text-xs">colorPalette</code> prop to change the color of the avatar
      </p>
      <div className="flex flex-col gap-3">
        {PALETTES.map((palette) => (
          <div key={palette} className="flex items-center gap-4">
            <span className="w-16 text-sm text-muted-foreground">{palette}</span>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback colorPalette={palette}>SA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback colorPalette={palette} className="text-sm font-medium">SA</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback colorPalette={palette}>
                <User size={20} />
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AvatarStack: Story = {
  render: () => (
    <div className="flex -space-x-2">
      {(["JD", "AB", "MK", "TL"] as const).map((initials, i) => (
        <Avatar key={initials} className="border-2 border-background">
          <AvatarFallback colorPalette={PALETTES[i]} className="text-xs">{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
