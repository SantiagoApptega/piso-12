import { motion } from 'framer-motion';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function HeroOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
      {/* Sparkle top-right — screen blend for dark bg */}
      <span
        className="asset-screen absolute top-12 right-8 md:top-16 md:right-16 w-12 h-12 md:w-20 md:h-20 text-chrome select-none"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* Sparkle bottom-left */}
      <span
        className="asset-screen absolute bottom-24 left-8 md:bottom-32 md:left-16 w-8 h-8 md:w-14 md:h-14 text-chrome select-none"
        aria-hidden="true"
      >
        ✦
      </span>

      <motion.p
        className="font-heading text-xs md:text-sm tracking-[0.3em] uppercase text-chrome mb-4"
        {...FADE_UP}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {EVENT.presenter} presenta
      </motion.p>

      <motion.h1
        className="font-display italic text-foreground-dark leading-none"
        style={{ fontSize: 'clamp(80px, 18vw, 200px)' }}
        {...FADE_UP}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        Ñejo
      </motion.h1>

      <motion.p
        className="font-heading font-black text-foreground-dark tracking-[0.2em] uppercase leading-none"
        style={{ fontSize: 'clamp(20px, 5vw, 56px)' }}
        {...FADE_UP}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        El Broko
      </motion.p>

      <motion.p
        className="font-body font-light tracking-[0.25em] uppercase text-chrome mt-6 text-xs md:text-sm"
        {...FADE_UP}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        25 de Abril · {EVENT.venue} · Pasto
      </motion.p>

      <motion.div
        className="mt-10 pointer-events-auto"
        {...FADE_UP}
        transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
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
  );
}
