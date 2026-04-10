import React from 'react';

import type { ListFilterChip } from '../../../blocks/molecules/ListFilterChips.block';
import { ProjectCardGridBlock } from '../../../blocks/organisms/ProjectCardGrid.block';
import { ScreenDescriptionPanelBlock } from '../../../blocks/organisms/ScreenDescriptionPanel.block';
import { createGlobalTopNavItems, createTemporaryTopUtilityButtons } from '../../../navigation/globalTopNav';
import { ListBasePattern } from '../../../patterns/list-base/ListBase.pattern';
import { projectListRows } from '../../../data-spec/mocks/projectList.mock';
import { projectListLayout } from './ProjectList.layout';
import { projectListUxDescription } from './ProjectList.ux';
import {
  projectSortOptions,
  projectStatusTabs,
  type ProjectRoleFilter,
  type ProjectSort,
} from './ProjectList.schema';

type Props = {
  onCreateProject: () => void;
  onProjectClick: (projectId: string) => void;
  onNavigate: (path: string) => void;
};

export function ProjectListScreen({ onCreateProject, onProjectClick, onNavigate }: Props): JSX.Element {
  const [status, setStatus] = React.useState<'all' | 'in-progress' | 'completed'>('all');
  const [search, setSearch] = React.useState('');
  const [roleFilter, setRoleFilter] = React.useState<ProjectRoleFilter>('all');
  const [sortValue, setSortValue] = React.useState<ProjectSort>('recent');
  const [isUxOpen, setIsUxOpen] = React.useState(false);
  const [highlightedBlockKey, setHighlightedBlockKey] = React.useState<
    'listHeader' | 'listToolbar' | 'listStatusTabs' | 'listContent' | null
  >(null);
  const [highlightedNumber, setHighlightedNumber] = React.useState<number | null>(null);

  const rows = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const filtered = projectListRows.filter((row) => {
      const byStatus = status === 'all' ? true : row.status === status;
      const byRole = roleFilter === 'all' ? true : row.role === roleFilter;
      const bySearch =
        normalizedSearch.length === 0
          ? true
          : row.title.toLowerCase().includes(normalizedSearch) ||
            row.description.toLowerCase().includes(normalizedSearch);

      return byStatus && byRole && bySearch;
    });

    if (sortValue === 'title') {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [roleFilter, search, sortValue, status]);

  const roleChips: ListFilterChip[] = [
    { key: 'all', label: 'All', active: roleFilter === 'all', onClick: () => setRoleFilter('all') },
    {
      key: 'project-owner',
      label: 'Project Owner',
      active: roleFilter === 'Project Owner',
      onClick: () => setRoleFilter('Project Owner'),
    },
    {
      key: 'data-developer',
      label: 'Data Developer',
      active: roleFilter === 'Data Developer',
      onClick: () => setRoleFilter('Data Developer'),
    },
    {
      key: 'model-developer',
      label: 'Model Developer',
      active: roleFilter === 'Model Developer',
      onClick: () => setRoleFilter('Model Developer'),
    },
  ];

  const listState = rows.length === 0 ? 'empty' : 'ready';
  const navItems = createGlobalTopNavItems('projects', onNavigate);
  const topUtilityButtons = createTemporaryTopUtilityButtons(
    () => setIsUxOpen(true),
    () => onNavigate('/'),
  );

  return (
    <>
      <div className={isUxOpen ? 'pr-0 transition-[padding] duration-300 lg:pr-[440px]' : 'transition-[padding] duration-300'}>
        <ListBasePattern
          navItems={navItems}
          onHomeClick={() => onNavigate('/home')}
          topUtilityButtons={topUtilityButtons}
          title={projectListLayout.pageTitle}
          subtitle={projectListLayout.pageDescription}
          onPrimaryAction={onCreateProject}
          primaryActionLabel="Create Project"
          highlightBlockKey={highlightedBlockKey ?? undefined}
          highlightNumber={highlightedNumber}
          searchValue={search}
          onSearchChange={setSearch}
          chips={roleChips}
          sortValue={sortValue}
          sortOptions={projectSortOptions}
          onSortChange={(value) => setSortValue(value as ProjectSort)}
          statusValue={status}
          statusTabs={projectStatusTabs}
          onStatusChange={(value) => setStatus(value as 'all' | 'in-progress' | 'completed')}
          state={listState}
          stateConfig={{
            kind: 'empty',
            title: 'No projects found',
            description: 'Try changing status or role filters to see matching projects.',
          }}
        >
          <ProjectCardGridBlock items={rows} onCardClick={onProjectClick} />
        </ListBasePattern>
      </div>

      <ScreenDescriptionPanelBlock
        isOpen={isUxOpen}
        title={projectListUxDescription.title}
        summary={projectListUxDescription.summary}
        items={projectListUxDescription.items}
        onClose={() => {
          setIsUxOpen(false);
          setHighlightedBlockKey(null);
          setHighlightedNumber(null);
        }}
        onItemEnter={(itemKey, number) => {
          setHighlightedBlockKey(itemKey as 'listHeader' | 'listToolbar' | 'listStatusTabs' | 'listContent');
          setHighlightedNumber(number);
        }}
        onItemLeave={() => {
          setHighlightedBlockKey(null);
          setHighlightedNumber(null);
        }}
      />
    </>
  );
}
