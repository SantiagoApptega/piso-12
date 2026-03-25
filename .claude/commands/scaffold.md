Build a complete new event landing from scratch:
1. Read CLAUDE.md fully — all event data, design system, and architecture are defined there
2. Run setup commands from CLAUDE.md to initialize the project
3. Build in phases — after each phase run pnpm build silently and fix all errors before continuing:
   PHASE 1 — tailwind.config.mjs + global.css
   PHASE 2 — domain/entities/ + domain/constants/ + application/hooks/
   PHASE 3 — ui/components/shared/ (Button, SectionWrapper, SectionHeading)
   PHASE 4 — ui/layouts/Layout.astro with full SEO + JSON-LD
   PHASE 5 — Hero (HeroCanvas → HeroOverlay → HeroSection)
   PHASE 6 — Countdown, Lineup, Tickets, Venue, Footer
   PHASE 7 — ui/pages/index.astro
   PHASE 8 — Final pnpm build, fix ALL remaining errors
4. Never hardcode hex values — always use theme tokens
5. Placeholders for all images unless assets exist in public/assets/
6. Report clean build confirmation when done
