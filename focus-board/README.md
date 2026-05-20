# inFlow

A calm focus board for remote workers. By Not On Mondays.

One focus. Three priorities. A timer. Ambient sound. Nothing else.

---

## What it does

- **Today's focus** — a single sentence for what matters most
- **Next step** — the smallest concrete action to re-enter work
- **Three priorities** — with permission to leave the third empty
- **Pomodoro timer** — 5, 15, or 25 minutes
- **Ambient sound** — rain, brown noise, or dark tones via Web Audio API
- **Music link** — save a Spotify, YouTube, or other URL for quick access
- **Parking lot** — capture ideas that don't belong right now
- **Done today** — a quiet record of what you completed
- **Dark mode** — follows system preference, togglable, zero flash

All data lives in `localStorage`. No backend. No accounts. No tracking.

---

## Running locally

```bash
cd focus-board
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Building for production

```bash
npm run build
```

Output goes to `focus-board/dist/`.

---

## Previewing the production build

```bash
npm run preview
```

Open [http://localhost:4173](http://localhost:4173).

The service worker only registers in production mode (`import.meta.env.PROD`), so it is active here but not during `npm run dev`.

---

## Installing as a PWA

After running `npm run preview` (or deploying to a server):

- **Desktop (Chrome/Edge):** click the install icon in the address bar, or open the browser menu and choose "Install inFlow"
- **iOS Safari:** tap Share → Add to Home Screen
- **Android Chrome:** tap the browser menu → Add to Home Screen, or respond to the install prompt

The app works offline after the first load. All assets are cached via a network-first service worker.

---

## Stack

- React 18 + Vite 5
- Web Audio API (no audio files)
- localStorage only
- No state management library
- No CSS framework
