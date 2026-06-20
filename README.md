# Vortex Remastered

A circular Breakout clone inspired by the original iPod Vortex game, rebuilt for modern touchscreen phones and playable in any mobile browser.

## How to play

- **Drag** anywhere on screen to rotate the paddle around the outer ring
- **Tap** (short touch) to launch the ball toward the brick cluster at the centre
- Don't let the ball escape past your paddle — you have 5 lives

**Desktop controls:** A / D or ← / → to rotate the paddle continuously. Space to launch.

Power-up tokens drift outward from destroyed bonus bricks (glowing outline). Catch them with your paddle to activate effects:

| Icon | Effect |
|------|--------|
| ×3 | Multi-ball — splits into 3 balls |
| ▲ | Grow — widens your paddle |
| ▼ | Shrink — narrows your paddle (bad) |
| S | Sticky — ball clings to paddle until you tap / press Space |
| ⚡ | Laser — fires beams from paddle ends |
| ↓↓ | Slow — reduces ball speed temporarily |
| ↑↑ | Fast — increases ball speed temporarily (bad) |

## Modes

**Levels** — 25 curated levels across 5 themed worlds. Difficulty escalates through ring count, brick HP (1–7), and unbreakable shield rings.

| World | Theme | Levels | Character |
|-------|-------|--------|-----------|
| 1 · Azure | Blues | 1-1 → 1-5 | Tutorial — 2–3 rings, HP 1–2 |
| 2 · Verdant | Greens | 2-1 → 2-5 | HP escalates to 3; first unbreakable shield |
| 3 · Ember | Oranges/Reds | 3-1 → 3-5 | Dense 4–5 ring layouts, HP 3–4 |
| 4 · Neon | Pinks/Purples | 4-1 → 4-5 | Fortress configurations, HP 4–5 |
| 5 · Void | Deep indigos | 5-1 → 5-5 | Maximum density, HP 5–7; final level: 5-5 Vortex |

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

If you push changes to `index.html`, bump the `CACHE_NAME` version string in `sw.js` (e.g. `vortex-v2` → `vortex-v3`). This forces players' browsers to fetch the new version instead of serving the stale cached file.

## Built with

Vanilla JavaScript + HTML5 Canvas. No frameworks, no build tools, no dependencies.

## Changelog

### v2 — June 2026

**Bug fixes**
- SLOW and FAST power-ups were permanently modifying ball speed instead of reverting when they expired; both now correctly restore speed on timeout
- Ball was not repositioned after a brick collision, allowing it to hit the same brick on consecutive frames and drain multi-HP bricks far too quickly; ball is now pushed outside the brick's radial band after each bounce
- MULTI power-up sourced clone balls from a sticky ball's stale pre-stick velocity, causing clones to immediately fly into the outer wall or (if velocity was zero) freeze in place and softlock the game; clones now use a synthesised inward direction when spawned from a stuck ball
- On life loss, lingering sticky balls were retained alongside the new respawn ball, giving the player an unintended free extra ball; the ball list is now fully reset on each life deduction
- Paddle gradient was built using `Object.values(polar(...))` spread, which relies on JS object property insertion order — replaced with explicit coordinate access
- `touchStartPos` variable was set on every touch event but never read anywhere; removed
- Service worker `clients.claim()` was called outside `event.waitUntil()`, creating a race where a newly claimed client could be served a stale cached asset before old caches finished deleting; chained into the `waitUntil` promise

**Features**
- Levels mode expanded from 5 to 25 curated levels across 5 themed worlds
- Ball speed scaling in levels mode reduced from 0.18 to 0.12 per level so early worlds remain approachable while World 5 still peaks at ~6.3 px/frame
- Keyboard controls: A/D and arrow keys rotate the paddle; Space launches the ball
