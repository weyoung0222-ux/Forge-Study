import React from 'react';

import { useLanguage } from '../../context/LanguageContext';
import { formControlInputClasses, formControlSelectClasses } from '../styles/formFieldClasses';

export type GlobalNavSettingsSectionId =
  | 'general'
  | 'theme'
  | 'rfm-models'
  | 'data-manifests'
  | 'robotics'
  | 'pipeline-alerts';

const SECTION_ORDER: GlobalNavSettingsSectionId[] = [
  'general',
  'theme',
  'rfm-models',
  'data-manifests',
  'robotics',
  'pipeline-alerts',
];

function sectionLabelKey(id: GlobalNavSettingsSectionId): string {
  const map: Record<GlobalNavSettingsSectionId, string> = {
    general: 'gnb.settings.section.general',
    theme: 'gnb.settings.section.theme',
    'rfm-models': 'gnb.settings.section.rfmModels',
    'data-manifests': 'gnb.settings.section.dataManifests',
    robotics: 'gnb.settings.section.robotics',
    'pipeline-alerts': 'gnb.settings.section.pipelineAlerts',
  };
  return map[id];
}

/**
 * GNB Settings 오버레이 본문 — LNB(프로필·검색·메뉴) + 섹션 패널.
 */
export function GlobalNavSettingsPanelBlock(): JSX.Element {
  const { t } = useLanguage();
  const [active, setActive] = React.useState<GlobalNavSettingsSectionId>('general');
  const [query, setQuery] = React.useState('');

  const filteredSections = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTION_ORDER;
    return SECTION_ORDER.filter((id) => {
      const label = t(sectionLabelKey(id)).toLowerCase();
      return label.includes(q) || id.replace(/-/g, ' ').includes(q);
    });
  }, [query, t]);

  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 gap-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50/80">
      <aside className="flex w-[min(100%,15rem)] shrink-0 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-3">
          <div className="flex items-center gap-2">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-800"
              aria-hidden
            >
              WL
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">{t('gnb.settings.userName')}</p>
              <p className="truncate text-xs text-slate-500">{t('gnb.settings.userEmail')}</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-500">{t('gnb.settings.userRole')}</p>
        </div>
        <div className="border-b border-slate-100 p-2">
          <label className="sr-only" htmlFor="gnb-settings-menu-search">
            {t('gnb.settings.searchLabel')}
          </label>
          <input
            id="gnb-settings-menu-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('gnb.settings.searchPlaceholder')}
            className={[formControlInputClasses, 'h-8 text-xs'].join(' ')}
            autoComplete="off"
          />
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto p-2" aria-label={t('gnb.settings.navAria')}>
          <ul className="space-y-0.5">
            {filteredSections.map((id) => {
              const isOn = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setActive(id)}
                    className={[
                      'w-full rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors',
                      isOn ? 'bg-indigo-50 text-indigo-900' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
                    ].join(' ')}
                  >
                    {t(sectionLabelKey(id))}
                  </button>
                </li>
              );
            })}
          </ul>
          {filteredSections.length === 0 ? (
            <p className="px-1 py-3 text-center text-xs text-slate-500">{t('gnb.settings.searchEmpty')}</p>
          ) : null}
        </nav>
      </aside>

      <section className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-white p-4" aria-labelledby="gnb-settings-panel-title">
        <h3 id="gnb-settings-panel-title" className="text-sm font-semibold text-slate-900">
          {t(sectionLabelKey(active))}
        </h3>
        <div className="mt-3 space-y-4 text-xs text-slate-600">
          {active === 'general' ? <GeneralSection t={t} /> : null}
          {active === 'theme' ? <ThemeSection t={t} /> : null}
          {active === 'rfm-models' ? <RfmModelsSection t={t} /> : null}
          {active === 'data-manifests' ? <DataManifestsSection t={t} /> : null}
          {active === 'robotics' ? <RoboticsSection t={t} /> : null}
          {active === 'pipeline-alerts' ? <PipelineAlertsSection t={t} /> : null}
        </div>
      </section>
    </div>
  );
}

