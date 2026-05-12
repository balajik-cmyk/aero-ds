import type { Meta, StoryObj } from "@storybook/react";
import { toast, Toaster } from "@/app/components/ui/toast";
import { Button } from "@/app/components/ui/button";

const meta: Meta = {
  title: "UI/Toast",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast notifications built on Sonner. Mount `<Toaster />` once at the app root. Trigger toasts with `toast()` imperative API. Uses graph color tokens for semantic variants.",
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast("Changes to Entity name has been saved")}>
      Show toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success("New Agent has been added", {
          description: "Your agent is now live.",
        })
      }
    >
      Success toast
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast.error("Something went wrong", {
          description: "Please try again or contact support.",
        })
      }
    >
      Error toast
    </Button>
  ),
};

export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.warning("Review this before continuing")}
    >
      Warning toast
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Agent name has been deleted", {
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Toast with action
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Default message")}>Default</Button>
      <Button onClick={() => toast.success("Entity name has been added")}>Success</Button>
      <Button variant="destructive" onClick={() => toast.error("Something went wrong")}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning("Check before continuing")}>Warning</Button>
    </div>
  ),
};
