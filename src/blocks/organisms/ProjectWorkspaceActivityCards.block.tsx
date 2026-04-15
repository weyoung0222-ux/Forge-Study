import React from 'react';

export type ProjectWorkspaceActivityItem = {
  key: string;
  title: string;
  description: string;
};

export type ActivityMenuOption = { id: string; label: string };

type Props = {
  items: ProjectWorkspaceActivityItem[];
  onClickActivity?: (activityKey: string) => void;
  /** Activity keys that open a popover (e.g. Generate) instead of navigating on card click */
  activityMenus?: Partial<Record<string, ActivityMenuOption[]>>;
  onSelectActivityMenuOption?: (activityKey: string, optionId: string) => void;
};

export function ProjectWorkspaceActivityCardsBlock({
  items,
  onClickActivity,
  activityMenus,
  onSelectActivityMenuOption,
}: Props): JSX.Element {
  const [openMenuKey, setOpenMenuKey] = React.useState<string | null>(null);
  const openPanelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!openMenuKey) return;
    const onMouseDown = (e: MouseEvent): void => {
      if (openPanelRef.current && !openPanelRef.current.contains(e.target as Node)) {
        setOpenMenuKey(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpenMenuKey(null);
    };
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenuKey]);

  const cardClassName =
    'flex h-full min-h-[5.5rem] w-full flex-col rounded-lg border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm';

  return (
    <section
      aria-label="Workspace activities"
      className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((item) => {
        const menuOptions = activityMenus?.[item.key];
        if (menuOptions && menuOptions.length > 0) {
          const isOpen = openMenuKey === item.key;
          return (
            <div
              key={item.key}
              ref={isOpen ? openPanelRef : undefined}
              className="relative flex h-full min-h-0 flex-col"
            >
              <button
                type="button"
                onClick={() => setOpenMenuKey((k) => (k === item.key ? null : item.key))}
                className={cardClassName}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-controls={isOpen ? `activity-menu-${item.key}` : undefined}
              >
                <p className="text-xl font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-xs text-slate-600">{item.description}</p>
              </button>
              {isOpen ? (
                <div
                  id={`activity-menu-${item.key}`}
                  role="menu"
                  aria-label={`${item.title} options`}
                  className="absolute left-0 top-[calc(100%+6px)] z-[60] w-full min-w-[16rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
                >
                  {menuOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      role="menuitem"
                      className="flex w-full px-3 py-2.5 text-left text-sm text-slate-800 hover:bg-slate-50"
                      onClick={() => {
                        onSelectActivityMenuOption?.(item.key, opt.id);
                        setOpenMenuKey(null);
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onClickActivity?.(item.key)}
            className={cardClassName}
          >
            <p className="text-xl font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-xs text-slate-600">{item.description}</p>
          </button>
        );
      })}
    </section>
  );
}
