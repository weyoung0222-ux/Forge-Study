import React from 'react';

import type { ProjectCardItem } from '../../data-spec/mocks/projectList.mock';
import { ProjectCardBlock } from './ProjectCard.block';

type Props = {
  items: ProjectCardItem[];
  onCardClick?: (id: string) => void;
};

export function ProjectCardGridBlock({ items, onCardClick }: Props): JSX.Element {
  return (
    <section aria-label="Project cards" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ProjectCardBlock key={item.id} item={item} onClick={onCardClick} />
      ))}
    </section>
  );
}
