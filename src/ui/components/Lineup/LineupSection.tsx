import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ARTISTS } from '../../../domain/constants/index.js';
import type { Artist } from '../../../domain/entities/index.js';
import { LINEUP_ARTIST_PLACEHOLDER_IMAGE } from '../../../lib/constants.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
} as const;

const rowVariants = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: HEAVY_EASE } },
} as const;

function artistImage(artist: Artist): string {
  return artist.imageUrl ?? LINEUP_ARTIST_PLACEHOLDER_IMAGE;
}

function roleLabel(artist: Artist): string {
  return artist.role === 'guest' ? 'Artista Invitado' : 'DJ Set';
}

export function LineupSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="lineup" className="relative overflow-hidden bg-void py-24 md:py-36">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Editorial header */}
        <motion.div
          className="mb-14 flex items-end gap-6 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: HEAVY_EASE }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            className="font-display leading-[0.9] text-foreground-dark"
            style={{ fontSize: 'clamp(48px, 9vw, 120px)' }}
          >
            Line
            <span className="text-chrome-dim">—</span>up
          </h2>
          <span className="hairline mb-4 hidden flex-1 md:block" aria-hidden="true" />
          <p className="mb-3 hidden font-heading text-[10px] font-light tracking-[0.4em] text-chrome-dim uppercase md:block">
            Cabina · 31.10.26
          </p>
        </motion.div>

        <div className="relative grid gap-0 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          {/* The list */}
          <motion.ol
            className="relative z-1"
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            onMouseLeave={() => setActive(null)}
          >
            {ARTISTS.map((artist, i) => {
              const isActive = active === i;
              return (
                <motion.li key={artist.name} variants={rowVariants}>
                  <div
                    className="group flex cursor-default items-baseline gap-5 py-5 transition-colors duration-300 md:gap-8 md:py-7"
                    style={{ borderBottom: '1px solid var(--color-border-dark)' }}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <span
                      className={`font-heading text-xs font-light tabular-nums tracking-[0.3em] transition-colors duration-300 md:text-sm ${
                        isActive ? 'text-accent' : 'text-chrome-dim'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <h3
                      className={`font-heading font-semibold uppercase leading-none transition-all duration-300 ${
                        isActive ? 'text-liquid-chrome' : 'text-foreground-dark'
                      }`}
                      style={{
                        fontSize: 'clamp(34px, 7vw, 72px)',
                        letterSpacing: '0.02em',
                        textShadow: isActive ? '0 0 42px rgba(200,200,212,0.25)' : 'none',
                      }}
                    >
                      {artist.name}
                    </h3>

                    <span className="ml-auto hidden font-heading text-[10px] font-light tracking-[0.35em] text-chrome-dim uppercase md:inline">
                      {roleLabel(artist)}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>

          {/* Portrait reveal — desktop only, floats to the right of the list */}
          <div
            className="pointer-events-none relative hidden items-center justify-end md:flex"
            aria-hidden="true"
          >
            <div
              className="relative w-[78%] max-w-[360px] overflow-hidden"
              style={{ aspectRatio: '4 / 5', border: '1px solid var(--color-border-dark)' }}
            >
              <AnimatePresence mode="wait">
                {active !== null ? (
                  <motion.img
                    key={ARTISTS[active].name}
                    src={artistImage(ARTISTS[active])}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ filter: 'grayscale(85%) contrast(1.1) brightness(0.85)' }}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: HEAVY_EASE }}
                  />
                ) : (
                  <motion.div
                    key="idle"
                    className="absolute inset-0 flex items-center justify-center bg-surface-dark"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <span className="font-heading text-[10px] font-light tracking-[0.5em] text-chrome-dim uppercase">
                      Noche Macabra
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 45%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
