import type { CustomerListColumn } from './CustomerList.schema';

export type CustomerListLayout = {
  pageTitle: string;
  patternId: string;
  sections: Array<'header' | 'filter' | 'table'>;
  columns: CustomerListColumn[];
};

export const buildCustomerListLayout = (columns: CustomerListColumn[]): CustomerListLayout => ({
  pageTitle: 'Customer List',
  patternId: 'table-search-filter',
  sections: ['header', 'filter', 'table'],
  columns,
});
