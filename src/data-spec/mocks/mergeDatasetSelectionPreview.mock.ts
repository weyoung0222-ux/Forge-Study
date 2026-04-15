/**
 * Deterministic merge-preview metrics for Curate → Merge datasets (prototype).
 * Values derive from dataset row ids so toggling selection updates totals in a stable way.
 */

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i += 1) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export type PerDatasetMergeStats = {
  episodes: number;
  transitions: number;
  durationHours: number;
  rawSizeGb: number;
  modalities: string[];
  cameraStreams: number;
};

const MODALITY_POOLS: string[][] = [
  ['RGB-D head', 'wrist RGB', 'proprio', '6-axis F/T'],
  ['RGB-D head', 'ego RGB', 'proprio', 'base odom'],
  ['RGB-D head', 'wrist RGB', 'tactile', 'proprio'],
  ['stereo RGB', 'depth', 'proprio', 'EE F/T'],
];

/** Per-row dummy stats keyed by stable hash of dataset id (RFM / AGIBOT-flavored). */
export function getPerDatasetMergeStats(id: string): PerDatasetMergeStats {
  const h = hashString(id);
  const episodes = 140 + (h % 520);
  const avgSteps = 56 + (h % 140);
  const transitions = episodes * avgSteps;
  const durationHours = Math.round((episodes * (4.2 + (h % 20) / 10)) * 10) / 10;
  const rawSizeGb = Math.round((12 + (h % 180) / 10 + episodes * 0.018) * 100) / 100;
  const modalities = MODALITY_POOLS[h % MODALITY_POOLS.length];
  const cameraStreams = 3 + (h % 3);
  return { episodes, transitions, durationHours, rawSizeGb, modalities, cameraStreams };
}

export type MergeSelectionPreview = {
  selectedCount: number;
  combinedEpisodes: number;
  estUniqueEpisodesAfterMerge: number;
  overlapReductionPct: number;
  combinedTransitions: number;
  combinedRecordedHours: number;
  combinedRawSizeGb: number;
  estimatedMergedBundleSizeGb: number;
  modalitiesUnion: string[];
  maxCameraStreams: number;
  proprioDim: number;
  actionDim: number;
};

function uniqueSorted<T>(xs: T[]): T[] {
  return [...new Set(xs)].sort();
}

/**
 * Aggregate stats for the merge summary card. Requires at least two row ids (caller gates UI).
 */
export function computeMergeSelectionPreview(rows: readonly { id: string }[]): MergeSelectionPreview {
  const ids = rows.map((r) => r.id);
  const sortedIds = [...ids].sort();
  const fp = sortedIds.join('|');
  const dedupeSeed = hashString(fp);

  let combinedEpisodes = 0;
  let combinedTransitions = 0;
  let combinedRecordedHours = 0;
  let combinedRawSizeGb = 0;
  let maxCameraStreams = 0;
  const modalitySet = new Set<string>();
  let proprioSum = 0;
  let actionSum = 0;

  for (const id of ids) {
    const s = getPerDatasetMergeStats(id);
    combinedEpisodes += s.episodes;
    combinedTransitions += s.transitions;
    combinedRecordedHours += s.durationHours;
    combinedRawSizeGb += s.rawSizeGb;
    maxCameraStreams = Math.max(maxCameraStreams, s.cameraStreams);
    s.modalities.forEach((m) => modalitySet.add(m));
    const h = hashString(id);
    proprioSum += 28 + (h % 10);
    actionSum += 12 + (h % 8);
  }

  const n = Math.max(1, ids.length);
  const proprioDim = Math.round(proprioSum / n);
  const actionDim = Math.round(actionSum / n);

  // Overlap: duplicate scene / trajectory keys — prototype taper 6–18% based on fingerprint
  const taper = 0.06 + (dedupeSeed % 13) / 100;
  const estUniqueEpisodesAfterMerge = Math.max(1, Math.round(combinedEpisodes * (1 - taper)));
  const overlapReductionPct = Math.round((1 - estUniqueEpisodesAfterMerge / combinedEpisodes) * 100);

  // Manifest + shard index + small padding (prototype)
  const packagingFactor = 1.06 + (dedupeSeed % 5) / 200;
  const estimatedMergedBundleSizeGb =
    Math.round((combinedRawSizeGb * packagingFactor + 0.12) * 100) / 100;

  return {
    selectedCount: ids.length,
    combinedEpisodes,
    estUniqueEpisodesAfterMerge,
    overlapReductionPct,
    combinedTransitions,
    combinedRecordedHours: Math.round(combinedRecordedHours * 10) / 10,
    combinedRawSizeGb: Math.round(combinedRawSizeGb * 100) / 100,
    estimatedMergedBundleSizeGb,
    modalitiesUnion: uniqueSorted([...modalitySet]),
    maxCameraStreams,
    proprioDim,
    actionDim,
  };
}

export function formatLargeCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  return n.toLocaleString('en-US');
}
