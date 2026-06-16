# Vortex Remastered

A circular Breakout clone inspired by the original iPod Vortex game, rebuilt for modern touchscreen phones and playable in any mobile browser.

## How to play

- **Drag** anywhere on screen to rotate the paddle around the outer ring
- **Tap** (short touch) to launch the ball toward the brick cluster at the centre
- Don't let the ball escape past your paddle — you have 5 lives

Power-up tokens drift outward from destroyed bonus bricks (glowing outline). Catch them with your paddle to activate effects:

| Icon | Effect |
|------|--------|
| ×3 | Multi-ball — splits into 3 balls |
| ▲ | Grow — widens your paddle |
| ▼ | Shrink — narrows your paddle (bad) |
| S | Sticky — ball clings to paddle until you tap |
| ⚡ | Laser — fires beams from paddle ends |
| ↓↓ | Slow — reduces ball speed |
| ↑↑ | Fast — increases ball speed (bad) |

## Modes

**Levels** — 5 levels with escalating ring count, brick HP, and unbreakable brick shields. Each level has a unique colour palette.

**Endless** — Waves regenerate after each clear, increasing in density and difficulty indefinitely.

## Install to home screen (iPhone)

Open the game in Safari → tap the Share icon → **Add to Home Screen**. The game will launch full-screen with no browser chrome, exactly like a native app.

## Repo contents

| File | Purpose |
|------|---------|
| `index.html` | The entire game — no build step, no dependencies |
| `manifest.json` | Web app manifest — enables full-screen home screen install |
| `sw.js` | Service worker — caches the game for offline play |
| `icon-512.svg` | Home screen icon |

## Updating the game

If you push changes to `index.html`, bump the `CACHE_NAME` version string in `sw.js` (e.g. `vortex-v1` → `vortex-v2`). This forces players' browsers to fetch the new version instead of serving the stale cached file.

## Built with

Vanilla JavaScript + HTML5 Canvas. No frameworks, no build tools, no dependencies.
