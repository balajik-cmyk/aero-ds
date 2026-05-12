import type { Meta, StoryObj } from "@storybook/react";
import { RadialBarChart, RadialBar, PolarAngleAxis, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Radial",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = [
  { name: "Response rate", value: 87, fill: "var(--graph-starfleet-blue)" },
  { name: "Resolution rate", value: 72, fill: "var(--graph-pastel-violet)" },
  { name: "Satisfaction", value: 94, fill: "var(--graph-green)" },
];

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm font-medium text-foreground mb-4">Agent performance metrics</p>
      <ChartContainer config={config} className="h-64 w-full">
        <RadialBarChart cx="50%" cy="50%" innerRadius={20} outerRadius={80} data={data} startAngle={180} endAngle={0}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background dataKey="value" cornerRadius={4} label={{ position: "insideStart", fill: "var(--background)", fontSize: 12 }} />
          <Legend iconSize={10} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadialBarChart>
      </ChartContainer>
    </div>
  ),
};

export const WithTarget: Story = {
  render: () => {
    const target = 90;
    const actual = 87;
    const pct = Math.round((actual / target) * 100);
    return (
      <div className="w-64 flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-foreground">Response rate vs target</p>
        <ChartContainer config={config} className="h-48 w-full">
          <RadialBarChart cx="50%" cy="50%" innerRadius={45} outerRadius={70} data={[{ value: pct, fill: pct >= 100 ? "var(--graph-green)" : "var(--graph-starfleet-blue)" }]} startAngle={225} endAngle={-45}>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={4} />
          </RadialBarChart>
        </ChartContainer>
        <p className="text-2xl font-medium text-foreground">{actual}%</p>
        <p className="text-xs text-muted-foreground">Target: {target}%</p>
      </div>
    );
  },
};
