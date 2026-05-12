import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stepper } from "@/app/components/ui/stepper";
import { Button } from "@/app/components/ui/button";

const STEPS = [
  { id: "details",  label: "Agent details",  description: "Name and description" },
  { id: "triggers", label: "Triggers",        description: "When to activate" },
  { id: "actions",  label: "Actions",         description: "What to do" },
  { id: "review",   label: "Review",          description: "Check before saving" },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Complex/Stepper/Examples",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    currentStep:  { control: { type: "range", min: 0, max: 3 } },
  },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: { steps: STEPS, currentStep: 1 },
};

export const Vertical: Story = {
  args: { steps: STEPS, currentStep: 2, orientation: "vertical" },
};

export const Completed: Story = {
  args: { steps: STEPS, currentStep: 4 },
};

export const ValidationStates: Story = {
  render: () => (
    <Stepper
      steps={[
        { id: "1", label: "Details",  status: "completed" },
        { id: "2", label: "Triggers", status: "error", description: "Fix required" },
        { id: "3", label: "Actions",  status: "current" },
        { id: "4", label: "Review",   status: "upcoming" },
      ]}
    />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [step, setStep] = useState(0);
    return (
      <div className="flex flex-col items-center gap-6 w-[420px]">
        <Stepper steps={STEPS} currentStep={step} className="w-full" />
        <div className="rounded-lg border border-border p-6 w-full text-sm text-muted-foreground text-center">
          Step {step + 1}: {STEPS[step]?.label}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Back</Button>
          <Button size="sm" disabled={step === STEPS.length - 1} onClick={() => setStep(s => s + 1)}>
            {step === STEPS.length - 2 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    );
  },
};
