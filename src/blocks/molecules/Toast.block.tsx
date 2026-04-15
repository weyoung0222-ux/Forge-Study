import React from 'react';

import { CloseOutlined } from '../../icons';

const DEFAULT_AUTO_HIDE_MS = 5000;

type Props = {
  message: string;
  isOpen: boolean;
  onDismiss: () => void;
  /** ms until auto-dismiss; 0 = no auto dismiss */
  autoHideMs?: number;
  /** `inline`: for catalog preview; `fixed`: screen bottom center (default) */
  layout?: 'fixed' | 'inline';
};

/**
 * Transient notice — fixed bottom-center in app; auto-hides after 5s unless hovered.
 */
export function ToastBlock({
  message,
  isOpen,
  onDismiss,
  autoHideMs = DEFAULT_AUTO_HIDE_MS,
  layout = 'fixed',
}: Props): JSX.Element | null {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) setHovered(false);
  }, [isOpen, message]);

  React.useEffect(() => {
    if (!isOpen || autoHideMs <= 0 || hovered) return;
    const id = window.setTimeout(onDismiss, autoHideMs);
    return () => window.clearTimeout(id);
  }, [isOpen, autoHideMs, hovered, onDismiss, message]);

  if (!isOpen || !message.trim()) return null;

  const shellClass =
    layout === 'inline'
      ? 'relative z-0 flex w-full max-w-md justify-center'
      : 'pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4';

  return (
    <div className={shellClass} role="status" aria-live="polite">
      <div
        className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg ring-1 ring-slate-900/5"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p className="min-w-0 flex-1 text-sm leading-snug text-slate-800">{message}</p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-md p-0.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Dismiss notification"
        >
          <CloseOutlined className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
