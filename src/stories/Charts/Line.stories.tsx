import type { Meta, StoryObj } from "@storybook/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "Components/Charts/Line/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const singleData = months.map((m, i) => ({ month: m, rating: +(3.8 + i * 0.12 + Math.sin(i) * 0.1).toFixed(1) }));
const multiData = months.map((m, i) => ({
  month: m,
  google: +(4.1 + Math.sin(i * 0.8) * 0.3).toFixed(1),
  yelp: +(3.7 + Math.sin(i * 0.6) * 0.4).toFixed(1),
  facebook: +(4.3 + Math.sin(i * 1.2) * 0.2).toFixed(1),
}));

export const Default: Story = {
  render: () => {
    const config: ChartConfig = { rating: { label: "Avg. rating", color: "var(--graph-starfleet-blue)" } };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Star rating trend</p>
        <ChartContainer config={config} className="h-56 w-full">
          <LineChart data={singleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[3.5, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ReferenceLine y={4} stroke="var(--graph-iron)" strokeDasharray="4 2" label={{ value: "Target", position: "right", fontSize: 11 }} />
            <Line type="monotone" dataKey="rating" stroke="var(--color-rating)" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ChartContainer>
      </div>
    );
  },
};

export const MultiSeries: Story = {
  render: () => {
    const config: ChartConfig = {
      google:   { label: "Google",   color: "var(--graph-starfleet-blue)" },
      yelp:     { label: "Yelp",     color: "var(--graph-carrot)" },
      facebook: { label: "Facebook", color: "var(--graph-social-facebook)" },
    };
    return (
      <div className="w-[480px]">
        <p className="text-sm font-medium text-foreground mb-4">Rating by platform</p>
        <ChartContainer config={config} className="h-56 w-full">
          <LineChart data={multiData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[3, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="google"   stroke="var(--color-google)"   strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="yelp"     stroke="var(--color-yelp)"     strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="facebook" stroke="var(--color-facebook)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
    );
  },
};

export const WithDots: Story = {
  render: () => {
    const config: ChartConfig = { rating: { label: "Rating", color: "var(--graph-pastel-violet)" } };
    return (
      <div className="w-[480px]">
        <ChartContainer config={config} className="h-56 w-full">
          <LineChart data={singleData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[3.5, 5]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="rating" stroke="var(--color-rating)" strokeWidth={2} dot={{ r: 5, fill: "var(--color-rating)", strokeWidth: 0 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ChartContainer>
      </div>
    );
  },
};
