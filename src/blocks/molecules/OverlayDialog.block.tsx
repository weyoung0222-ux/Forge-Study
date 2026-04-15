import React from 'react';

import { CloseOutlined } from '../../icons';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
  /** 기본 카드의 Tailwind max-width (예: `max-w-md`, `max-w-4xl`). */
  panelMaxWidthClass?: string;
  /** `fullscreen`: viewport 전체를 쓰는 패널(iframe 미리보기 등). 기본은 중앙 카드. */
  variant?: 'default' | 'fullscreen';
};

export function OverlayDialogBlock({
  title,
  isOpen,
  onClose,
  children,
  panelClassName,
  panelMaxWidthClass = 'max-w-md',
  variant = 'default',
}: Props): JSX.Element | null {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen || variant !== 'fullscreen') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, variant]);

  if (!isOpen) return null;

  const isFullscreen = variant === 'fullscreen';

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex h-[100dvh] w-full flex-col bg-white"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <CloseOutlined className="h-4 w-4" />
          </button>
        </div>
        <div className={['min-h-0 flex-1 overflow-hidden', panelClassName ?? ''].join(' ')}>{children}</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={['w-full rounded-xl border border-slate-200 bg-white p-4 shadow-2xl', panelMaxWidthClass, panelClassName ?? ''].join(
          ' ',
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <CloseOutlined className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
