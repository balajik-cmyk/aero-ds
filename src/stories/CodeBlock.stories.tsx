import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CodeBlock, CodeBlockCode, CodeBlockGroup } from "@/app/components/ui/code-block";
import { Button } from "@/app/components/ui/button";
import { Copy, Check, CaretDown, CaretUp } from "@phosphor-icons/react";

const meta: Meta = {
  title: "Components/Text and data display/CodeBlock/Examples",
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ── Sample code snippets ──────────────────────────────────────────────────────

const TSX_SHORT = `import { Badge } from "@/app/components/ui/badge";

export function StatusBadge({ status }: { status: string }) {
  const color = status === "active" ? "green" : "gray";
  return <Badge colorPalette={color}>{status}</Badge>;
}`;

const TSX_LONG = `import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Spinner } from "@/app/components/ui/spinner";
import { EmptyState } from "@/app/components/ui/empty-state";

type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  platform: "google" | "facebook" | "yelp";
  createdAt: string;
};

export function ReviewList({ locationId }: { locationId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(\`/api/reviews?locationId=\${locationId}\`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [locationId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (loading) return <Spinner label="Loading reviews..." />;
  if (error)   return <EmptyState variant="no-data" title="Could not load reviews" description={error} />;
  if (!reviews.length) return <EmptyState variant="no-results" title="No reviews yet" />;

  return (
    <ul className="flex flex-col gap-3">
      {reviews.map(r => (
        <li key={r.id} className="rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">{r.author}</span>
            <Badge colorPalette={r.platform === "google" ? "blue" : "gray"}>
              {r.platform}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{r.text}</p>
        </li>
      ))}
    </ul>
  );
}`;

const BASH_CODE = `# Install aero-ds
npm install @balajik-cmyk/aero-ds

# Import tokens in your app entry
import "@balajik-cmyk/aero-ds/theme.css";
import "@balajik-cmyk/aero-ds/fonts.css";`;

const CSS_CODE = `/* Use aero-ds tokens in your components */
.my-badge {
  background-color: var(--color-green-10);
  color: var(--color-green-100);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
  font-size: 11px;
}`;

// ── Copy button helper ────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-muted-foreground hover:text-foreground"
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </Button>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="max-w-xl">
      <CodeBlock>
        <CodeBlockCode code={TSX_SHORT} language="tsx" />
      </CodeBlock>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div className="max-w-xl">
      <CodeBlock>
        <CodeBlockGroup className="px-4 py-2 border-b border-border">
          <span className="text-xs text-muted-foreground font-medium">StatusBadge.tsx</span>
          <CopyButton code={TSX_SHORT} />
        </CodeBlockGroup>
        <CodeBlockCode code={TSX_SHORT} language="tsx" />
      </CodeBlock>
    </div>
  ),
};

export const WithCopyButton: Story = {
  render: () => (
    <div className="max-w-xl">
      <CodeBlock>
        <CodeBlockGroup className="px-4 py-2 border-b border-border">
          <span className="text-xs text-muted-foreground">bash</span>
          <CopyButton code={BASH_CODE} />
        </CodeBlockGroup>
        <CodeBlockCode code={BASH_CODE} language="bash" />
      </CodeBlock>
    </div>
  ),
};

export const Languages: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      {([
        { label: "TypeScript", code: TSX_SHORT, lang: "tsx" },
        { label: "Bash", code: BASH_CODE, lang: "bash" },
        { label: "CSS", code: CSS_CODE, lang: "css" },
      ] as const).map(({ label, code, lang }) => (
        <CodeBlock key={lang}>
          <CodeBlockGroup className="px-4 py-2 border-b border-border">
            <span className="text-xs text-muted-foreground">{label}</span>
            <CopyButton code={code} />
          </CodeBlockGroup>
          <CodeBlockCode code={code} language={lang} />
        </CodeBlock>
      ))}
    </div>
  ),
};

// ── Overflow & Overlay ────────────────────────────────────────────────────────
// Long code block with max-height, gradient fade at the bottom, and expand toggle.

export const OverflowAndOverlay: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Long code blocks are clipped at a max height with a gradient fade overlay. A toggle reveals or collapses the full content.",
      },
    },
  },
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <div className="max-w-xl">
        <CodeBlock>
          <CodeBlockGroup className="px-4 py-2 border-b border-border">
            <span className="text-xs text-muted-foreground font-medium">ReviewList.tsx</span>
            <CopyButton code={TSX_LONG} />
          </CodeBlockGroup>

          {/* Clip container */}
          <div className="relative">
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: expanded ? "none" : "12rem" }}
            >
              <CodeBlockCode code={TSX_LONG} language="tsx" />
            </div>

            {/* Gradient overlay — hidden when expanded */}
            {!expanded && (
              <div
                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent, var(--card))",
                }}
              />
            )}
          </div>

          {/* Expand / collapse toggle */}
          <button
            type="button"
            onClick={() => setExpanded(e => !e)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-muted-foreground hover:text-foreground border-t border-border transition-colors"
          >
            {expanded ? (
              <><CaretUp size={12} /> Show less</>
            ) : (
              <><CaretDown size={12} /> Show more</>
            )}
          </button>
        </CodeBlock>
      </div>
    );
  },
};

export const Themes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xl">
      <CodeBlock>
        <CodeBlockGroup className="px-4 py-2 border-b border-border">
          <span className="text-xs text-muted-foreground">Light (github-light)</span>
        </CodeBlockGroup>
        <CodeBlockCode code={TSX_SHORT} language="tsx" theme="github-light" />
      </CodeBlock>

      <CodeBlock>
        <CodeBlockGroup className="px-4 py-2 border-b border-border">
          <span className="text-xs text-muted-foreground">Dark (github-dark)</span>
        </CodeBlockGroup>
        <CodeBlockCode code={TSX_SHORT} language="tsx" theme="github-dark" />
      </CodeBlock>
    </div>
  ),
};
