import React from 'react';

import { toTitleCase } from '../../utils/titleCase';
import { workPageFormFieldLabelInnerClasses } from '../styles/formFieldClasses';

export type WorkPageFileUploadDropzoneProps = {
  /** 인풋 필드 라벨 — `WorkPageFormFieldBlock`과 동일 타이포(text-xs·semibold). */
  title?: string;
  selectedFileName?: string;
  onFileChange: (file: File | null) => void;
  accept?: string;
  /** Register step 1 우측: Text Prompt 등 동일 카드 내 추가 필드. */
  children?: React.ReactNode;
};

/**
 * Register(type2) 우측과 동일 UI — dashed dropzone, Drag & Drop 카피, File Upload, 드래그·클릭 선택.
 */
export function WorkPageFileUploadDropzoneBlock({
  title = 'File Upload',
  selectedFileName = '',
  onFileChange,
  accept = 'video/*,image/*,.zip',
  children,
}: WorkPageFileUploadDropzoneProps): JSX.Element {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const hasFile = Boolean(selectedFileName);

  const pickFiles = (files: FileList | null): void => {
    const file = files?.[0];
    if (file) onFileChange(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    pickFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    pickFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClear = (): void => {
    onFileChange(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-w-0 shrink-0">
      <span className={workPageFormFieldLabelInnerClasses}>{toTitleCase(title)}</span>
      <div className="mt-3 space-y-2">
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept={accept}
          onChange={handleInputChange}
          aria-label="File upload"
        />
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="grid h-44 place-items-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-600"
        >
          {hasFile ? (
            <div className="max-w-full px-4">
              <p className="truncate text-sm font-medium text-slate-800" title={selectedFileName}>
                {selectedFileName}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  File Upload
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>Drag and Drop,</p>
              <p>or select from your local computer.</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
              >
                File Upload
              </button>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
