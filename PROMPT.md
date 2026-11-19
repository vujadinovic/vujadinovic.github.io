Build my personal website from this folder. Everything you need is here: the approved design, all content, the illustrations, my photo and CV, and the project rules in CLAUDE.md. Read CLAUDE.md first and follow it for this task and for every later change.

## What is in this folder

- `CLAUDE.md`: project rules and design tokens. Keep it at the repository root.
- `design/`: the approved design as four static HTML pages (`about.html`, `projects.html`, `blog.html`, `post-time-series-and-neural-networks.html`). Open them in Playwright and take screenshots at 1440 px before you start. The finished site must look the same.
- `content/`: all text, as YAML and Markdown with frontmatter. Use it as the single source of content. Do not copy text out of the design files.
- `assets/`: `stefan.jpg`, `cv.pdf`, and `illustrations/*.svg`.

## Goal

A static Astro site in this folder, deployed to GitHub Pages from the repository `vujadinovic/vujadinovic.github.io`, so the site lives at https://vujadinovic.github.io with no base path. After the build, changing any text or adding a post must mean editing one Markdown file, never a component.

## Steps

Work in plan mode first. Read everything, then show me the plan and the file tree and wait for my approval before writing code.

1. **Set up.** Scaffold a minimal Astro project in the current folder without overwriting the kit. Use the Astro Docs MCP to check the current recommended setup, Node version, and the GitHub Pages deploy workflow. Initialize git if needed and make the first commit after scaffolding.

2. **Move the kit into place.**
   - `content/` → `src/content/`, with zod schemas for `site`, `about`, `projects` and `blog` that match the frontmatter in the files exactly.
   - `assets/illustrations/` → `src/assets/illustrations/`; `assets/stefan.jpg` → `src/assets/`; `assets/cv.pdf` → `public/cv.pdf`.
   - `design/` → `design-reference/`. It stays in the repo as reference and is never part of the build.

3. **Tokens and layout.** Write `src/styles/tokens.css` from the table in CLAUDE.md, load the three Google Fonts, and build one base layout with the header and footer from the design.

4. **Header.** Three-zone nav as described in CLAUDE.md: the pixel "s" logo with the blinking cursor on the left, page chips centered, github and cv on the right. Implement the keyboard shortcuts and the logo tooltip and toggle exactly as specified, with `sessionStorage` and `prefers-reduced-motion`. Use a real `<button>` for the logo toggle. Home is the about page: `/` renders about.

5. **About page** (`/`), from `src/content/about.md` and `site.yaml`:
   - giant title "about" with crosshair marks and the subtitle
   - left column: photo (4:5, object-fit cover, radius 10px), then `/ metadata` (name, based in, interested in as tags, currently, contact links: email as mailto, linkedin, github)
   - right column: `/ bio` with the lead in a left-barred paragraph and the body text; then `/ experience`, `/ education`, `/ activities`, `/ talks and writing` (only if `show_talks` is true), `/ tools` as tags, `/ outside work`
   - entries show the role in `--text` with "at org" in `--text-body`, the date right-aligned in mono, and the text below

6. **Projects & research page** (`/projects/`): groups "research" and "projects" in that order, each with its lowercase display heading. Each item: left column `/ metadata` table built from the `metadata` frontmatter (arrays become tags; `status` gets a dot, filled for finished and outlined otherwise; `links` render as underlined mono chips), right column the illustration panel (260 px tall), title, and body text. Respect `hidden`, `talk`, `show_talks` and `order`. Items do not get their own pages.

7. **Blog index** (`/blog/`):
   - `/ featured`: up to two posts with `featured: true`, as large cards (300 px illustration, category tag, title, description); the RSS link sits at the right end of this label row
   - `/ all posts`: the remaining posts as three-column cards (210 px illustration, category tag, title), newest first; the label row shows the post count
   - drafts are visible in `npm run dev` and absent from the production build
   - when production has no published posts, show one short line instead of empty sections, e.g. "First posts are on the way." with the RSS link

8. **Blog post** (`/blog/<slug>/`), following `design-reference/post-time-series-and-neural-networks.html`:
   - mono `cd ../blog` back link, the giant lowercase title with crosshair marks, the description as subtitle
   - left column: `/ metadata` (date, reading time computed from the text, author, category, tags, and a code link if `code` is set), then `/ contents` generated from the post's h2 headings as numbered lowercase anchor links
   - right column: `/ article` with the `lead` as the left-barred paragraph, then the post body
   - body styles: h2 32px weight 500 in `--text`, paragraphs 18px/1.75 in `--text-article` with max-width 68ch, display math centered in `--text` (KaTeX), code blocks on `--media` with a 1px `--line` border, radius 8px, and a mono header row with the `title` from the code fence meta on the left and the language on the right
   - images whose markdown title is set render as `<figure>` with that title as a mono `figcaption`; SVG images from `src/assets/illustrations/` render inside a `--media` panel like the design's fig. 1
   - previous and next post links at the bottom, by date, skipping drafts in production

9. **Feeds and meta.** RSS at `/rss.xml` with published posts only; sitemap; per-page title and description; Open Graph tags using the photo; an SVG favicon of the pixel "s". The site language is English.

10. **Responsive.** Every page must work from 360 px up.
    - At phone widths the nav becomes two rows: logo and the right-hand chips on the first row, page chips centered on the second; nothing scrolls sideways.
    - Two-column layouts stack. On about and projects the metadata column comes first; on blog posts the article comes first and the metadata and contents follow it.
    - Cards go to one column. Giant titles shrink through their clamp. Code blocks and wide math scroll horizontally inside their own box.

11. **Deploy.** Add the official Astro GitHub Pages workflow in `.github/workflows/deploy.yml` (check the current version through the Astro Docs MCP) and set `site` to `https://vujadinovic.github.io`. Do not push; tell me the exact commands and the one GitHub setting I need (Pages → Source: GitHub Actions).

12. **Verify.**
    - Run `npm run build` with no errors or warnings.
    - With Playwright, screenshot every page at 390, 768 and 1440 px and compare each against the matching design reference at the same width. Fix every visible difference in spacing, color, type size or alignment, then screenshot again.
    - Test the keyboard shortcuts, the logo tooltip and toggle across two pages, and the reduced-motion case.
    - Confirm drafts are missing from `dist/` and `rss.xml`.
    - Finish with a short list of anything you could not match and why.

## Placeholders

Leave these exactly as written; I will fill them in later: `[LINKEDIN_URL]`, `[YEAR]`, `[ABSTRACT_PDF_URL]`, and every `[...]` text in the blog drafts. List where each one is used in your final summary.

## After the build

Add a short `README.md` in Serbian that explains how I:
- start the dev server
- add a post
- publish a draft
- add a project
- show the talks section
- ask you for a new cover illustration

Commit at each milestone with clear messages.
