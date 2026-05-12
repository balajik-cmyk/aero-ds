// Aero DS — public exports

// ── Utilities ────────────────────────────────────────────────────────────────
export * from "./lib/utils";
export * from "./config/designVersion";

// ── Shell layout ─────────────────────────────────────────────────────────────
export * from "./app/components/layout/appShellClasses";
export * from "./app/components/layout/slidePanelConstants";

// ── Canvas header tokens ──────────────────────────────────────────────────────
export * from "./app/components/layout/mainViewTitleClasses";

// ── Floating surfaces ─────────────────────────────────────────────────────────
export * from "./app/components/ui/floatingPanelSurface";

// ── Modal overlay ─────────────────────────────────────────────────────────────
export * from "./app/components/ui/modalOverlayClasses";

// ── Icon tokens ───────────────────────────────────────────────────────────────
export * from "./app/components/l1StripIconTokens";

// ── New UI components (Phase 1) ───────────────────────────────────────────────
export { Spinner, type SpinnerProps } from "./app/components/ui/spinner";
export { Tag, type TagProps } from "./app/components/ui/tag";
export { Banner, type BannerProps } from "./app/components/ui/banner";
export { Search, type SearchProps } from "./app/components/ui/search";
export { InlineMessage, type InlineMessageProps } from "./app/components/ui/inline-message";
export { EmptyState, type EmptyStateProps } from "./app/components/ui/empty-state";
export { Toaster, toast } from "./app/components/ui/toast";

// ── New UI components (Phase 3) ───────────────────────────────────────────────
export { CheckboxGroup, type CheckboxGroupProps, type CheckboxGroupItem } from "./app/components/ui/checkbox-group";
export { SplitButton, type SplitButtonProps, type SplitButtonItem } from "./app/components/ui/split-button";
export { AvatarGroup, type AvatarGroupProps, type AvatarGroupItem } from "./app/components/ui/avatar-group";
export { DatePicker, type DatePickerProps } from "./app/components/ui/date-picker";
export { DateRangePicker, type DateRangePickerProps, type DateRange } from "./app/components/ui/date-range-picker";

// ── New UI components (Phase 4) ───────────────────────────────────────────────
export { Stepper, type StepperProps, type Step, type StepStatus } from "./app/components/ui/stepper";
export { Tree, type TreeProps, type TreeNode } from "./app/components/ui/tree";
export { ColumnCustomizer, type ColumnCustomizerProps, type ColumnField } from "./app/components/ui/column-customizer";

// ── New UI components (remaining plan items) ─────────────────────────────────
export { TimePicker, type TimePickerProps, type TimeValue } from "./app/components/ui/time-picker";
export { Chip, type ChipProps } from "./app/components/ui/chip";
export { HyperlinkButton, type HyperlinkButtonProps } from "./app/components/ui/hyperlink-button";
export * from "./app/components/ui/menu";
export { SegmentGroup, SegmentGroupItem, type SegmentGroupProps, type SegmentGroupItemProps } from "./app/components/ui/segment-group";
