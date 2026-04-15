import React from 'react';

import {
  activityStepContainerClasses,
  activityStepContentClasses,
  activityStepFooterClasses,
  activityStepHeaderClasses,
  workPageCanvasCardClasses,
} from '../styles/workPageCanvasClasses';

export type ActivityStepContainerBlockProps = {
  /** Title / section heading row (shrink-0). */
  header: React.ReactNode;
  /** Main body — scrolls when taller than remaining space (flex-1, overflow-y-auto). */
  children: React.ReactNode;
  /** Button row — always at bottom of card (shrink-0); omit when no actions. */
  footer?: React.ReactNode;
  /** Extra classes on the outer `<section>` (e.g. grid column constraints). */
  className?: string;
};

/**
 * Activity step card: `header` + scrollable `content` + optional `footer` using flex only (no sticky/absolute).
 */
export function ActivityStepContainerBlock({
  header,
  children,
  footer,
  className = '',
}: ActivityStepContainerBlockProps): JSX.Element {
  return (
    <section className={[workPageCanvasCardClasses, activityStepContainerClasses, className].filter(Boolean).join(' ')}>
      <div className={activityStepHeaderClasses}>{header}</div>
      <div className={activityStepContentClasses}>{children}</div>
      {footer != null ? <div className={activityStepFooterClasses}>{footer}</div> : null}
    </section>
  );
}
