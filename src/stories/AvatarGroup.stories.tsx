import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback, pickColorPalette } from "@/app/components/ui/avatar";
import { AvatarGroup } from "@/app/components/ui/avatar-group";

const AVATARS = [
  { id: "1", fallback: "JD", src: "" },
  { id: "2", fallback: "AS", src: "" },
  { id: "3", fallback: "RK", src: "" },
  { id: "4", fallback: "ML", src: "" },
  { id: "5", fallback: "PQ", src: "" },
  { id: "6", fallback: "TW", src: "" },
];

const IMG = (n: number) => `https://i.pravatar.cc/150?img=${n}`;

const NAMES = [
  "Naruto Uzumaki",
  "Sakura Haruno",
  "Kakashi Hatake",
  "Hinata Hyuga",
  "Shikamaru Nara",
];

const meta: Meta<typeof AvatarGroup> = {
  title: "Components/Images and icons/AvatarGroup/Examples",
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

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { avatars: AVATARS.slice(0, 3) },
};

// ── With Max ─────────────────────────────────────────────────────────────────

export const WithMax: Story = {
  args: { avatars: AVATARS, max: 4 },
};

// ── All Sizes ─────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm" avatars={AVATARS} max={4} />
      <AvatarGroup size="md" avatars={AVATARS} max={4} />
      <AvatarGroup size="lg" avatars={AVATARS} max={4} />
    </div>
  ),
};

// ── Group (with images) ───────────────────────────────────────────────────────

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-3">
      {[IMG(5), IMG(14), IMG(22)].map((src, i) => (
        <Avatar key={src} size="lg" className="ring-2 ring-background">
          <AvatarImage src={src} alt="User" />
          <AvatarFallback name={NAMES[i]} colorPalette={pickColorPalette(NAMES[i])} />
        </Avatar>
      ))}
      <Avatar size="lg" className="ring-2 ring-background">
        <AvatarFallback colorPalette="gray" className="text-sm">+3</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// ── Overflow ─────────────────────────────────────────────────────────────────

const MAX_VISIBLE = 3;

export const Overflow: Story = {
  render: () => {
    const visible = NAMES.slice(0, MAX_VISIBLE);
    const hidden  = NAMES.slice(MAX_VISIBLE);
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {visible.map((name) => (
            <Avatar key={name} className="ring-2 ring-background" title={name}>
              <AvatarFallback name={name} colorPalette={pickColorPalette(name)} />
            </Avatar>
          ))}
        </div>
        {hidden.length > 0 && (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background">
            +{hidden.length}
          </span>
        )}
      </div>
    );
  },
};

// ── Group Stacking ────────────────────────────────────────────────────────────

export const GroupStacking: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">Last on top (default)</span>
        <div className="flex -space-x-3">
          {[IMG(5), IMG(14), IMG(22)].map((src, i) => (
            <Avatar key={src} size="lg" className="ring-2 ring-background" style={{ zIndex: i + 1 }}>
              <AvatarImage src={src} alt="User" />
              <AvatarFallback name={NAMES[i]} colorPalette={pickColorPalette(NAMES[i])} />
            </Avatar>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">First on top</span>
        <div className="flex -space-x-3">
          {[IMG(5), IMG(14), IMG(22)].map((src, i, arr) => (
            <Avatar key={src} size="lg" className="ring-2 ring-background" style={{ zIndex: arr.length - i }}>
              <AvatarImage src={src} alt="User" />
              <AvatarFallback name={NAMES[i]} colorPalette={pickColorPalette(NAMES[i])} />
            </Avatar>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">No overlap</span>
        <div className="flex gap-1">
          {[IMG(5), IMG(14), IMG(22)].map((src, i) => (
            <Avatar key={src} size="lg">
              <AvatarImage src={src} alt="User" />
              <AvatarFallback name={NAMES[i]} colorPalette={pickColorPalette(NAMES[i])} />
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  ),
};

// ── Mixed ─────────────────────────────────────────────────────────────────────

export const Mixed: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <AvatarGroup avatars={AVATARS.slice(0, 2)} />
      <AvatarGroup avatars={AVATARS.slice(0, 4)} max={3} />
      <AvatarGroup avatars={AVATARS} max={3} />
    </div>
  ),
};
