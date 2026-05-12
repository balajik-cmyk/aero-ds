import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "Components/Charts/VerticalBar/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const weekly = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d, positive: 8 + i * 3, negative: 1 + (i % 3),
}));

export const Default: Story = {
  render: () => {
    const config: ChartConfig = {
      positive: { label: "Positive", color: "var(--graph-starfleet-blue)" },
      negative: { label: "Negative", color: "var(--graph-red)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Weekly reviews</p>
        <ChartContainer config={config} className="h-56 w-full">
          <BarChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="positive" fill="var(--color-positive)" radius={[3,3,0,0]} />
            <Bar dataKey="negative" fill="var(--color-negative)" radius={[3,3,0,0]} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};

export const Stacked: Story = {
  render: () => {
    const config: ChartConfig = {
      positive: { label: "Positive", color: "var(--graph-green)" },
      neutral:  { label: "Neutral",  color: "var(--graph-sunflower)" },
      negative: { label: "Negative", color: "var(--graph-red)" },
    };
    const data = weekly.map(d => ({ ...d, neutral: 2 + (d.day.length % 3) }));
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Sentiment breakdown</p>
        <ChartContainer config={config} className="h-56 w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" />
            <Bar dataKey="neutral"  stackId="a" fill="var(--color-neutral)" />
            <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" radius={[3,3,0,0]} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};
