'use client';

import { ProjectCard } from '@/components/project-card';
import { SelectedWorkHeader } from '@/components/selected-work-header';
import type { ProjectFrontmatter } from '@/lib/types';

interface SelectedWorkProps {
  projects: ProjectFrontmatter[];
}

const SelectedWork = ({ projects }: SelectedWorkProps) => {
  return (
    <section className="section-padding bigger-container space-y-10 pt-0!">
      <SelectedWorkHeader />

      <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </section>
  );
};

export default SelectedWork;
