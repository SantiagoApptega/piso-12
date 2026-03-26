import { motion } from 'framer-motion';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

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
// Children only animate their y/scale position so the stagger is visible; fading is parent-driven.
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 1.5, // children start same moment the parent fade begins
    },
  },
} as const;

// Y-only stagger — no per-child opacity (parent handles the fade as one unit)
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

export function HeroOverlay() {
  return (
    /**
     * Single motion root — starts fully transparent, fades in at 1.5s.
     * This means: video plays clean for 1.5s, then backdrop + text appear together.
     * The stagger is visible through the y-slide of each element.
     */
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.9, ease: HEAVY_EASE }}
    >
      {/* Viñeta global suave */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 92% 78% at 50% 48%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 48%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      {/* Stagger timing container */}
      <motion.div
        className="relative z-1 w-full max-w-4xl pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Halo ancho */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(178vw,1040px)] max-w-[1040px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(96vh, 820px)',
            background:
              'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.36) 38%, rgba(0,0,0,0.18) 54%, rgba(0,0,0,0.07) 68%, transparent 86%)',
            filter: 'blur(48px)',
          }}
          aria-hidden="true"
        />
        {/* Núcleo */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(142vw,820px)] max-w-[820px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(84vh, 680px)',
            background:
              'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 16%, rgba(0,0,0,0.52) 32%, rgba(0,0,0,0.26) 48%, rgba(0,0,0,0.1) 62%, transparent 82%)',
            filter: 'blur(24px)',
          }}
          aria-hidden="true"
        />
        {/* Refuerzo superior */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(120vw,700px)] max-w-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(64vh, 520px)',
            background:
              'radial-gradient(ellipse 10% 100% at 50% 42%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 40%, transparent 72%)',
            filter: 'blur(18px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-1 px-2">
          <motion.p
            className="mb-4 font-heading text-xs tracking-[0.3em] text-chrome uppercase md:text-sm"
            style={SHADOW_DETAIL}
            variants={itemUp}
          >
            {EVENT.presenter} presenta
          </motion.p>

          <motion.h1
            className="font-display text-foreground-dark italic leading-none"
            style={{ fontSize: 'clamp(72px, 17vw, 200px)', ...SHADOW_DISPLAY }}
            variants={itemHero}
          >
            Ñejo
          </motion.h1>

          <motion.p
            className="font-heading font-black tracking-[0.2em] text-foreground-dark uppercase leading-none"
            style={{ fontSize: 'clamp(20px, 5vw, 56px)', ...SHADOW_HEADING }}
            variants={itemUp}
          >
            El Broko
          </motion.p>

          <motion.div
            className="mt-6 space-y-1 text-center font-body text-xs font-light tracking-[0.25em] text-chrome uppercase md:text-sm"
            style={SHADOW_DETAIL}
            variants={itemUp}
          >
            <p className="leading-snug">Pasto - {heroDateShort()}</p>
            <p className="leading-snug">{EVENT.venue}</p>
          </motion.div>

          <motion.div className="mt-10 pointer-events-auto" variants={itemBtn}>
            <Button
              href={EVENT.ticketUrl}
              target="_blank"
              variant="primary"
              size="lg"
              scheme="dark"
              aria-label="Comprar boletas para Ñejo El Broko en Pasto"
            >
              Comprar boletas
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
