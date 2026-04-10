export type CustomerEntity = {
  customerId: string;
  name: string;
  segment: 'VIP' | 'Loyal' | 'At Risk';
  recency: number;
  frequency: number;
  monetary: number;
};
