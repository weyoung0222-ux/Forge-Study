# CustomerList Policy

## Purpose
Provide a searchable list of customers with RFM indicators.

## Access Policy
- Roles: `planner`, `analyst`, `admin`
- Read-only for `analyst`
- Export action limited to `planner` and `admin`

## UX Policy
- Empty state: show guidance to update filters
- Error state: show retry action with error code
- Default sort: monetary descending

## Data Policy
- Sensitive fields (phone, email) are masked by default
- Segment labels follow canonical values from `segment.entity.ts`
