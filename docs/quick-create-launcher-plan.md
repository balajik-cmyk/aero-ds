# Quick Create Launcher Plan

## Goal

Replace the current pattern of repeating `+` buttons inside the L2 rail with one global quick-create launcher in the top bar. The launcher should support two layers:

- a compact dropdown for common actions
- a larger card-grid dialog for guided selection

The expanded dialog should borrow the spatial rhythm from the Canva reference: large title, explanatory subcopy, evenly sized cards, and clear visual separation between options.

## Why This Change

- The current L2 mixes navigation and creation, which makes the rail noisy.
- Repeated plus buttons do not scale when more modules add create actions.
- A single launcher improves discoverability and keeps primary actions in one learned location.

## Target Interaction

```text
+----------------------------------------------------------------------------------+
| TopBar                                                                    Ask... |
|                                                             [+]  [sparkles btn]  |
+----------------------------------------------------------------------------------+

Click [+]
                                      +---------------------------+
                                      | Review request            |
                                      | New message               |
                                      | Create post               |
                                      | Create custom agent       |
                                      | Add a contact             |
                                      | Request payment           |
                                      | Create survey             |
                                      | Create ticket             |
                                      | Create workflow           |
                                      | Create report             |
                                      | Create dashboard          |
                                      +---------------------------+

Expanded mode
+----------------------------------------------------------------------------------+
| What do you want to create?                                                      |
| Start from one launcher instead of placing `+` buttons in each L2 row.           |
|                                                                                  |
|  +------------------+  +------------------+  +------------------+                |
|  | Review request   |  | New message      |  | Create post      |                |
|  | Ask for feedback |  | Start outreach   |  | Social draft     |                |
|  +------------------+  +------------------+  +------------------+                |
|                                                                                  |
|  +------------------+  +------------------+  +------------------+                |
|  | Custom agent     |  | Add contact      |  | Request payment  |                |
|  | Automate work    |  | CRM record       |  | Billing action   |                |
|  +------------------+  +------------------+  +------------------+                |
|                                                                                  |
|  +------------------+  +------------------+  +------------------+                |
|  | Create survey    |  | Create ticket    |  | Create workflow  |                |
|  | Collect answers  |  | Support issue    |  | Multi-step logic |                |
|  +------------------+  +------------------+  +------------------+                |
|                                                                                  |
|  +------------------+  +------------------+                                      |
|  | Create report    |  | Create dashboard |                                      |
|  | Analytics output |  | Saved overview   |                                      |
|  +------------------+  +------------------+                                      |
+----------------------------------------------------------------------------------+
```

## Skill Update

The new pattern raises the interaction quality in three ways:

- scanning skill: users no longer parse multiple small plus icons spread across unrelated rows
- recall skill: users learn one creation trigger in the top bar
- scaling skill: new actions can be added in the dialog grid without restructuring navigation

## Delivery Sequence

1. Add the launcher component to `TopBar` behind a prop or feature flag.
2. Map each launcher action to the relevant route, modal, or workflow trigger.
3. Remove redundant L2 plus buttons once parity is confirmed.
4. Add analytics for trigger open, action select, and dialog open events.
5. Validate keyboard support and focus return behavior.

## Storybook Scope

Storybook should demonstrate:

- compact top-bar placement
- dropdown menu behavior for quick access
- expanded dialog with large card-grid choices
- enough visual context to compare old L2 behavior against the proposed launcher
