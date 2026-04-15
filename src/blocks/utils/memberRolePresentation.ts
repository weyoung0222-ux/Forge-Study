import { chipRoleCompactShellClasses } from '../styles/chipClasses';
import type { ProjectMemberRole } from '../organisms/ProjectWorkspaceSidebar.block';

/** Edit Profile · 멤버 카드 등에서 동일한 역할 칩 스타일 */
export function memberRoleChipSurfaceClass(role: ProjectMemberRole): string {
  if (role === 'project owner') return 'border-violet-200 bg-violet-50 text-violet-800';
  if (role === 'data engineer') return 'border-sky-200 bg-sky-50 text-sky-800';
  return 'border-emerald-200 bg-emerald-50 text-emerald-800';
}

/** 표시명에서 이니셜 (프로필 플레이스홀더) */
export function profileInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const s = name.slice(0, 2);
  return s.length ? s.toUpperCase() : '?';
}

export function memberRoleChipClassNames(role: ProjectMemberRole): string {
  return [chipRoleCompactShellClasses, memberRoleChipSurfaceClass(role)].join(' ');
}
