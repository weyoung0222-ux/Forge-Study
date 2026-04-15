import React from 'react';

import { CloseOutlined } from '../../icons';
import { chipSourceActivityClasses } from '../styles/chipClasses';
import { formControlInputClasses } from '../styles/formFieldClasses';
import type { ActivityDraftSession } from '../../data-spec/mocks/activityDraftHistory.mock';
import { formatDraftSubtitle } from '../../data-spec/mocks/activityDraftHistory.mock';

type Props = {
  isOpen: boolean;
  drafts: ActivityDraftSession[];
  onClose: () => void;
  onSelectDraft: (draft: ActivityDraftSession) => void;
};

function activityChipLabel(activity: ActivityDraftSession['activity']): string {
  return activity.charAt(0).toUpperCase() + activity.slice(1);
}

/** Work Page Load draft — 미완료 activity 세션을 카드로 나열 (우측 슬라이드 드로어) */
export function ActivityDraftHistoryDrawerBlock({ isOpen, drafts, onClose, onSelectDraft }: Props): JSX.Element | null {
  const [searchValue, setSearchValue] = React.useState('');

  const filteredDrafts = React.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return drafts;
    return drafts.filter((d) => {
      const blob = [d.title, d.activity, d.preprocessorContextDatasetTitle, ...d.step1Parameters.flatMap((p) => [p.label, p.value])]
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [drafts, searchValue]);

  const [mounted, setMounted] = React.useState(isOpen);
  const [panelIn, setPanelIn] = React.useState(false);
  const TRANSITION_MS = 320;

  React.useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanelIn(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setPanelIn(false);
  }, [isOpen]);

  React.useEffect(() => {
    if (!isOpen && !mounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, mounted]);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const handleAsideTransitionEnd = (event: React.TransitionEvent<HTMLElement>): void => {
    if (event.propertyName !== 'transform') return;
    if (!isOpen) setMounted(false);
  };

  if (!isOpen && !mounted) return null;

  return (
    <div
      className={['fixed inset-0 z-[50] bg-slate-900/35 transition-opacity ease-out', panelIn ? 'opacity-100' : 'opacity-0'].join(
        ' ',
      )}
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Activity draft history"
        onClick={(event) => event.stopPropagation()}
        onTransitionEnd={handleAsideTransitionEnd}
        className={[
          'absolute inset-y-0 right-0 flex w-[96vw] max-w-[440px] flex-col overflow-hidden border-l border-slate-200 bg-white shadow-2xl will-change-transform',
          'transform transition-transform ease-out',
          panelIn ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      >
        <div className="shrink-0 border-b border-slate-200 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Draft sessions</h2>
              <p className="mt-1 text-xs leading-snug text-slate-600">
                Activities you started without saving to the library. Select a card to reopen the work page with your last inputs.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close draft history"
            >
              <CloseOutlined className="h-4 w-4" />
            </button>
          </div>
          <label className="mt-3 block text-xs text-slate-600">
            <span className="sr-only">Search drafts</span>
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by title or parameter…"
              className={['mt-1', formControlInputClasses, 'text-slate-900'].join(' ')}
            />
          </label>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-2">
          <ul className="grid gap-3">
            {filteredDrafts.map((draft) => (
              <li key={draft.id}>
                <button
                  type="button"
                  onClick={() => onSelectDraft(draft)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug text-slate-900">{draft.title}</p>
                    <span className={[chipSourceActivityClasses, 'font-semibold uppercase tracking-wide'].join(' ')}>
                      {activityChipLabel(draft.activity)}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500">{formatDraftSubtitle(draft)}</p>
                  <dl className="mt-2 space-y-1 border-t border-slate-100 pt-2">
                    {draft.step1Parameters.slice(0, 3).map((row) => (
                      <div key={`${draft.id}-${row.label}`} className="flex gap-2 text-[11px]">
                        <dt className="shrink-0 text-slate-500">{row.label}</dt>
                        <dd className="min-w-0 truncate text-slate-800">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </button>
              </li>
            ))}
          </ul>
          {filteredDrafts.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500">
              No drafts match your search.
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
