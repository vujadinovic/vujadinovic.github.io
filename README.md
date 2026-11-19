# vujadinovic.github.io

Lični sajt: o meni, projekti i istraživanje, blog. Pravljen je u Astru, a objavljuje se na GitHub Pages na adresi https://vujadinovic.github.io.

Sav tekst je u `src/content/`. Za izmenu teksta ili novi post menjaš jedan Markdown ili YAML fajl, nikad komponentu.

| šta | gde |
|---|---|
| ime, mejl, linkovi, `show_talks` | `src/content/site.yaml` |
| stranica „about“ | `src/content/about.md` |
| naslov i podnaslov stranica „projects“ i „blog“ | `src/content/pages/projects.md`, `src/content/pages/blog.md` |
| projekti i istraživanje | `src/content/projects/*.md` |
| postovi | `src/content/blog/*.md` |
| ilustracije | `src/assets/illustrations/*.svg` |
| CV i fotografija | `public/cv.pdf`, `src/assets/stefan.jpg` |

## Pokretanje dev servera

Treba ti Node 22.23.4 ili noviji (na Fedori: `sudo dnf install nodejs24 nodejs24-npm`).

```bash
npm install        # samo prvi put i posle promene zavisnosti
npm run dev        # sajt je na http://localhost:4321
npx astro dev stop # gasi dev server
```

Dev server prikazuje i postove sa `draft: true`. Produkcijski sajt ih ne prikazuje.

Da vidiš tačno ono što ide na internet:

```bash
npm run build      # mora da prođe bez grešaka i upozorenja
npm run preview
```

## Novi post

Napravi fajl `src/content/blog/<slug>.md`. Ime fajla postaje adresa: `/blog/<slug>/`.

```markdown
---
title: Naslov posta
description: Jedna rečenica za karticu na blogu, RSS i pretragu.
lead: Jedna ili dve rečenice kojima post počinje.
category: statistics
tags: [bayes, PyMC]
date: 2027-01-15
draft: true
featured: false
cover: ab-densities.svg
code: https://github.com/vujadinovic/repo
---

## Prvi naslov

Tekst posta.
```

- `cover` je ime fajla iz `src/assets/illustrations/`.
- `featured: true` stavlja post među dva istaknuta na vrhu bloga.
- `code` nije obavezan. Ako postoji, u metapodacima se pojavljuje link na kod.
- Naslovi `##` automatski čine sadržaj („/ contents“) sa leve strane.
- Matematika: `$x$` u tekstu, a `$$ ... $$` u posebnom redu (formule se same numerišu).
- Kod sa imenom fajla u zaglavlju:

  ````markdown
  ```python title="deepar/train.py"
  print("zdravo")
  ```
  ````

- Slika sa potpisom: `![opis slike](ime.svg "fig. 1: potpis ispod slike")`. Ako je `ime.svg` u `src/assets/illustrations/`, slika se ubacuje u tamni panel kao u dizajnu.

## Objavljivanje drafta

1. U postu promeni `draft: true` u `draft: false` i proveri `date`.
2. Proveri lokalno: `npm run build`.
3. Pošalji izmenu:

   ```bash
   git add src/content/blog/<slug>.md
   git commit -m "Publish <naslov>"
   git push
   ```

GitHub Actions za par minuta objavi sajt. Post se tada pojavljuje na blogu, u RSS-u i u sitemap-u.

## Novi projekat

Napravi fajl `src/content/projects/<ime>.md`:

```markdown
---
title: Naziv projekta
group: projects
order: 4
cover: extra-qq-plot.svg
hidden: false
metadata:
  type: personal project
  date: "2027"
  status: in progress
  stack: [Python, PyTorch]
links:
  - label: vujadinovic/repo
    url: https://github.com/vujadinovic/repo
---

Kratak opis projekta.
```

- `group` je `research` ili `projects`. Na stranici prvo ide „research“, pa „projects“.
- `order` određuje redosled unutar grupe (manji broj ide prvi).
- `metadata` prima bilo koje ključeve, redom kojim su napisani. Lista (`[a, b]`) postaje tagovi. `status: finished` dobija pun kružić, a svaki drugi status prazan.
- `links` se prikazuju kao linkovi. Ako su svi na GitHub-u, red se zove `code:`, inače `links:`.
- `hidden: true` sklanja projekat sa sajta, a fajl ostaje.
- Datume piši pod navodnicima (`"2027"`), da ih YAML ne pretvori u broj.

## Prikaz sekcije „talks“

U `src/content/site.yaml` stavi `show_talks: true`. Tada se:

- na stranici „about“ pojavljuje „/ talks and writing“ sa stavkama iz `talks` u `about.md`;
- na stranici „projects“ pojavljuju stavke sa `talk: true`, ali samo ako nemaju `hidden: true`.

## Nova ilustracija za naslovnu sliku

Pitaj Claude Code, na primer:

> Napravi novu cover ilustraciju za post „Bayesian A/B testing“: dve beta raspodele posteriora koje se preklapaju, sa istaknutom razlikom. Prati pravila za ilustracije iz CLAUDE.md i postojeće fajlove u src/assets/illustrations/. Sačuvaj kao src/assets/illustrations/bayes-ab-posteriors.svg i stavi je u cover posta.

Pravila iz CLAUDE.md važe za svaku ilustraciju: providna pozadina, tanke svetle linije, tačno jedan istaknut element u boji `#64A8FF` i bez reči u slici. Pre objave pogledaj ilustraciju u `npm run dev`.

## Placeholder-i koje treba popuniti

- `[LINKEDIN_URL]` u `src/content/site.yaml`. Dok je placeholder, link na LinkedIn se ne prikazuje. Kad upišeš pravi URL, pojaviće se na „about“ i u futeru.
- `[YEAR]` u `src/content/projects/deepar.md` (`metadata.date`).
- `[ABSTRACT_PDF_URL]` u `src/content/projects/interpretable-ml-review-abstract.md` (stavka je trenutno skrivena).
- `[...]` u postovima iz `src/content/blog/` (`description`, `lead` i tekst).
