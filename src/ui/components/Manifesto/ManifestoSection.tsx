import { motion } from 'framer-motion';
import { EVENT } from '../../../domain/constants/index.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

/** Venue coordinates — same point the map embed uses */
const VENUE_COORDS = '1.216507° N — 77.289560° W';

const reveal = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: HEAVY_EASE } },
} as const;

export function ManifestoSection() {
  return (
    <section id="manifiesto" className="relative overflow-hidden bg-abyss py-16 md:py-24">
      {/* Cold chrome light leaking from the top-left corner */}
      <div
        className="pointer-events-none absolute top-[-30%] left-[-15%] h-[60%] w-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(200,200,212,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-6 md:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Technical micro header */}
        <motion.div
          className="flex items-baseline justify-between gap-4 font-heading text-[10px] font-light tracking-[0.35em] text-chrome-dim uppercase md:text-xs"
          variants={reveal}
        >
          <span className="text-accent">31.10.26</span>
          <span className="hidden sm:inline">{VENUE_COORDS}</span>
          <span>Pasto — CO</span>
        </motion.div>

        <div className="hairline mt-5 mb-10 md:mb-14" aria-hidden="true" />

        {/* Statement — pure typography, no imagery */}
        <motion.div variants={reveal}>
          <h2
            className="font-display leading-[1.04] text-foreground-dark"
            style={{ fontSize: 'clamp(38px, 6.4vw, 88px)' }}
          >
            Cuando cae
            <br />
            la noche,
            <br />
            <span className="text-liquid-chrome">Pasto cambia</span>
            <br />
            de cara.
          </h2>

          <p className="mt-10 max-w-md font-body text-sm font-light leading-relaxed tracking-wide text-chrome md:text-base">
            Halloween — Noche Macabra. Una sola noche en el Centro de Eventos
            Andino, producida por {EVENT.presenter} junto a{' '}
            {EVENT.coProducers.join(', ')}.
          </p>

          <p className="mt-14 font-heading text-[9px] font-light tracking-[0.35em] text-chrome-dim uppercase md:mt-20">
            {EVENT.venue} · {VENUE_COORDS}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
