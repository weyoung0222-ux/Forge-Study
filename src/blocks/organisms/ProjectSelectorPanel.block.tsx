import React from 'react';

import { CloseOutlined, PlusOutlined, SearchOutlined } from '../../icons';
import { buttonIconGhostClasses, buttonPrimaryLgFullWidthClasses, buttonPrimaryMdClasses } from '../styles/buttonClasses';
import { chipTitleInlineCountClasses } from '../styles/chipClasses';
import { formControlInputWithIconClasses } from '../styles/formFieldClasses';
import { ProjectSelectorCardBlock, type ProjectSelectorCardItem } from './ProjectSelectorCard.block';

type Props = {
  isOpen: boolean;
  previewMode?: boolean;
  title: string;
  count: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  items: ProjectSelectorCardItem[];
  selectedProjectId: string | null;
  onSelectProject: (projectId: string) => void;
  onClose: () => void;
  onCreateProject?: () => void;
  onConfirmSelect: () => void;
};

export function ProjectSelectorPanelBlock({
  isOpen,
  previewMode = false,
  title,
  count,
  searchValue,
  onSearchChange,
  items,
  selectedProjectId,
  onSelectProject,
  onClose,
  onCreateProject,
  onConfirmSelect,
}: Props): JSX.Element | null {
  if (!isOpen) return null;

  if (previewMode) {
    return (
      <aside className="relative h-[520px] w-full max-w-[520px] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {title} <span className={['align-middle', chipTitleInlineCountClasses].join(' ')}>{count}</span>
          </h2>
          <button type="button" onClick={onClose} className={buttonIconGhostClasses} aria-label="Close panel">
            <CloseOutlined className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search"
              className={formControlInputWithIconClasses}
            />
            <SearchOutlined className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            type="button"
            onClick={onCreateProject}
            className={[buttonPrimaryMdClasses, 'inline-flex items-center gap-1'].join(' ')}
          >
            <PlusOutlined />
            New Project
          </button>
        </div>

        <div className="h-[calc(100%-9.5rem)] overflow-y-auto pr-1">
          <div className="space-y-2">
            {items.map((item) => (
              <ProjectSelectorCardBlock
                key={item.id}
                item={item}
                selected={selectedProjectId === item.id}
                onClick={() => onSelectProject(item.id)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirmSelect}
          disabled={!selectedProjectId}
          className={['mt-3', buttonPrimaryLgFullWidthClasses].join(' ')}
        >
          Select
        </button>
      </aside>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4" role="presentation" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Project selector dialog"
        onClick={(event) => event.stopPropagation()}
        className="flex h-[min(78vh,760px)] w-full max-w-[900px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            {title} <span className={['align-middle', chipTitleInlineCountClasses].join(' ')}>{count}</span>
          </h2>
          <button type="button" onClick={onClose} className={buttonIconGhostClasses} aria-label="Close panel">
            <CloseOutlined className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search"
              className={formControlInputWithIconClasses}
            />
            <SearchOutlined className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <button
            type="button"
            onClick={onCreateProject}
            className={[buttonPrimaryMdClasses, 'inline-flex items-center gap-1'].join(' ')}
          >
            <PlusOutlined />
            New Project
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <ProjectSelectorCardBlock
                key={item.id}
                item={item}
                selected={selectedProjectId === item.id}
                onClick={() => onSelectProject(item.id)}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirmSelect}
          disabled={!selectedProjectId}
          className={['mt-3', buttonPrimaryLgFullWidthClasses].join(' ')}
        >
          Select
        </button>
      </aside>
    </div>
  );
}
