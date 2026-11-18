# Hashem Sheikhypour: Personal Portfolio

A bilingual (English and Persian) personal portfolio built with plain HTML, CSS and JavaScript. No framework, no build step.

Live site: https://hashemsh.github.io/

## Features

- Scroll-driven video: a 240-frame WebP sequence is drawn on a canvas and scrubbed by scroll position
- "Build-in" animation: cursors place each section's content as you scroll
- Smooth wheel scrolling and a two-card services slider
- English (LTR) and Persian (RTL) versions with a language switch in the header
- Responsive layout, reduced-motion support, no dependencies

## Project structure

```
.
├── index.html            English version  (/)
├── fa/
│   └── index.html        Persian version  (/fa/)
├── css/
│   ├── style.css         Shared styles
│   └── fa.css            RTL and Persian font overrides
├── js/
│   └── main.js           Scroll, frame playback, build-in animation, slider
├── assets/
│   ├── frames/           Video frames (f001.webp … f240.webp)
│   └── img/              Logo, favicon, apple-touch-icon
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## Run locally

Serve the folder over HTTP (opening `index.html` directly with `file://` breaks the `fa/` language link):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Push the contents of this folder to the root of the `hashemsh.github.io` repository.
2. In the repository, go to Settings → Pages and choose "Deploy from a branch", branch `main`, folder `/ (root)`.
3. The site is served at https://hashemsh.github.io/ (English) and https://hashemsh.github.io/fa/ (Persian).

If you attach a custom domain, update the URLs in `sitemap.xml` and `robots.txt`.

## Dependencies

Everything the site needs (frames, logo, CSS, JS) lives in this repository. The only external resource is Google Fonts: Space Grotesk (English) and Vazirmatn (Persian). Without internet access the browser falls back to a system font.

## Replacing the video

Export new frames with ffmpeg:

```bash
ffmpeg -i video.mp4 -an -vf "fps=24" -c:v libwebp -quality 86 assets/frames/f%03d.webp
```

If the number of frames is not 240, update `N` at the top of `js/main.js`.

## Editing content

- English text: `index.html`
- Persian text: `fa/index.html`
- Shared look and feel: `css/style.css` (Persian-specific tweaks in `css/fa.css`)
