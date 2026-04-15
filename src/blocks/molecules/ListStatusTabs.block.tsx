import React from 'react';

import { tabUnderlineItemActiveClasses, tabUnderlineItemInactiveClasses, tabUnderlineNavClasses } from '../styles/tabClasses';

export type ListStatusTab = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  items: ListStatusTab[];
  onChange: (value: string) => void;
};

export function ListStatusTabsBlock({ value, items, onChange }: Props): JSX.Element {
  return (
    <nav aria-label="List status tabs" className={tabUnderlineNavClasses}>
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={isActive ? tabUnderlineItemActiveClasses : tabUnderlineItemInactiveClasses}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
