# aero-ds — AI Rules (Codex / OpenAI Agents)

> Source of truth for all AI assistants. Edit only this file — `scripts/sync-ai-rules.mjs` generates GEMINI.md, AGENTS.md, and .github/copilot-instructions.md automatically on commit.
> Full reference: `.claude/skills/aero-ds/SKILL.md`

---

## ⚡ Mandatory execution order — follow every step, every time

When creating or updating any component, execute these steps **in this exact order**. Do not skip, reorder, or combine steps.

```
STEP 1  Read the nearest existing component
        → Open the most similar .v1.tsx in src/app/components/ui/
        → Follow its exact import order, CVA structure, forwardRef pattern

STEP 2  Check for a Radix primitive
        → Dialog, Popover, Tooltip, Checkbox, RadioGroup, Switch, Select,
          Tabs, Accordion, Slider, ScrollArea → use @radix-ui/* as base

STEP 3  Create src/app/components/ui/[name].v1.tsx
        → Implementation lives here
        → Inter font (var(--font-sans)) · no raw hex · system tokens only
        → forwardRef · cva variants · Phosphor icons · xs/sm/md/lg/xl sizes
        → displayName set · named exports only (no export default)

STEP 4  Create src/app/components/ui/[name].tsx
        → One line only: export * from "./[name].v1"

STEP 5  Create src/stories/[Category]/[Name].stories.tsx
        → Title: "Components/[Category]/[Name]/Examples"
        → tags: ["autodocs"] · argTypes for variant/size/disabled
        → parameters.layout: "centered" | "fullscreen" | "padded"
        → Chromatic disableSnapshot on animated stories

STEP 6  Create src/stories/docs/[Name].usage.mdx
        → Title: "Components/[Category]/[Name]/Usage"
        → Sections: Parts · When to use · When not to use ·
          Content guidelines · Behaviour · Related

STEP 7  Create src/stories/docs/[Name].accessibility.mdx
        → Title: "Components/[Category]/[Name]/Accessibility"
        → Sections: Keyboard interaction table · Screen reader behaviour · Focus

STEP 8  Add to src/index.ts
        → export { ComponentName, type ComponentNameProps } from "./app/components/ui/[name]"
        → Without this the component is never published

STEP 9  Run BOTH TypeScript checks — dev AND build  ⛔ Both must pass
        → npx tsc --noEmit                      (dev tsconfig — catches runtime errors)
        → npx tsc -p tsconfig.build.json --noEmit  (build tsconfig — catches publish errors)
        → Fix ALL errors before continuing
        → Common trap: tsconfig.build.json requires "jsx": "react-jsx" for .tsx files
          and "paths": {"@/*": ["./src/*"]} for internal imports — never remove these

STEP 10 Verify in Storybook
        → Check light AND dark mode (toolbar toggle)
        → Check Accessibility panel — fix all red violations
        → Confirm all story variants render correctly

STEP 11 Branch + commit + PR  ⛔ NEVER push directly to main
        → git checkout -b [type]/[name]  (see branch naming below)
        → git add [specific files only — never git add -A blindly]
        → git commit -m "[type]([scope]): [description]"
        → git push -u origin [branch]
        → gh pr create --title "..." --body "..."

Branch naming convention:
  feat/[component-name]        → new component  (e.g. feat/stepper)
  fix/[component-name]         → bug fix         (e.g. fix/radio-border)
  chore/[topic]                → config/rules    (e.g. chore/border-radius-tokens)
  docs/[component-name]        → MDX docs only   (e.g. docs/button-usage)
  refactor/[topic]             → cleanup         (e.g. refactor/remove-duplicates)

⛔ NEVER: git push origin main (direct push is banned)
⛔ NEVER: git add -A or git add . (stage only relevant files)
```

**Category map for story titles:**

| Component type | Story title prefix |
|---|---|
| Button, Input, Select, Checkbox, Switch, DatePicker, Search, Chip, etc. | `Components/Forms and input/` |
| Avatar, Icons | `Components/Images and icons/` |
| Spinner, Skeleton, Progress | `Components/Loading/` |
| Alert, Banner, Dialog, Toast, InlineMessage | `Components/Messaging/` |
| Breadcrumb, Menu, Tabs, Pagination | `Components/Navigation/` |
| Drawer, Popover, Tooltip | `Components/Overlays and layering/` |
| Badge, Tag, EmptyState | `Components/Status indicators/` |
| Accordion, Card, Table, Carousel | `Components/Text and data display/` |
| Stepper, Tree, ColumnCustomizer | `Components/Complex/` |
| Chart stories | `Components/Charts/` |

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

