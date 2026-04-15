import React from 'react';

import { PlusOutlined } from '../../icons';
import { buttonSecondaryMdClasses } from '../styles/buttonClasses';

type HeaderAction = {
  label: string;
  onClick: () => void;
};

type Props = {
  title: string;
  subtitle?: string;
  primaryAction?: HeaderAction;
};

export function ListHeaderBlock({ title, subtitle, primaryAction }: Props): JSX.Element {
  return (
    <section className="flex items-start justify-between gap-4">
      <div>
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle ? <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {primaryAction ? (
        <button
          type="button"
          onClick={primaryAction.onClick}
          className={[buttonSecondaryMdClasses, 'inline-flex items-center gap-1.5'].join(' ')}
        >
          <PlusOutlined />
          {primaryAction.label}
        </button>
      ) : null}
    </section>
  );
}
