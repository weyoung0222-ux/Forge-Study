import type { LibrarySource } from '../../screens/library/Library/Library.schema';
import { COLLECT_TELEOP_TARGET_EPISODES, DEFAULT_PREPROCESSOR_RECORD_COUNT } from './activityWorkflowCounts.mock';

/** Workspace activity keys (no `all`) */
export type WorkActivitySource = Exclude<LibrarySource, 'all'>;

export type ActivitySaveDatasetSummary = {
  sourceActivity: WorkActivitySource;
  /** e.g. "Register" for chip */
  displaySource: string;
  robotPlatform: string;
  endEffectorType: string;
  rfmBaseModel: string;
  taskFamily: string;
  episodes: number;
  totalDurationLabel: string;
  avgTrajectoryLength: string;
  validatedRecords: number;
  validationPassed: number;
  validationWarned: number;
  validationFailed: number;
  modalities: string[];
  proprioStateDim: number;
  actionSpaceLabel: string;
  coordinateFrame: string;
  cameraCalibrationId: string;
  exportFormat: string;
  manifestVersion: string;
  estimatedSizeLabel: string;
  preprocessorPipeline: string;
  domainTags: string[];
  /** Human-readable bullets for “what this dataset contains” */
  contentHighlights: string[];
};

const sourceLabel = (s: WorkActivitySource): string => s.charAt(0).toUpperCase() + s.slice(1);

export function getDefaultSaveDraft(activity: WorkActivitySource): { datasetName: string; description: string } {
  const presets: Record<WorkActivitySource, { datasetName: string; description: string }> = {
    register: {
      datasetName: 'RFM-Warehouse-Teleop-Register-20260414',
      description:
        'Imported multi-view teleop episodes for AGIBOT A2 pick-and-place in warehouse layout B. Includes RGB-D sync, joint torque, and gripper F/T. Ready for GROOT N1.5 fine-tuning after QA.',
    },
    collector: {
      datasetName: 'RFM-LiveCollect-PickRoute-v3-20260414',
      description:
        'Operator-collected trajectories for narrow-aisle pallet retrieval. Time-aligned proprioception and base odometry; scene mesh hash pinned for sim replay.',
    },
    generator: {
      datasetName: 'RFM-SynthGrasp-Augmented-7k-20260414',
      description:
        'Synthetic grasp and re-grasp episodes from domain-randomized clutter. Physics seed logged per episode for reproducibility.',
    },
    curator: {
      datasetName: 'RFM-Curated-Merge-WH-AB-20260414',
      description:
        'Merged Runs A–B with label reconciliation and conflict resolution. Duplicate segments removed; pre-processor stats from step 2 applied.',
    },
    trainer: {
      datasetName: 'RFM-Train-Export-LoRA-Adapter-Pack-20260414',
      description:
        'Training bundle: filtered episodes, normalization stats, and adapter manifest for on-robot policy distillation.',
    },
    evaluator: {
      datasetName: 'RFM-Eval-Benchmark-Suite-Snapshot-20260414',
      description:
        'Frozen evaluation set: held-out scenes with success criteria and rubric version 2.1. Suitable for regression across policy revisions.',
    },
  };
  return presets[activity];
}

