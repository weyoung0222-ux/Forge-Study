import React from 'react';

import { workPageActivityFooterToolbarRowClasses } from '../styles/workPageCanvasClasses';

export type WorkPageActivityFooterToolbarProps = {
  /** Secondary actions (left group). */
  left?: React.ReactNode;
  /** Primary CTA (right group). */
  right?: React.ReactNode;
};

/**
 * Left/right button groups for `ActivityStepContainerBlock` footer (Collect teleop pattern).
 */
export function WorkPageActivityFooterToolbarBlock({ left, right }: WorkPageActivityFooterToolbarProps): JSX.Element | null {
  const hasLeft = left != null && left !== false;
  const hasRight = right != null && right !== false;
  if (!hasLeft && !hasRight) return null;
  return (
    <div className={workPageActivityFooterToolbarRowClasses} role="toolbar" aria-label="Step actions">
      <div className="flex min-w-0 flex-wrap items-center gap-2">{hasLeft ? left : null}</div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">{hasRight ? right : null}</div>
    </div>
  );
}
