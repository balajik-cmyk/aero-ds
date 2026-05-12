import type { Meta, StoryObj } from "@storybook/react";
import { AppDataTableColumnSettingsTrigger } from "@/app/components/ui/AppDataTableColumnSettingsTrigger";

const meta: Meta<typeof AppDataTableColumnSettingsTrigger> = {
  title: "Components/Text and data display/AppDataTable/ColumnSettingsTrigger",
  component: AppDataTableColumnSettingsTrigger,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    sheetTitle: { control: "text" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AppDataTableColumnSettingsTrigger>;

export const Default: Story = {
  args: { sheetTitle: "Columns" },
};

export const Disabled: Story = {
  args: { sheetTitle: "Columns", disabled: true },
};

