import type { Meta, StoryObj } from "@storybook/react";
import { PaymentsView } from "@/app/components/PaymentsView";

const meta: Meta<typeof PaymentsView> = {
  title: "App/Views/PaymentsView",
  component: PaymentsView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Payments destination used by the top-bar quick-create launcher. It models collections, payout health, and transaction status inside the aero-ds shell.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentsView>;

export const Default: Story = {};
