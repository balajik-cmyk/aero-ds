import type { Meta, StoryObj } from "@storybook/react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const meta: Meta = {
  title: "UI/Charts/MapView",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  { name: "San Francisco", coordinates: [-122.4, 37.8],  reviews: 312 },
  { name: "New York",      coordinates: [-74.0, 40.7],   reviews: 287 },
  { name: "Chicago",       coordinates: [-87.6, 41.9],   reviews: 198 },
  { name: "Austin",        coordinates: [-97.7, 30.3],   reviews: 143 },
  { name: "Seattle",       coordinates: [-122.3, 47.6],  reviews: 89 },
];

export const Default: Story = {
  render: () => (
    <div className="w-[520px]">
      <p className="text-sm font-medium text-foreground mb-4">Review locations</p>
      <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
        <ComposableMap projection="geoAlbersUsa" style={{ width: "100%", height: 320 }}>
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--accent)"
                    stroke="var(--border)"
                    strokeWidth={0.5}
                    style={{ default: { outline: "none" }, hover: { fill: "var(--muted)", outline: "none" }, pressed: { outline: "none" } }}
                  />
                ))
              }
            </Geographies>
            {locations.map(({ name, coordinates, reviews }) => (
              <Marker key={name} coordinates={coordinates as [number, number]}>
                <circle
                  r={Math.sqrt(reviews / 3)}
                  fill="var(--graph-starfleet-blue)"
                  fillOpacity={0.6}
                  stroke="var(--primary)"
                  strokeWidth={1}
                />
                <text y={-Math.sqrt(reviews / 3) - 4} fontSize={9} textAnchor="middle" fill="var(--foreground)">{name}</text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  ),
};
