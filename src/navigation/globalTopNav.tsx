import React from 'react';

import { type TranslateFn, useLanguage } from '../context/LanguageContext';
import type { TopNavAction, TopNavItem, TopNavUtilityButton } from '../blocks/molecules/GlobalTopNav.block';
import { GlobalNavSettingsPanelBlock } from '../blocks/organisms/GlobalNavSettingsPanel.block';
import { captureAppRootToPngDownload } from '../utils/captureAppViewport';
import { AppstoreOutlined, BellOutlined, GlobalOutlined, SettingOutlined, SoundOutlined } from '../icons';

export type GlobalTopNavKey = 'home' | 'projects' | 'library';

const iconBtnClass = 'text-lg leading-none text-slate-600';

export const globalTopNavBrandIcon = <AppstoreOutlined className="h-4 w-4 text-slate-900" aria-hidden />;

function LanguagePopoverBody(): JSX.Element {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div role="radiogroup" aria-label={t('gnb.language')} className="space-y-2.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('gnb.popup.languageSection')}</p>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
        <input
          type="radio"
          name="gnb-interface-language"
          className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
          checked={locale === 'en'}
          onChange={() => setLocale('en')}
        />
        {t('language.radio.en')}
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-800">
        <input
          type="radio"
          name="gnb-interface-language"
          className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-400"
          checked={locale === 'ko'}
          onChange={() => setLocale('ko')}
        />
        {t('language.radio.ko')}
      </label>
    </div>
  );
}

/** 우측 순서: Language → Notifications → Announcements → Settings — `useLanguage` 필요 */
export function useGlobalTopNavActions(): TopNavAction[] {
  const { t } = useLanguage();

  return React.useMemo(
    (): TopNavAction[] => [
      {
        key: 'language',
        label: t('gnb.language'),
        hasPopup: true,
        surface: 'popover',
        icon: <GlobalOutlined className={iconBtnClass} />,
        popupContent: <LanguagePopoverBody />,
      },
      {
        key: 'notifications',
        label: t('gnb.notifications'),
        hasPopup: true,
        icon: <BellOutlined className={iconBtnClass} />,
        popupContent: (
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{t('gnb.popup.notificationsTitle')}</p>
            <p className="mt-1 text-slate-600">{t('gnb.popup.notificationsBody')}</p>
          </div>
        ),
      },
      {
        key: 'announcements',
        label: t('gnb.announcements'),
        hasPopup: true,
        icon: <SoundOutlined className={iconBtnClass} />,
        popupContent: (
          <div className="text-sm">
            <p className="font-semibold text-slate-900">{t('gnb.popup.announcementsTitle')}</p>
            <p className="mt-1 text-slate-600">{t('gnb.popup.announcementsBody')}</p>
          </div>
        ),
      },
      {
        key: 'settings',
        label: t('gnb.settings'),
        hasPopup: true,
        icon: <SettingOutlined className={iconBtnClass} />,
        overlayPanelMaxWidthClass: 'max-w-4xl',
        popupContent: <GlobalNavSettingsPanelBlock />,
      },
    ],
    [t],
  );
}

export function createGlobalTopNavItems(
  activeKey: GlobalTopNavKey,
  onNavigate: (path: string) => void,
  t: TranslateFn,
): TopNavItem[] {
  const defs: Array<{ key: GlobalTopNavKey; labelKey: string; path: string }> = [
    { key: 'home', labelKey: 'nav.home', path: '/home' },
    { key: 'projects', labelKey: 'nav.projects', path: '/projects' },
    { key: 'library', labelKey: 'nav.library', path: '/library' },
  ];

  return defs.map((item) => ({
    key: item.key,
    label: t(item.labelKey),
    active: item.key === activeKey,
    onClick: () => onNavigate(item.path),
  }));
}

export function createTemporaryTopUtilityButtons(
  onDescriptionClick: () => void,
  onLogoutClick: () => void,
  t: TranslateFn,
): TopNavUtilityButton[] {
  return [
    {
      key: 'capture-screen-temp',
      label: t('utility.captureScreen'),
      onClick: () => {
        void captureAppRootToPngDownload().catch((err: unknown) => {
          console.error('Screen capture failed', err);
        });
      },
    },
    { key: 'description-temp', label: t('utility.description'), onClick: onDescriptionClick },
    { key: 'logout-temp', label: t('utility.logout'), onClick: onLogoutClick },
  ];
}