export function getActivitySaveSummary(activity: WorkActivitySource): ActivitySaveDatasetSummary {
  const commonRobot = {
    robotPlatform: 'AGIBOT A2 (bimanual, 7-DoF arms + mobile base)',
    endEffectorType: 'Parallel jaw gripper + 6-axis F/T',
    rfmBaseModel: 'GROOT N1.5 (RFM)',
    coordinateFrame: 'base_link → world (ENU), tool0 for manipulation',
    cameraCalibrationId: 'CAL-RGBD-AGIBOT-WH-2026-Q2-014',
    exportFormat: 'LeRobot dataset manifest + parquet shards',
    manifestVersion: 'v2.4 (RFM schema)',
    estimatedSizeLabel: activity === 'generator' ? '~186 GB' : activity === 'trainer' ? '~42 GB' : '~64 GB',
    preprocessorPipeline: 'Temporal sync → hand-eye residual check → joint limit clip → contact impulse filter',
  };

  const byActivity: Record<WorkActivitySource, Partial<ActivitySaveDatasetSummary> & Pick<ActivitySaveDatasetSummary, 'taskFamily' | 'episodes'>> = {
    register: {
      sourceActivity: 'register',
      taskFamily: 'Warehouse pick / place & tote clearing',
      /** Aligns with Pre-processor row count (`DEFAULT_PREPROCESSOR_RECORD_COUNT`) */
      episodes: DEFAULT_PREPROCESSOR_RECORD_COUNT,
      totalDurationLabel: '38h 20m wall time',
      avgTrajectoryLength: '142 s / episode (median)',
      validatedRecords: DEFAULT_PREPROCESSOR_RECORD_COUNT,
      validationPassed: 17,
      validationWarned: 2,
      validationFailed: 1,
      modalities: ['RGB 1920×1080 @30fps', 'Depth aligned (registered)', 'Joint pos/vel/torque @500Hz', 'Gripper pose + wrench'],
      proprioStateDim: 58,
      actionSpaceLabel: 'Delta pose (12D) + gripper (1D) + base twist (3D)',
      domainTags: ['RFM', 'Teleop', 'Warehouse', 'RGB-D', 'AGIBOT'],
      contentHighlights: [
        'Human demonstrations with consistent tool-frame targets for GROOT-compatible action chunks.',
        'RGB-D streams time-aligned within 2 ms; failed alignment episodes excluded from this export.',
        'Safety-limited joint torques with automatic clip logging for policy training.',
      ],
    },
    collector: {
      sourceActivity: 'collector',
      taskFamily: 'Narrow aisle retrieval & dock hand-off',
      episodes: COLLECT_TELEOP_TARGET_EPISODES,
      totalDurationLabel: '2h 18m wall time',
      avgTrajectoryLength: '178 s / episode',
      validatedRecords: COLLECT_TELEOP_TARGET_EPISODES,
      validationPassed: 3,
      validationWarned: 1,
      validationFailed: 1,
      modalities: ['RGB-D wrist + fixed scene cams', 'Mobile base odometry', 'Arm proprio + F/T'],
      proprioStateDim: 52,
      actionSpaceLabel: 'End-effector velocity (SE(3)) + gripper',
      domainTags: ['RFM', 'Live collect', 'Mobile manipulator'],
      contentHighlights: [
        'On-robot capture with real latency and actuator saturation preserved for sim2real transfer.',
        'Scene fingerprint (mesh hash) stored per session for dataset lineage.',
      ],
    },
    generator: {
      sourceActivity: 'generator',
      taskFamily: 'Synthetic clutter grasp & re-grasp',
      episodes: 7200,
      totalDurationLabel: 'Simulated 420h equivalent',
      avgTrajectoryLength: '35 s / episode',
      validatedRecords: 7200,
      validationPassed: 6980,
      validationWarned: 150,
      validationFailed: 70,
      modalities: ['Synthetic RGB + perfect depth', 'Proprio + contact flags', 'Optional noise profiles'],
      proprioStateDim: 44,
      actionSpaceLabel: 'Discrete skill tokens + continuous offsets',
      domainTags: ['RFM', 'Synthetic', 'Augmentation', 'Grasp'],
      contentHighlights: [
        'Domain-randomized object sets with physics seeds for reproducible large-scale pre-training.',
        'Contact-rich segments oversampled relative to free motion for manipulation-heavy RFM heads.',
      ],
    },
    curator: {
      sourceActivity: 'curator',
      taskFamily: 'Merged warehouse runs with label reconciliation',
      episodes: 1800,
      totalDurationLabel: 'Combined 124h',
      avgTrajectoryLength: '96 s / episode',
      validatedRecords: 1800,
      validationPassed: 1750,
      validationWarned: 35,
      validationFailed: 15,
      modalities: ['RGB-D', 'Proprio', 'Segmentation masks (merged)'],
      proprioStateDim: 58,
      actionSpaceLabel: 'Unified delta-pose + gripper (harmonized across sources)',
      domainTags: ['RFM', 'Curation', 'Merge'],
      contentHighlights: [
        'Conflicting labels resolved with curator ruleset v1.8; audit trail stored per episode.',
        'Near-duplicate trajectories removed via embedding distance in observation space.',
      ],
    },
    trainer: {
      sourceActivity: 'trainer',
      taskFamily: 'Policy training pack (LoRA / adapter)',
      episodes: 960,
      totalDurationLabel: 'N/A (tensor shards)',
      avgTrajectoryLength: '128 steps / chunk (median)',
      validatedRecords: 960,
      validationPassed: 960,
      validationWarned: 0,
      validationFailed: 0,
      modalities: ['Normalized obs tensors', 'Action targets', 'Reward / advantage placeholders'],
      proprioStateDim: 64,
      actionSpaceLabel: 'Latent action tokens + continuous residual',
      domainTags: ['RFM', 'Training', 'Adapter'],
      contentHighlights: [
        'Train/val split by scene hash; no scene leakage across splits.',
        'Normalization statistics computed on train split only; stored JSON sidecar.',
      ],
    },
    evaluator: {
      sourceActivity: 'evaluator',
      taskFamily: 'Benchmark regression suite',
      episodes: 20,
      totalDurationLabel: '8h 40m eval wall time',
      avgTrajectoryLength: '92 s / episode',
      validatedRecords: 20,
      validationPassed: 10,
      validationWarned: 5,
      validationFailed: 5,
      modalities: ['RGB-D', 'Proprio', 'Success / rubric labels'],
      proprioStateDim: 58,
      actionSpaceLabel: 'Policy output (same as deployment)',
      domainTags: ['RFM', 'Evaluation', 'Benchmark'],
      contentHighlights: [
        'Held-out scenes not used in any training export for this project.',
        'Rubric v2.1 with binary success + soft penalty for near-miss collisions.',
      ],
    },
  };

  const spec = byActivity[activity];
  const src = spec.sourceActivity ?? activity;
  return {
    ...commonRobot,
    ...spec,
    sourceActivity: src,
    displaySource: sourceLabel(src),
  } as ActivitySaveDatasetSummary;
}
