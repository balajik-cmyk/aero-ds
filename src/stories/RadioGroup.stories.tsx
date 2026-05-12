import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/Forms and input/RadioGroup/Examples",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ── Single states (mirrors Figma node 1306:1544 — without label) ────────────

export const Default: Story = {
  render: () => (
    <div className="flex gap-6">
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" aria-label="Unselected" />
        <RadioGroupItem value="b" aria-label="Selected" />
        <RadioGroupItem value="c" aria-label="Unselected 2" />
        <RadioGroupItem value="d" aria-label="Disabled" disabled />
        <RadioGroupItem value="e" aria-label="Unselected 3" />
      </RadioGroup>
    </div>
  ),
};

// ── With label (mirrors Figma node 7796:11791) ────────────────────────────

export const WithLabel: Story = {
  render: () => (
    <RadioGroup defaultValue="option2" className="gap-2">
      {["Option 1", "Option 2", "Option 3"].map((opt, i) => (
        <div key={opt} className="flex items-center gap-2">
          <RadioGroupItem value={`option${i + 1}`} id={`wl-${i}`} />
          <Label htmlFor={`wl-${i}`}>{opt}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

// ── Full states matrix ────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {/* Without label */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground mb-1">Without label</p>
        <RadioGroup defaultValue="sel" className="gap-3">
          <RadioGroupItem value="unsel"    aria-label="Unselected" />
          <RadioGroupItem value="sel"      aria-label="Selected" />
          <RadioGroupItem value="dis-u"    aria-label="Disabled unselected" disabled />
          <RadioGroupItem value="unsel-2"  aria-label="Unselected 2" />
        </RadioGroup>
        {/* Disabled selected — separate group so it can be checked */}
        <RadioGroup defaultValue="dis-s" className="gap-3">
          <RadioGroupItem value="dis-s" aria-label="Disabled selected" disabled />
        </RadioGroup>
      </div>

      {/* With label */}
      <div className="flex flex-col gap-3">
        <p className="text-xs text-muted-foreground mb-1">With label</p>
        <RadioGroup defaultValue="sel-l" className="gap-3">
          {[
            { v: "unsel-l", label: "Label", disabled: false },
            { v: "sel-l",   label: "Label", disabled: false },
            { v: "dis-ul",  label: "Label", disabled: true  },
            { v: "unsel-l2",label: "Label", disabled: false },
          ].map(({ v, label, disabled }, i) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem value={v} id={`as-${i}`} disabled={disabled} />
              <Label htmlFor={`as-${i}`} className={disabled ? "opacity-50" : ""}>
                {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  ),
};

// ── With description ──────────────────────────────────────────────────────

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly" className="gap-4">
      {[
        { value: "monthly",    label: "Monthly",    desc: "$9/month, billed monthly" },
        { value: "annual",     label: "Annual",     desc: "$90/year, save 17%" },
        { value: "enterprise", label: "Enterprise", desc: "Custom pricing, contact us" },
      ].map(({ value, label, desc }) => (
        <div key={value} className="flex items-start gap-3">
          <RadioGroupItem value={value} id={value} className="mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <Label htmlFor={value}>{label}</Label>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  ),
};

// ── Disabled ──────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="b" className="gap-2">
      {["Option 1", "Option 2", "Option 3"].map((opt, i) => (
        <div key={opt} className="flex items-center gap-2">
          <RadioGroupItem value={`d${i}`} id={`dis-${i}`} disabled />
          <Label htmlFor={`dis-${i}`} className="opacity-50">{opt}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

// ── Horizontal ────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="all" className="flex flex-row gap-6">
      {["All", "5 stars", "4 stars", "3 stars"].map((opt) => (
        <div key={opt} className="flex items-center gap-2">
          <RadioGroupItem value={opt.toLowerCase().replace(" ", "-")} id={`h-${opt}`} />
          <Label htmlFor={`h-${opt}`}>{opt}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
