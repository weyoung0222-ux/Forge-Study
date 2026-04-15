import React from 'react';

import { CloseOutlined } from '../../icons';

import {
  chipFilterActiveClasses,
  chipFilterInactiveClasses,
  chipMetaCountClasses,
  chipSourceActivityClasses,
  chipTagRemoveButtonClasses,
  chipTagRowShellClasses,
} from '../styles/chipClasses';
import { memberRoleChipClassNames } from '../utils/memberRolePresentation';

type RemovableTagChipProps = {
  label: string;
  onRemove: () => void;
  removeAriaLabel: string;
};

/** Tag · xs — 폼 태그 칩 + 우측 제거 */
export function RemovableTagChip({ label, onRemove, removeAriaLabel }: RemovableTagChipProps): JSX.Element {
  return (
    <span className={chipTagRowShellClasses}>
      <span className="min-w-0 truncate">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className={chipTagRemoveButtonClasses}
        aria-label={removeAriaLabel}
      >
        <CloseOutlined className="h-3.5 w-3.5" aria-hidden />
      </button>
    </span>
  );
}

type FilterChipToggleProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

/** Filter · md — 단일 필터 토글 칩 */
export function FilterChipToggle({ label, active = false, onClick }: FilterChipToggleProps): JSX.Element {
  return (
    <button type="button" onClick={onClick} className={active ? chipFilterActiveClasses : chipFilterInactiveClasses}>
      {label}
    </button>
  );
}

/**
 * Catalog `component.chip` 미리보기 — Filter(md) / Tag(xs) / Meta(xs) 규격을 한 화면에 표시.
 */
export function ChipCatalogVariantShowcase(): JSX.Element {
  return (
    <div className="space-y-6 text-left">
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Filter · md (h-8)</p>
        <p className="mb-2 text-[11px] text-slate-600">리스트 툴바 등 필터 토글 (ListFilterChips)</p>
        <div className="flex flex-wrap gap-2">
          <FilterChipToggle label="Default" active={false} onClick={() => {}} />
          <FilterChipToggle label="Active" active onClick={() => {}} />
        </div>
      </section>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Tag · xs</p>
        <p className="mb-2 text-[11px] text-slate-600">폼 태그 · 엔터 추가 · X 제거 (FormTagInput)</p>
        <div className="flex flex-wrap gap-1.5">
          <RemovableTagChip label="tag1" onRemove={() => {}} removeAriaLabel="Remove tag tag1" />
          <RemovableTagChip label="tag2" onRemove={() => {}} removeAriaLabel="Remove tag tag2" />
        </div>
      </section>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Meta · sm (h-6)</p>
        <p className="mb-2 text-[11px] text-slate-600">섹션 카운트 등 읽기 전용 (SectionTitle)</p>
        <span className={chipMetaCountClasses}>1,248 datasets</span>
      </section>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Source · sm (h-6)</p>
        <p className="mb-2 text-[11px] text-slate-600">source-policy 활동 키 — 테이블·카드 (DataTable, Library)</p>
        <div className="flex flex-wrap gap-1.5">
          <span className={chipSourceActivityClasses}>Generator</span>
          <span className={chipSourceActivityClasses}>Curator</span>
        </div>
      </section>
      <section>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Role · sm (h-6)</p>
        <p className="mb-2 text-[11px] text-slate-600">프로젝트 Dev 서브역할 — 사이드바·Edit Profile·멤버 카드</p>
        <div className="flex flex-wrap gap-1.5">
          <span className={memberRoleChipClassNames('project owner')}>project owner</span>
          <span className={memberRoleChipClassNames('data engineer')}>data engineer</span>
          <span className={memberRoleChipClassNames('model engineer')}>model engineer</span>
        </div>
      </section>
    </div>
  );
}
