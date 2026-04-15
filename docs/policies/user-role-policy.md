# User Role Policy

## Purpose
- Define a shared role model used across screens, menus, and future permission logic.
- Keep role naming and capability scope consistent in planning, implementation, and docs.

## Role Definitions

### Consumer
- Can download and use `model` and `dataset` assets registered in Library.
- Can request new `model` and `dataset` resources.

### Dev
- Dev group consists of three sub-roles:
  - `project owner`
  - `data engineer`
  - `model engineer`
- Access/operation scope by sub-role:
  - `project owner`: overall project management.
  - `data engineer`: executes features under Data Foundry.
  - `model engineer`: executes features under Model Institute.

### Workspace (project) — domain tabs
On **Project Workspace** (`/projects/:projectId/workspace`), the **Data Foundry** / **Model Institute** tabs are filtered by Dev sub-role:
- **`project owner`**: both tabs are shown (full project scope).
- **`data engineer`** (and not `project owner`): **Data Foundry** tab only.
- **`model engineer`** (and not `project owner`): **Model Institute** tab only.
- A member with **both** `data engineer` and `model engineer` (and not `project owner`): **both** tabs — same effective scope as owner for tab visibility.

Implementation: `getWorkspaceTabVisibility` in `src/utils/workspaceTabVisibility.ts` (`ProjectWorkspace.screen.tsx`).

### Supporter
- Definition is pending (TBD).

### Admin
- Definition is pending (TBD).

## Modeling Rules
- Use exact role keys when implementing UI/state:
  - `consumer`, `dev`, `supporter`, `admin`
  - Dev sub-roles: `project owner`, `data engineer`, `model engineer`
- A single user may have multiple Dev sub-roles at the same time.
- **Edit Profile (prototype):** Users who are not `project owner` on the current project see **Request access** for `data engineer` and/or `model engineer` when they do not already hold that sub-role (`EditProfilePanelBlock`).
- When role definitions are updated, sync:
  - related screen behavior
  - block/catalog descriptions
  - this policy document
  - workspace tab rules (`workspaceTabVisibility.ts`) when Dev sub-role scope changes
