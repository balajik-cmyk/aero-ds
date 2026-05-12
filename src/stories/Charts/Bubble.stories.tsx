import type { Meta, StoryObj } from "@storybook/react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/app/components/ui/chart";

const meta: Meta = {
  title: "Components/Charts/Bubble/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const agents = [
  { name: "Review Responder", reviews: 312, satisfaction: 4.7, volume: 800 },
  { name: "Inbox Manager",    reviews: 198, satisfaction: 4.3, volume: 500 },
  { name: "Campaign Bot",     reviews: 87,  satisfaction: 3.9, volume: 300 },
  { name: "Follow-up Agent",  reviews: 143, satisfaction: 4.5, volume: 400 },
  { name: "Survey Bot",       reviews: 54,  satisfaction: 4.1, volume: 200 },
];

const colors = [
  "var(--graph-starfleet-blue)",
  "var(--graph-pastel-violet)",
  "var(--graph-benevo-pink)",
  "var(--graph-turquoise)",
  "var(--graph-sunflower)",
];

const config: ChartConfig = {};

export const Default: Story = {
  render: () => (
    <div className="w-[480px]">
      <p className="text-sm font-medium text-foreground mb-4">Agent performance (size = volume)</p>
      <ChartContainer config={config} className="h-64 w-full">
        <ScatterChart margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="reviews" name="Reviews" type="number" label={{ value: "Reviews", position: "insideBottom", offset: -4, fontSize: 11 }} />
          <YAxis dataKey="satisfaction" name="Satisfaction" domain={[3.5, 5]} label={{ value: "Satisfaction", angle: -90, position: "insideLeft", fontSize: 11 }} />
          <ZAxis dataKey="volume" range={[40, 400]} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={agents} name="agents">
            {agents.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} fillOpacity={0.75} />)}
          </Scatter>
        </ScatterChart>
      </ChartContainer>
    </div>
  ),
};
