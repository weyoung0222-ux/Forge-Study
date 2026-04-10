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

### Supporter
- Definition is pending (TBD).

### Admin
- Definition is pending (TBD).

## Modeling Rules
- Use exact role keys when implementing UI/state:
  - `consumer`, `dev`, `supporter`, `admin`
  - Dev sub-roles: `project owner`, `data engineer`, `model engineer`
- A single user may have multiple Dev sub-roles at the same time.
- When role definitions are updated, sync:
  - related screen behavior
  - block/catalog descriptions
  - this policy document
