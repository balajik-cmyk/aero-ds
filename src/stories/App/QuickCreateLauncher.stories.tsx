import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";
import { QuickCreateLauncher } from "@/app/components/QuickCreateLauncher";
import { Button } from "@/app/components/ui/button";

const meta: Meta<typeof QuickCreateLauncher> = {
  title: "App/QuickCreateLauncher",
  component: QuickCreateLauncher,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Prototype for the new global quick-create entry point. It keeps a compact top-bar dropdown for speed, then expands into a card-grid dialog using the same spatial pattern as the Canva reference.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof QuickCreateLauncher>;

export const TopBarPrototype: Story = {
  render: () => (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,82,237,0.08),_transparent_28%),linear-gradient(180deg,#dfe5ec_0%,#edf2f8_100%)] p-10">
      <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[24px] border border-white/60 bg-[#e0e5eb] shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
        <div className="flex h-[56px] items-center justify-between bg-[#e0e5eb] px-4">
          <p className="text-[16px] tracking-[-0.02em] text-[#212121]">Reviews</p>
          <div className="flex items-center gap-2">
            <QuickCreateLauncher />
            <Button
              type="button"
              variant="outline"
              className="ml-1 gap-1 rounded-lg border-[#e5e9f0] bg-[#f0f1f5]"
            >
              <Sparkles className="h-[14px] w-[14px] shrink-0 text-[#9970D7]" />
              <span className="bg-gradient-to-r from-[#9970D7] to-[#2552ED] bg-clip-text text-[12px] text-transparent">
                Ask Myna
              </span>
            </Button>
          </div>
        </div>

        <div className="grid min-h-[720px] grid-cols-[280px_1fr] gap-[10px] bg-[#dfe5ec] px-[10px] pb-[10px]">
          <aside className="rounded-l-[18px] rounded-r-[18px] bg-white p-6 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.05)]">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#76839a]">
              Current L2
            </p>
            <div className="space-y-3">
              {[
                "Reports",
                "Create Dashboard",
                "New message",
                "Send a review request",
                "Create post",
                "Create survey",
                "Create ticket",
                "Add a contact",
                "Create workflow",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border border-[#e7edf5] bg-[#fbfcfe] px-4 py-3 text-[14px] text-[#1f2937]"
                >
                  <span>{item}</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eef3ff] text-[16px] text-[#2552ed]">
                    +
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <main className="rounded-[18px] bg-white p-8 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.05)]">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#76839a]">
                  Proposed launcher
                </p>
                <h2 className="mt-2 text-[32px] leading-9 font-semibold tracking-[-0.04em] text-[#101828]">
                  Move creation into one global entry point
                </h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Reduced L2 noise", "The L2 rail stops mixing navigation and primary creation tasks."],
                ["Faster scanning", "Users learn one place for creation instead of hunting for row-level plus buttons."],
                ["Scales better", "New actions fit the dialog grid without growing the rail vertically."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[20px] border border-[#e1e8f2] bg-[#fbfcfe] p-5">
                  <p className="text-[20px] leading-6 font-semibold tracking-[-0.03em] text-[#111827]">
                    {title}
                  </p>
                  <p className="mt-3 text-[15px] leading-6 text-[#5b667a]">{body}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  ),
};
