# CLAUDE.md — Piso 12: Ñejo El Broko en Pasto

## Project
Landing page for Piso 12, a reggaeton event producer from Pasto, Colombia.
Goal: promote the Ñejo El Broko concert and drive traffic to ticket sales.
Static promotional site — no auth, no CMS, no e-commerce.

## Event data (confirmed)
- Artist: Ñejo El Broko
- Presenter: Piso 12 Perreo
- Date: 25 de Abril — 9:00 PM COT
- ISO: 2026-04-25T21:00:00-05:00
- Venue: C.E. Andino — Calle 11 # 38-91, frente a Unicentro, Pasto, Nariño
- Tickets: mundoboletos.com
- Contact: 305-206-5963 / 317-686-7949
- Guests: RESET (artista invitado), EWOOD, ORDD

## Ticket tiers — NEVER modify tier names or omit "+servicio"
| Tier | Zone | Launch | Preventa | Full |
|------|------|--------|----------|------|
| MAMISONGA | General | $50.000+servicio | $65.000+servicio | $75.000+servicio |
| UN CALL | VIP — aforo limitado | $70.000+servicio | $85.000+servicio | $95.000+servicio |
| MI ESTILO DE VIDA | Palco 10 pax + botella | $1'500.000+servicio | $1'600.000+servicio | $1'800.000+servicio |

---

## Tech stack
- Framework: Astro (latest, static output) + React (latest) islands + TypeScript strict
- Styling: Tailwind CSS (latest)
- Animation: Framer Motion (latest) + Lenis (latest, smooth scroll)
- 3D: Three.js (latest)
- Deploy: Vercel
- Package manager: pnpm always — never npm or yarn

## Setup
```bash
pnpm create astro@latest . -- --template minimal --typescript strict --no-git
pnpm add react react-dom @astrojs/react
pnpm add three @types/three
pnpm add framer-motion
pnpm add @studio-freight/lenis
pnpm add -D tailwindcss @astrojs/tailwind autoprefixer
pnpm add @astrojs/vercel
```

---

## Architecture — Hexagonal (lightweight for static site)

### Dependency rule
ui → application → domain ← infrastructure
Never import ui into domain. Never call external services directly from components.

### Directory structure
```
src/
├── domain/
│   ├── entities/          # interfaces: Event, TicketTier, Artist
│   └── constants/         # single source of truth for all event data
├── application/
│   └── hooks/             # pure hooks — no JSX, no styling
├── infrastructure/
│   └── analytics/         # GA4 (future)
└── ui/
    ├── components/
    │   ├── Hero/
    │   │   ├── HeroSection.tsx    # composes canvas + overlay only
    │   │   ├── HeroCanvas.tsx     # Three.js ONLY — zero text/layout
    │   │   └── HeroOverlay.tsx    # text/CTA ONLY — zero Three.js
    │   ├── Countdown/
    │   │   └── CountdownTimer.tsx
    │   ├── Lineup/
    │   │   ├── LineupSection.tsx
    │   │   └── ArtistCard.tsx     # reusable — receives Artist type
    │   ├── Tickets/
    │   │   ├── TicketsSection.tsx
    │   │   └── TicketCard.tsx     # reusable — receives TicketTier type
    │   ├── Venue/
    │   │   └── VenueSection.tsx
    │   ├── Footer/
    │   │   └── Footer.tsx
    │   └── shared/
    │       ├── SectionWrapper.tsx  # Framer Motion scroll reveal — used by ALL sections
    │       ├── SectionHeading.tsx  # consistent section titles
    │       └── Button.tsx          # reusable CTA button
    ├── layouts/
    │   └── Layout.astro
    └── pages/
        └── index.astro
```

---

## Design system

### Aesthetic
Chrome liquid + deep black. Y2K urban latino, premium production feel.
Extension of the Piso 12 logo identity: liquid chrome 3D on absolute black + 4-point chrome stars.
NEVER hardcode hex values in components — always use theme tokens.

### Color tokens
| Token | Value | Tailwind class |
|-------|-------|----------------|
| void | #060608 | bg-void / text-void |
| surface | #0E0E12 | bg-surface |
| surface-2 | #16161C | bg-surface-2 |
| chrome | #C8C8D4 | text-chrome |
| chrome-bright | #EEEEF5 | text-chrome-bright |
| chrome-dim | #888896 | text-chrome-dim |
| accent-red | #E8173A | text-accent-red / bg-accent-red |
| accent-yellow | #F5C842 | text-accent-yellow / bg-accent-yellow |

### Typography tokens
| Token | Font | Usage |
|-------|------|-------|
| font-display | Playfair Display, serif | Artist name only |
| font-heading | Barlow Condensed, sans-serif | Sections, dates, labels |
| font-body | Barlow, sans-serif | Body, descriptions |

### tailwind.config.mjs
```js
export default {
  content: ['./src/**/*.{astro,tsx,ts}'],
  theme: {
    extend: {
      colors: {
        void: '#060608',
        surface: '#0E0E12',
        'surface-2': '#16161C',
        chrome: '#C8C8D4',
        'chrome-bright': '#EEEEF5',
        'chrome-dim': '#888896',
        'accent-red': '#E8173A',
        'accent-yellow': '#F5C842',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        heading: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
}
```

