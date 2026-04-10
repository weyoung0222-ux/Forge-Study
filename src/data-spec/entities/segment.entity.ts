export type SegmentEntity = {
  code: 'VIP' | 'LOYAL' | 'AT_RISK';
  name: string;
  description: string;
};

export const segmentCatalog: SegmentEntity[] = [
  { code: 'VIP', name: 'VIP', description: 'High value and recent purchase' },
  { code: 'LOYAL', name: 'Loyal', description: 'Frequent repeat purchases' },
  { code: 'AT_RISK', name: 'At Risk', description: 'Long inactivity with prior activity' },
];