## § 1b — Sentence case everywhere ⛔ NO title case

⛔ All UI text must be sentence case. Title case is banned.

```tsx
// ✅ Correct
<Badge>Active agent</Badge>  <Button>Send response</Button>
<Label>Email address</Label> <SelectItem>Last 30 days</SelectItem>

// ⛔ Wrong
<Badge>Active Agent</Badge>  <Button>Send Response</Button>
```

Applies to: badges, chips, tags, buttons, labels, menu items, select options,
tab labels, toasts, empty state titles, table headers, tooltips, placeholders,
breadcrumbs, nav labels — everything visible to the user.

Exception: proper nouns (Google, Facebook, BirdAI) and acronyms (CSV, PDF, API).

---

## § 2 — Token policy (no raw hex, no outside colors)

⛔ **Only use colors from aero-ds tokens. No Tailwind color palette, no raw hex, no outside color libraries.**

```tsx
// ✅ Only these color sources are allowed:
var(--primary)              // brand blue
var(--destructive)          // error red
var(--foreground)           // text
var(--muted-foreground)     // secondary text
var(--graph-green)          // success / 5-star
var(--graph-sunflower)      // warning / 3-star
var(--graph-carrot)         // orange / 2-star
var(--graph-red)            // error alternate
var(--graph-starfleet-blue) // chart blue
var(--graph-*)              // any other graph token

// ⛔ Banned — outside the token system:
bg-red-600     bg-green-50    text-gray-700   // Tailwind palette
#de1b0c        #4cae3d                        // raw hex
```

For dynamic color values that Tailwind can't statically analyse, use inline `style`:
```tsx
style={{ backgroundColor: `color-mix(in srgb, var(--graph-green) 12%, transparent)`, color: "var(--graph-green)" }}
```

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

## § 3b — tsconfig.build.json (NEVER remove these settings)

⛔ **STRICT: Do not remove `jsx`, `paths`, or `isolatedModules` from `tsconfig.build.json`. These are required for the publish CI to work.**

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",          // ← REQUIRED for .tsx components — removing breaks npm publish
    "paths": { "@/*": ["./src/*"] }, // ← REQUIRED for @/ imports inside components
    "isolatedModules": true,     // ← REQUIRED for bundler compatibility
    "declaration": true,         // ← REQUIRED to emit .d.ts type files for consumers
    "outDir": "./dist"           // ← REQUIRED — publish.yml runs tsc then publishes dist/
  }
}
```

**Why this matters:** `tsconfig.build.json` is used by `npm run build` in the publish workflow. If `jsx` is missing, every `.tsx` component export fails with `'--jsx' is not set`. The dev `tsconfig.json` has JSX set correctly — but the build one is separate and must be kept in sync when new component types are added.

**Checklist before any PR that touches components:**
- [ ] `npx tsc --noEmit` passes (dev)
- [ ] `npx tsc -p tsconfig.build.json --noEmit` passes (build)

---

## § 3c — Border radius (NEVER change — fixed px, not rem)

⛔ **STRICT: Do not modify border radius tokens in `theme.css`. Do not use `calc()` or `rem` for radius. Do not introduce new radius values.**

The radius tokens are fixed pixel values matching Figma Corner Radius spec and birdeyev2:

| Token | Value | Tailwind class | Use for |
|---|---|---|---|
| `--radius-sm` | `4px` | `rounded-sm` | Checkbox, small badges, tight elements |
| `--radius-md` | `8px` | `rounded-md` | Buttons, inputs, dropdowns, chips — **default for controls** |
| `--radius` | `8px` | `rounded-lg` | Same as md — default surface |
| `--radius-xl` | `12px` | `rounded-xl` | Cards, modals, drawers, popovers |
| `rounded-full` | `9999px` | `rounded-full` | Pills, avatars, switches |

**Why fixed px:** `calc(rem - px)` at 13px base gave wrong values — e.g. `--radius-md` became 6.125px instead of 8px. This was a visual regression from the original design.

```tsx
// ✅ Correct
<div className="rounded-md" />     // 8px — controls
<div className="rounded-xl" />     // 12px — cards/modals
<div className="rounded-full" />   // pills/avatars

// ⛔ Never
<div className="rounded-[6px]" />  // bypasses token
<div style={{ borderRadius: '8px' }} />  // inline style
// ⛔ Never change theme.css radius tokens to rem or calc()
```

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
