import React from 'react';

import { RemovableTagChip } from './Chip.block';
import { toTitleCase } from '../../utils/titleCase';
import {
  formControlInputClasses,
  workPageFormFieldLabelInnerClasses,
  workPageFormFieldLabelOuterClasses,
} from '../styles/formFieldClasses';

export type FormTagInputBlockProps = {
  /** 라벨 텍스트 (접근성: 인풋과 연결) */
  label?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  inputPlaceholder?: string;
  /** 인풋 `aria-label` (label이 없을 때 필수 권장) */
  inputAriaLabel?: string;
};

function normalizeTag(raw: string): string {
  return raw.trim().replace(/\s+/g, ' ');
}

export function FormTagInputBlock({
  label = 'Tags',
  tags,
  onTagsChange,
  inputPlaceholder = 'Add a tag…',
  inputAriaLabel,
}: FormTagInputBlockProps): JSX.Element {
  const [draft, setDraft] = React.useState('');
  const inputId = React.useId();

  const commitDraft = (): void => {
    const next = normalizeTag(draft);
    if (next.length === 0) return;
    const exists = tags.some((t) => t.toLowerCase() === next.toLowerCase());
    if (exists) {
      setDraft('');
      return;
    }
    onTagsChange([...tags, next]);
    setDraft('');
  };

  const removeAt = (index: number): void => {
    onTagsChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className={workPageFormFieldLabelOuterClasses}>
        <span className={workPageFormFieldLabelInnerClasses}>{toTitleCase(label)}</span>
        <input
          id={inputId}
          type="text"
          value={draft}
          placeholder={inputPlaceholder}
          aria-label={inputAriaLabel ?? label}
          autoComplete="off"
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              commitDraft();
            }
          }}
          className={formControlInputClasses}
        />
      </label>
      {tags.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5" aria-live="polite">
          {tags.map((tag, index) => (
            <li key={`${tag}-${index}`} className="list-none">
              <RemovableTagChip
                label={tag}
                onRemove={() => removeAt(index)}
                removeAriaLabel={`Remove tag ${tag}`}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
