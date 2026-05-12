# Johannes Schmidt — Portfolio Website

Personal freelancer portfolio deployed to GitHub Pages: https://johannes-schmidt.dev

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- No framework, no build step — pure static site

## Project Structure

```
index.html          — Landing page (Hero, Portfolio, About, Contact)
impressum.html      — Legal notice (German only)
blog.html           — Blog overview
cv/                 — CV page
css/styles.css      — All styles
js/main.js          — All scripts
js/i18n.js          — Language switching logic (i18next init + applyTranslations)
locales/de.json     — German strings
locales/en.json     — English strings
images/             — Images and logo
```

## Design System

**Inspiration:** samunderwood.co.uk — minimalist, generous whitespace, large headlines

**Colors**

- Primary: `#1e3a5f` (navy)
- Secondary: `#e8753a` (orange)
- Grays: Tailwind Slate Scale

**Typography** — Outfit (headings) + Inter (body) via Google Fonts

**Tokens** — CSS custom properties in `:root` (`css/styles.css`)

## i18n

German (default) + English via a DE | EN nav toggle. Uses [i18next](https://www.i18next.com/) via CDN. Strings live in `locales/de.json` and `locales/en.json`. Elements are marked with `data-i18n="key"` attributes; `js/i18n.js` swaps them on load. `impressum.html` is German-only.

## Language

- Code and comments: English
