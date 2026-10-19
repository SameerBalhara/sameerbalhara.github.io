# Sameer Balhara's portfolio

A complete static website: HTML, CSS, JavaScript, and local assets. No framework, package installation, CDN, server-side service, or build is required for publishing. The original article URLs, PDF, video, and full-resolution screenshots are retained.

## Run locally

Open `index.html` directly, or use the included server with an installed Node.js runtime:

```powershell
node scripts/serve.mjs
```

Visit **http://127.0.0.1:4173/**. Stop the server with Ctrl+C. To use another port in PowerShell, set `$env:PORT = '4180'` first. The server supports PDF and video byte-range requests.

## Pages and supporting files

| File | Purpose |
| --- | --- |
| `index.html` | Full-screen four-quadrant landing page; muted images reveal color on hover/focus. |
| `first-settlers/index.html` | All First Settlers devlogs, newest first. |
| `open-source/index.html` | Open-source contribution archive, newest first. |
| `papers/index.html` | Academic papers and reports archive. |
| `projects/index.html` | Independent project archive. |
| `post1.html` | Devlog 00: Procedural Terrain Generation; original text and media. |
| `post3.html` | Devlog 01: Terrain Visuals Improvements; original text and media. |
| `first-settlers/devlog-3-29.html` | Catch-up Devlog 3–29: From Terrain to a Playable World; based on the repository work notes through October 16, with the supplied progress screenshots. |
| `post2.html` | Competitive Rank Overlay; existing sparse content preserved. |
| `report1.html` | Existing DeepRacer report, with summary, PDF links, and on-demand viewer. |
| `open-source/queue-timer-reset.html` | New LayerProcGen writeup: fix adopted upstream; PR closed without merge. |
| `404.html` | Missing-page fallback. |
| `style.css` | Shared colors, layouts, typography, hover effects, and responsive rules. |
| `script.js` | Archive sorting and on-demand PDF embedding. |
| `.nojekyll` | Publishes the static files without Jekyll processing. |

All archive HTML is already sorted newest first. JavaScript is optional for navigation and reading; it enables the reverse-order selector and inline PDF viewer. Open/download PDF links work without JavaScript. No saved preference overrides the default newest-first order.

## Images and media

| Location | Contents and use |
| --- | --- |
| `images/optimized/UnityScenePreview3_008-*.webp` | First Settlers landing quadrant and newer devlog hero. |
| `images/optimized/UnityScenePreview_007CompressedForGit-*.webp` | Devlog 00 hero and archive thumbnail. |
| Other `images/optimized/UnityScenePreview*-*.webp` | Responsive versions of the original article screenshots (480, 960, and up to 1600 pixels wide, capped at source width). |
| `images/optimized/deepracer-report.webp` | Actual first page of the existing PDF; academic quadrant, archive, and article hero. |
| `images/optimized/layerprocgen-pr.webp` | Your supplied PR screenshot, used as evidence in the new contribution post. |
| `images/optimized/FirstSettlers_Progress_Lakeside-*.webp` | Earlier progress view, shown inside Devlog 3–29. The full-resolution PNG is retained in `images/`. |
| `images/optimized/FirstSettlers_Progress_Settlement-*.webp` | Latest supplied image: Devlog 3–29 hero and archive thumbnail. The complete image is displayed without cropping. |
| `assets/images/open-source.svg` | Lightweight code illustration for the open-source quadrant/banner; a conceptual illustration, not an exact source-code diff. |
| `assets/images/projects.svg` | Lightweight software illustration for the project quadrant/banner; replace with a real project screenshot when available. |
| `assets/logos/github.svg` | Official GitHub Invertocat, muted until hover/focus. |
| `assets/logos/linkedin.png` | Official LinkedIn [in] mark; grayscale until hover/focus. |
| `assets/logos/resume.svg` | Document icon, labeled “Résumé — coming soon.” |
| `assets/favicon.svg` | Small four-quadrant browser-tab icon. |
| Original `images/*.png` | Original full-resolution screenshots, linked from the devlog figures. |
| `videos/ChunkSystemDemoAndCode_001TrimmedCompressedForGit.mp4` | Existing chunk-streaming demonstration. |
| `reports/AWSDeepracerReportSameerBalhara.pdf` | The existing PDF, unchanged. |

Optimized images use `srcset`, explicit dimensions, and deferred decoding. Article images below the fold are lazy loaded. The landing's four backgrounds load immediately. Videos use `preload="none"`; the PDF is not requested until opened. Fonts are system fonts. Hover is enhanced by keyboard focus, touch devices get brighter initial imagery, and reduced-motion preferences disable transitions.

Official logo sources: [GitHub](https://brand.github.com/foundations/logo) and [LinkedIn](https://brand.linkedin.com/downloads). The brands own their marks.

## Edit content and regenerate (optional)

The generated HTML files above are the deployable site. You can edit them directly. For consistent shared headers and layouts, the optional generator is preferable:

1. Edit the article body in `content/post1.html`, `content/post2.html`, `content/post3.html`, `content/devlog-3-29.html`, or `content/open-source.html`.
2. Edit titles, dates, summaries, profile links, categories, and paper overview text in `scripts/build.mjs`. Add future entries to its `posts` array using an ISO date (`YYYY-MM-DD`); entries are sorted during generation. Keep content dates distinct from report publication dates: May 15 is labeled as the report's added date.
3. Run `node scripts/build.mjs` to regenerate all pages. Direct edits to generated pages will be overwritten.
4. To activate the résumé, replace the `resume-link` button in the generator's `profiles()` helper with an anchor to your PDF, then regenerate. The GitHub and LinkedIn URLs are in the same helper.

`content/images.json` records generated image dimensions and variants. `scripts/prepare-assets.py` is an optional asset-regeneration helper requiring Pillow and pypdfium2. Existing generated assets are supplied, so Python is not needed to run or host this site. Use `--evidence path/to/screenshot.png` only when replacing the PR evidence screenshot. Source capture runs only for missing `content/post*.html`; those files are already supplied.

## Upload to GitHub Pages

Publish these files together in the repository's selected publishing directory:

- All root `.html` files, `style.css`, `script.js`, and `.nojekyll`.
- The complete `first-settlers/`, `open-source/`, `papers/`, and `projects/` folders.
- The complete `assets/`, `images/`, `reports/`, and `videos/` folders.

`content/`, `scripts/`, and this README are authoring/documentation files; keep them in the repository for maintenance, but they are not runtime dependencies. Relative links work in local folders and when hosted below a repository path. The 404 fallback assumes the user-site root (`/`); adjust its `<base>` in the generator if hosting under a repository subpath instead. Nothing has been deployed automatically.

## Verification

Run `node scripts/check.mjs` while the local server is running. It checks local HTTP responses, all generated page/asset links and heading anchors, default archive order, image attributes, preserved original paragraphs, JavaScript sorting, and deferred PDF creation. Browser automation was blocked by the app's local-URL policy during implementation, so visual desktop/mobile QA remains a manual check: open the site, resize to narrow phone, tablet, wide desktop, and short landscape sizes, and check keyboard focus and image reveals.
