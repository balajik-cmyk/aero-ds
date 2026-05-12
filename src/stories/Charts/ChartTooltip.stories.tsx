import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/ChartTooltip/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = ["Mon","Tue","Wed","Thu","Fri"].map((d, i) => ({
  day: d, thisWeek: 10 + i * 4, lastWeek: 8 + i * 3,
}));

export const Default: Story = {
  render: () => {
    const config: ChartConfig = {
      thisWeek: { label: "This week", color: "var(--graph-starfleet-blue)" },
      lastWeek: { label: "Last week", color: "var(--graph-starfleet-blue-compare)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-2">Hover a bar to see the default tooltip</p>
        <ChartContainer config={config} className="h-56 w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={[3,3,0,0]} />
            <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={[3,3,0,0]} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};

export const WithComparison: Story = {
  render: () => {
    const config: ChartConfig = {
      thisWeek: { label: "This week", color: "var(--graph-starfleet-blue)" },
      lastWeek: { label: "Last week", color: "var(--graph-starfleet-blue-compare)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-2">Tooltip with indicator</p>
        <ChartContainer config={config} className="h-56 w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="thisWeek" fill="var(--color-thisWeek)" radius={[3,3,0,0]} />
            <Bar dataKey="lastWeek" fill="var(--color-lastWeek)" radius={[3,3,0,0]} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};
