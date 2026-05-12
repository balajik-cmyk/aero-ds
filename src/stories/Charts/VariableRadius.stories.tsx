import type { Meta, StoryObj } from "@storybook/react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/VariableRadius/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = [
  { name: "Google",   value: 312, innerRadius: 30, outerRadius: 90, color: "var(--graph-social-google)" },
  { name: "Facebook", value: 198, innerRadius: 30, outerRadius: 78, color: "var(--graph-social-facebook)" },
  { name: "Yelp",     value: 143, innerRadius: 30, outerRadius: 68, color: "var(--graph-carrot)" },
  { name: "LinkedIn", value: 89,  innerRadius: 30, outerRadius: 55, color: "var(--graph-social-linkedin)" },
  { name: "Other",    value: 54,  innerRadius: 30, outerRadius: 46, color: "var(--graph-iron)" },
];

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <p className="text-sm font-medium text-foreground mb-1">Reviews by platform</p>
      <p className="text-xs text-muted-foreground mb-4">Arc height = review count</p>
      <ChartContainer config={config} className="h-64 w-full">
        <PieChart>
          {data.map((entry, i) => (
            <Pie
              key={i}
              data={[entry, { value: data.reduce((sum, d) => sum + d.value, 0) - entry.value, color: "transparent" }]}
              cx="50%"
              cy="50%"
              innerRadius={entry.innerRadius}
              outerRadius={entry.outerRadius}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={entry.color} />
              <Cell fill="transparent" stroke="none" />
            </Pie>
          ))}
          <Tooltip formatter={(v, n, p) => [p.payload.name ? `${p.payload.value} reviews` : "", ""]} />
        </PieChart>
      </ChartContainer>
    </div>
  ),
};
