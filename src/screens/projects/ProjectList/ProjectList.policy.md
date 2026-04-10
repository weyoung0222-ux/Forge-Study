# ProjectList Policy

## Purpose
Provide a unified card list view to discover, filter, and open project workspaces.

## Access Policy
- Roles: `project_owner`, `data_developer`, `model_developer`, `admin`
- Read access for all listed roles
- Create action limited to `project_owner` and `admin`

## UX Policy
- Default tab: `All`
- Default sort: `Recently Added`
- Card click navigates to project detail page

## Data Policy
- Role labels must follow canonical values in screen schema
- Empty state appears when no cards match active filters
