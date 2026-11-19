import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const illustrationsDir = fileURLToPath(new URL('../assets/illustrations/', import.meta.url));

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const isBareSvg = (url) => /^[\w.-]+\.svg$/i.test(url) && existsSync(illustrationsDir + url);

function inlineIllustration(image) {
  const raw = readFileSync(illustrationsDir + image.url, 'utf8').trim();
  const label = image.alt ? `role="img" aria-label="${escapeHtml(image.alt)}"` : 'aria-hidden="true"';
  const svg = raw.replace(/\saria-hidden="true"/, '').replace(/^<svg\b/, `<svg ${label}`);
  const caption = image.title ? `<figcaption>${escapeHtml(image.title)}</figcaption>` : '';
  return { type: 'html', value: `<figure class="figure"><div class="figure-media">${svg}</div>${caption}</figure>` };
}

function captionedImage(image) {
  return {
    type: 'figure',
    data: { hName: 'figure', hProperties: { className: ['figure'] } },
    children: [
      image,
      {
        type: 'figcaption',
        data: { hName: 'figcaption' },
        children: [{ type: 'text', value: image.title }],
      },
    ],
  };
}

function soleImage(paragraph) {
  const meaningful = paragraph.children.filter((child) => !(child.type === 'text' && !child.value.trim()));
  return meaningful.length === 1 && meaningful[0].type === 'image' ? meaningful[0] : null;
}

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'paragraph') {
      const image = soleImage(child);
      if (image && isBareSvg(image.url)) return inlineIllustration(image);
      if (image && image.title) return captionedImage(image);
    }
    walk(child);
    return child;
  });
}

export default function remarkFigures() {
  return (tree) => walk(tree);
}
