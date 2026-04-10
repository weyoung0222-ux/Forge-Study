import React from 'react';

import { TableSearchFilterPattern } from '../../../patterns/table-search-filter/TableSearchFilter.pattern';
import { customerListRows } from '../../../data-spec/mocks/customerList.mock';
import { buildCustomerListLayout } from './CustomerList.layout';
import { customerListColumns } from './CustomerList.schema';

const layout = buildCustomerListLayout(customerListColumns);

export function CustomerListScreen(): JSX.Element {
  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <TableSearchFilterPattern
        title={layout.pageTitle}
        columns={layout.columns.map((column) => ({ key: column.key, label: column.label }))}
        rows={customerListRows}
      />
    </main>
  );
}
