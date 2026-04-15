import React from 'react';

import { buttonAccentAmberSmClasses, buttonPrimaryMdClasses, buttonSecondaryMdClasses } from '../styles/buttonClasses';
import { chipStatusPositiveCompactClasses } from '../styles/chipClasses';
import { formControlInputClasses } from '../styles/formFieldClasses';
import { memberRoleChipClassNames, profileInitialsFromName } from '../utils/memberRolePresentation';
import type { ProjectMemberRole } from './ProjectWorkspaceSidebar.block';

export type RequestableDevRole = Extract<ProjectMemberRole, 'data engineer' | 'model engineer'>;

type Props = {
  displayName: string;
  onDisplayNameChange: (value: string) => void;
  /** 현재 프로젝트 맥락에서의 Dev 서브 역할 (user-role-policy 정합) */
  roles: ProjectMemberRole[];
  /** 아바타 이미지 URL; 없으면 displayName 이니셜 표시 */
  avatarUrl?: string | null;
  onAvatarFileSelected?: (file: File) => void;
  /** 추가 Dev 역할 신청 (project owner가 아닐 때만 UI 노출) */
  onRequestDevRole?: (role: RequestableDevRole) => void;
  onSave: () => void;
  onCancel: () => void;
};

const REQUESTABLE_ROLES: RequestableDevRole[] = ['data engineer', 'model engineer'];

/**
 * Edit Profile 팝업 본문 — 표시명·역할·프로필 사진 편집, 비 Owner 시 Dev 역할 신청.
 */
export function EditProfilePanelBlock({
  displayName,
  onDisplayNameChange,
  roles,
  avatarUrl,
  onAvatarFileSelected,
  onRequestDevRole,
  onSave,
  onCancel,
}: Props): JSX.Element {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const isProjectOwner = roles.includes('project owner');
  const [localPreview, setLocalPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (localPreview?.startsWith('blob:')) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const effectiveAvatarSrc = localPreview ?? avatarUrl ?? null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (localPreview?.startsWith('blob:')) URL.revokeObjectURL(localPreview);
    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    onAvatarFileSelected?.(file);
    event.target.value = '';
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 text-lg font-semibold text-slate-600 shadow-inner">
            {effectiveAvatarSrc ? (
              <img src={effectiveAvatarSrc} alt="" className="h-full w-full object-cover" />
            ) : (
              <span aria-hidden>{profileInitialsFromName(displayName)}</span>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="sr-only" onChange={handleFileChange} aria-label="Upload profile photo" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50"
          >
            Change photo
          </button>
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <label className="block text-xs font-medium text-slate-700">
            Display name
            <input
              type="text"
              value={displayName}
              onChange={(e) => onDisplayNameChange(e.target.value)}
              className={['mt-1.5', formControlInputClasses, 'text-slate-900'].join(' ')}
              autoComplete="name"
              aria-label="Display name"
            />
          </label>
          <div>
            <p className="text-xs font-medium text-slate-700">Roles in this project</p>
            <p className="mt-0.5 text-[11px] text-slate-500">Shown as badges below. Saving name/photo does not change roles.</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {roles.map((role) => (
                <span key={role} className={memberRoleChipClassNames(role)}>
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!isProjectOwner ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-3">
          <h3 className="text-sm font-semibold text-amber-950">Request additional Dev access</h3>
          <p className="mt-1 text-[11px] leading-snug text-amber-900/90">
            Need Data Foundry or Model Institute scope? Request a <span className="font-medium">data engineer</span> or{' '}
            <span className="font-medium">model engineer</span> role. A project owner will review your request.
          </p>
          <ul className="mt-3 space-y-2">
            {REQUESTABLE_ROLES.map((role) => {
              const granted = roles.includes(role);
              return (
                <li
                  key={role}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-amber-200/80 bg-white/90 px-2.5 py-2"
                >
                  <span className="text-xs font-medium capitalize text-slate-800">{role}</span>
                  {granted ? (
                    <span className={chipStatusPositiveCompactClasses}>Granted</span>
                  ) : (
                    <button type="button" onClick={() => onRequestDevRole?.(role)} className={buttonAccentAmberSmClasses}>
                      Request access
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-3">
        <button type="button" onClick={onCancel} className={buttonSecondaryMdClasses}>
          Cancel
        </button>
        <button type="button" onClick={onSave} className={buttonPrimaryMdClasses}>
          Save
        </button>
      </div>
    </div>
  );
}
