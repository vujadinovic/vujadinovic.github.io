import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getEntry } from 'astro:content';
import { getPublishedPosts, postUrl } from '../lib/posts';
import { getSite } from '../lib/site';

export async function GET(context: APIContext) {
  const site = await getSite();
  const page = await getEntry('pages', 'blog');
  const posts = await getPublishedPosts();
  return rss({
    title: `${site.name} — blog`,
    description: page?.data.subtitle ?? site.description,
    site: context.site ?? site.site_url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
