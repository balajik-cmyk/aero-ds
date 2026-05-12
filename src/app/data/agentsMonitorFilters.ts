import type { FilterItem } from "@/app/components/FilterPanel.v1";

export const agentsMonitorFilterItems: FilterItem[] = [
  {
    id: "status",
    label: "Status",
    options: ["All", "Active", "Idle", "Error"],
  },
  {
    id: "category",
    label: "Category",
    options: [
      "All",
      "Customer interaction",
      "Automation",
      "Content publishing",
      "Data update",
      "System event",
    ],
  },
  {
    id: "dateRange",
    label: "Date range",
    options: ["All time", "Today", "Last 7 days", "Last 30 days"],
  },
  {
    id: "location",
    label: "Location",
    options: ["All", "HQ", "Branch A", "Branch B"],
  },
];

export function createInitialAgentsMonitorFilters(): FilterItem[] {
  return agentsMonitorFilterItems.map((f) => ({ ...f }));
}
