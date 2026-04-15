import React from 'react';

import { FormTagInputBlock } from '../molecules/FormTagInput.block';
import { WorkPageFileUploadDropzoneBlock } from '../molecules/WorkPageFileUploadDropzone.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import { useLanguage } from '../../context/LanguageContext';
import { toTitleCase, uiTitleCase } from '../../utils/titleCase';
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  WORK_PAGE_FILE_SETTINGS_TITLE,
  workPageCanvasCardClasses,
  workPageSectionContainerTitleClasses,
  workPageStep1FooterRowClasses,
  workPageStep1TwoColumnGridClasses,
} from '../styles/workPageCanvasClasses';
import { buttonPrimarySmClasses, buttonSecondarySmClasses } from '../styles/buttonClasses';
import {
  formControlInputClasses,
  formControlSelectClasses,
  formControlTextareaClasses,
  workPageFormFieldStackClasses,
} from '../styles/formFieldClasses';
import { ActivitySaveDatasetBlock } from './ActivitySaveDataset.block';
import { getActivitySaveSummary, getDefaultSaveDraft } from '../../data-spec/mocks/activitySaveDataset.mock';

export type WorkPageTemplateVariant =
  | 'type1-parameter-preview'
  | 'type2-parameter-only'
  | 'type2-parameter-columns'
  | 'type3-validation-progress'
  | 'type3-validation-review'
  | 'type4-save-deploy';

/** Optional footer actions for workflow steps (Register / Save) */
export type WorkPageCanvasFooterProps = {
  onPrimary?: () => void;
  onPrevious?: () => void;
  primaryLabel?: string;
};

type Props = {
  variant: WorkPageTemplateVariant;
  step1Footer?: WorkPageCanvasFooterProps;
  step3Footer?: WorkPageCanvasFooterProps;
};

function WorkCanvasFooterRow({ onPrimary, onPrevious, primaryLabel = 'continue' }: WorkPageCanvasFooterProps): JSX.Element | null {
  const { locale } = useLanguage();
  if (!onPrimary && !onPrevious) return null;
  return (
    <div className={workPageStep1FooterRowClasses}>
      {onPrevious ? (
        <button type="button" onClick={onPrevious} className={buttonSecondarySmClasses}>
          {uiTitleCase('previous', locale)}
        </button>
      ) : null}
      {onPrimary ? (
        <button type="button" onClick={onPrimary} className={buttonPrimarySmClasses}>
          {uiTitleCase(primaryLabel, locale)}
        </button>
      ) : null}
    </div>
  );
}

const Panel = ({ className = 'h-24', label }: { className?: string; label: string }): JSX.Element => (
  <div className={['grid place-items-center rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-500', className].join(' ')}>
    {toTitleCase(label)}
  </div>
);

/** Step 1 parameter column: 태그 입력·엔터 추가·칩 삭제 (초기 예시 태그) */
function Type2ParameterTagsField(): JSX.Element {
  const [tags, setTags] = React.useState(['tag1', 'tag2', 'tag3', 'tag4']);
  return (
    <FormTagInputBlock
      label="Tags"
      tags={tags}
      onTagsChange={setTags}
      inputPlaceholder="Placeholder"
      inputAriaLabel="Add dataset tags"
    />
  );
}

/** Catalog / template preview: type4 with local state */
function Type4SaveDatasetCanvasBody({ step3Footer }: { step3Footer?: WorkPageCanvasFooterProps }): JSX.Element {
  const draft = getDefaultSaveDraft('register');
  const [datasetName, setDatasetName] = React.useState(draft.datasetName);
  const [datasetDescription, setDatasetDescription] = React.useState(draft.description);
  return (
    <ActivitySaveDatasetBlock
      datasetName={datasetName}
      datasetDescription={datasetDescription}
      onDatasetNameChange={setDatasetName}
      onDatasetDescriptionChange={setDatasetDescription}
      summary={getActivitySaveSummary('register')}
      footer={step3Footer}
    />
  );
}

