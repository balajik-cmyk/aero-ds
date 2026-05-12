import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Area/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = [
  { month: "Jan", reviews: 42, responses: 38 },
  { month: "Feb", reviews: 58, responses: 51 },
  { month: "Mar", reviews: 47, responses: 44 },
  { month: "Apr", reviews: 73, responses: 68 },
  { month: "May", reviews: 89, responses: 82 },
  { month: "Jun", reviews: 95, responses: 91 },
  { month: "Jul", reviews: 112, responses: 108 },
  { month: "Aug", reviews: 98, responses: 95 },
];

export const Default: Story = {
  render: () => {
    const config: ChartConfig = {
      reviews:   { label: "Reviews received", color: "var(--graph-starfleet-blue)" },
      responses: { label: "Responses sent",   color: "var(--graph-pastel-violet)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Monthly review activity</p>
        <ChartContainer config={config} className="h-56 w-full">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area type="monotone" dataKey="reviews"   stroke="var(--color-reviews)"   fill="var(--color-reviews)"   fillOpacity={0.15} strokeWidth={2} />
            <Area type="monotone" dataKey="responses" stroke="var(--color-responses)" fill="var(--color-responses)" fillOpacity={0.15} strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
      </div>
    );
  },
};

export const Stacked: Story = {
  render: () => {
    const config: ChartConfig = {
      reviews:   { label: "Reviews",   color: "var(--graph-starfleet-blue)" },
      responses: { label: "Responses", color: "var(--graph-turquoise)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Stacked activity</p>
        <ChartContainer config={config} className="h-56 w-full">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area type="monotone" dataKey="reviews"   stackId="a" stroke="var(--color-reviews)"   fill="var(--color-reviews)"   fillOpacity={0.6} strokeWidth={0} />
            <Area type="monotone" dataKey="responses" stackId="a" stroke="var(--color-responses)" fill="var(--color-responses)" fillOpacity={0.6} strokeWidth={0} />
          </AreaChart>
        </ChartContainer>
      </div>
    );
  },
};
