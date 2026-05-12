import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
import * as d3Hierarchy from "d3-hierarchy";

const meta: Meta = {
  title: "UI/Charts/SplitPackBubble",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const agents = [
  { name: "Review Responder", value: 312, color: "var(--graph-starfleet-blue)" },
  { name: "Inbox Manager",    value: 198, color: "var(--graph-pastel-violet)" },
  { name: "Campaign Bot",     value: 143, color: "var(--graph-benevo-pink)" },
  { name: "Follow-up Agent",  value: 89,  color: "var(--graph-turquoise)" },
  { name: "Survey Bot",       value: 54,  color: "var(--graph-sunflower)" },
  { name: "NPS Agent",        value: 38,  color: "var(--graph-carrot)" },
];

function PackBubble({ data, size = 400 }: { data: typeof agents; size?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const root = d3Hierarchy.hierarchy({ children: data }).sum((d: any) => d.value ?? 0);
    d3Hierarchy.pack<(typeof agents)[0]>().size([size, size]).padding(8)(root);

    root.leaves().forEach(node => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", `translate(${node.x},${node.y})`);

      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("r", String(node.r));
      circle.setAttribute("fill", (node.data as any).color ?? "var(--graph-iron)");
      circle.setAttribute("fill-opacity", "0.8");
      g.appendChild(circle);

      if (node.r > 24) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dy", "0.35em");
        text.setAttribute("font-size", "11");
        text.setAttribute("fill", "#fff");
        text.textContent = (node.data as any).name.split(" ")[0];
        g.appendChild(text);
      }

      svg.appendChild(g);
    });
  }, [data, size]);

  return <svg ref={svgRef} width={size} height={size} aria-label="Pack bubble chart" />;
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-foreground">Agent activity volume</p>
      <PackBubble data={agents} />
    </div>
  ),
};
