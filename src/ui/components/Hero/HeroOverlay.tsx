import { motion } from 'framer-motion';
import { Button } from '../shared/Button.js';
import { EVENT, PRESENTED_BY_LINE } from '../../../domain/constants/index.js';

/** Multi-layer halo so light text reads on chrome / bright video */
const SHADOW_DISPLAY = {
  textShadow:
    '0 0 2px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 4px 28px rgba(0,0,0,0.75), 0 8px 48px rgba(0,0,0,0.55)',
} as const;

const SHADOW_HEADING = {
  textShadow:
    '0 0 2px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.88), 0 4px 20px rgba(0,0,0,0.7)',
} as const;

const SHADOW_DETAIL = {
  textShadow:
    '0 0 1px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.95), 0 2px 14px rgba(0,0,0,0.85), 0 4px 24px rgba(0,0,0,0.65)',
} as const;

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

// The outermost wrapper controls ALL opacity — nothing is visible before the delay fires.
// Children only animate their y position so the stagger is visible; fading is parent-driven.
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.5,
    },
  },
} as const;

const itemUp = {
  hidden: { y: 32 },
  show: { y: 0, transition: { duration: 1.4, ease: HEAVY_EASE } },
} as const;

const itemHero = {
  hidden: { y: 55, scale: 0.96 },
  show: { y: 0, scale: 1, transition: { duration: 1.7, ease: HEAVY_EASE } },
} as const;

const itemBtn = {
  hidden: { scale: 0.85 },
  show: { scale: 1, transition: { duration: 0.9, ease: [0.34, 1.4, 0.64, 1] } },
} as const;

function heroDateShort(): string {
  return EVENT.date.split('—')[0]?.trim() ?? EVENT.date;
}

function heroTime(): string {
  return (EVENT.date.split('—')[1] ?? '').replace(/\s*COT$/, '').trim();
}

export function HeroOverlay() {
  return (
    /**
     * Single motion root — video plays clean for 1.5s, then everything fades in
     * as one cinematic unit. Corners carry the technical data; the center only
     * holds the title and the CTA so the sculpture can breathe behind it.
     */
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.9, ease: HEAVY_EASE }}
    >
      {/* Cinematic edge vignettes — top / bottom bars of darkness */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.85), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.92), transparent)' }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-1 flex h-full w-full flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── Top: producers, tiny, centered ── */}
        <motion.p
          className="pt-7 text-center font-heading text-[10px] font-light tracking-[0.42em] text-chrome uppercase md:pt-9 md:text-xs"
          style={SHADOW_DETAIL}
          variants={itemUp}
        >
          {PRESENTED_BY_LINE}
        </motion.p>

        {/* ── Center: title block ── */}
        <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
          {/* Soft dark core so the title reads over the bright sculpture */}
          <div className="relative w-full max-w-5xl">
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[min(70vh,560px)] w-[min(150vw,900px)] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(ellipse 62% 90% at 50% 50%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 34%, rgba(0,0,0,0.2) 56%, transparent 80%)',
                filter: 'blur(28px)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-1">
              <motion.h1
                className="font-display text-foreground-dark italic leading-[0.95]"
                style={{ fontSize: 'clamp(52px, 13vw, 168px)', ...SHADOW_DISPLAY }}
                variants={itemHero}
              >
                HALLOWEEN
              </motion.h1>

              <motion.div
                className="mx-auto mt-3 flex max-w-xl items-center gap-4 md:mt-5"
                variants={itemUp}
                aria-hidden="true"
              >
                <span className="hairline flex-1" />
                <span
                  className="font-heading text-sm font-medium tracking-[0.5em] text-foreground-dark uppercase md:text-xl"
                  style={SHADOW_HEADING}
                >
                  Noche&nbsp;Macabra
                </span>
                <span className="hairline flex-1" />
              </motion.div>

              <motion.div className="mt-10 pointer-events-auto md:mt-12" variants={itemBtn}>
                <Button
                  href={EVENT.ticketUrl}
                  target="_blank"
                  variant="primary"
                  size="lg"
                  aria-label="Comprar boletas para Halloween en Pasto"
                >
                  Comprar boletas
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Bottom: technical data left / scroll cue center / time right ── */}
        <motion.div
          className="flex items-end justify-between gap-4 px-5 pb-6 md:px-10 md:pb-8"
          style={SHADOW_DETAIL}
          variants={itemUp}
        >
          <div className="space-y-1 text-left font-heading text-[10px] font-light tracking-[0.3em] text-chrome uppercase md:text-xs">
            <p className="text-foreground-dark">{heroDateShort()}</p>
            <p>Pasto</p>
            <p>{EVENT.venue}</p>
          </div>

          <div className="hidden flex-col items-center gap-2 pb-1 md:flex" aria-hidden="true">
            <span className="font-heading text-[9px] font-light tracking-[0.5em] text-chrome-dim uppercase">
              Scroll
            </span>
            <span className="relative block h-12 w-px overflow-hidden bg-chrome/15">
              <span
                className="absolute left-0 h-full w-full bg-chrome/70"
                style={{ animation: 'scroll-cue 2.6s cubic-bezier(0.16,1,0.3,1) infinite' }}
              />
            </span>
          </div>

          <div className="space-y-1 text-right font-heading text-[10px] font-light tracking-[0.3em] text-chrome uppercase md:text-xs">
            <p className="text-foreground-dark">{heroTime()}</p>
            <p>{EVENT.ageRestriction}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
