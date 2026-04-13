import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CatalogPage } from '../../pages/catalog/Catalog/Catalog.page';
import { LoginPage } from '../../pages/auth/Login/Login.page';
import { FlowPage } from '../../pages/flow/Flow/Flow.page';
import { HomePage } from '../../pages/home/Home/Home.page';
import { LibraryPage } from '../../pages/library/Library/Library.page';
import { ProjectCreatePage } from '../../pages/projects/ProjectCreate/ProjectCreate.page';
import { ProjectDetailPage } from '../../pages/projects/ProjectDetail/ProjectDetail.page';
import { ProjectListPage } from '../../pages/projects/ProjectList/ProjectList.page';
import { ProjectWorkspacePage } from '../../pages/projects/ProjectWorkspace/ProjectWorkspace.page';
import { WorkspaceHomePage } from '../../pages/workspace/WorkspaceHome/WorkspaceHome.page';
import { CustomerListScreen } from '../../screens/customer/CustomerList/CustomerList.screen';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/flow" element={<FlowPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/workspace" element={<WorkspaceHomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/descriptions" element={<Navigate to="/catalog" replace />} />
        <Route path="/customers/list" element={<CustomerListScreen />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/projects/new" element={<ProjectCreatePage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/projects/:projectId/workspace" element={<ProjectWorkspacePage />} />
        <Route path="/projects/:projectId/workspace/:workKey" element={<ProjectWorkspacePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
