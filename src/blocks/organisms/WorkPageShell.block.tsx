import React from 'react';

import { appShellInnerClass } from '../../styles/appLayoutClasses';
import { ArrowLeftOutlined, CheckOutlined } from '../../icons';
import { type UiTitleCaseLocale, uiTitleCase } from '../../utils/titleCase';

export type WorkFlowStep = 1 | 2 | 3;

/** Phrase form (English); display via `uiTitleCase` in the shell. */
const DEFAULT_STEP_LABELS: [string, string, string] = ['register', 'pre-processor', 'save datasets'];

type Props = {
  isOpen: boolean;
  title: string;
  /** Subtitle under the work title (workflow summary) */
  description?: string;
  currentStep: WorkFlowStep;
  maxUnlockedStep: WorkFlowStep;
  onStepChange: (step: WorkFlowStep) => void;
  onClose: () => void;
  onHistoryClick?: () => void;
  /** Optional — when set, shows a Save draft control next to Load draft (prototype: append to draft list). */
  onSaveDraftClick?: () => void;
  historyButtonLabel?: string;
  saveDraftButtonLabel?: string;
  children: React.ReactNode;
  /** Step labels for the horizontal stepper */
  stepLabels?: [string, string, string];
  /** Catalog / embedded preview: not fixed, no body scroll lock */
  embedded?: boolean;
  /** Ref to the scrollable main content area (e.g. scroll to top on step change). */
  contentScrollRef?: React.Ref<HTMLDivElement>;
  /** Title-case English button/step labels; leave Korean strings unchanged. */
  locale?: UiTitleCaseLocale;
};

export function WorkPageShellBlock({
  isOpen,
  title,
  description,
  currentStep,
  maxUnlockedStep,
  onStepChange,
  onClose,
  onHistoryClick,
  onSaveDraftClick,
  historyButtonLabel = 'load draft',
  saveDraftButtonLabel = 'save draft',
  children,
  stepLabels = DEFAULT_STEP_LABELS,
  embedded = false,
  contentScrollRef,
  locale = 'en',
}: Props): JSX.Element | null {
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [scrollInnerPx, setScrollInnerPx] = React.useState<number | undefined>(undefined);

  const setContentScrollRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      scrollContainerRef.current = node;
      if (typeof contentScrollRef === 'function') {
        contentScrollRef(node);
      } else if (contentScrollRef) {
        (contentScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [contentScrollRef],
  );

  React.useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const update = (): void => {
      const cs = getComputedStyle(el);
      const pt = parseFloat(cs.paddingTop) || 0;
      const pb = parseFloat(cs.paddingBottom) || 0;
      setScrollInnerPx(Math.max(0, el.clientHeight - pt - pb));
    };
    update();
    const ro = new ResizeObserver(() => {
      update();
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isOpen, embedded, title, description]);

  React.useEffect(() => {
    if (!isOpen || embedded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [embedded, isOpen]);

  if (!isOpen) return null;

  const steps: WorkFlowStep[] = [1, 2, 3];

  const shellClassName = embedded
    ? 'relative z-0 flex max-h-[min(520px,70vh)] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm'
    : 'fixed inset-x-0 bottom-0 top-14 z-40 flex min-h-0 flex-col overflow-hidden border-t border-slate-200 bg-white';

  return (
    <section role="dialog" aria-modal="true" aria-label={title} className={shellClassName}>
      <header className="shrink-0 border-b border-slate-200 bg-white">
        <div className={[appShellInnerClass, 'flex items-center justify-between py-3'].join(' ')}>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
              aria-label="Close work page"
            >
              <ArrowLeftOutlined className="h-4 w-4" />
            </button>
            <h1 className="truncate text-2xl font-semibold text-slate-900">{title}</h1>
          </div>
          {description ? <p className="mt-1.5 pl-9 text-sm text-slate-600">{description}</p> : null}
        </div>
        <div className="ml-2 flex shrink-0 items-center gap-2">
          {onSaveDraftClick ? (
            <button
              type="button"
              onClick={() => onSaveDraftClick()}
              className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              {uiTitleCase(saveDraftButtonLabel, locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onHistoryClick?.()}
            disabled={!onHistoryClick}
            className="h-8 shrink-0 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uiTitleCase(historyButtonLabel, locale)}
          </button>
        </div>
        </div>
      </header>

      <div className="shrink-0 border-b border-slate-200 bg-white text-slate-600">
        <div className={[appShellInnerClass, 'py-2'].join(' ')}>
        <nav className="inline-flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Workflow steps">
          {steps.map((step, index) => {
            const label = stepLabels[step - 1];
            const locked = step > maxUnlockedStep;
            const active = step === currentStep;
            const showCheck = step < currentStep;

            return (
              <React.Fragment key={step}>
                {index > 0 ? (
                  <span className="px-0.5 text-slate-300" aria-hidden>
                    -
                  </span>
                ) : null}
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => {
                    if (!locked) onStepChange(step);
                  }}
                  className={[
                    'inline-flex items-center gap-1.5 rounded-md px-0.5 py-0.5 text-left transition',
                    locked ? 'cursor-not-allowed opacity-45' : 'cursor-pointer hover:text-slate-900',
                    active ? 'text-slate-900' : 'text-slate-600',
                  ].join(' ')}
                  aria-current={active ? 'step' : undefined}
                >
                  <span
                    className={[
                      'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold',
                      showCheck
                        ? 'bg-slate-900 text-white'
                        : active
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-200 text-slate-600',
                    ].join(' ')}
                  >
                    {showCheck ? <CheckOutlined className="h-2.5 w-2.5" /> : step}
                  </span>
                  <span className="text-sm">{uiTitleCase(label, locale)}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-slate-100">
        <div
          ref={setContentScrollRef}
          className={[
            appShellInnerClass,
            'flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain py-4',
          ].join(' ')}
          style={
            scrollInnerPx !== undefined
              ? { ['--work-page-shell-scroll-inner-px' as string]: `${scrollInnerPx}px` }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}
