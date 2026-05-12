import type { Meta, StoryObj } from "@storybook/react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { ChartContainer, type ChartConfig } from "@/app/components/ui/chart";
import { ArrowUpRight, ArrowDownRight } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";

const meta: Meta = {
  title: "Components/Charts/KPISummary/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const sparkConfig: ChartConfig = { value: { color: "var(--graph-starfleet-blue)" } };

function Sparkline({ data, color = "var(--graph-starfleet-blue)", positive = true }: { data: number[]; color?: string; positive?: boolean }) {
  const cfg: ChartConfig = { v: { color } };
  return (
    <ChartContainer config={cfg} className="h-10 w-20">
      <LineChart data={data.map(v => ({ v }))}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}

function KPICard({ title, value, change, trend, sparkData, color }: {
  title: string; value: string; change: string; trend: "up" | "down"; sparkData: number[]; color: string;
}) {
  const isPositive = trend === "up";
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 min-w-[160px]">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-2xl font-medium text-foreground">{value}</p>
      <div className="flex items-center justify-between">
        <span className={cn("flex items-center gap-0.5 text-xs", isPositive ? "text-[color:var(--graph-green)]" : "text-destructive")}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
        <Sparkline data={sparkData} color={color} positive={isPositive} />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <KPICard title="Total reviews" value="1,284" change="+12% vs last month" trend="up" sparkData={[40,45,42,58,55,70,68,82]} color="var(--graph-starfleet-blue)" />
      <KPICard title="Avg. star rating" value="4.6" change="+0.3 vs last month" trend="up" sparkData={[3.9,4.0,4.1,4.2,4.2,4.4,4.5,4.6]} color="var(--graph-green)" />
      <KPICard title="Response rate" value="87%" change="-2% vs last month" trend="down" sparkData={[92,90,88,91,87,85,88,87]} color="var(--graph-carrot)" />
      <KPICard title="Active agents" value="24" change="+4 this week" trend="up" sparkData={[18,19,20,20,21,22,23,24]} color="var(--graph-pastel-violet)" />
    </div>
  ),
};

export const WithSparkline: Story = {
  render: () => (
    <div className="w-48">
      <KPICard title="Reviews received" value="312" change="+18% MoM" trend="up" sparkData={[200,220,215,240,265,280,295,312]} color="var(--graph-starfleet-blue)" />
    </div>
  ),
};
