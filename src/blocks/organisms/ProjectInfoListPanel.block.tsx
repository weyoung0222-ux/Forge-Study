import React from 'react';

import { chipBadgeNeutralCompactClasses } from '../styles/chipClasses';
import type { ProjectMemberRole } from './ProjectWorkspaceSidebar.block';
import { memberRoleChipClassNames, profileInitialsFromName } from '../utils/memberRolePresentation';

export type ProjectInfoListItem = {
  id: string;
  title: string;
  subtitle: string;
  meta?: string;
  badge?: string;
  /**
   * 프로젝트 멤버 카드 등: 프로필 이미지(또는 이니셜) + 역할 칩.
   * 설정 시 기본 배지(badge) 대신 역할 칩을 우선 표시한다.
   */
  member?: {
    avatarUrl?: string | null;
    roles: ProjectMemberRole[];
  };
};

type Props = {
  title: string;
  items: ProjectInfoListItem[];
};

function MemberAvatar({ name, avatarUrl }: { name: string; avatarUrl?: string | null }): JSX.Element {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600">
      {avatarUrl ? <img src={avatarUrl} alt="" className="h-full w-full object-cover" /> : <span aria-hidden>{profileInitialsFromName(name)}</span>}
    </div>
  );
}

export function ProjectInfoListPanelBlock({ title, items }: Props): JSX.Element {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map((item) => {
          if (item.member) {
            return (
              <article key={item.id} className="rounded-md border border-slate-200 bg-white p-2.5">
                <div className="flex gap-3">
                  <MemberAvatar name={item.title} avatarUrl={item.member.avatarUrl} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      {item.badge && item.member.roles.length === 0 ? (
                        <span className={chipBadgeNeutralCompactClasses}>{item.badge}</span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-600">{item.subtitle}</p>
                    {item.meta ? <p className="mt-1 text-[11px] text-slate-500">{item.meta}</p> : null}
                    {item.member.roles.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.member.roles.map((role) => (
                          <span key={role} className={memberRoleChipClassNames(role)}>
                            {role}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article key={item.id} className="rounded-md border border-slate-200 bg-white p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-600">{item.subtitle}</p>
                  {item.meta ? <p className="mt-1 text-[11px] text-slate-500">{item.meta}</p> : null}
                </div>
                {item.badge ? (
                  <span className={chipBadgeNeutralCompactClasses}>{item.badge}</span>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
