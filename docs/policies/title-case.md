# Title Case (English UI)

English copy shown as **titles, section headings, field labels, and button labels** uses:

- `toTitleCase` — pure formatting (e.g. constants and English-only blocks).
- `uiTitleCase(text, locale)` — same rules when `locale === 'en'`; returns `text` unchanged for `ko` (and any future non-English UI).

Both live in `src/utils/titleCase.ts`.

## Rules

1. **First word** of the string is always capitalized, even when it is a short word (e.g. `In Progress`, not `in Progress`).
2. **Last word** is always capitalized (major word).
3. **Middle words** that are short prepositions/conjunctions stay **lowercase**: `a`, `an`, `the`, `and`, `or`, `nor`, `but`, `as`, `at`, `by`, `for`, `if`, `in`, `of`, `on`, `to`, `from`, `into`, `onto`, `over`, `out`, `off`, `up`, `down`, `vs`, `via`, `per`, `so`, `yet` (see `TITLE_CASE_SMALL_WORDS` in `titleCase.ts`).

Examples:

- `jobs on process` → **Jobs on Process**
- `in progress` → **In Progress**
- `dataset parameters` → **Dataset Parameters**
- `save draft` → **Save Draft**

## Source strings

Prefer storing English UI strings in **lowercase phrase form** (sentence-style) in code and i18n, then applying `toTitleCase` at render time so buttons and titles stay consistent without duplicating rules.

## Non-English

Do not run `toTitleCase` on non-English user-facing strings; keep locale-specific casing as authored.

## Related

- Implementation: `src/utils/titleCase.ts`
- Policy index: `docs/policies/README.md` (if present)
