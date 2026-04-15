import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { uiTitleCase } from '../../utils/titleCase';
import { buttonPrimarySmClasses } from '../styles/buttonClasses';
import {
  collectTeleopGridHeightClasses,
  workPageSectionContainerTitleClasses,
} from '../styles/workPageCanvasClasses';
import { ActivityStepContainerBlock } from '../molecules/ActivityStepContainer.block';
import { WorkPageActivityFooterToolbarBlock } from '../molecules/WorkPageActivityFooterToolbar.block';

type Props = {
  onProceedToStep2: () => void;
  onNotify?: (message: string) => void;
};

/**
 * Curate → Analytics — step 1 placeholder until analytics UI is specified.
 */
export function CurateAnalyticsStepBlock({ onProceedToStep2, onNotify }: Props): JSX.Element {
  const { locale } = useLanguage();

  return (
    <ActivityStepContainerBlock
      className={[collectTeleopGridHeightClasses, 'overflow-hidden'].filter(Boolean).join(' ')}
      header={
        <>
          <h2 className="sr-only">Curate analytics</h2>
          <p className={workPageSectionContainerTitleClasses}>{uiTitleCase('dataset analytics', locale)}</p>
          <p className="mt-2 text-sm text-slate-600">
            Explore quality and coverage metrics across saved datasets. Detailed charts and filters will be wired here.
          </p>
        </>
      }
      footer={
        <WorkPageActivityFooterToolbarBlock
          right={
            <button
              type="button"
              onClick={() => {
                onNotify?.('Continuing to pre-processor (prototype).');
                onProceedToStep2();
              }}
              className={buttonPrimarySmClasses}
            >
              {uiTitleCase('continue to pre-processor', locale)}
            </button>
          }
        />
      }
    >
      <div className="grid min-h-[12rem] place-items-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
        Analytics workspace (prototype)
      </div>
    </ActivityStepContainerBlock>
  );
}
