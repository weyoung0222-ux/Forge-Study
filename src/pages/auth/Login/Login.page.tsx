import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';
import { formControlInputH10Classes } from '../../../blocks/styles/formFieldClasses';
import { useLanguage } from '../../../context/LanguageContext';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [pendingRole, setPendingRole] = React.useState<string | null>(null);

  const roleOptions = ['Developer', 'Consumer', 'Supporter', 'Admin'] as const;
  const roleLabel = (role: (typeof roleOptions)[number]): string => {
    if (role === 'Developer') return t('login.role.developer');
    if (role === 'Consumer') return t('login.role.consumer');
    if (role === 'Supporter') return t('login.role.supporter');
    return t('login.role.admin');
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('login.brand')}</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">{t('login.title')}</h1>
          <p className="mt-1 text-sm text-slate-600">{t('login.subtitle')}</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">{t('login.email')}</label>
            <input type="email" placeholder={t('login.emailPlaceholder')} className={formControlInputH10Classes} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">{t('login.password')}</label>
            <input type="password" placeholder={t('login.passwordPlaceholder')} className={formControlInputH10Classes} />
          </div>

          <button
            type="button"
            onClick={() => {
              setPendingRole(null);
              setIsRoleModalOpen(true);
            }}
            className="mt-1 h-10 w-full rounded-md bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t('login.submit')}
          </button>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-600">{t('login.guideTitle')}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                to="/catalog"
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                {t('login.catalog')}
              </Link>
              <Link
                to="/flow"
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                {t('login.screenFlow')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <OverlayDialogBlock title={t('login.roleModalTitle')} isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)}>
        <p className="text-sm text-slate-700">{t('login.roleModalBody')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {roleOptions.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                if (role === 'Developer') {
                  setIsRoleModalOpen(false);
                  navigate('/home');
                  return;
                }
                setPendingRole(role);
              }}
              className={[
                'h-9 rounded-md border px-3 text-sm font-medium',
                role === 'Developer'
                  ? 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
              ].join(' ')}
            >
              {roleLabel(role)}
            </button>
          ))}
        </div>
        {pendingRole && roleOptions.includes(pendingRole as (typeof roleOptions)[number]) ? (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <span className="font-medium">{roleLabel(pendingRole as (typeof roleOptions)[number])}</span> — {t('login.rolePending')}
          </p>
        ) : null}
      </OverlayDialogBlock>
    </main>
  );
}
