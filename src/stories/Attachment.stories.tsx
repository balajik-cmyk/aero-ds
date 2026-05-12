import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CloudArrowUp, File, X } from "@phosphor-icons/react";
import { cn } from "@/app/components/ui/utils";
import { Button } from "@/app/components/ui/button";
import { Spinner } from "@/app/components/ui/spinner";

const meta: Meta = {
  title: "UI/Attachment/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

function Dropzone({ state, files = [] }: { state: "empty" | "with-files" | "loading"; files?: string[] }) {
  const isOver = false;
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 w-80 transition-colors",
      state === "loading"    ? "border-primary/40 bg-primary/5" :
      isOver                 ? "border-primary bg-primary/5" :
                               "border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/50"
    )}>
      {state === "loading" ? (
        <>
          <Spinner size="md" />
          <p className="text-sm text-muted-foreground">Uploading…</p>
        </>
      ) : state === "with-files" ? (
        <>
          <CloudArrowUp size={32} className="text-primary" />
          <div className="flex flex-col gap-1.5 w-full">
            {files.map(f => (
              <div key={f} className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
                <File size={14} className="text-muted-foreground shrink-0" />
                <span className="flex-1 text-xs text-foreground truncate">{f}</span>
                <button type="button" aria-label="Remove" className="text-muted-foreground hover:text-foreground">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Drop more files or click to add</p>
        </>
      ) : (
        <>
          <CloudArrowUp size={32} className="text-muted-foreground" />
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm text-foreground font-medium">Drop files here</p>
            <p className="text-xs text-muted-foreground">or click to browse — PDF, CSV, PNG up to 10MB</p>
          </div>
          <Button variant="outline" size="sm">Browse files</Button>
        </>
      )}
    </div>
  );
}

export const DropzoneEmpty: Story = {
  render: () => <Dropzone state="empty" />,
};

export const DropzoneWithFiles: Story = {
  render: () => (
    <Dropzone
      state="with-files"
      files={["review-export-2024.csv", "logo-updated.png"]}
    />
  ),
};

export const DropzoneLoading: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => <Dropzone state="loading" />,
};

export const Inline: Story = {
  render: () => (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 px-3 py-2 hover:border-primary/40 transition-colors">
        <CloudArrowUp size={14} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground group-hover:text-foreground">Attach file</span>
      </div>
      <input type="file" className="sr-only" />
    </label>
  ),
};

export const InlineLoading: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: () => (
    <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
      <Spinner size="xs" />
      <span className="text-sm text-muted-foreground">Uploading review-export.csv…</span>
    </div>
  ),
};
