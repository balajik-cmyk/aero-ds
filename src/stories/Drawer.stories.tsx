import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AccountSettingsSheetStoryDemo } from "@/stories/App/Settings/AccountSettingsSheetStoryDemo";
import { SocialPostPreviewSheet } from "@/app/components/social/SocialPostPreviewSheet";
import type { SocialCalendarPost } from "@/app/components/social/socialPostShared";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

const meta: Meta = {
  title: "Components/Overlays and layering/Drawer/Examples",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
  },
};
export default meta;
type Story = StoryObj;

export const FloatingSm: Story = {
  name: "Floating / sm (340px)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open sm</Button></SheetTrigger>
      <SheetContent side="right" inset="floating" floatingSize="sm">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
          <SheetDescription>340px floating panel with rounded corners.</SheetDescription>
        </SheetHeader>
        <div className="py-4 px-4 text-sm text-muted-foreground">Content area.</div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FloatingMd: Story = {
  name: "Floating / md (480px)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open md</Button></SheetTrigger>
      <SheetContent side="right" inset="floating" floatingSize="md">
        <SheetHeader>
          <SheetTitle>Add a contact</SheetTitle>
          <SheetDescription>480px — standard form panel.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="space-y-2"><Label htmlFor="d-name">Name</Label><Input id="d-name" placeholder="Full name" /></div>
          <div className="space-y-2"><Label htmlFor="d-email">Email</Label><Input id="d-email" placeholder="name@company.com" type="email" /></div>
          <div className="space-y-2"><Label htmlFor="d-phone">Phone</Label><Input id="d-phone" placeholder="Phone number" type="tel" /></div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FloatingLg: Story = {
  name: "Floating / lg (640px)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open lg</Button></SheetTrigger>
      <SheetContent side="right" inset="floating" floatingSize="lg">
        <SheetHeader>
          <SheetTitle>Review details</SheetTitle>
          <SheetDescription>640px — wide panel for rich content.</SheetDescription>
        </SheetHeader>
        <div className="py-4 px-4 text-sm text-muted-foreground">Extended content area.</div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Close</Button></SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// ── Designed previews ─────────────────────────────────────────────────────────

export const AccountSettings: Story = {
  name: "Preview / Account settings",
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Full designed drawer — profile + password fields, fixed header, scrollable body, sticky footer. Uses `FloatingSheetFrame` + `inset=\"floating\" floatingSize=\"md\"`.",
      },
    },
  },
  render: () => <AccountSettingsSheetStoryDemo />,
};

const MOCK_POST: SocialCalendarPost = {
  id: "drawer-preview-1",
  time: "12:48 PM",
  platform: "facebook",
  text: "McDonald's meals in every celebration that brings smiles, happiness, and togetherness.",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop&auto=format",
  aiScheduled: [{ time: "6:48 PM" }, { time: "10:48 PM" }],
};

export const SocialPostPreview: Story = {
  name: "Preview / Social post",
  parameters: {
    layout: "centered",
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story: "Social post preview drawer — 480px floating sheet with `FloatingSheetFrame`.",
      },
    },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <Button variant="outline" onClick={() => setOpen(true)}>Open social post preview</Button>
        <SocialPostPreviewSheet open={open} onOpenChange={setOpen} post={MOCK_POST} />
      </div>
    );
  },
};
