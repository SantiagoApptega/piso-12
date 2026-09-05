# CLAUDE.md — Piso 12: Halloween en Pasto

## Project
Landing page for Piso 12, an event producer from Pasto, Colombia.
Goal: promote "Halloween en Pasto", a Halloween party co-produced by Piso 12
together with JFW, ARKHES and GEN, and drive traffic to ticket sales.
Static promotional site — no auth, no CMS, no e-commerce.

## Event data (confirmed)
- Presenter: Piso 12
- Co-producers: JFW, ARKHES, GEN
- Date: 31 de Octubre — 9:00 PM COT
- ISO: 2026-10-31T21:00:00-05:00
- Venue: Centro de eventos ANDINO — Calle 11 # 38-91, frente a Unicentro, Pasto, Nariño
- Tickets: mundoboletos.com (TODO: real ticket URL pending — see `ticketUrl` in `domain/constants`)
- Contact: 305-206-5963 / 317-686-7949
- Lineup: flat list of DJs, no headliner. Current names in `domain/constants` are
  placeholders (DJ HEX, DJ VOID, DJ PHANTOM, DJ NECRO) — pending confirmed line-up.

## Ticket tiers — NEVER modify tier names or omit "+servicio"
| Tier | Zone | Launch | Preventa | Full |
|------|------|--------|----------|------|
| ALMA EN PENA | General | $50.000+servicio | $65.000+servicio | $75.000+servicio |
| PACTO CON EL DIABLO | VIP — aforo limitado | $70.000+servicio | $85.000+servicio | $95.000+servicio |
| CASTILLO EMBRUJADO | Palco 10 pax + botella | $1'500.000+servicio | $1'600.000+servicio | $1'800.000+servicio |

---

## Tech stack
- Framework: Astro 6 (static output) + React 19 islands + TypeScript strict
- Styling: Tailwind CSS 4 via `@tailwindcss/vite` — no `tailwind.config.mjs`; all theme
  tokens live in `src/styles/global.css` under the `@theme { ... }` block (CSS-first config)
- Animation: Framer Motion
- 3D: Three.js
- Deploy: Vercel
- Package manager: pnpm always — never npm or yarn

---

## Architecture — Hexagonal (lightweight for static site)

### Dependency rule
ui → application → domain ← infrastructure
Never import ui into domain. Never call external services directly from components.

### Directory structure
```
src/
├── domain/
│   ├── entities/          # interfaces: Event, Artist, TicketTier, CostumeCategory
│   └── constants/         # single source of truth for all event data
├── application/
│   └── hooks/             # pure hooks — no JSX, no styling (useCountdown)
├── lib/
│   └── constants.ts       # misc constants (hero video timing, placeholders, credit URL)
└── ui/
    ├── components/
    │   ├── Hero/
    │   │   ├── HeroSection.tsx      # composes video + canvas + overlay only
    │   │   ├── HeroCanvas.tsx       # Three.js ONLY — zero text/layout
    │   │   └── HeroOverlay.tsx      # text/CTA ONLY — zero Three.js
    │   ├── Countdown/
    │   │   └── CountdownTimer.tsx   # "La noche despierta en" — asymmetric editorial layout
    │   ├── Manifesto/
    │   │   └── ManifestoSection.tsx # fashion-campaign atmosphere section
    │   ├── Lineup/
    │   │   └── LineupSection.tsx    # editorial vertical list + hover portrait reveal
    │   ├── Experiences/
    │   │   └── ExperiencesSection.tsx # 60/40 giant blocks: costume contest + masks
    │   ├── Tickets/
    │   │   └── TicketsSection.tsx   # access-level rows — no pricing cards
    │   ├── Venue/
    │   │   └── VenueSection.tsx     # stacked chrome title + dark map + hairline ledger
    │   ├── FinalCta/
    │   │   └── FinalCtaSection.tsx  # full-width closer, ghosted sculpture video
    │   ├── Footer/
    │   │   └── Footer.tsx           # minimal, centered, pure black
    │   └── shared/
    │       ├── StickyCta.tsx        # mobile-only buy bar (appears after hero)
    │       └── Button.tsx           # reusable CTA button — dark scheme only
    └── layouts/
        └── Layout.astro
src/pages/
└── index.astro
```

