"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CircleDollarSign,
  FileBarChart2,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Plus,
  ReceiptText,
  ScanSearch,
  Ticket,
  UserPlus,
  Waypoints,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/app/components/ui/utils";

export interface QuickCreateAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  shortcut?: string;
}

export const QUICK_CREATE_ACTIONS: QuickCreateAction[] = [
  {
    id: "review-request",
    title: "Review request",
    description: "Ask customers for fresh feedback after a visit or service.",
    icon: MessageSquareQuote,
    shortcut: "R",
  },
  {
    id: "new-message",
    title: "New message",
    description: "Start a direct outreach thread from one global entry point.",
    icon: Mail,
    shortcut: "M",
  },
  {
    id: "create-post",
    title: "Create post",
    description: "Draft a social post without switching into the Social module first.",
    icon: ReceiptText,
    shortcut: "P",
  },
  {
    id: "custom-agent",
    title: "Create custom agent",
    description: "Spin up a BirdAI worker for repeatable operational tasks.",
    icon: Bot,
    shortcut: "A",
  },
  {
    id: "add-contact",
    title: "Add a contact",
    description: "Create a CRM record for a new lead, customer, or business contact.",
    icon: UserPlus,
    shortcut: "C",
  },
  {
    id: "request-payment",
    title: "Request payment",
    description: "Send a billing request from the same launcher instead of an L2 tile.",
    icon: CircleDollarSign,
    shortcut: "Y",
  },
  {
    id: "create-survey",
    title: "Create survey",
    description: "Start a customer survey with templates and distribution options.",
    icon: ScanSearch,
    shortcut: "S",
  },
  {
    id: "create-ticket",
    title: "Create ticket",
    description: "Open a support ticket and route it into the service workflow.",
    icon: Ticket,
    shortcut: "T",
  },
  {
    id: "create-workflow",
    title: "Create workflow",
    description: "Compose a multi-step automation that spans modules.",
    icon: Waypoints,
    shortcut: "W",
  },
  {
    id: "create-report",
    title: "Create report",
    description: "Generate a report artifact from shared metrics and saved views.",
    icon: FileBarChart2,
    shortcut: "G",
  },
  {
    id: "create-dashboard",
    title: "Create dashboard",
    description: "Create a saved reporting surface with persistent widgets.",
    icon: LayoutDashboard,
    shortcut: "D",
  },
];

interface QuickCreateLauncherProps {
  actions?: QuickCreateAction[];
  onActionSelect?: (action: QuickCreateAction) => void;
  className?: string;
}

export function QuickCreateLauncher({
  actions = QUICK_CREATE_ACTIONS,
  onActionSelect,
  className,
}: QuickCreateLauncherProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const featuredActions = actions.slice(0, 5);

  function handleSelect(action: QuickCreateAction) {
    onActionSelect?.(action);
    setDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="outline"
            aria-label="Open quick create actions"
            className={cn(
              "rounded-full border-[#d6deeb] bg-[#edf2fb] text-[#2552ed] shadow-[0_8px_24px_rgba(37,82,237,0.12)] hover:bg-[#e5edfb]",
              className,
            )}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[280px] rounded-2xl border-[#d8dfec] bg-white p-2 shadow-[0_20px_48px_rgba(15,23,42,0.16)]"
        >
          {featuredActions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenuItem
                key={action.id}
                onSelect={() => handleSelect(action)}
                className="min-h-11 rounded-xl px-3 py-2.5 text-[#142033] hover:bg-[#f3f6fb] focus:bg-[#f3f6fb]"
              >
                <div className="flex w-full items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eef3ff] text-[#2552ed]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-[13px] font-semibold">{action.title}</span>
                    <span className="truncate text-[11px] text-[#667085]">{action.description}</span>
                  </span>
                  {action.shortcut ? (
                    <span className="rounded-md border border-[#d8dfec] bg-[#f8fafc] px-1.5 py-0.5 text-[10px] font-semibold text-[#667085]">
                      {action.shortcut}
                    </span>
                  ) : null}
                </div>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator className="bg-[#e8edf5]" />
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setDialogOpen(true);
            }}
            className="rounded-xl px-3 py-2.5 font-semibold text-[#2552ed] hover:bg-[#eef3ff] focus:bg-[#eef3ff]"
          >
            Browse all actions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[1100px] gap-0 overflow-hidden rounded-[28px] border-[#dce3ef] p-0 shadow-[0_40px_120px_rgba(15,23,42,0.22)]">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(37,82,237,0.12),_transparent_28%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]">
            <DialogHeader className="gap-3 border-b border-[#e7edf6] px-8 py-8 text-left">
              <DialogTitle className="text-[38px] leading-[1.05] font-semibold tracking-[-0.04em] text-[#0f1728]">
                What do you want to create?
              </DialogTitle>
              <DialogDescription className="max-w-3xl text-[17px] leading-7 text-[#526076]">
                Replace scattered L2 plus buttons with one launcher in the top bar. Small actions stay
                one click away, while the expanded surface gives enough room for clear choices.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 px-8 py-8 md:grid-cols-2 xl:grid-cols-3">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => handleSelect(action)}
                    className="group flex min-h-[220px] flex-col rounded-[24px] border border-[#dde5f0] bg-white p-6 text-left shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cbd8f4] hover:shadow-[0_20px_40px_rgba(37,82,237,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2552ed]"
                  >
                    <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#eaf1ff_0%,#f3f7ff_100%)] text-[#2552ed]">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="mb-3 text-[28px] leading-8 font-semibold tracking-[-0.03em] text-[#101828]">
                      {action.title}
                    </span>
                    <span className="text-[16px] leading-7 text-[#5b667a]">{action.description}</span>
                    {action.shortcut ? (
                      <span className="mt-auto pt-6 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7c8aa5]">
                        Quick key {action.shortcut}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
