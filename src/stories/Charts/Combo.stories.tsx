import type { Meta, StoryObj } from "@storybook/react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Combo/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = ["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => ({
  month: m,
  reviews: 40 + i * 12,
  rating: +(3.9 + i * 0.07).toFixed(1),
}));

export const BarAndLine: Story = {
  render: () => {
    const config: ChartConfig = {
      reviews: { label: "Review count", color: "var(--graph-starfleet-blue)" },
      rating:  { label: "Avg rating",   color: "var(--graph-sunflower)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Review volume + rating trend</p>
        <ChartContainer config={config} className="h-56 w-full">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" domain={[3, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar yAxisId="left" dataKey="reviews" fill="var(--color-reviews)" radius={[3,3,0,0]} fillOpacity={0.8} />
            <Line yAxisId="right" type="monotone" dataKey="rating" stroke="var(--color-rating)" strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ChartContainer>
      </div>
    );
  },
};
