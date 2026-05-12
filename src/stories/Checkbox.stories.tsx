import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    checked:  { control: "select", options: [true, false, "indeterminate"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Single states ──────────────────────────────────────────────────────────

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

export const DisabledIndeterminate: Story = {
  args: { disabled: true, checked: "indeterminate" },
};

// ── With label ─────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="cb-label" />
      <Label htmlFor="cb-label">Label</Label>
    </div>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="flex items-start gap-2">
      <Checkbox id="cb-desc" className="mt-0.5" />
      <div className="flex flex-col gap-0.5">
        <Label htmlFor="cb-desc">Send review requests</Label>
        <p className="text-xs text-muted-foreground">
          Automatically send requests after a visit.
        </p>
      </div>
    </div>
  ),
};

// ── Full states matrix (mirrors Figma node 7796:9567) ─────────────────────

export const AllStates: Story = {
  render: () => {
    const row = (label: string, disabled: boolean, checked: true | false | "indeterminate") => (
      <div className="flex items-center gap-2">
        <Checkbox checked={checked} disabled={disabled} />
        {label && (
          <>
            <Checkbox checked={checked} disabled={disabled} id={`${label}-${checked}`} />
            <Label htmlFor={`${label}-${checked}`} className={disabled ? "opacity-50" : ""}>
              Label
            </Label>
          </>
        )}
      </div>
    );

    return (
      <div className="grid grid-cols-2 gap-6">
        {/* Without label */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground mb-1">Without label</p>
          <div className="flex gap-3">
            <Checkbox checked={false} />
            <Checkbox checked="indeterminate" />
            <Checkbox checked={true} />
          </div>
          <div className="flex gap-3">
            <Checkbox checked={false} disabled />
            <Checkbox checked="indeterminate" disabled />
            <Checkbox checked={true} disabled />
          </div>
        </div>

        {/* With label */}
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground mb-1">With label</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              {([false, "indeterminate", true] as const).map((state, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Checkbox id={`al-${i}`} checked={state} />
                  <Label htmlFor={`al-${i}`}>Label</Label>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {([false, "indeterminate", true] as const).map((state, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Checkbox id={`ald-${i}`} checked={state} disabled />
                  <Label htmlFor={`ald-${i}`} className="opacity-50">Label</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ── In a list ──────────────────────────────────────────────────────────────

export const CheckboxList: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {["Google", "Facebook", "Yelp", "LinkedIn"].map((item) => (
        <div key={item} className="flex items-center gap-2">
          <Checkbox id={`list-${item}`} />
          <Label htmlFor={`list-${item}`}>{item}</Label>
        </div>
      ))}
    </div>
  ),
};
