import React from 'react';
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
  const openedAction = actions.find((action) => action.key === openActionKey) ?? null;

  return (
    <>
      <header className="h-14 border-b border-slate-200 bg-white">
        <div className="flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8">
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
            {actions.map((action) => {
              const isOpen = openActionKey === action.key;

              return (
                <button
                  key={action.key}
                  type="button"
                  title={action.label}
                  aria-label={action.label}
                  aria-haspopup={action.hasPopup ? 'dialog' : undefined}
                  aria-expanded={action.hasPopup ? isOpen : undefined}
                  onClick={() => {
                    action.onClick?.();
                    if (action.hasPopup) {
                      setOpenActionKey((current) => (current === action.key ? null : action.key));
                    }
                  }}
                  className={[
                    'rounded-md p-1.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900',
                    isOpen ? 'bg-slate-100 text-slate-900' : '',
                  ].join(' ')}
                >
                  {action.icon}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <OverlayDialogBlock
        title={openedAction?.label ?? 'Menu'}
        isOpen={Boolean(openedAction)}
        onClose={() => setOpenActionKey(null)}
      >
        {openedAction?.popupContent ?? (
          <div className="text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{openedAction?.label ?? 'Menu'}</p>
            <p className="mt-1">Overlay placeholder</p>
          </div>
        )}
      </OverlayDialogBlock>
    </>
  );
}
