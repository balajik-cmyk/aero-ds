import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/app/components/ui/select";
import { Label } from "@/app/components/ui/label";

const meta: Meta<typeof Select> = {
  title: "UI/Select/Examples",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (EST)</SelectItem>
          <SelectItem value="cst">Central (CST)</SelectItem>
          <SelectItem value="pst">Pacific (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Paris (CET)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-56">
      <Label htmlFor="status">Status</Label>
      <Select>
        <SelectTrigger id="status">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Async: Story = {
  render: () => {
    const { useState, useEffect } = require("react");
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (!open || options.length) return;
      setLoading(true);
      setTimeout(() => {
        setOptions(["Google", "Facebook", "Yelp", "LinkedIn", "TripAdvisor"]);
        setLoading(false);
      }, 800);
    }, [open]);

    return (
      <Select onOpenChange={setOpen}>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Select platform..." />
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <div className="flex items-center justify-center py-4 text-xs text-muted-foreground gap-2">
              <span className="h-3 w-3 rounded-full border border-current border-t-transparent animate-spin" />
              Loading...
            </div>
          ) : (
            options.map(o => <SelectItem key={o} value={o.toLowerCase()}>{o}</SelectItem>)
          )}
        </SelectContent>
      </Select>
    );
  },
};

export const InfiniteScroll: Story = {
  render: () => {
    const { useState, useRef, useCallback } = require("react");
    const PAGE = 10;
    const all = Array.from({ length: 50 }, (_, i) => `Location ${i + 1}`);
    const [visible, setVisible] = useState(all.slice(0, PAGE));
    const [loading, setLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

    const loadMore = useCallback(() => {
      if (loading || visible.length >= all.length) return;
      setLoading(true);
      setTimeout(() => {
        setVisible(prev => all.slice(0, prev.length + PAGE));
        setLoading(false);
      }, 600);
    }, [loading, visible.length]);

    return (
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Select location..." />
        </SelectTrigger>
        <SelectContent className="max-h-56 overflow-y-auto" onScroll={e => {
          const t = e.currentTarget;
          if (t.scrollTop + t.clientHeight >= t.scrollHeight - 20) loadMore();
        }}>
          {visible.map(l => <SelectItem key={l} value={l.toLowerCase().replace(" ", "-")}>{l}</SelectItem>)}
          {loading && (
            <div className="flex justify-center py-2 text-xs text-muted-foreground gap-2">
              <span className="h-3 w-3 rounded-full border border-current border-t-transparent animate-spin" />
              Loading more...
            </div>
          )}
        </SelectContent>
      </Select>
    );
  },
};
