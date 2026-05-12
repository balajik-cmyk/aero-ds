import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
// @ts-ignore — d3-cloud has no bundled types in all versions
import cloud from "d3-cloud";

const meta: Meta = {
  title: "UI/Charts/WordCloud/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const words = [
  { text: "fast",      size: 40 },
  { text: "friendly",  size: 36 },
  { text: "helpful",   size: 34 },
  { text: "responsive",size: 28 },
  { text: "great",     size: 26 },
  { text: "excellent", size: 22 },
  { text: "wonderful", size: 20 },
  { text: "polite",    size: 18 },
  { text: "clean",     size: 16 },
  { text: "quick",     size: 16 },
  { text: "amazing",   size: 15 },
  { text: "service",   size: 14 },
  { text: "quality",   size: 13 },
];

const colors = [
  "var(--graph-starfleet-blue)",
  "var(--graph-pastel-violet)",
  "var(--graph-benevo-pink)",
  "var(--graph-turquoise)",
  "var(--graph-indigo)",
];

function WordCloudChart({ data, width = 480, height = 280 }: { data: typeof words; width?: number; height?: number }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${width / 2},${height / 2})`);
    svg.appendChild(g);

    cloud()
      .size([width, height])
      .words(data.map(d => ({ ...d, text: d.text })))
      .padding(6)
      .rotate(() => (Math.random() > 0.7 ? 90 : 0))
      .font("Inter, sans-serif")
      .fontSize((d: any) => d.size)
      .on("end", (placed: any[]) => {
        placed.forEach((w, i) => {
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
          text.setAttribute("transform", `translate(${w.x},${w.y})rotate(${w.rotate})`);
          text.setAttribute("font-size", String(w.size));
          text.setAttribute("font-family", "Inter, sans-serif");
          text.setAttribute("fill", colors[i % colors.length]);
          text.setAttribute("fill-opacity", "0.85");
          text.setAttribute("text-anchor", "middle");
          text.textContent = w.text;
          g.appendChild(text);
        });
      })
      .start();
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} aria-label="Word cloud" />;
}

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium text-foreground">Top review keywords</p>
      <div className="rounded-lg border border-border p-4">
        <WordCloudChart data={words} />
      </div>
    </div>
  ),
};
