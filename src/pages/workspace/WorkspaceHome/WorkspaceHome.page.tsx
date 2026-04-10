import React from 'react';
import { Link } from 'react-router-dom';

export function WorkspaceHomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-5">
          <h1 className="text-2xl font-semibold text-slate-900">Workspace</h1>
          <p className="mt-1 text-sm text-slate-600">Select the screen group you want to explore.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/projects" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
            <p className="mt-1 text-sm text-slate-600">Open project list, project detail, and creation flows.</p>
          </Link>

          <Link to="/library" className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300">
            <h2 className="text-lg font-semibold text-slate-900">Library</h2>
            <p className="mt-1 text-sm text-slate-600">Open generated asset list and filter/sort interactions.</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link to="/catalog" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Catalog
          </Link>
          <Link to="/catalog" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Descriptions
          </Link>
          <Link to="/" className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Logout
          </Link>
        </div>
      </div>
    </main>
  );
}
