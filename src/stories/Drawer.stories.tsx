import type { Meta, StoryObj } from "@storybook/react";
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
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

// ── Side variants ─────────────────────────────────────────────────────────────

export const Right: Story = {
  name: "Side / Right (default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Edit business profile</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Update your business information.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2"><Label htmlFor="biz-name">Business name</Label><Input id="biz-name" defaultValue="Acme Coffee Roasters" /></div>
          <div className="space-y-2"><Label htmlFor="biz-phone">Phone</Label><Input id="biz-phone" defaultValue="+1 (512) 555-0100" type="tel" /></div>
          <div className="space-y-2"><Label htmlFor="biz-address">Address</Label><Input id="biz-address" defaultValue="123 Main St, Austin, TX 78701" /></div>
          <div className="space-y-2"><Label htmlFor="biz-website">Website</Label><Input id="biz-website" defaultValue="https://acmecoffee.com" type="url" /></div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  name: "Side / Left",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open navigation</Button></SheetTrigger>
      <SheetContent side="left">
        <SheetHeader><SheetTitle>Navigation</SheetTitle></SheetHeader>
        <nav className="mt-4 flex flex-col gap-1">
          {["Dashboard","Reviews","Inbox","Contacts","Campaigns","Reports","Settings"].map(item => (
            <SheetClose key={item} asChild>
              <a href="#" className="rounded-md px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">{item}</a>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  name: "Side / Top",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">View notifications</Button></SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Recent notifications</SheetTitle>
          <SheetDescription>You have 3 unread notifications.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          {[
            { msg: "New 5-star review from Google", time: "2 minutes ago" },
            { msg: "Review request campaign delivered to 48 contacts", time: "1 hour ago" },
            { msg: "Monthly performance report is ready", time: "Yesterday" },
          ].map(n => (
            <div key={n.msg} className="flex items-start gap-4 rounded-md border border-border bg-muted px-4 py-2">
              <div><p className="text-sm text-foreground">{n.msg}</p><p className="text-xs text-muted-foreground mt-0.5">{n.time}</p></div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  name: "Side / Bottom",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Bulk actions</Button></SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bulk review actions</SheetTitle>
          <SheetDescription>Apply an action to all 14 selected reviews.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button variant="outline">Mark as responded</Button>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Export selected</Button>
          <Button variant="destructive">Delete selected</Button>
        </div>
        <SheetFooter className="mt-4">
          <SheetClose asChild><Button variant="ghost">Cancel</Button></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// ── Floating sizes (right-rail pattern) ─────────────────────────────────────

export const FloatingSm: Story = {
  name: "Floating / sm",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open sm drawer</Button></SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader><SheetTitle>Quick view</SheetTitle><SheetDescription>Small floating panel (320px).</SheetDescription></SheetHeader>
        <div className="py-4 text-sm text-muted-foreground">Content goes here.</div>
        <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FloatingMd: Story = {
  name: "Floating / md (default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open md drawer</Button></SheetTrigger>
      <SheetContent side="right" className="w-[480px]">
        <SheetHeader><SheetTitle>Add a contact</SheetTitle><SheetDescription>Fill in the contact details below.</SheetDescription></SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2"><Label htmlFor="f-name">Name</Label><Input id="f-name" placeholder="Full name" /></div>
          <div className="space-y-2"><Label htmlFor="f-email">Email</Label><Input id="f-email" placeholder="name@company.com" type="email" /></div>
          <div className="space-y-2"><Label htmlFor="f-phone">Phone</Label><Input id="f-phone" placeholder="Phone number" type="tel" /></div>
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
  name: "Floating / lg",
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open lg drawer</Button></SheetTrigger>
      <SheetContent side="right" className="w-[640px]">
        <SheetHeader><SheetTitle>Review details</SheetTitle><SheetDescription>Large panel (640px) for rich content.</SheetDescription></SheetHeader>
        <div className="py-4 text-sm text-muted-foreground">Extended content area.</div>
        <SheetFooter><SheetClose asChild><Button variant="outline">Close</Button></SheetClose><Button>Save</Button></SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// ── Floating inset (rounded, inset from screen edges) ────────────────────────

export const FloatingSmInset: Story = {
  name: "Floating inset / sm (340px)",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open sm floating drawer</Button></SheetTrigger>
      <SheetContent side="right" inset="floating" floatingSize="sm">
        <SheetHeader>
          <SheetTitle>Quick actions</SheetTitle>
          <SheetDescription>340px — small floating panel with rounded corners.</SheetDescription>
        </SheetHeader>
        <div className="py-4 text-sm text-muted-foreground px-4">Content area.</div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FloatingMdInset: Story = {
  name: "Floating inset / md (480px) — default",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open md floating drawer</Button></SheetTrigger>
      <SheetContent side="right" inset="floating" floatingSize="md">
        <SheetHeader>
          <SheetTitle>Add a contact</SheetTitle>
          <SheetDescription>480px — standard form panel. Rounded, inset from screen edges.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-4">
          <div className="space-y-2"><Label htmlFor="fi-name">Name</Label><Input id="fi-name" placeholder="Full name" /></div>
          <div className="space-y-2"><Label htmlFor="fi-email">Email</Label><Input id="fi-email" placeholder="name@company.com" type="email" /></div>
          <div className="space-y-2"><Label htmlFor="fi-phone">Phone</Label><Input id="fi-phone" placeholder="Phone number" type="tel" /></div>
        </div>
        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Cancel</Button></SheetClose>
          <Button>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FloatingLgInset: Story = {
  name: "Floating inset / lg (640px)",
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open lg floating drawer</Button></SheetTrigger>
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
