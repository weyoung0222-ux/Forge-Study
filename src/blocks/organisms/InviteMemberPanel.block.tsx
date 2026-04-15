import React from 'react';

import { SearchOutlined } from '../../icons';
import { buttonPrimaryMdClasses, buttonSecondaryMdClasses } from '../styles/buttonClasses';
import { formControlInputClasses, formControlSelectClasses } from '../styles/formFieldClasses';
import type { InviteDirectoryUser } from '../../data-spec/mocks/inviteDirectory.mock';

export type InviteMemberRoleOption = { value: string; label: string };

type Props = {
  emailQuery: string;
  onEmailQueryChange: (value: string) => void;
  onSearch: () => void;
  searchResults: InviteDirectoryUser[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
  inviteRole: string;
  onInviteRoleChange: (value: string) => void;
  roleOptions: InviteMemberRoleOption[];
  onInvite: () => void;
  onCancel: () => void;
};

/**
 * Workspace Settings — Invite members 모달 본문.
 * 이메일/이름 검색 후 사용자 선택, 역할 부여, 초대 전송 (화면에서 디렉터리·API 연동).
 */
export function InviteMemberPanelBlock({
  emailQuery,
  onEmailQueryChange,
  onSearch,
  searchResults,
  selectedUserId,
  onSelectUser,
  inviteRole,
  onInviteRoleChange,
  roleOptions,
  onInvite,
  onCancel,
}: Props): JSX.Element {
  const canInvite = selectedUserId != null;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-700" htmlFor="invite-member-email">
          User email
        </label>
        <p className="mt-0.5 text-[11px] text-slate-500">Enter an email or name, then search to pick a user.</p>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <input
            id="invite-member-email"
            type="search"
            value={emailQuery}
            onChange={(e) => onEmailQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSearch();
              }
            }}
            placeholder="name@company.com"
            autoComplete="off"
            className={['min-w-0 flex-1', formControlInputClasses, 'text-slate-900'].join(' ')}
            aria-label="Search user by email or name"
          />
          <button
            type="button"
            onClick={onSearch}
            className={[buttonSecondaryMdClasses, 'inline-flex shrink-0 items-center justify-center gap-1.5 sm:min-w-[7rem]'].join(
              ' ',
            )}
          >
            <SearchOutlined className="h-4 w-4" aria-hidden />
            Search
          </button>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-700">Search results</p>
        <ul
          className="mt-1.5 max-h-40 overflow-auto rounded-md border border-slate-200 bg-slate-50/80 p-1.5"
          role="listbox"
          aria-label="Matching users"
        >
          {searchResults.length === 0 ? (
            <li className="rounded px-2 py-3 text-center text-xs text-slate-500">No matches yet. Try Search.</li>
          ) : (
            searchResults.map((user) => {
              const selected = selectedUserId === user.id;
              return (
                <li key={user.id} className="list-none">
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onSelectUser(user.id)}
                    className={[
                      'flex w-full flex-col items-start rounded px-2 py-2 text-left text-sm transition',
                      selected ? 'bg-indigo-100 text-indigo-950' : 'text-slate-800 hover:bg-white',
                    ].join(' ')}
                  >
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-slate-600">{user.email}</span>
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700" htmlFor="invite-member-role">
          Role
        </label>
        <select
          id="invite-member-role"
          value={inviteRole}
          onChange={(e) => onInviteRoleChange(e.target.value)}
          className={['mt-1.5 w-full', formControlSelectClasses].join(' ')}
          aria-label="Role for invited member"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className={[buttonSecondaryMdClasses, 'sm:min-w-[5.5rem]'].join(' ')}>
          Cancel
        </button>
        <button type="button" onClick={onInvite} disabled={!canInvite} className={[buttonPrimaryMdClasses, 'sm:min-w-[7.5rem]'].join(' ')}>
          Send invite
        </button>
      </div>
    </div>
  );
}
