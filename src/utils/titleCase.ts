/**
 * Title Case for English UI copy (titles, buttons, field labels).
 * - First and last word are always capitalized (major words).
 * - Middle words that are short prepositions/conjunctions stay lowercase (`on`, `of`, `in`, …).
 * - First word is always capitalized even when it is a small word (`In Progress`).
 * @see docs/policies/title-case.md
 */

/** Lowercase when not first/last token (Chicago-style minor words). */
export const TITLE_CASE_SMALL_WORDS: ReadonlySet<string> = new Set([
  'a',
  'an',
  'the',
  'and',
  'or',
  'nor',
  'but',
  'as',
  'at',
  'by',
  'for',
  'if',
  'in',
  'of',
  'on',
  'to',
  'from',
  'into',
  'onto',
  'over',
  'out',
  'off',
  'up',
  'down',
  'vs',
  'via',
  'per',
  'so',
  'yet',
]);

function capitalizeToken(raw: string): string {
  const lower = raw.toLowerCase();
  const i = lower.search(/[a-z]/i);
  if (i < 0) return raw;
  return raw.slice(0, i) + lower.charAt(i).toUpperCase() + lower.slice(i + 1);
}

function isSmallWordOnlyToken(raw: string): boolean {
  if (!/^[A-Za-z]+$/.test(raw)) return false;
  return TITLE_CASE_SMALL_WORDS.has(raw.toLowerCase());
}

/**
 * English UI용 Title Case. 공백으로 단어를 나누고, 토큰에 구두점만 있는 경우는 그대로 둔다.
 */
export function toTitleCase(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  const words = trimmed.split(/\s+/);
  const n = words.length;

  return words
    .map((raw, i) => {
      const first = i === 0;
      const last = i === n - 1;
      if (!first && !last && isSmallWordOnlyToken(raw)) {
        return raw.toLowerCase();
      }
      return capitalizeToken(raw);
    })
    .join(' ');
}

/** English UI only — keep authored casing for non-English locales. */
export type UiTitleCaseLocale = 'en' | 'ko';

export function uiTitleCase(input: string, locale: UiTitleCaseLocale): string {
  if (locale !== 'en') return input;
  return toTitleCase(input);
}
