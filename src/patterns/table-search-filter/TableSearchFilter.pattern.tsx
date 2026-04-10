import React from 'react';
import { DataTableBlock } from '../../blocks/organisms/DataTable.block';
import { FilterBarBlock } from '../../blocks/organisms/FilterBar.block';

type Column = {
  key: string;
  label: string;
};

type Props = {
  title: string;
  columns: Column[];
  rows: Array<Record<string, string>>;
};

export function TableSearchFilterPattern({ title, columns, rows }: Props): JSX.Element {
  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </header>

      <FilterBarBlock
        searchPlaceholder="Search..."
        searchAriaLabel="Search"
        chips={[{ key: 'reset', label: 'Reset' }]}
        selects={[
          {
            key: 'segment',
            value: 'all',
            ariaLabel: 'Segment Filter',
            options: [
              { value: 'all', label: 'All Segments' },
              { value: 'vip', label: 'VIP' },
              { value: 'loyal', label: 'Loyal' },
              { value: 'at-risk', label: 'At Risk' },
            ],
            onChange: () => {},
          },
        ]}
      />

      <DataTableBlock columns={columns} rows={rows} />
    </section>
  );
}
