import React from 'react';

import { RightOutlined } from '../../icons';
import { memberRoleChipClassNames } from '../utils/memberRolePresentation';

type SidebarItem = {
  key: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export type ProjectMemberRole = 'project owner' | 'data engineer' | 'model engineer';

type Props = {
  projectTitle: string;
  items: SidebarItem[];
  profileName: string;
  profileRoles: ProjectMemberRole[];
  onProjectTitleClick?: () => void;
  onProfileClick?: () => void;
};

export function ProjectWorkspaceSidebarBlock({
  projectTitle,
  items,
  profileName,
  profileRoles,
  onProjectTitleClick,
  onProfileClick,
}: Props): JSX.Element {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-3 py-3">
        <button
          type="button"
          onClick={onProjectTitleClick}
          aria-label="Open project selector"
          className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-2.5 py-2 text-left text-xs font-semibold text-slate-700"
        >
          <span>{projectTitle}</span>
          <RightOutlined className="text-xs text-slate-500" />
        </button>
      </div>

      <nav className="px-2 py-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={item.onClick}
            className={[
              'mb-1 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm',
              item.active ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700 hover:bg-slate-50',
            ].join(' ')}
          >
            <RightOutlined className="text-[10px] text-slate-400" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-10 border-t border-slate-200 px-3 py-3">
        <p className="text-xs font-semibold text-slate-800">{profileName}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {profileRoles.map((role) => (
            <span key={role} className={memberRoleChipClassNames(role)}>
              {role}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onProfileClick}
          className="mt-2 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
        >
          Edit Profile
        </button>
      </div>
    </aside>
  );
}
