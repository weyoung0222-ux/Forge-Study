export type CustomerListColumn = {
  key: string;
  label: string;
  dataType: 'string' | 'number' | 'date';
};

export const customerListColumns: CustomerListColumn[] = [
  { key: 'customerId', label: 'Customer ID', dataType: 'string' },
  { key: 'name', label: 'Name', dataType: 'string' },
  { key: 'segment', label: 'Segment', dataType: 'string' },
  { key: 'recency', label: 'Recency', dataType: 'number' },
  { key: 'frequency', label: 'Frequency', dataType: 'number' },
  { key: 'monetary', label: 'Monetary', dataType: 'number' },
];
