import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/*.{jpg,jpeg,png,webp,avif}', { eager: true });

export function image(name: string): ImageMetadata {
  const match = Object.entries(files).find(([path]) => path.endsWith(`/${name}`));
  if (!match) throw new Error(`Unknown image "${name}". Put it in src/assets/.`);
  return match[1].default;
}