### Page flow (index.astro)
Hero → Countdown → Manifesto → Lineup → Experiences → Tickets → Venue → Final CTA → Footer
(+ StickyCta fixed overlay on mobile). There is NO marquee/ticker and NO light sections.

---

## Design system

### Aesthetic — BLACK + CHROME + MACABRE + NIGHTCLUB + EDITORIAL
Dark luxury / macabre club / liquid chrome. The whole page is near-black; sections
separate through lighting (radial glow pools), hairline dividers, texture and scale —
NEVER through alternating white/black backgrounds. The chrome dog sculpture video is
the visual signature: hero protagonist, macro detail in the Manifesto, ghosted texture
in the Final CTA. Orange is reserved for CTAs and micro details. Violet appears only in
particles and secondary glows. Subtle film-grain overlay sits on everything.

Never: childish Halloween, pumpkins, cobwebs, generic ghosts, orange floods, white
cards, SaaS pricing cards, EDM-festival clichés.

### Color tokens — ALWAYS use theme tokens, NEVER hardcode hex
| Token | Value | Tailwind class | Used in |
|-------|-------|----------------|---------|
| void | #050505 | bg-void | base background (hero, countdown, lineup, tickets, final, footer) |
| abyss | #080808 | bg-abyss | alternating dark sections (manifesto, experiences, venue) |
| surface-dark | #0D0D0D | bg-surface-dark | raised dark surfaces |
| foreground-dark | #F2F2F0 | text-foreground-dark | primary text |
| accent | #E85D04 (orange) | text-accent / bg-accent | CTAs + micro labels ONLY |
| accent-foreground | #0A0A0A | text-accent-foreground | text on accent bg |
| accent-secondary | #7C3AED (eerie violet) | bg-accent-secondary | particles, secondary glows |
| chrome | #C8C8D4 | text-chrome | secondary text |
| chrome-dim | #8A8A96 | text-chrome-dim | tertiary text / micro labels |
| border-dark | rgba(200,200,212,0.10) | inline var(--color-border-dark) | borders |

Utility classes in global.css:
- `.text-liquid-chrome` — silver gradient clipped to glyphs (big display text)
- `.hairline` — 1px chrome divider that fades at both ends
- `scroll-cue` keyframes — hero scroll indicator

### Typography tokens — editorial contrast: huge type + microtype
| Token | Font | Usage |
|-------|------|-------|
| font-display | Playfair Display, serif (roman + italic) | HALLOWEEN, section statements ("La noche despierta", "Elige cómo vivir la noche.") |
| font-heading | Oswald, condensed sans | numbers, prices, labels, secondary headlines, DJ names |
| font-body | Barlow, sans-serif | body, descriptions |

Micro-labels: font-heading light, 9–12px, tracking 0.3em–0.5em, uppercase, chrome-dim.

### Assets
- Logo: /assets/brand/logo.webp (+ logo-negro.webp, logo-chrome.png) — use `.asset-screen`
- Lineup placeholder: /assets/placeholder/dj.jpg — used when an `Artist.imageUrl` isn't set
- Video: /assets/videos/pitbull_chain.mp4 — chrome sculpture. Hero background (custom loop),
  Manifesto macro frame (grayscale filter), Final CTA ghost layer (grayscale + dark overlay).
  Iconic Piso 12 brand asset — kept across events regardless of theme.

---

## Component rules

### HeroSection.tsx
- Full viewport: h-[100svh] min-h-[560px] on ALL breakpoints
- Video loops between HERO_VIDEO_LOOP_START_SEC / END_SEC (lib/constants)

### HeroCanvas.tsx — Three.js ONLY
- No text, no layout, no framer-motion
- 200 particles, duotone orange/violet, slow drift + flicker
- WebGLRenderer creation wrapped in try/catch — a WebGL failure must never
  crash the hero island
- Cleanup on unmount: renderer.dispose(), geometry.dispose(), material.dispose()

### HeroOverlay.tsx — Text/CTA ONLY
- No Three.js imports
- Composition: producers micro-line top center · HALLOWEEN (font-display italic,
  clamp 52px–168px) + hairline + "NOCHE MACABRA" + orange CTA center · technical
  data in bottom corners (date/city/venue left — time/age right) · scroll cue
  bottom center (desktop only)
