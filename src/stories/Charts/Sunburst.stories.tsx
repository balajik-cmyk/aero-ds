import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
import * as d3 from "d3-hierarchy";

const meta: Meta = {
  title: "UI/Charts/Sunburst/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const tree = {
  name: "Reviews",
  children: [
    { name: "Google", value: 312, color: "var(--graph-social-google)" },
    { name: "Facebook", value: 198, color: "var(--graph-social-facebook)" },
    {
      name: "Others",
      children: [
        { name: "Yelp",     value: 143, color: "var(--graph-carrot)" },
        { name: "LinkedIn", value: 89,  color: "var(--graph-social-linkedin)" },
        { name: "Twitter",  value: 54,  color: "var(--graph-social-x)" },
      ],
    },
  ],
};

function SunburstChart({ data, size = 320 }: { data: typeof tree; size?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = size / 2;
    const root = d3.hierarchy(data).sum((d: any) => d.value ?? 0);
    const partition = d3.partition<typeof data>().size([2 * Math.PI, r]);
    partition(root);

    const arc = (d: any) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const a = d3.arc()({ innerRadius: d.y0, outerRadius: d.y1, startAngle: d.x0, endAngle: d.x1 });
      if (!a) return null;
      path.setAttribute("d", a);
      path.setAttribute("fill", (d.data as any).color ?? "var(--graph-iron)");
      path.setAttribute("fill-opacity", "0.85");
      path.setAttribute("stroke", "var(--background)");
      path.setAttribute("stroke-width", "2");
      svg.appendChild(path);
      return path;
    };

    // Clear
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${r},${r})`);
    svg.appendChild(g);

    root.descendants().slice(1).forEach(node => arc(node));
  }, [data, size]);

  return <svg ref={svgRef} width={size} height={size} aria-label="Sunburst chart" />;
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-foreground">Reviews by platform (sunburst)</p>
      <SunburstChart data={tree} />
    </div>
  ),
};
