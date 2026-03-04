import { getCollection, getEntry } from 'astro:content';

import type { Article, ArticleFrontmatter } from '@/lib/types';

/**
 * Get all article slugs
 */
export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getCollection('articles');
  return articles.map((article) => article.id);
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const entry = await getEntry('articles', slug);

  if (!entry) {
    return null;
  }

  return {
    slug,
    content: entry.body || '',
    frontmatter: entry.data as ArticleFrontmatter,
  };
}

/**
 * Get all articles with their frontmatter
 */
export async function getAllArticles(): Promise<ArticleFrontmatter[]> {
  const articles = await getCollection('articles');

  const articleData = articles.map((article) => article.data as ArticleFrontmatter);

  // Sort by date (newest first), then pinned articles first
  return articleData.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
