import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design System/Graph Colors/Examples",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

function Section({ title }: { title: string }) {
  return (
    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 mt-2">{title}</p>
  );
}

function Swatch({ name, token, compare }: { name: string; token: string; compare?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        <div className="h-14 flex-1 rounded-lg" style={{ background: `var(${token})` }} title={token} />
        {compare && (
          <div className="h-14 flex-1 rounded-lg border border-border" style={{ background: `var(${compare})` }} title={compare} />
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{token}</p>
        {compare && <p className="font-mono text-xs text-muted-foreground/60">{compare}</p>}
      </div>
    </div>
  );
}

const PALETTE = [
  { name: "Starfleet Blue",  token: "--graph-starfleet-blue",  compare: "--graph-starfleet-blue-compare" },
  { name: "Pastel Violet",   token: "--graph-pastel-violet",   compare: "--graph-pastel-violet-compare" },
  { name: "Benevo Pink",     token: "--graph-benevo-pink",     compare: "--graph-benevo-pink-compare" },
  { name: "Sunflower",       token: "--graph-sunflower",       compare: "--graph-sunflower-compare" },
  { name: "Carrot",          token: "--graph-carrot",          compare: "--graph-carrot-compare" },
  { name: "Bright Green",    token: "--graph-bright-green",    compare: "--graph-bright-green-compare" },
  { name: "Turquoise",       token: "--graph-turquoise",       compare: "--graph-turquoise-compare" },
  { name: "Plum",            token: "--graph-plum",            compare: "--graph-plum-compare" },
  { name: "Indigo",          token: "--graph-indigo",          compare: "--graph-indigo-compare" },
  { name: "Violet",          token: "--graph-violet",          compare: "--graph-violet-compare" },
  { name: "Aqua",            token: "--graph-aqua",            compare: "--graph-aqua-compare" },
  { name: "Hadfield",        token: "--graph-hadfield",        compare: "--graph-hadfield-compare" },
  { name: "Green",           token: "--graph-green",           compare: "--graph-green-compare" },
  { name: "Iron",            token: "--graph-iron",            compare: "--graph-iron-compare" },
  { name: "Red",             token: "--graph-red",             compare: "--graph-red-compare" },
];

const RATINGS = [
  { name: "5 ★ Green",       token: "--graph-green",        compare: "--graph-green-compare" },
  { name: "4 ★ Bright Green",token: "--graph-bright-green", compare: "--graph-bright-green-compare" },
  { name: "3 ★ Sunflower",   token: "--graph-sunflower",    compare: "--graph-sunflower-compare" },
  { name: "2 ★ Carrot",      token: "--graph-carrot",       compare: "--graph-carrot-compare" },
  { name: "1 ★ Red",         token: "--graph-red",          compare: "--graph-red-compare" },
  { name: "0 ★ Iron",        token: "--graph-iron",         compare: "--graph-iron-compare" },
];

const SOCIAL = [
  { name: "Facebook",  token: "--graph-social-facebook",  compare: "--graph-social-facebook-compare" },
  { name: "YouTube",   token: "--graph-social-youtube",   compare: "--graph-social-youtube-compare" },
  { name: "Google",    token: "--graph-social-google",    compare: "--graph-social-google-compare" },
  { name: "LinkedIn",  token: "--graph-social-linkedin",  compare: "--graph-social-linkedin-compare" },
  { name: "X/Twitter", token: "--graph-social-x",         compare: "--graph-social-x-compare" },
];

export const FullPalette: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Section title="Full palette — default (solid) + compare (lighter)" />
      <div className="grid grid-cols-5 gap-4">
        {PALETTE.map(c => <Swatch key={c.token} {...c} />)}
      </div>

      <Section title="Preferred sequence for multi-series charts" />
      <div className="flex gap-1 flex-wrap">
        {["--graph-starfleet-blue","--graph-pastel-violet","--graph-benevo-pink","--graph-sunflower","--graph-carrot","--graph-bright-green","--graph-turquoise"].map((t, i) => (
          <div key={t} className="flex flex-col items-center gap-1">
            <div className="h-8 w-12 rounded" style={{ background: `var(${t})` }} />
            <span className="text-[10px] text-muted-foreground">{i + 1}</span>
          </div>
        ))}
        <div className="mx-2 self-stretch border-l border-dashed border-border" />
        {["--graph-plum","--graph-indigo","--graph-violet","--graph-aqua","--graph-green"].map((t, i) => (
          <div key={t} className="flex flex-col items-center gap-1">
            <div className="h-8 w-12 rounded" style={{ background: `var(${t})` }} />
            <span className="text-[10px] text-muted-foreground">{i + 8}</span>
          </div>
        ))}
      </div>

      <Section title="Ratings scale (0–5 stars)" />
      <div className="grid grid-cols-6 gap-4">
        {RATINGS.map(c => <Swatch key={c.token} {...c} />)}
      </div>

      <Section title="Social platform colors" />
      <div className="grid grid-cols-5 gap-4">
        {SOCIAL.map(c => <Swatch key={c.token} {...c} />)}
      </div>
    </div>
  ),
};
