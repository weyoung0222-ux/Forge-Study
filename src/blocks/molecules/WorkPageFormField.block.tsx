import React from 'react';

import { toTitleCase } from '../../utils/titleCase';
import {
  workPageFormFieldLabelInnerClasses,
  workPageFormFieldLabelOuterClasses,
} from '../styles/formFieldClasses';

export type WorkPageFormFieldBlockProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  /** 추가 래퍼 클래스 (예: 특수 필드) */
  className?: string;
};

/**
 * Register / Collect / Generate 워크페이지 step-1 네이티브 필드 — 라벨·필수 표기·타이포 단일 소스.
 */
export function WorkPageFormFieldBlock({
  label,
  required,
  children,
  className,
}: WorkPageFormFieldBlockProps): JSX.Element {
  return (
    <label className={[workPageFormFieldLabelOuterClasses, className].filter(Boolean).join(' ')}>
      <span className={workPageFormFieldLabelInnerClasses}>
        {required ? (
          <span className="text-red-500" aria-hidden>
            *{' '}
          </span>
        ) : null}
        {toTitleCase(label)}
      </span>
      {children}
    </label>
  );
}

/** `<label>`로 감쌀 수 없는 복합 필드(토글·세그먼트 등)용 라벨 행. */
export function WorkPageFormFieldLabelText({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}): JSX.Element {
  const content =
    typeof children === 'string' || typeof children === 'number'
      ? toTitleCase(String(children))
      : children;
  return (
    <span className={workPageFormFieldLabelInnerClasses}>
      {required ? (
        <span className="text-red-500" aria-hidden>
          *{' '}
        </span>
      ) : null}
      {content}
    </span>
  );
}
