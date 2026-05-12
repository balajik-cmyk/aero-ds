import type { Meta, StoryObj } from "@storybook/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Pie",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const ratingData = [
  { name: "5 stars", value: 312, color: "var(--graph-green)" },
  { name: "4 stars", value: 198, color: "var(--graph-bright-green)" },
  { name: "3 stars", value: 87,  color: "var(--graph-sunflower)" },
  { name: "2 stars", value: 43,  color: "var(--graph-carrot)" },
  { name: "1 star",  value: 22,  color: "var(--graph-red)" },
];

const platformData = [
  { name: "Google",    value: 48, color: "var(--graph-social-google)" },
  { name: "Facebook",  value: 22, color: "var(--graph-social-facebook)" },
  { name: "Yelp",      value: 18, color: "var(--graph-carrot)" },
  { name: "LinkedIn",  value: 12, color: "var(--graph-social-linkedin)" },
];

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm font-medium text-foreground mb-4">Reviews by star rating</p>
      <ChartContainer config={config} className="h-64 w-full">
        <PieChart>
          <Pie data={ratingData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
            {ratingData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      </ChartContainer>
    </div>
  ),
};

export const Donut: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm font-medium text-foreground mb-4">Reviews by platform</p>
      <ChartContainer config={config} className="h-64 w-full">
        <PieChart>
          <Pie data={platformData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
            {platformData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
          <Legend />
        </PieChart>
      </ChartContainer>
    </div>
  ),
};
