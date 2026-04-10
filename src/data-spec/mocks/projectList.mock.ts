export type ProjectCardItem = {
  id: string;
  title: string;
  role: 'Project Owner' | 'Data Developer' | 'Model Developer';
  description: string;
  status: 'in-progress' | 'completed';
  thumbnailText: string;
};

export const projectListRows: ProjectCardItem[] = [
  {
    id: 'PJT-001',
    title: 'Foundation Robot Upgrade',
    role: 'Project Owner',
    description: 'Upgrade core robot control modules for production stability.',
    status: 'in-progress',
    thumbnailText: 'image',
  },
  {
    id: 'PJT-002',
    title: 'Welding Vision Model',
    role: 'Model Developer',
    description: 'Train and validate weld defect classification model.',
    status: 'in-progress',
    thumbnailText: 'image',
  },
  {
    id: 'PJT-003',
    title: 'Factory Data Pipeline',
    role: 'Data Developer',
    description: 'Build ETL for telemetry and maintenance logs.',
    status: 'completed',
    thumbnailText: 'image',
  },
  {
    id: 'PJT-004',
    title: 'Preventive Maintenance AI',
    role: 'Project Owner',
    description: 'Define rollout policy and monitor model drift alerts.',
    status: 'in-progress',
    thumbnailText: 'image',
  },
  {
    id: 'PJT-005',
    title: 'Manipulator Calibration',
    role: 'Model Developer',
    description: 'Improve path planning precision for arm calibration tasks.',
    status: 'completed',
    thumbnailText: 'image',
  },
  {
    id: 'PJT-006',
    title: 'Realtime Alert Dashboard',
    role: 'Data Developer',
    description: 'Design dashboard queries and alert routing for on-call.',
    status: 'in-progress',
    thumbnailText: 'image',
  },
];
