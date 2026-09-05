import { motion } from 'framer-motion';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: HEAVY_EASE } },
} as const;

/** Last visual hit before the footer — the chrome sculpture returns, abstracted */
export function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-void"
    >
      {/* Cold chrome + faint violet pools of light — no imagery, just atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 78% 18%, rgba(200,200,212,0.07) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 12% 88%, rgba(124,58,237,0.06) 0%, transparent 62%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-1 mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.p
          className="mb-6 font-heading text-xs font-light tracking-[0.5em] text-accent uppercase md:text-sm"
          variants={reveal}
        >
          31.10.26
        </motion.p>

        <motion.h2
          className="font-display italic leading-[1.02] text-foreground-dark"
          style={{
            fontSize: 'clamp(40px, 7.4vw, 104px)',
            textShadow: '0 2px 24px rgba(0,0,0,0.8)',
          }}
          variants={reveal}
        >
          Una noche.
          <br />
          Una ciudad.
          <br />
          <span className="text-liquid-chrome not-italic font-heading font-semibold uppercase tracking-[0.02em]">
            Ninguna cara conocida.
          </span>
        </motion.h2>

        <motion.div className="mt-12 md:mt-14" variants={reveal}>
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
      </motion.div>
    </section>
  );
}
