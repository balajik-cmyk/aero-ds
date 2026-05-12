import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
import { stack, stackOffsetWiggle, stackOrderInsideOut } from "d3-shape";

const meta: Meta = {
  title: "UI/Charts/Stream/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const keys = ["google","facebook","yelp","linkedin","twitter"];
const colors = [
  "var(--graph-social-google)",
  "var(--graph-social-facebook)",
  "var(--graph-carrot)",
  "var(--graph-social-linkedin)",
  "var(--graph-social-x)",
];

const rawData = months.map((_, i) => ({
  google:   Math.round(30 + Math.sin(i * 0.5) * 10 + i * 2),
  facebook: Math.round(20 + Math.sin(i * 0.7 + 1) * 8 + i),
  yelp:     Math.round(15 + Math.sin(i * 0.3 + 2) * 6),
  linkedin: Math.round(10 + Math.sin(i * 0.9 + 3) * 5),
  twitter:  Math.round(8  + Math.sin(i * 0.6 + 4) * 4),
}));

function StreamChart({ data, width = 520, height = 260 }: { data: typeof rawData; width?: number; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const stacked = stack().keys(keys).offset(stackOffsetWiggle).order(stackOrderInsideOut)(data as any);
    const allValues = stacked.flatMap(s => s.flatMap(d => [d[0], d[1]]));
    const yMin = Math.min(...allValues);
    const yMax = Math.max(...allValues);
    const xScale = (i: number) => (i / (data.length - 1)) * width;
    const yScale = (v: number) => height - ((v - yMin) / (yMax - yMin)) * height;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(g);

    stacked.forEach((layer, li) => {
      const points = layer.map((d, i) => `${xScale(i)},${yScale(d[1])}`).concat(
        [...layer].reverse().map((d, i) => `${xScale(layer.length - 1 - i)},${yScale(d[0])}`)
      ).join(" ");
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      poly.setAttribute("points", points);
      poly.setAttribute("fill", colors[li % colors.length]);
      poly.setAttribute("fill-opacity", "0.75");
      g.appendChild(poly);
    });
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} aria-label="Stream chart" />;
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-foreground">Review volume stream by platform</p>
      <div className="rounded-lg border border-border overflow-hidden">
        <StreamChart data={rawData} />
      </div>
    </div>
  ),
};
