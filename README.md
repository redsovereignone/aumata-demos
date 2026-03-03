# aumata-demos

Automated build system for Aumata template demo sites. Clones all Lexington-Themes templates, builds each with Astro's `--base` flag for subdirectory deployment, and publishes to Cloudflare Pages at `demos.aumata.com/{slug}/`.

## How it works

1. `templates.json` — registry of all template repos
2. `build.sh` — clones each repo, runs `npm install && npx astro build --base=/{slug}/`, copies `dist/` to `public/{slug}/`
3. Cloudflare Pages serves `public/` at `demos.aumata.com`

## Templates (29)

| Slug | Repo |
|------|------|
| alfred | Lexington-Themes/alfred |
| aubergine | Lexington-Themes/aubergine |
| author | Lexington-Themes/author |
| brightlight | Lexington-Themes/brightlight |
| buio | Lexington-Themes/buio |
| carbon | Lexington-Themes/carbon |
| carriera | Lexington-Themes/carriera |
| dusk | Lexington-Themes/dusk |
| enlightr | Lexington-Themes/enlightr |
| flabbergasted | Lexington-Themes/flabbergasted |
| flaco | Lexington-Themes/flaco |
| hemingway | Lexington-Themes/hemingway |
| hirewise | Lexington-Themes/hirewise |
| kotei | Lexington-Themes/kotei |
| navy | Lexington-Themes/navy |
| outkast | Lexington-Themes/outkast |
| phanatik | Lexington-Themes/phanatik |
| primapersona | Lexington-Themes/primapersona |
| profoliox | Lexington-Themes/profoliox |
| quartiere | Lexington-Themes/quartiere |
| riflesso | Lexington-Themes/riflesso |
| semplice | Lexington-Themes/semplice |
| simplexity | Lexington-Themes/simplexity |
| snowpeak | Lexington-Themes/snowpeak |
| spaziobianco | Lexington-Themes/spaziobianco |
| streamer | Lexington-Themes/streamer |
| studiomax | Lexington-Themes/studiomax |
| vanta | Lexington-Themes/vanta |
| williamsburg | Lexington-Themes/williamsburg |

## Adding a new template

Add an entry to `templates.json`:

```json
{ "slug": "my-template", "repo": "Lexington-Themes/my-template" }
```

Then push to `main` — the workflow will pick it up automatically. Templates also rebuild weekly on Sundays to pull in upstream changes.

## Cloudflare Pages setup

- Build command: `bash build.sh`
- Output directory: `public`
- Node version: 20

## Security headers

`public/_headers` sets `frame-ancestors` to only allow embedding from `aumata.com` and `*.aumata.com`, so demo iframes only work on the marketing site.

## Local development

Run the build script locally to test:

```bash
bash build.sh
```

Built templates will appear in `public/{slug}/`. Individual failures are skipped with a warning so one broken template does not stop the rest.
