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
    <section id="manifiesto" className="relative overflow-hidden bg-abyss py-28 md:py-40">
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

        <div className="hairline mt-5 mb-14 md:mb-20" aria-hidden="true" />

        <div className="grid items-end gap-12 md:grid-cols-12 md:gap-8">
          {/* Statement */}
          <motion.div className="md:col-span-8" variants={reveal}>
            <h2
              className="font-display italic leading-[1.04] text-foreground-dark"
              style={{ fontSize: 'clamp(38px, 6.4vw, 88px)' }}
            >
              Cuando cae
              <br />
              la noche,
              <br />
              <span className="text-liquid-chrome not-italic">Pasto cambia</span>
              <br />
              de cara.
            </h2>

            <p className="mt-10 max-w-md font-body text-sm font-light leading-relaxed tracking-wide text-chrome md:text-base">
              Halloween — Noche Macabra. Una sola noche en el Centro de Eventos
              Andino, producida por {EVENT.presenter} junto a{' '}
              {EVENT.coProducers.join(', ')}.
            </p>
          </motion.div>

          {/* Macro detail of the chrome sculpture — campaign-style frame */}
          <motion.figure className="md:col-span-4 md:justify-self-end" variants={reveal}>
            <div
              className="relative w-full max-w-[280px] overflow-hidden md:max-w-[300px]"
              style={{
                aspectRatio: '3 / 4',
                border: '1px solid var(--color-border-dark)',
              }}
            >
              <video
                className="h-full w-full object-cover"
                style={{ filter: 'grayscale(100%) contrast(1.12) brightness(0.8)' }}
                src="/assets/videos/pitbull_chain.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 40%)',
                }}
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 font-heading text-[9px] font-light tracking-[0.4em] text-chrome uppercase">
                Fig. 01 — Chrome
              </span>
            </div>
            <figcaption className="mt-3 font-heading text-[9px] font-light tracking-[0.35em] text-chrome-dim uppercase">
              {EVENT.venue} · {VENUE_COORDS}
            </figcaption>
          </motion.figure>
        </div>
      </motion.div>
    </section>
  );
}
