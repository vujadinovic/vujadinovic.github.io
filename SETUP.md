# Uputstvo za Fedoru

## 1. Node.js

```bash
sudo dnf install nodejs
node -v
```

Astro traži Node 22.12 ili noviji. Ako `node -v` pokaže nižu verziju, instaliraj noviji Node paket iz Fedorinih repozitorijuma (npr. `nodejs24`) ili pitaj Claude Code da ti pomogne.

## 2. Folder sajta

Raspakuj ovaj zip tako da folder bude `~/projects/vujadinovic.github.io`, pa uđi u njega:

```bash
mkdir -p ~/projects
unzip portfolio-kit.zip -d ~/projects
mv ~/projects/portfolio-kit ~/projects/vujadinovic.github.io
cd ~/projects/vujadinovic.github.io
```

## 3. MCP serveri

Pokreni ove komande baš iz tog foldera, jer važe samo za folder u kom su pokrenute:

```bash
claude mcp add playwright npx @playwright/mcp@latest
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp
```

Ako se Playwright kasnije buni da nema browser, reci Claude Code-u da to sredi.

## 4. Claude Code i plugin

```bash
claude
```

U Claude Code-u:

```
/plugin install frontend-design@claude-plugins-official
/reload-plugins
```

## 5. Pokretanje

1. Pritiskaj Shift+Tab dok dole ne piše da je uključen plan mode.
2. Napiši: `Read PROMPT.md and follow it.`
3. Pročitaj plan koji ti predloži i odobri ga, ili traži izmene.
4. Pusti ga da radi. Na kraju ti daje spisak onoga što nije uspeo da uskladi i gde su placeholder-i.

## 6. Objavljivanje

1. Na GitHub-u napravi javni repozitorijum `vujadinovic.github.io`.
2. Uradi `git push` po komandama koje ti Claude Code da.
3. Na GitHub-u: Settings → Pages → Source: **GitHub Actions**.

Posle par minuta sajt je na https://vujadinovic.github.io. Svaki sledeći `git push` ga automatski osvežava.
