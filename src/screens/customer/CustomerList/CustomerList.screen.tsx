import React from 'react';

import { TableSearchFilterPattern } from '../../../patterns/table-search-filter/TableSearchFilter.pattern';
import { appShellInnerClass } from '../../../styles/appLayoutClasses';
import { customerListRows } from '../../../data-spec/mocks/customerList.mock';
import { buildCustomerListLayout } from './CustomerList.layout';
import { customerListColumns } from './CustomerList.schema';

const layout = buildCustomerListLayout(customerListColumns);

export function CustomerListScreen(): JSX.Element {
  return (
    <main className="min-h-screen bg-white py-6" style={{ fontFamily: 'sans-serif' }}>
      <div className={appShellInnerClass}>
      <TableSearchFilterPattern
        title={layout.pageTitle}
        columns={layout.columns.map((column) => ({ key: column.key, label: column.label }))}
        rows={customerListRows}
      />
      </div>
    </main>
  );
}
