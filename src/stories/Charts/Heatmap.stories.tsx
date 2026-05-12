import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Heatmap",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const hours = [9,10,11,12,13,14,15,16,17,18];
const data = days.flatMap((day, d) =>
  hours.map((hour, h) => ({
    day: d,
    hour,
    dayLabel: day,
    reviews: Math.round(Math.random() * 20 + (h === 3 || h === 4 ? 15 : 0)),
  }))
);

function getColor(value: number): string {
  if (value === 0) return "var(--graph-iron-compare)";
  if (value < 8)  return "var(--graph-starfleet-blue-compare)";
  if (value < 16) return "var(--graph-starfleet-blue)";
  return "var(--graph-indigo)";
}

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <p className="text-sm font-medium text-foreground mb-4">Review volume by day & hour</p>
      <ChartContainer config={config} className="h-48 w-full">
        <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 40 }}>
          <XAxis dataKey="hour" type="number" domain={[8.5, 18.5]} tickCount={10} tickFormatter={(v) => `${v}h`} tick={{ fontSize: 10 }} />
          <YAxis dataKey="day" type="number" domain={[-0.5, 6.5]} tickCount={7} tickFormatter={(v) => days[v] ?? ""} tick={{ fontSize: 10 }} width={32} />
          <ZAxis range={[100, 100]} />
          <ChartTooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const d = payload[0].payload;
            return <div className="rounded border border-border bg-popover px-2 py-1 text-xs shadow">{d.dayLabel} {d.hour}:00 — {d.reviews} reviews</div>;
          }} />
          <Scatter data={data}>
            {data.map((entry, i) => (
              <Cell key={i} fill={getColor(entry.reviews)} stroke="var(--background)" strokeWidth={2} />
            ))}
          </Scatter>
        </ScatterChart>
      </ChartContainer>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <span>Low</span>
        {["var(--graph-iron-compare)","var(--graph-starfleet-blue-compare)","var(--graph-starfleet-blue)","var(--graph-indigo)"].map((c, i) => (
          <span key={i} className="h-3 w-6 rounded-sm inline-block" style={{ background: c }} />
        ))}
        <span>High</span>
      </div>
    </div>
  ),
};
