import React from 'react';

import { formControlSearchInputClasses } from '../styles/formFieldClasses';

type Props = {
  value?: string;
  placeholder?: string;
  ariaLabel: string;
  onChange: (value: string) => void;
};

export function ListSearchInputBlock({ value, placeholder = 'Search', ariaLabel, onChange }: Props): JSX.Element {
  return (
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(event) => onChange(event.target.value)}
      className={formControlSearchInputClasses}
    />
  );
}