### global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&family=Barlow+Condensed:wght@300;400;700;900&family=Barlow:wght@300;400&display=swap');

:root {
  --color-void: #060608;
  --color-surface: #0E0E12;
  --color-surface-2: #16161C;
  --color-chrome: #C8C8D4;
  --color-chrome-bright: #EEEEF5;
  --color-chrome-dim: #888896;
  --color-accent-red: #E8173A;
  --color-accent-yellow: #F5C842;
  --color-border: rgba(200,200,212,0.12);
}

html { scroll-behavior: smooth; }
body { background: var(--color-void); color: var(--color-chrome); overflow-x: hidden; }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--color-void); }
::-webkit-scrollbar-thumb { background: var(--color-chrome-dim); border-radius: 2px; }

.tabular-nums { font-variant-numeric: tabular-nums; }
.chrome-asset { mix-blend-mode: screen; }
```

---

## Assets
First phase uses placeholders for all images.
When real assets are provided, all PNGs will have solid black backgrounds —
use mix-blend-mode: screen so black becomes transparent on dark layouts.

Expected assets (placeholders for now):
- Piso 12 logo (chrome version) — nav + hero
- Piso 12 logo (mono version) — footer
- Chrome sparkle decorations — hero
- Artist photo (Ñejo) — lineup section

```tsx
// When real assets arrive, always apply:
<img src="/images/logo.png" className="chrome-asset" />
// chrome-asset = mix-blend-mode: screen
```

---

## Component rules

### HeroCanvas.tsx — Three.js ONLY
- No text, no layout, no framer-motion
- Full-screen canvas, position absolute, inset-0
- 4000 chrome particles — HSL(220, 5%, 60–90%)
- Slow drift + scene.rotation.y += 0.00008 per frame
- Fog: THREE.FogExp2(0x060608, 0.025)
- Camera: PerspectiveCamera fov 60, z=6
- Cleanup on unmount: renderer.dispose(), geometry.dispose(), material.dispose()

### HeroOverlay.tsx — Text/CTA ONLY
- No Three.js imports
- Position absolute, inset-0, z-10, flex col, items-center, justify-center
- "PISO 12 PERREO PRESENTA" — font-heading, tracking-[0.3em], text-chrome-dim
- "ÑEJO" — font-display italic, clamp(80px, 18vw, 200px), text-chrome-bright
- "EL BROKO" — font-heading 900, clamp(20px, 5vw, 56px), tracking-[0.2em]
- "25 DE ABRIL · C.E. ANDINO · PASTO" — font-body 300, tracking-[0.25em], text-chrome-dim
- CTA "COMPRAR BOLETAS" → href mundoboletos.com, target _blank
- Sparkle placeholders top-right and bottom-left

### useCountdown.ts — pure hook
- No JSX, no styling, no ui/ imports
- Target: EVENT.dateISO
- Returns: { days, hours, minutes, seconds }
- Cleanup interval on unmount

### CountdownTimer.tsx
- Uses useCountdown hook
- 4 units: DÍAS · HORAS · MINUTOS · SEGUNDOS
- font-heading 900, tabular-nums, text-chrome-bright
- Border-y border-[--color-border], bg-surface

### TicketCard.tsx
- Receives TicketTier from domain/entities
- Always show all 3 price phases (launch / preventa / full)
- ALWAYS append "+servicio" — never display price without it
- Tier names are brand names — never translate or modify

### SectionWrapper.tsx
- Used by every section without exception
- whileInView: opacity 0→1, y 50→0
- transition: duration 0.8, ease [0.16, 1, 0.3, 1]
- viewport: once true, margin -60px

### ArtistCard.tsx
- Receives Artist type from domain/entities
- Placeholder image when no real asset available
- Badge shows role: "Artista Invitado" (accent-yellow) / "DJ" (chrome-dim)

---

## Astro client directives
- HeroSection → client:only="react" (Three.js breaks on SSR)
- CountdownTimer → client:only="react" (needs runtime Date)
- All other sections → client:visible (hydrate on scroll)

---

## SEO (Layout.astro)
- title: "Ñejo El Broko en Pasto — 25 de Abril | Piso 12 Perreo"
- description: "Ñejo El Broko en vivo. 25 de Abril, C.E. Andino, Pasto. Boletas en mundoboletos.com"
- og:title, og:description, og:image (placeholder), og:type: website
- JSON-LD Event schema with full event data from domain/constants
- One h1 per page, logical heading hierarchy

---

## Implementation order
1. tailwind.config.mjs + global.css
2. domain/entities/ (types)
3. domain/constants/ (event data)
4. application/hooks/useCountdown.ts
5. ui/components/shared/ (Button, SectionWrapper, SectionHeading)
6. ui/layouts/Layout.astro
7. HeroCanvas → HeroOverlay → HeroSection
8. CountdownTimer
9. ArtistCard → LineupSection
10. TicketCard → TicketsSection
11. VenueSection
12. Footer
13. index.astro
14. pnpm build → fix ALL errors before done
