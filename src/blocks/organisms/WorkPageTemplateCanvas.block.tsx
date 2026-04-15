import React from 'react';

import { FormTagInputBlock } from '../molecules/FormTagInput.block';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';
import { WorkPageFileUploadDropzoneBlock } from '../molecules/WorkPageFileUploadDropzone.block';
import { WorkPageFormFieldBlock } from '../molecules/WorkPageFormField.block';
import { useLanguage } from '../../context/LanguageContext';
import { toTitleCase, uiTitleCase } from '../../utils/titleCase';
import {
  WORK_PAGE_DATASET_PARAMETERS_TITLE,
  WORK_PAGE_FILE_SETTINGS_TITLE,
  collectTeleopGridHeightClasses,
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

function WorkCanvasFooterRow({
  onPrimary,
  onPrevious,
  primaryLabel = 'continue',
  rowClassName,
}: WorkPageCanvasFooterProps & { rowClassName?: string }): JSX.Element | null {
  const { locale } = useLanguage();
  if (!onPrimary && !onPrevious) return null;
  return (
    <div className={rowClassName ?? workPageStep1FooterRowClasses}>
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

type Props = {
  variant: WorkPageTemplateVariant;
  step1Footer?: WorkPageCanvasFooterProps;
  step3Footer?: WorkPageCanvasFooterProps;
};

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

/** Register step 1 (type2) — same 2-col + height as Collect / Generate; Register + Previous in right card footer (flex, no sticky). */
function WorkPageType2ParameterOnlyBody({ step1Footer }: { step1Footer?: WorkPageCanvasFooterProps }): JSX.Element {
  const { locale } = useLanguage();
  const [uploadFileName, setUploadFileName] = React.useState('');
  const gridClassName = [
    workPageStep1TwoColumnGridClasses,
    collectTeleopGridHeightClasses,
    'min-h-0 lg:grid-rows-[minmax(0,1fr)]',
  ].join(' ');

  const toolbarLeft =
    step1Footer?.onPrevious != null ? (
      <button type="button" onClick={step1Footer.onPrevious} className={buttonSecondarySmClasses}>
        {uiTitleCase('previous', locale)}
      </button>
    ) : (
      <button type="button" className={buttonSecondarySmClasses}>
        {uiTitleCase('previous', locale)}
      </button>
    );

  const toolbarRight =
    step1Footer?.onPrimary != null ? (
      <button type="button" onClick={step1Footer.onPrimary} className={buttonPrimarySmClasses}>
        {uiTitleCase(step1Footer.primaryLabel ?? 'register', locale)}
      </button>
    ) : (
      <button type="button" className={buttonPrimarySmClasses}>
        {uiTitleCase('register', locale)}
      </button>
    );

  return (
    <div className={gridClassName}>
      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">Dataset parameters</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_DATASET_PARAMETERS_TITLE}</p>
          </>
        }
      >
        <div className={workPageFormFieldStackClasses}>
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
      </ActivityStepContainerBlock>

      <ActivityStepContainerBlock
        header={
          <>
            <h2 className="sr-only">File settings</h2>
            <p className={workPageSectionContainerTitleClasses}>{WORK_PAGE_FILE_SETTINGS_TITLE}</p>
          </>
        }
        footer={<WorkPageActivityFooterToolbarBlock left={toolbarLeft} right={toolbarRight} />}
      >
        <WorkPageFileUploadDropzoneBlock
          selectedFileName={uploadFileName}
          onFileChange={(f) => setUploadFileName(f?.name ?? '')}
        >
          <WorkPageFormFieldBlock label="Text Prompt">
            <textarea className={[formControlTextareaClasses, 'h-24'].join(' ')} placeholder="Description..." />
          </WorkPageFormFieldBlock>
        </WorkPageFileUploadDropzoneBlock>
      </ActivityStepContainerBlock>
    </div>
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
    return <WorkPageType2ParameterOnlyBody step1Footer={step1Footer} />;
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
