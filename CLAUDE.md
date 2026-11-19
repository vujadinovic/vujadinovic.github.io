# Stefan Vujadinović — personal site

Personal portfolio and blog of a mathematician (statistics and probability) moving into ML engineering and applied science. Three sections: about, projects & research, blog. Static site, deployed to GitHub Pages at https://vujadinovic.github.io.

## Stack

- Astro (static output), content collections with zod schemas.
- Plain CSS. All design tokens live in `src/styles/tokens.css` as CSS custom properties. No Tailwind, no CSS framework, no UI library.
- Markdown and MDX for content. Math with remark-math + rehype-katex. Code highlighting with Shiki and a custom theme that uses the palette below.
- `@astrojs/rss` for the blog feed, `@astrojs/sitemap` for the sitemap.
- No client-side framework. The only JavaScript is small inline scripts for keyboard shortcuts and the logo cursor.

## Where things live

- `src/content/site.yaml`: name, email, links, `show_talks` flag.
- `src/content/about.md`: everything on the about page.
- `src/content/projects/*.md`: one file per project or research item. `hidden: true` keeps it off the site. Items with `talk: true` show only when `show_talks` is true.
- `src/content/blog/*.md(x)`: one file per post. `draft: true` posts appear in `npm run dev` but never in the production build or the RSS feed.
- `src/assets/illustrations/*.svg`: cover illustrations, referenced by file name in frontmatter `cover`.
- `public/cv.pdf`, `src/assets/stefan.jpg`: CV and portrait.
- `design-reference/*.html`: the approved design. When in doubt about how something should look, open these and match them.

## Design rules

The look is "Linear + terminal": a dark, quiet, card-based layout with a computer-terminal layer (monospace nav chips with key hints, `/ section` labels, key: value metadata tables, crosshair marks around page titles).

### Color tokens

| token | value | use |
|---|---|---|
| `--bg` | `#0F1011` | page background |
| `--surface` | `#17181A` | cards, nav chips, logo tile |
| `--media` | `#131416` | illustration panels, code blocks |
| `--line` | `#222428` | card borders, header and footer rules |
| `--line-strong` | `#2A2C30` | section label underline, tool chip border |
| `--line-soft` | `#1E2023` | metadata row separators, divider under card media |
| `--tag-border` | `#34363B` | tag outlines |
| `--text` | `#DDE5F0` | primary text, titles, active nav chip background. Never use pure white for text. |
| `--text-hover` | `#EBF1F8` | link hover |
| `--text-article` | `#C9CCD1` | blog post body |
| `--text-body` | `#A3A8B0` | descriptions, secondary paragraphs |
| `--text-muted` | `#8A8F98` | labels, keys, dates, footer |
| `--text-tag` | `#C4C8CE` | tag text |
| `--display` | `#9AB4DC` | giant page titles and group headings |
| `--quote-bar` | `#3A3C41` | left bar on lead paragraphs |
| `--mark` | `#4A4D52` | the `+` crosshair marks |
| `--accent` | `#64A8FF` | only: key letters in nav chips, the logo cursor, and one highlighted line per illustration. Never for UI text, buttons or backgrounds. |

### Type

- Schibsted Grotesk (400, 500, 600, 700): body, titles, everything that is prose.
- IBM Plex Mono (400, 500): nav chips, `/ labels`, metadata tables, tags, dates, code, figure captions, footer.
- STIX Two Text italic: math labels inside illustrations. Article math is KaTeX.
- Page titles: weight 500, `clamp(51px, 8.4vw, 131px)`, line-height 0.95, letter-spacing -0.05em, color `--display`, max-width 11ch. Post titles use `clamp(42px, 6.4vw, 99px)` and max-width 16ch.

### Casing

- Lowercase: nav items, page titles, section labels, group headings, buttons, footer links, category tags, metadata keys.
- Normal sentence case and correct spelling: all sentences, project titles, post titles, names.

### Components

- Nav: three zones. Left: logo tile (pixel-art lowercase "s" on a 5×7 grid plus a blinking amber block cursor). Center: chips `[a] about`, `[p] projects & research`, `[b] blog`. Right: `[g] github`, `[c] cv`. Chips are mono 13px, 32px tall, radius 4px, background `--surface`, key letter in `--accent`. The active chip has background `--text` and text `--bg`.
- Page hero: the giant lowercase title with `+` marks at the top and bottom edges at 0, 62%, 86% and 100% of the width, then one sentence in `--text-body`.
- Section label: `/ name` in mono 13px `--text-muted`, 10px padding below, 1px `--line-strong` bottom border.
- Metadata table: rows of `key:` (mono, `--text-muted`, 132px column) and value (mono, `--text`), separated by 1px `--line-soft`.
- Tags: mono, 1px `--tag-border` outline, radius 3px, padding 1px 8px.
- Cards: background `--surface`, 1px `--line` border, radius 10px, illustration panel on `--media` on top.
- Radii: tags 3px, chips 4px, buttons 8px, cards and panels 10px.

### Illustrations

Every post and project has one SVG cover that draws the actual mathematical object of its topic (a density, a network, a forecast fan, a residual plot). When asked for a new one, follow the existing files in `src/assets/illustrations/`:

- transparent background (the panel provides `--media`); viewBox around 480×260 for cards or 720×340 for featured cards
- strokes `#EDEDEF` at 0.15–0.7 opacity, 1–1.5px wide
- exactly one highlighted element in `--accent` (`#64A8FF`)
- optional math labels in STIX Two Text italic, fill `#DDE5F0` at about 0.5 opacity
- no titles, no words, no gradients, no shadows

### Behavior

- Keyboard shortcuts `a`, `p`, `b`, `g`, `c` follow the nav chips. Ignore them when a modifier key (Ctrl, Alt, Meta) is held, when the key is repeating, and when focus is in an input, textarea, select or contenteditable element.
- Logo: hovering or focusing it shows a small mono tooltip "click if animation annoys you"; clicking stops the cursor blink and the tooltip becomes "click to turn it back on". The choice is kept in `sessionStorage`, so it carries across pages but resets on a new visit. With `prefers-reduced-motion: reduce` the cursor never blinks.
- RSS link appears only on the blog index (in the `/ featured` label row and in that page's footer).

## Working rules

- Do not add comments to code.
- Keep motion to the logo cursor. No scroll animations, no hover transitions on cards.
- Every page must work from 360px to 1920px wide. Check with Playwright at 390, 768 and 1440 px before saying a change is done.
- Keep text contrast at WCAG AA or better. Visible keyboard focus everywhere.
- Run `npm run build` after changes; it must finish without errors or warnings.
- Never push to GitHub without asking first.
