export type WorkspaceTaskDetailStatus = 'success' | 'fail' | 'warn';

export type WorkspaceTaskDetailRecord = {
  id: string;
  recordId: string;
  videoLabel: string;
  status: WorkspaceTaskDetailStatus;
  contents: string;
  validation: WorkspaceTaskDetailStatus;
  duration: string;
};

export type WorkspaceTaskDetailSummary = {
  total: number;
  passed: number;
  failed: number;
  warned: number;
};

export type WorkspaceTaskDetailPayload = {
  summary: WorkspaceTaskDetailSummary;
  records: WorkspaceTaskDetailRecord[];
};

const statusByIndex = (index: number): WorkspaceTaskDetailStatus => {
  if (index % 7 === 0) return 'fail';
  if (index % 5 === 0) return 'warn';
  return 'success';
};

const createRecords = (datasetId: string, count: number): WorkspaceTaskDetailRecord[] =>
  Array.from({ length: count }, (_, index) => {
    const status = statusByIndex(index + 1);
    return {
      id: `${datasetId}-task-${index + 1}`,
      recordId: `REC-${String(index + 1).padStart(4, '0')}`,
      videoLabel: 'img',
      status,
      contents: "Retrieve all the groceries and store them in the pantry start() takeAndDrop('grocery','pantry') stop...",
      validation: status,
      duration: '50',
    };
  });

const summarize = (records: WorkspaceTaskDetailRecord[]): WorkspaceTaskDetailSummary => ({
  total: records.length,
  passed: records.filter((row) => row.status === 'success').length,
  failed: records.filter((row) => row.status === 'fail').length,
  warned: records.filter((row) => row.status === 'warn').length,
});

const recordsByDatasetId: Record<string, WorkspaceTaskDetailRecord[]> = {
  'dataset-1': createRecords('dataset-1', 85),
  'dataset-2': createRecords('dataset-2', 64),
  'dataset-3': createRecords('dataset-3', 120),
};

export const getWorkspaceTaskDetails = (datasetId: string): WorkspaceTaskDetailPayload => {
  const records = recordsByDatasetId[datasetId] ?? createRecords(datasetId, 40);
  return {
    summary: summarize(records),
    records,
  };
};