/** Register step 1 (type2) — file upload state lives with template preview. */
function WorkPageType2ParameterOnlyBody({ step1Footer }: { step1Footer?: WorkPageCanvasFooterProps }): JSX.Element {
  const [uploadFileName, setUploadFileName] = React.useState('');
  return (
    <>
      <div className={workPageStep1TwoColumnGridClasses}>
        <section className={workPageCanvasCardClasses}>
          <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
          <div className={[workPageFormFieldStackClasses, 'mt-3'].join(' ')}>
            <WorkPageFormFieldBlock label="Input (Mandatory)" required>
              <input className={formControlInputClasses} placeholder="Placeholder" aria-required />
            </WorkPageFormFieldBlock>
            <WorkPageFormFieldBlock label="Input (Optional)">
              <input className={formControlInputClasses} placeholder="Enter Text" />
            </WorkPageFormFieldBlock>
            <WorkPageFormFieldBlock label="Input (Big)">
              <textarea className={[formControlTextareaClasses, 'h-20'].join(' ')} placeholder="Description..." />
            </WorkPageFormFieldBlock>
            <WorkPageFormFieldBlock label="Dropdown (Mandatory)" required>
              <select className={[formControlSelectClasses, 'w-full'].join(' ')} aria-required>
                <option>Choose Model</option>
              </select>
            </WorkPageFormFieldBlock>
            <WorkPageFormFieldBlock label="Dropdown (Optional)">
              <select className={[formControlSelectClasses, 'w-full'].join(' ')}>
                <option>Choose Model</option>
              </select>
            </WorkPageFormFieldBlock>
            <Type2ParameterTagsField />
          </div>
        </section>

        <section className={workPageCanvasCardClasses}>
          <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_FILE_SETTINGS_TITLE}</p>
          <div className="mt-3">
            <WorkPageFileUploadDropzoneBlock
              selectedFileName={uploadFileName}
              onFileChange={(f) => setUploadFileName(f?.name ?? '')}
            >
              <WorkPageFormFieldBlock label="Text Prompt">
                <textarea className={[formControlTextareaClasses, 'h-24'].join(' ')} placeholder="Description..." />
              </WorkPageFormFieldBlock>
            </WorkPageFileUploadDropzoneBlock>
          </div>
        </section>
      </div>

      {step1Footer?.onPrimary || step1Footer?.onPrevious ? (
        <WorkCanvasFooterRow {...step1Footer} primaryLabel={step1Footer.primaryLabel ?? 'register'} />
      ) : (
        <div className={workPageStep1FooterRowClasses}>
          <button type="button" className="h-8 rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700">
            Previous
          </button>
          <button type="button" className="h-8 rounded-md bg-slate-900 px-3 text-xs font-semibold text-white">
            Register
          </button>
        </div>
      )}
    </>
  );
}

export function WorkPageTemplateCanvasBlock({ variant, step1Footer, step3Footer }: Props): JSX.Element {
  if (variant === 'type1-parameter-preview') {
    return (
      <>
        <div className="grid gap-3 lg:grid-cols-[260px_minmax(0,1fr)]">
          <section className={[workPageCanvasCardClasses, 'flex min-h-[360px] flex-col'].join(' ')}>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
            <div className="mt-3 min-h-0 flex-1">
              <Panel className="h-full min-h-[280px]" label="parameter input field" />
            </div>
          </section>
          <Panel className="h-[360px]" label="preview / content area" />
        </div>
        <WorkCanvasFooterRow {...(step1Footer ?? {})} primaryLabel={step1Footer?.primaryLabel ?? 'register'} />
      </>
    );
  }

  if (variant === 'type2-parameter-only') {
    return (
      <div className="space-y-4">
        <WorkPageType2ParameterOnlyBody step1Footer={step1Footer} />
      </div>
    );
  }

  if (variant === 'type2-parameter-columns') {
    return (
      <>
        <div className="grid gap-3 md:grid-cols-3">
          <section className={[workPageCanvasCardClasses, 'flex min-h-[360px] flex-col'].join(' ')}>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
            <div className="mt-3 min-h-0 flex-1">
              <Panel className="h-full min-h-[280px]" label="parameter column A" />
            </div>
          </section>
          <Panel className="h-[360px]" label="parameter column B" />
          <Panel className="h-[360px]" label="parameter column C" />
        </div>
        <WorkCanvasFooterRow {...(step1Footer ?? {})} primaryLabel={step1Footer?.primaryLabel ?? 'register'} />
      </>
    );
  }

  if (variant === 'type3-validation-progress') {
    return (
      <>
        <div className="grid gap-3">
          <Panel className="h-12" label="pre-processor info / status" />
          <div className="grid gap-3 md:grid-cols-3">
            <Panel className="h-12" label="pre-processor status card" />
            <Panel className="h-12" label="pre-processor status card" />
            <Panel className="h-12" label="pre-processor status card" />
          </div>
          <Panel className="h-[280px]" label="episode / trajectory table" />
        </div>
        <WorkCanvasFooterRow {...(step1Footer ?? {})} primaryLabel={step1Footer?.primaryLabel ?? 'register'} />
      </>
    );
  }

  if (variant === 'type3-validation-review') {
    return (
      <>
        <div className="grid gap-3">
          <div className="grid gap-3 md:grid-cols-3">
            <Panel className="h-12" label="save defaults button area" />
            <Panel className="h-12" label="pre-processor status card" />
            <Panel className="h-12" label="manual actions area" />
          </div>
          <Panel className="h-[320px]" label="episode / trajectory table (review)" />
        </div>
        <WorkCanvasFooterRow {...(step1Footer ?? {})} primaryLabel={step1Footer?.primaryLabel ?? 'register'} />
      </>
    );
  }

  return <Type4SaveDatasetCanvasBody step3Footer={step3Footer} />;
}
