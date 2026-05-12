import type { Meta, StoryObj } from "@storybook/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "Components/Charts/StackedArea/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"];
const data = months.map((m, i) => ({
  month: m,
  google:   30 + i * 5,
  facebook: 20 + i * 3,
  yelp:     15 + i * 2,
  other:    10 + i,
}));

const config: ChartConfig = {
  google:   { label: "Google",   color: "var(--graph-starfleet-blue)" },
  facebook: { label: "Facebook", color: "var(--graph-pastel-violet)" },
  yelp:     { label: "Yelp",     color: "var(--graph-benevo-pink)" },
  other:    { label: "Other",    color: "var(--graph-iron)" },
};

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <p className="text-sm font-medium text-foreground mb-4">Reviews by platform over time</p>
      <ChartContainer config={config} className="h-56 w-full">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area type="monotone" dataKey="google"   stackId="1" stroke="var(--color-google)"   fill="var(--color-google)"   fillOpacity={0.7} strokeWidth={0} />
          <Area type="monotone" dataKey="facebook" stackId="1" stroke="var(--color-facebook)" fill="var(--color-facebook)" fillOpacity={0.7} strokeWidth={0} />
          <Area type="monotone" dataKey="yelp"     stackId="1" stroke="var(--color-yelp)"     fill="var(--color-yelp)"     fillOpacity={0.7} strokeWidth={0} />
          <Area type="monotone" dataKey="other"    stackId="1" stroke="var(--color-other)"    fill="var(--color-other)"    fillOpacity={0.7} strokeWidth={0} />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
};
