import type { Meta, StoryObj } from "@storybook/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/HorizontalBar",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const platforms = [
  { name: "Google",   reviews: 312, color: "var(--graph-social-google)" },
  { name: "Facebook", reviews: 198, color: "var(--graph-social-facebook)" },
  { name: "Yelp",     reviews: 143, color: "var(--graph-carrot)" },
  { name: "LinkedIn", reviews: 89,  color: "var(--graph-social-linkedin)" },
  { name: "Twitter",  reviews: 54,  color: "var(--graph-social-x)" },
];

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <p className="text-sm font-medium text-foreground mb-4">Reviews by platform</p>
      <ChartContainer config={config} className="h-48 w-full">
        <BarChart data={platforms} layout="vertical" margin={{ left: 16 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={70} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="reviews" radius={[0,3,3,0]}>
            {platforms.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => {
    const data = platforms.map(p => ({ ...p, thisMonth: p.reviews, lastMonth: Math.round(p.reviews * 0.85) }));
    const cfg: ChartConfig = {
      thisMonth: { label: "This month", color: "var(--graph-starfleet-blue)" },
      lastMonth: { label: "Last month", color: "var(--graph-starfleet-blue-compare)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">This vs last month</p>
        <ChartContainer config={cfg} className="h-56 w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={70} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="thisMonth" fill="var(--color-thisMonth)" radius={[0,3,3,0]} />
            <Bar dataKey="lastMonth" fill="var(--color-lastMonth)" radius={[0,3,3,0]} />
          </BarChart>
        </ChartContainer>
      </div>
    );
  },
};
