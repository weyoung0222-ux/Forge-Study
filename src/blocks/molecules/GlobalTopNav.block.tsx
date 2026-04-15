import React from 'react';

import { appShellInnerClass } from '../../styles/appLayoutClasses';
import { OverlayDialogBlock } from './OverlayDialog.block';

export type TopNavItem = {
  key: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export type TopNavAction = {
  key: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  hasPopup?: boolean;
  popupContent?: React.ReactNode;
  surface?: 'overlay' | 'popover';
  /** 오버레이 다이얼로그(`surface`가 popover가 아닐 때) 패널 `max-w-*` — 기본 `max-w-md`. */
  overlayPanelMaxWidthClass?: string;
  /** 오버레이 다이얼로그 패널에 추가 클래스(높이·패딩·flex 등). */
  overlayPanelClassName?: string;
};

export type TopNavUtilityButton = {
  key: string;
  label: string;
  onClick?: () => void;
};

type Props = {
  brand: string;
  brandIcon?: React.ReactNode;
  onBrandClick?: () => void;
  items: TopNavItem[];
  actions?: TopNavAction[];
  utilityButtons?: TopNavUtilityButton[];
};

export function GlobalTopNavBlock({
  brand,
  brandIcon,
  onBrandClick,
  items,
  actions = [],
  utilityButtons = [],
}: Props): JSX.Element {
  const [openActionKey, setOpenActionKey] = React.useState<string | null>(null);
  const navActionsRef = React.useRef<HTMLDivElement>(null);
  const openedOverlayAction =
    actions.find((action) => action.key === openActionKey && action.hasPopup && action.surface !== 'popover') ?? null;

  React.useEffect(() => {
    if (!openActionKey) return;
    const active = actions.find((a) => a.key === openActionKey);
    if (active?.surface !== 'popover') return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (navActionsRef.current?.contains(event.target as Node)) return;
      setOpenActionKey(null);
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [openActionKey, actions]);

  React.useEffect(() => {
    if (!openActionKey) return;
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpenActionKey(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [openActionKey]);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-slate-200 bg-white">
        <div className={[appShellInnerClass, 'flex h-full items-center justify-between'].join(' ')}>
          <div className="flex items-center gap-10">
            <button type="button" onClick={onBrandClick} className="flex items-center gap-2 bg-transparent">
              {brandIcon ? <span className="text-slate-900">{brandIcon}</span> : null}
              <strong className="text-sm font-semibold text-slate-900">{brand}</strong>
            </button>

            <nav aria-label="Global navigation" className="flex items-center gap-6">
              {items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.onClick}
                  className={[
                    'border-none bg-transparent text-sm transition-colors',
                    item.active ? 'font-semibold text-slate-900' : 'font-medium text-slate-600 hover:text-slate-900',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {utilityButtons.map((button) => (
              <button
                key={button.key}
                type="button"
                onClick={button.onClick}
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                {button.label}
              </button>
            ))}
            <div ref={navActionsRef} className="flex items-center gap-2">
              {actions.map((action) => {
                const isOpen = openActionKey === action.key;
                const usePopover = Boolean(action.hasPopup && action.surface === 'popover');

                return (
                  <div key={action.key} className={usePopover ? 'relative' : 'inline-flex items-center'}>
                    <button
                      type="button"
                      title={action.label}
                      aria-label={action.label}
                      aria-haspopup={action.hasPopup ? (usePopover ? 'true' : 'dialog') : undefined}
                      aria-expanded={action.hasPopup ? isOpen : undefined}
                      onClick={() => {
                        action.onClick?.();
                        if (action.hasPopup) {
                          setOpenActionKey((current) => (current === action.key ? null : action.key));
                        }
                      }}
                      className={[
                        'flex items-center justify-center rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900',
                        isOpen ? 'bg-slate-100 text-slate-900' : '',
                      ].join(' ')}
                    >
                      {action.icon}
                    </button>
                    {usePopover && isOpen ? (
                      <div
                        role="dialog"
                        aria-label={action.label}
                        className="absolute right-0 top-[calc(100%+6px)] z-[60] w-56 rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
                      >
                        {action.popupContent}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <OverlayDialogBlock
        title={openedOverlayAction?.label ?? 'Menu'}
        isOpen={Boolean(openedOverlayAction)}
        onClose={() => setOpenActionKey(null)}
        panelMaxWidthClass={openedOverlayAction?.overlayPanelMaxWidthClass}
        panelClassName={[
          openedOverlayAction?.overlayPanelMaxWidthClass &&
          openedOverlayAction.overlayPanelMaxWidthClass !== 'max-w-md'
            ? 'flex max-h-[min(640px,88vh)] min-h-0 flex-col overflow-hidden'
            : '',
          openedOverlayAction?.overlayPanelClassName ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {openedOverlayAction?.popupContent ?? (
          <div className="text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{openedOverlayAction?.label ?? 'Menu'}</p>
            <p className="mt-1">Overlay placeholder</p>
          </div>
        )}
      </OverlayDialogBlock>
    </>
  );
}