type TFn = (key: string) => string;

function Field({ label, children }: { label: string; children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function GeneralSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.general.lead')}</p>
      <Field label={t('gnb.settings.general.timezone')}>
        <select className={formControlSelectClasses} defaultValue="asia-seoul">
          <option value="utc">UTC</option>
          <option value="asia-seoul">Asia/Seoul</option>
          <option value="america-la">America/Los_Angeles</option>
        </select>
      </Field>
      <Field label={t('gnb.settings.general.density')}>
        <label className="flex cursor-pointer items-center gap-2 text-slate-800">
          <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
          {t('gnb.settings.general.compactTables')}
        </label>
      </Field>
    </>
  );
}

function ThemeSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.theme.lead')}</p>
      <div role="radiogroup" aria-label={t('gnb.settings.theme.appearance')} className="space-y-2">
        {(['light', 'dark', 'system'] as const).map((value) => (
          <label key={value} className="flex cursor-pointer items-center gap-2 text-slate-800">
            <input
              type="radio"
              name="gnb-theme"
              value={value}
              defaultChecked={value === 'light'}
              className="h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            {t(`gnb.settings.theme.${value}`)}
          </label>
        ))}
      </div>
    </>
  );
}

function RfmModelsSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.rfmModels.lead')}</p>
      <Field label={t('gnb.settings.rfmModels.base')}>
        <select className={formControlSelectClasses} defaultValue="groot-n15">
          <option value="groot-n15">GROOT N1.5 (RFM default)</option>
          <option value="groot-n1">GROOT N1</option>
        </select>
      </Field>
      <Field label={t('gnb.settings.rfmModels.quant')}>
        <select className={formControlSelectClasses} defaultValue="bf16">
          <option value="bf16">bfloat16 (recommended)</option>
          <option value="fp16">float16</option>
          <option value="int8">int8 (edge deploy)</option>
        </select>
      </Field>
      <Field label={t('gnb.settings.rfmModels.device')}>
        <select className={formControlSelectClasses} defaultValue="auto">
          <option value="auto">{t('gnb.settings.rfmModels.deviceAuto')}</option>
          <option value="cuda">CUDA GPU</option>
          <option value="mps">Apple MPS</option>
        </select>
      </Field>
    </>
  );
}

function DataManifestsSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.dataManifests.lead')}</p>
      <Field label={t('gnb.settings.dataManifests.export')}>
        <select className={formControlSelectClasses} defaultValue="parquet">
          <option value="parquet">Parquet + sidecar JSON</option>
          <option value="lerobot">LeRobot manifest</option>
        </select>
      </Field>
      <Field label={t('gnb.settings.dataManifests.retention')}>
        <select className={formControlSelectClasses} defaultValue="90">
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="365">365 days</option>
        </select>
      </Field>
    </>
  );
}

function RoboticsSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.robotics.lead')}</p>
      <Field label={t('gnb.settings.robotics.platform')}>
        <select className={formControlSelectClasses} defaultValue="agibot-a2">
          <option value="agibot-a2">AGIBOT A2 (bimanual + base)</option>
          <option value="single-arm">Single-arm station</option>
        </select>
      </Field>
      <Field label={t('gnb.settings.robotics.calibration')}>
        <input className={formControlInputClasses} defaultValue="CAL-RGBD-AGIBOT-WH-2026-Q2-014" readOnly />
      </Field>
    </>
  );
}

function PipelineAlertsSection({ t }: { t: TFn }): JSX.Element {
  return (
    <>
      <p>{t('gnb.settings.pipelineAlerts.lead')}</p>
      <label className="flex cursor-pointer items-center gap-2 text-slate-800">
        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
        {t('gnb.settings.pipelineAlerts.jobs')}
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-slate-800">
        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
        {t('gnb.settings.pipelineAlerts.eval')}
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-slate-800">
        <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
        {t('gnb.settings.pipelineAlerts.manifest')}
      </label>
    </>
  );
}
