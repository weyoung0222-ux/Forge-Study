import type { LibrarySource } from '../../screens/library/Library/Library.schema';

type WorkspaceActivityKey = Exclude<LibrarySource, 'all'>;

/** Collect Teleoperation UI — target episodes (Episode n / total). */
export const COLLECT_TELEOP_TARGET_EPISODES = 5;

/** Pre-processor step table row count — Collect aligns with teleop episode count; Register default 20. */
export const DEFAULT_PREPROCESSOR_RECORD_COUNT = 20;

export function getPreprocessorRecordCountForActivity(activity: WorkspaceActivityKey): number {
  return activity === 'collector' ? COLLECT_TELEOP_TARGET_EPISODES : DEFAULT_PREPROCESSOR_RECORD_COUNT;
}
