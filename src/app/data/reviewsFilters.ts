import type { FilterItem } from "@/app/components/FilterPanel.v1";

export const reviewsFilterItems: FilterItem[] = [
  {
    id: "rating",
    label: "Rating",
    options: ["All", "5 stars", "4 stars", "3 stars", "2 stars", "1 star"],
  },
  {
    id: "platform",
    label: "Platform",
    options: ["All", "Google", "Yelp", "Facebook", "TripAdvisor"],
  },
  {
    id: "status",
    label: "Response status",
    options: ["All", "Responded", "Pending", "Flagged"],
  },
  {
    id: "dateRange",
    label: "Date range",
    options: ["All time", "Today", "Last 7 days", "Last 30 days"],
  },
];

export function createInitialReviewsFilters(): FilterItem[] {
  return reviewsFilterItems.map((f) => ({ ...f }));
}
