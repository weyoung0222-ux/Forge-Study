import React from 'react';
import { Link } from 'react-router-dom';

type RoleFlowNode = {
  label: string;
  path?: string;
  highlight?: boolean;
};

type RoleFlowGroup = {
  role: string;
  tone: string;
  nodes: RoleFlowNode[];
  note?: string;
};

const roleFlowGroups: RoleFlowGroup[] = [
  {
    role: 'Consumer',
    tone: 'border-sky-200 bg-sky-50',
    nodes: [
      { label: 'Home', path: '/home' },
      { label: 'Library', path: '/library', highlight: true },
      { label: 'Datasets', path: '/library' },
      { label: 'Models', path: '/library' },
      { label: 'My Page' },
      { label: 'Customer Center' },
    ],
  },
  {
    role: 'Dev',
    tone: 'border-indigo-200 bg-indigo-50',
    nodes: [
      { label: 'Home', path: '/home' },
      { label: 'Projects', path: '/projects', highlight: true },
      { label: 'Dashboard', path: '/projects/pjt-002' },
      { label: 'Workspace', path: '/projects/pjt-002/workspace', highlight: true },
      { label: 'Data Foundry', path: '/projects/pjt-002/workspace' },
      { label: 'Model Institute', path: '/projects/pjt-002/workspace' },
      { label: 'Library', path: '/library' },
    ],
    note: 'Publish를 통해 Consumer Library(Datasets/Models)로 연결',
  },
  {
    role: 'Support',
    tone: 'border-rose-200 bg-rose-50',
    nodes: [
      { label: 'Home(Dashboard)' },
      { label: 'Simulation' },
      { label: 'Foundation Model' },
      { label: 'Robot Management' },
      { label: 'Environment Management' },
      { label: 'Validation Execution' },
    ],
    note: 'Request 흐름의 수신/운영 영역',
  },
  {
    role: 'Admin',
    tone: 'border-fuchsia-200 bg-fuchsia-50',
    nodes: [
      { label: 'Home(Dashboard)' },
      { label: 'User & Access' },
      { label: 'Infrastructure' },
      { label: 'Users' },
      { label: 'Permission' },
      { label: 'Storage/Networks' },
    ],
    note: 'Request 흐름의 정책/인프라 처리 영역',
  },
];

export function FlowPage(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Screen Flow</h1>
        <p className="mt-1 text-sm text-slate-600">로그인 이후 역할별 진입 흐름과 Dev Workspace 데이터 흐름을 정리한 화면입니다.</p>
        <div className="mt-3 flex gap-2">
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            Login으로 이동
          </Link>
          <Link to="/projects/pjt-002/workspace" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-800 hover:bg-slate-50">
            Dev Workspace로 이동
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Login 이후 핵심 흐름 (Dev)</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">/home</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">/projects</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">/projects/:projectId</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-indigo-300 bg-indigo-50 px-2 py-1">/projects/:projectId/workspace</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">/library</span>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Role-based Navigation (Post Login)</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {roleFlowGroups.map((group) => (
              <article key={group.role} className={['rounded-md border p-3', group.tone].join(' ')}>
                <h2 className="text-sm font-semibold text-slate-900">{group.role}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.nodes.map((node) =>
                    node.path ? (
                      <Link
                        key={`${group.role}-${node.label}`}
                        to={node.path}
                        className={[
                          'rounded-md border px-2.5 py-1.5 text-xs text-slate-700 hover:bg-white',
                          node.highlight ? 'border-indigo-300 bg-white font-semibold text-indigo-700' : 'border-slate-300 bg-slate-50',
                        ].join(' ')}
                      >
                        {node.label}
                      </Link>
                    ) : (
                      <span
                        key={`${group.role}-${node.label}`}
                        className="rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700"
                      >
                        {node.label}
                      </span>
                    ),
                  )}
                </div>
                {group.note ? <p className="mt-2 text-xs text-slate-600">{group.note}</p> : null}
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-900">Dev Workspace Data Flow</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">Register Dataset A v1.0</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">Collect / Generate / Curate</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-indigo-300 bg-indigo-50 px-2 py-1">Publish</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-sky-300 bg-sky-50 px-2 py-1">Library Dataset/Model</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">Fork / Develop</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1">Dataset A v2.0 or Dataset C v1.0</span>
            <span className="text-slate-400">{'->'}</span>
            <span className="rounded-md border border-indigo-300 bg-indigo-50 px-2 py-1">Republish</span>
          </div>
          <p className="mt-2 text-xs text-slate-600">
            Request 흐름은 Dev Workspace 운영 과정에서 Support/Admin 영역으로 전달되어 정책/인프라 관점에서 처리됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
