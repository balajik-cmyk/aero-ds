import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/WidgetCustomiser",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = ["Jan","Feb","Mar","Apr","May","Jun"].map((m, i) => ({
  month: m, reviews: 40 + i * 10, rating: +(3.9 + i * 0.08).toFixed(1),
}));

type ChartType = "bar" | "line";
type Metric = "reviews" | "rating";

const metrics: { value: Metric; label: string }[] = [
  { value: "reviews", label: "Review count" },
  { value: "rating",  label: "Avg. rating" },
];
const types: { value: ChartType; label: string }[] = [
  { value: "bar",  label: "Bar" },
  { value: "line", label: "Line" },
];

export const Default: Story = {
  render: () => {
    const [metric, setMetric] = useState<Metric>("reviews");
    const [chartType, setChartType] = useState<ChartType>("bar");

    const color = metric === "reviews" ? "var(--graph-starfleet-blue)" : "var(--graph-green)";
    const config: ChartConfig = { [metric]: { label: metrics.find(m => m.value === metric)!.label, color } };

    return (
      <div className="w-[480px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">Widget customiser</p>
          <div className="flex gap-2">
            <div className="flex rounded-md border border-border overflow-hidden text-xs">
              {metrics.map(m => (
                <button key={m.value} onClick={() => setMetric(m.value)}
                  className={`px-3 py-1.5 transition-colors ${metric === m.value ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex rounded-md border border-border overflow-hidden text-xs">
              {types.map(t => (
                <button key={t.value} onClick={() => setChartType(t.value)}
                  className={`px-3 py-1.5 transition-colors ${chartType === t.value ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <ChartContainer config={config} className="h-56 w-full">
          {chartType === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey={metric} fill={`var(--color-${metric})`} radius={[3,3,0,0]} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey={metric} stroke={`var(--color-${metric})`} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          )}
        </ChartContainer>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => <Default />,
};
