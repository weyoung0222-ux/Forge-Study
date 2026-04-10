import React from 'react';

export type DataTableColumn = {
  key: string;
  label: string;
};

type Props = {
  columns: DataTableColumn[];
  rows: Array<Record<string, string>>;
};

export function DataTableBlock({ columns, rows }: Props): JSX.Element {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            {columns.map((column) => (
              <td key={column.key} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                {row[column.key] ?? '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