- All text carries layered black text-shadows to read over the bright sculpture

### useCountdown.ts — pure hook
- No JSX, no styling, no ui/ imports; target EVENT.dateISO; cleanup on unmount

### CountdownTimer.tsx — own section, not a strip
- "La noche despierta en" serif statement left; DÍAS is the dominant oversized figure
  right; hairline divider; horas/min/seg as a secondary right-aligned row
- Digits use `.text-liquid-chrome`, AnimatePresence popLayout slide on change

### ManifestoSection.tsx
- Atmosphere only — no invented facts. Technical micro header (31.10.26 / coords /
  Pasto — CO), serif statement "Cuando cae la noche, Pasto cambia de cara.",
  producers line from EVENT, sculpture video in a 3/4 framed figure with caption

### LineupSection.tsx
- Editorial numbered list (01–04) over ARTISTS — big Oswald names, hover/focus turns
  number orange + name liquid-chrome and reveals the artist portrait in a side panel
  (desktop only, grayscale treatment). Mobile: plain stacked list

### ExperiencesSection.tsx
- Replaces the old Costumes section. Title "La noche tiene sus propias reglas."
- Two giant blocks (3/5 + 2/5): Concurso de Disfraces (violet glow, real prize copy
  from COSTUME_CONTEST_PRIZE + categories as micro-tags) and Experiencia de Máscaras
  (chrome glow, aspirational copy only — no invented mechanics)

### TicketsSection.tsx — access levels, not pricing cards
- Title "Elige cómo vivir la noche." Each tier is a full-width row and the whole row
  links to EVENT.ticketUrl; hover lights the row + grows an orange left bar
- Always show all 3 price phases (launch dominant / preventa / full)
- ALWAYS append "+servicio" — never display price without it
- Tier names are brand names — never translate or modify

### VenueSection.tsx
- Stacked "CENTRO DE EVENTOS ANDINO" in liquid chrome left, tall dark-treated map
  right (invert + hue-rotate filter + inset shadow fade), event data as a hairline
  ledger (dl) — no detail cards

### FinalCtaSection.tsx
- Full-width closer: ghosted sculpture video under radial black, "31.10.26",
  "Una noche. Una ciudad. Ninguna cara conocida.", orange CTA

### StickyCta.tsx
- Mobile only (md:hidden). Appears after scrolling past ~85% of the viewport,
  hides while #final-cta or footer are on screen (IntersectionObserver)

### Motion rules
- Sections own their reveals: whileInView opacity/y with ease [0.16, 1, 0.3, 1],
  viewport { once: true, margin: '-60px' }, subtle stagger
- No scroll hijacking, no constant floating elements, nothing that delays purchase

---

## Astro client directives
- HeroSection → client:only="react" (Three.js breaks on SSR)
- CountdownTimer → client:only="react" (needs runtime Date)
- StickyCta → client:idle (needs scroll position early)
- All other sections → client:visible (hydrate on scroll)

---

## SEO (Layout.astro)
- title: "Halloween en Pasto — 31 de Octubre | Piso 12"
- description: "Halloween en Piso 12. 31 de Octubre, C.E. Andino, Pasto. Un evento de JFW, ARKHES, GEN y Piso 12."
- og:title, og:description, og:image (placeholder — /images/og-cover.jpg does not exist yet,
  needs a real OG image), og:type: website
- JSON-LD `SocialEvent` schema (not `MusicEvent` — there's no single musical headliner),
  `organizer` is an array covering Piso 12 + the 3 co-producers
- One h1 per page, logical heading hierarchy

---

## Implementation order
1. global.css (`@theme` tokens — no tailwind.config.mjs in this project)
2. domain/entities/ (types)
3. domain/constants/ (event data)
4. application/hooks/useCountdown.ts
5. ui/components/shared/ (Button, StickyCta)
6. ui/layouts/Layout.astro
7. HeroCanvas → HeroOverlay → HeroSection
8. CountdownTimer
9. ManifestoSection
10. LineupSection
11. ExperiencesSection
12. TicketsSection
13. VenueSection
14. FinalCtaSection
15. Footer
16. src/pages/index.astro
17. pnpm build → fix ALL errors before done
