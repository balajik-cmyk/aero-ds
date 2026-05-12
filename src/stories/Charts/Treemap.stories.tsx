import type { Meta, StoryObj } from "@storybook/react";
import { Treemap, ResponsiveContainer } from "recharts";
import { ChartContainer, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "UI/Charts/Treemap",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const data = [
  { name: "Google",    size: 312, color: "var(--graph-social-google)" },
  { name: "Facebook",  size: 198, color: "var(--graph-social-facebook)" },
  { name: "Yelp",      size: 143, color: "var(--graph-carrot)" },
  { name: "LinkedIn",  size: 89,  color: "var(--graph-social-linkedin)" },
  { name: "Twitter/X", size: 54,  color: "var(--graph-social-x)" },
  { name: "TripAdvisor",size: 38, color: "var(--graph-turquoise)" },
  { name: "Glassdoor", size: 21,  color: "var(--graph-pastel-violet)" },
];

function CustomContent({ x, y, width, height, name, color }: any) {
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill: color, fillOpacity: 0.85 }} rx={4} />
      {width > 60 && height > 30 && (
        <text x={x + 8} y={y + 18} fill="#fff" fontSize={12} fontWeight={400}>{name}</text>
      )}
    </g>
  );
}

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <p className="text-sm font-medium text-foreground mb-4">Reviews by platform</p>
      <ChartContainer config={config} className="h-64 w-full">
        <Treemap data={data} dataKey="size" content={<CustomContent />} />
      </ChartContainer>
    </div>
  ),
};
