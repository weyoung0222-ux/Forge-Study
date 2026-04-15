/**
 * Workspace Settings — Invite member 플로우용 더미 사용자 디렉터리 (이메일 검색).
 */

export type InviteDirectoryUser = {
  id: string;
  email: string;
  name: string;
};

/** 멤버 테이블 Role 컬럼과 동일한 표기 (프로토타입) */
export const INVITE_MEMBER_ROLE_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'Project Owner', label: 'Project owner' },
  { value: 'Data Engineer', label: 'Data engineer' },
  { value: 'Model Engineer', label: 'Model engineer' },
  { value: 'Consumer', label: 'Consumer' },
  { value: 'Supporter', label: 'Supporter' },
  { value: 'Admin', label: 'Admin' },
];

export const inviteDirectoryUsers: InviteDirectoryUser[] = [
  { id: 'inv-u1', email: 'sam.lee@company.com', name: 'Sam Lee' },
  { id: 'inv-u2', email: 'rio.tan@company.com', name: 'Rio Tan' },
  { id: 'inv-u3', email: 'nina.kim@forge.local', name: 'Nina Kim' },
  { id: 'inv-u4', email: 'dev.pool@forge.local', name: 'Dev Pool' },
  { id: 'inv-u5', email: 'contractor.ext@partner.io', name: 'Casey Morgan' },
  { id: 'inv-u6', email: 'weyoung@forge.local', name: 'Wiyoung' },
];

export function filterInviteDirectoryUsers(query: string, users: InviteDirectoryUser[]): InviteDirectoryUser[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return users.filter(
    (u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || u.id.toLowerCase().includes(q),
  );
}
