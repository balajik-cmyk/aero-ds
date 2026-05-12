import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Menu, MenuTrigger, MenuContent, MenuGroup,
  MenuItem, MenuCheckboxItem, MenuRadioGroup, MenuRadioItem,
  MenuLabel, MenuSeparator, MenuSubTrigger, MenuSubContent, MenuSub, MenuShortcut,
} from "@/app/components/ui/menu";
import { Button } from "@/app/components/ui/button";
import { Gear, UserCircle, SignOut, Plus, Trash } from "@phosphor-icons/react";

const meta: Meta = {
  title: "Components/Navigation/Menu/Examples",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild><Button variant="outline">Open menu</Button></MenuTrigger>
      <MenuContent>
        <MenuItem><UserCircle size={14} /> Profile</MenuItem>
        <MenuItem><Gear size={14} /> Settings</MenuItem>
        <MenuSeparator />
        <MenuItem className="text-destructive"><SignOut size={14} /> Sign out</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild><Button variant="outline">Actions</Button></MenuTrigger>
      <MenuContent>
        <MenuItem><Plus size={14} /> New review request</MenuItem>
        <MenuItem><Gear size={14} /> Configure agent<MenuShortcut>⌘,</MenuShortcut></MenuItem>
        <MenuSeparator />
        <MenuItem className="text-destructive"><Trash size={14} /> Delete<MenuShortcut>⌫</MenuShortcut></MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild><Button variant="outline">Export</Button></MenuTrigger>
      <MenuContent className="w-52">
        <MenuItem>
          <div className="flex flex-col">
            <span>Export as CSV</span>
            <span className="text-xs text-muted-foreground">Spreadsheet-compatible</span>
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex flex-col">
            <span>Export as PDF</span>
            <span className="text-xs text-muted-foreground">Print-ready report</span>
          </div>
        </MenuItem>
      </MenuContent>
    </Menu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [state, setState] = useState({ responses: true, ratings: true, keywords: false });
    return (
      <Menu>
        <MenuTrigger asChild><Button variant="outline">Columns</Button></MenuTrigger>
        <MenuContent>
          <MenuLabel>Show columns</MenuLabel>
          <MenuSeparator />
          {(Object.keys(state) as (keyof typeof state)[]).map(k => (
            <MenuCheckboxItem key={k} checked={state[k]} onCheckedChange={v => setState(s => ({ ...s, [k]: !!v }))}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
            </MenuCheckboxItem>
          ))}
        </MenuContent>
      </Menu>
    );
  },
};

export const Grouped: Story = {
  render: () => (
    <Menu>
      <MenuTrigger asChild><Button variant="outline">Sort by</Button></MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuLabel>Date</MenuLabel>
          <MenuItem>Newest first</MenuItem>
          <MenuItem>Oldest first</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuLabel>Rating</MenuLabel>
          <MenuItem>Highest rated</MenuItem>
          <MenuItem>Lowest rated</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

export const Positioning: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap justify-center">
      {(["bottom", "top", "left", "right"] as const).map(side => (
        <Menu key={side}>
          <MenuTrigger asChild><Button variant="outline" size="sm">{side}</Button></MenuTrigger>
          <MenuContent side={side}>
            <MenuItem>Option 1</MenuItem>
            <MenuItem>Option 2</MenuItem>
            <MenuItem>Option 3</MenuItem>
          </MenuContent>
        </Menu>
      ))}
    </div>
  ),
};
