import React from 'react';

import { CloseOutlined } from '../../icons';

import {
  buttonDangerMdClasses,
  buttonIconGhostClasses,
  buttonPrimaryLgFullWidthClasses,
  buttonPrimaryMdClasses,
  buttonPrimarySmClasses,
  buttonSecondaryMdClasses,
  buttonSecondarySmClasses,
  buttonTableRowActionSmClasses,
} from '../styles/buttonClasses';

/**
 * Catalog `component.button` — 변형별 샘플 (클릭 비활용 미리보기).
 */
export function ButtonCatalogShowcase(): JSX.Element {
  return (
    <div className="space-y-8 text-left">
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Size · md (h-9)</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonPrimaryMdClasses}>
            Primary
          </button>
          <button type="button" className={buttonSecondaryMdClasses}>
            Secondary
          </button>
          <button type="button" className={buttonDangerMdClasses}>
            Destructive
          </button>
          <button type="button" className={buttonIconGhostClasses} aria-label="Close">
            <CloseOutlined className="h-5 w-5" />
          </button>
        </div>
      </section>
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Size · sm (h-8)</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonPrimarySmClasses}>
            Primary sm
          </button>
          <button type="button" className={buttonSecondarySmClasses}>
            Secondary sm
          </button>
        </div>
      </section>
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Table row action · h-6</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonTableRowActionSmClasses}>
            Publish
          </button>
        </div>
      </section>
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Modal full-width · lg (h-11)</p>
        <div className="max-w-xs">
          <button type="button" className={buttonPrimaryLgFullWidthClasses}>
            Select
          </button>
        </div>
      </section>
    </div>
  );
}
