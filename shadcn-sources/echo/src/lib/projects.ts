import { getCollection, getEntry } from 'astro:content';

import type { Project, ProjectFrontmatter } from '@/lib/types';

/**
 * Get all project slugs
 */
export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getCollection('projects');
  return projects.map((project) => project.id);
}

/**
 * Get project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const entry = await getEntry('projects', slug);

  if (!entry) {
    return null;
  }

  return {
    slug,
    content: entry.body || '',
    frontmatter: entry.data as ProjectFrontmatter,
  };
}

/**
 * Get all projects with their frontmatter
 */
export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
  const projects = await getCollection('projects');

  const projectData = projects.map((project) => project.data as ProjectFrontmatter);

  // Sort by id
  return projectData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
}
