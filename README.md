# Hemakshi's macOS-style portfolio

A portfolio that looks and behaves like a macOS desktop: menu bar, magnifying dock,
draggable windows, a Finder for projects, a working Terminal, Notes, Photos, Mail and a Resume viewer.
Written from scratch with React 19 + Vite + Zustand (no GSAP or Tailwind: drag, dock
magnification and animations are plain pointer events and CSS).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Needs Node 20.19+ (Vite 7).

## Make it yours

**Almost everything lives in one file: `src/data/profile.js`.**

| What | Where |
| --- | --- |
| Name, tagline, email, GitHub / LinkedIn | `profile` at the top (links are hidden while empty) |
| About-me notes | `notes` |
| Projects, hackathons, experience, education | `collections` |
| Terminal `skills` output | `skills` |
| Gallery photos | `photos` (web-sized copies in `public/images/…`; keep big originals in `Images/` so they are not shipped) |
| Hover-swap portrait | `portrait` |
| Resume PDF download | drop PDF in `public/`, set `profile.resumePdf` |

Other knobs: wallpapers are CSS gradients in `src/styles.css` (search `data-wallpaper`);
dock apps are listed in `src/components/Dock.jsx`; each window is a file in `src/apps/`.

## Structure

```
src/
  data/profile.js        all personal content
  store/useDesktop.js    window open/minimize/maximize/z-order, theme, wallpaper (Zustand)
  components/            MenuBar, Dock, Desktop, Window frame, shared bits
  apps/                  Finder (Projects), Notes (About), Terminal, Photos, Mail, Resume, Settings
  styles.css             all styling, light/dark, phone layout
```

On phones/touch devices windows open full screen and dragging is turned off.
