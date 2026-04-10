# ADR-001 Block Granularity

## Status
Accepted

## Context
RFM screens share repeated UI structures (search/filter/table/detail).

## Decision
Use a block-based composition model with reusable patterns. Promote repeated combinations into pattern-level components after second reuse.

## Consequences
- Faster creation of new screens
- Lower duplication risk
- Requires consistent registry and documentation maintenance
