# Contributing to aero-ds

---

## Adding a new component

### Step 1 — Create the files
```
src/app/components/ui/
  component-name.tsx        ← re-export only
  component-name.v1.tsx     ← implementation lives here
```

`component-name.tsx`:
```ts
export * from "./component-name.v1"
```

`component-name.v1.tsx` — follow this structure exactly:
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/app/components/ui/utils"

const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { sm: "h-6", md: "h-8", lg: "h-10" },
  },
  defaultVariants: { variant: "default", size: "md" },
})

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  /** Description of this prop for autodocs. */
  loading?: boolean
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Step 2 — Write the story
```
src/stories/ComponentName.stories.tsx
```

```ts
import type { Meta, StoryObj } from "@storybook/react"
import { Component } from "@/app/components/ui/component-name"

const meta: Meta<typeof Component> = {
  title: "UI/ComponentName",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    disabled: { control: "boolean" },
  },
}
export default meta
type Story = StoryObj<typeof Component>

export const Default: Story = { args: { children: "Label" } }
export const AllVariants: Story = { render: () => <div className="flex gap-2">...</div> }
```

### Step 3 — Export from `src/index.ts`
```ts
export { Component, type ComponentProps } from "@/app/components/ui/component-name"
```

### Step 4 — Run Storybook and check
```bash
npm run storybook
```
- Open the component story
- Switch toolbar to **Dark** — verify dark mode works
- Open **Accessibility** panel — fix all red violations
- Check all story variants render correctly

### Step 5 — Chromatic baseline
After merging to `main`, Chromatic captures baselines automatically via GitHub Actions.

---

## Rules (enforced by AI assistants — see CLAUDE.md)

### Font
- Inter only, weights 300 and 400 only
- Use `var(--font-sans)` — never hardcode `font-family: 'Inter'`
- Base size: 13px

### Colors / tokens
- No raw hex in component code
- `var(--primary)` not `#1976d2` · `var(--destructive)` not `#de1b0c`
- Chart colors: `var(--graph-*)` tokens only

### Spacing
- Use Tailwind scale: `gap-2`, `p-4`, `px-3`
- No magic pixel values: `w-[17px]` ❌

### Sizing
- Size prop values: `"xs" | "sm" | "md" | "lg" | "xl"` — never custom names

### Icons
- New components: `@phosphor-icons/react` only, always explicit `size` prop
- Existing components: `lucide-react` (don't migrate, don't add new)

### Dark mode
- Use semantic tokens: `bg-background`, `text-foreground`, `border-border`, `bg-muted`
- Test in Storybook Dark toolbar before every PR

### Accessibility
- Icon-only buttons: `aria-label`
- Form inputs: `id` + `htmlFor` + `aria-describedby`
- Overlays: focus trap + Escape closes
- Run Storybook a11y panel — fix all red violations

### Exports
- Named exports only — no `export default`
- Export variants alongside component

---

## Bump and publish

1. Change version in `package.json`
2. `git tag v1.x.y && git push origin v1.x.y`
3. GitHub Actions runs `publish.yml` and publishes to `@balajik-cmyk/aero-ds`

---

## AI rules sync

Edit `CLAUDE.md` only. On every commit, the pre-commit hook auto-generates:
- `GEMINI.md` (Gemini CLI)
- `AGENTS.md` (Codex)
- `.github/copilot-instructions.md` (GitHub Copilot)

To sync manually: `node scripts/sync-ai-rules.mjs`
