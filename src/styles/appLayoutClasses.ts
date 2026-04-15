/**
 * App-wide horizontal layout: GNB, list pages, project LNB+main, and activity inner bands
 * align to a single max width (1200px). Full-bleed backgrounds wrap an inner `appShellInnerClass`.
 */
export const APP_MAX_CONTENT_WIDTH_PX = 1200;

/** Tailwind max-width token — use with `mx-auto w-full` for centered shells. */
export const appMaxWidthClass = 'max-w-[1200px]';

/**
 * Centered content column: max 1200px + horizontal padding.
 * For headers/toolbars that should span the band but align text with main (use inside a full-width strip).
 */
export const appShellInnerClass = ['mx-auto w-full', appMaxWidthClass, 'px-4 sm:px-6'].join(' ');
