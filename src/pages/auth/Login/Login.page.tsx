import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { OverlayDialogBlock } from '../../../blocks/molecules/OverlayDialog.block';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [pendingRole, setPendingRole] = React.useState<string | null>(null);

  const roleOptions = ['Developer', 'Consumer', 'Supporter', 'Admin'] as const;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">PhysicalWorksForge</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">Login</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in to continue to Project and Library workspace.</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">Password</label>
            <input
              type="password"
              placeholder="********"
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setPendingRole(null);
              setIsRoleModalOpen(true);
            }}
            className="mt-1 h-10 w-full rounded-md bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
          >
            로그인
          </button>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-600">공통 가이드 바로가기</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Link
                to="/catalog"
                className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>

      <OverlayDialogBlock title="역할 선택" isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)}>
        <p className="text-sm text-slate-700">역할을 선택해주세요 (Developer / Consumer / Supporter / Admin)</p>
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
              {role}
            </button>
          ))}
        </div>
        {pendingRole ? (
          <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            {pendingRole} 권한은 아직 연결되지 않았습니다. 현재는 Developer 선택 시 Home으로 이동합니다.
          </p>
        ) : null}
      </OverlayDialogBlock>
    </main>
  );
}
