import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LanguageProvider } from '../../context/LanguageContext';
import { CatalogPage } from '../../pages/catalog/Catalog/Catalog.page';
import { LoginPage } from '../../pages/auth/Login/Login.page';
import { FlowPage } from '../../pages/flow/Flow/Flow.page';
import { HomePage } from '../../pages/home/Home/Home.page';
import { LibraryPage } from '../../pages/library/Library/Library.page';
import { LibraryDatasetDetailPage } from '../../pages/library/LibraryDatasetDetail/LibraryDatasetDetail.page';
import { LibraryModelDetailPage } from '../../pages/library/LibraryModelDetail/LibraryModelDetail.page';
import { ProjectCreateDetailsPage } from '../../pages/projects/ProjectCreate/ProjectCreateDetails.page';
import { ProjectCreatePage } from '../../pages/projects/ProjectCreate/ProjectCreate.page';
import { ProjectDetailPage } from '../../pages/projects/ProjectDetail/ProjectDetail.page';
import { ProjectListPage } from '../../pages/projects/ProjectList/ProjectList.page';
import { ProjectSettingsPage } from '../../pages/projects/ProjectSettings/ProjectSettings.page';
import { ProjectWorkspacePage } from '../../pages/projects/ProjectWorkspace/ProjectWorkspace.page';
import { WorkspaceHomePage } from '../../pages/workspace/WorkspaceHome/WorkspaceHome.page';
import { CustomerListScreen } from '../../screens/customer/CustomerList/CustomerList.screen';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <LanguageProvider>
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
        <Route path="/library/datasets/:assetId" element={<LibraryDatasetDetailPage />} />
        <Route path="/library/models/:assetId" element={<LibraryModelDetailPage />} />
        <Route path="/projects/new" element={<ProjectCreatePage />} />
        <Route path="/projects/new/details" element={<ProjectCreateDetailsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="/projects/:projectId/workspace" element={<ProjectWorkspacePage />} />
        <Route path="/projects/:projectId/workspace/settings" element={<ProjectSettingsPage />} />
        <Route path="/projects/:projectId/workspace/:workKey" element={<ProjectWorkspacePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}
