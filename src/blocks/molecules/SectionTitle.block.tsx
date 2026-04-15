import React from 'react';

import { toTitleCase } from '../../utils/titleCase';
import { chipMetaCountClasses } from '../styles/chipClasses';

type Props = {
  title: string;
  count?: number;
  countLabel?: string;
};

export function SectionTitleBlock({ title, count, countLabel = 'items' }: Props): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-lg font-semibold text-slate-900">{toTitleCase(title)}</h2>
      {typeof count === 'number' ? (
        <span className={chipMetaCountClasses}>
          {count.toLocaleString()} {countLabel}
        </span>
      ) : null}
    </div>
  );
}
