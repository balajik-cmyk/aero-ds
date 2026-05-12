# aero-ds — AI Rules (Claude Code)

> Source of truth for all AI assistants. Edit only this file — `scripts/sync-ai-rules.mjs` generates GEMINI.md, AGENTS.md, and .github/copilot-instructions.md automatically on commit.
> Full reference: `.claude/skills/aero-ds/SKILL.md`

---

## Stack

React · Vite · Tailwind v4 · shadcn-style primitives · Radix UI · Recharts · Storybook 8 · TypeScript 6 · Inter font

---

## § 1 — Inter font only

- Font family: `var(--font-sans)` — resolves to `'Inter', ui-sans-serif, system-ui`
- Loaded weights: **300** (light/de-emphasised) and **400** (regular/medium) only
- ⛔ Never use: Roboto, SF Pro, system-ui directly, or weights 500–900
- All Tailwind font-weight utilities clamp to 300 or 400 — `font-bold` = 400, `font-light` = 300
- Base font size: `13px` (`--font-size`). All rem values scale from this.
- Figma shows Roboto at 12/14/16/18px — translate to aero-ds scale: xs/sm/base/lg/xl

## § 2 — Token policy (no raw hex)

- ⛔ Never write raw hex values in component code (`#1976d2`, `#212121`, etc.)
- Always use CSS variables: `var(--primary)`, `var(--foreground)`, `var(--graph-sunflower)`
- Key mappings — Figma raw hex → correct token:
  - Brand blue `#1976d2` → `var(--primary)` = `#1E44CC`
  - Error `#de1b0c` → `var(--destructive)` = `#d4183d`
  - Text `#212121` → `var(--foreground)`
  - Muted text `#555555` / `#8f8f8f` → `var(--muted-foreground)`
  - Hover bg `#f2f4f7` → `var(--muted)`
  - Selected bg `#e5e9f0` → `var(--accent)`
  - Border `#eaeaea` → `var(--border)`
- Exception: story files may use hex for demo scaffolding only

## § 3 — Spacing grid

- Standard rhythm: `4px` (xs) · `8px` (sm) · `12px` (md) · `16px` (lg)
- Use Tailwind spacing utilities: `gap-2`, `p-3`, `px-4` — do not hardcode px values
- Prefer `flex` + `gap` over `margin` for spacing between sibling elements
- ⛔ No magic numbers: `w-[17px]`, `mt-[6px]` — use scale values

## § 4 — Component file structure

Every `ui/*.tsx` file follows this pattern:
1. Write implementation in `component-name.v1.tsx`
2. `component-name.tsx` re-exports: `export * from "./component-name.v1"`
3. Use `React.forwardRef` on all primitives
4. Use `cva` from `class-variance-authority` for variant logic
5. Use `cn()` from `@/app/components/ui/utils` for className merging
6. Named exports only — `export { Component }`, never `export default`
7. Export variants separately: `export { componentVariants }`
8. Add `Component.displayName = "ComponentName"`
9. All props typed — no `any`, use `VariantProps<typeof variants>`

## § 5 — Storybook standards

Every story file must have:
- `tags: ["autodocs"]` on every `meta`
- `title: "UI/ComponentName"` — always `"UI/"` prefix
- `argTypes` for every prop with discrete options (variant, size, disabled)
- `parameters.layout`: `"centered"` (most components) · `"fullscreen"` (page-level) · `"padded"` (inline)
- JSDoc on all exported props for autodocs
- `chromatic: { disableSnapshot: true }` on animated stories (Spinner, DatePicker open, etc.)
- Check Accessibility panel before marking any story done

Story naming convention: `Default` · `AllVariants` · `AllSizes` · `WithIcon` · `Disabled` · `WithError` · `IsLoading` · `Controlled` · `Playground`

## § 6 — Icon library (Phosphor)

- ✅ New components: `@phosphor-icons/react` only
- ⚠️ Existing components: `lucide-react` (don't change existing, don't add new lucide)
- Always pass explicit `size` prop: `<MagnifyingGlass size={16} />`

## § 7 — Size scale

All components with a `size` prop use: `"xs" | "sm" | "md" | "lg" | "xl"`
- Default is always `"md"`
- Never: `"small"`, `"large"`, `"normal"`, `"big"`
- Tailwind mapping: `xs=h-4 w-4` · `sm=h-6 w-6` · `md=h-8 w-8` · `lg=h-10 w-10` · `xl=h-12 w-12`

## § 8 — Accessibility (required on every interactive component)

- Buttons, icon-only: `aria-label`
- Form inputs: `id` + `htmlFor` + `aria-describedby` for errors
- Overlays: `role`, `aria-modal`, focus trap, `Escape` closes
- Toggle/checkbox/switch: `aria-checked` or `aria-pressed`
- Loading: `aria-busy="true"`, `aria-label="Loading"`
- Error: `aria-invalid="true"` + `aria-describedby`
- Keyboard: Tab/Shift+Tab · Enter/Space activates · Escape closes · Arrows navigate menus/groups
- Run `@storybook/addon-a11y` — fix all red violations before PR

## § 9 — Dark mode (required on every component)

- Use semantic tokens that flip automatically: `bg-background`, `text-foreground`, `border-border`, `bg-muted`, `bg-accent`
- Test by switching Storybook toolbar to Dark before marking complete
- ⛔ Never: `bg-white`, `text-[#212121]`, `border-[#eaeaea]` — these break in dark mode

## § 10 — Graph colors (charts only)

- All chart/data-viz components use `var(--graph-*)` tokens — never raw hex
- Preferred sequence (Set 1): starfleet-blue → pastel-violet → benevo-pink → sunflower → carrot → bright-green → turquoise
- Comparison variant: `var(--graph-[name]-compare)` — lighter paired value
- Ratings scale: 0=iron · 1=red · 2=carrot · 3=sunflower · 4=bright-green · 5=green
- Chart library: Recharts v2 (`src/app/components/ui/chart.tsx` wrapper)
- Graph tokens must be added to `src/tokens/theme.css` before any chart is built

---

## Common mistakes to avoid

| ❌ Wrong | ✅ Right |
|---|---|
| `font-family: 'Inter'` inline | `font-family: var(--font-sans)` |
| `color: #1976d2` | `color: var(--primary)` |
| `export default Button` | `export { Button }` |
| `style={{ display: 'flex' }}` | `className="flex"` |
| Building modal from scratch | Use `@radix-ui/react-dialog` base |
| `gap-3`, `p-3`, `gap-5` | `gap-2`/`gap-4`, `p-2`/`p-4` |
| `import { X } from "lucide-react"` in new file | `import { X } from "@phosphor-icons/react"` |
| `font-bold` for emphasis | `font-medium` (both resolve to 400) |
| Raw `z-[50]` | `z-50` |
| `w-[17px]` magic number | Use spacing scale |
