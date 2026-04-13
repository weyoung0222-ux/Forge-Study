import type { LibrarySource } from '../../screens/library/Library/Library.schema';

export type WorkspaceJobItem = {
  id: string;
  name: string;
  description: string;
  source: LibrarySource;
  worker: string;
  progress: number;
  status: 'running' | 'queued' | 'blocked';
  startedAt: string;
  eta: string;
};

export const workspaceJobsOnProcessRows: WorkspaceJobItem[] = [
  {
    id: 'job-001',
    name: 'Generate synthetic grasp trajectories',
    description: 'Domain randomization based dataset generation for gripper policy.',
    source: 'generator',
    worker: 'Mina',
    progress: 72,
    status: 'running',
    startedAt: '2026-04-13 09:20',
    eta: '1h 10m',
  },
  {
    id: 'job-002',
    name: 'Curate warehouse scenario merge',
    description: 'Merge run datasets and resolve label conflicts for release candidate.',
    source: 'curator',
    worker: 'Alex',
    progress: 41,
    status: 'running',
    startedAt: '2026-04-13 08:50',
    eta: '2h 30m',
  },
  {
    id: 'job-003',
    name: 'Register teleop recording batch',
    description: 'Ingest newly captured task trajectories from teleoperation sessions.',
    source: 'register',
    worker: 'Chris',
    progress: 88,
    status: 'running',
    startedAt: '2026-04-13 07:40',
    eta: '25m',
  },
  {
    id: 'job-004',
    name: 'Collector replay indexing',
    description: 'Index frame-aligned sensor streams for downstream model training.',
    source: 'collector',
    worker: 'Rina',
    progress: 15,
    status: 'queued',
    startedAt: '2026-04-13 10:10',
    eta: '4h 20m',
  },
  {
    id: 'job-005',
    name: 'Trainer policy fine-tuning',
    description: 'Fine-tune manipulation policy against curated pick-and-place episodes.',
    source: 'trainer',
    worker: 'Leo',
    progress: 53,
    status: 'running',
    startedAt: '2026-04-13 06:30',
    eta: '3h 00m',
  },
  {
    id: 'job-006',
    name: 'Evaluator benchmark suite',
    description: 'Run robustness and regression benchmark for newly trained policy.',
    source: 'evaluator',
    worker: 'Jay',
    progress: 9,
    status: 'blocked',
    startedAt: '2026-04-13 10:45',
    eta: 'N/A',
  },
];
