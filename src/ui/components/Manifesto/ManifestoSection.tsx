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
  const ledger: Array<{ label: string; value: string }> = [
    { label: 'Producción', value: `${EVENT.presenter} · ${EVENT.coProducers.join(' · ')}` },
    { label: 'Fecha', value: '31.10.26 — 9:00 PM' },
    { label: 'Lugar', value: EVENT.venueShort },
    { label: 'Ciudad', value: 'Pasto, Nariño — CO' },
  ];

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

        <div className="hairline mt-5 mb-10 md:mb-12" aria-hidden="true" />

        {/* Statement left · copy + data ledger right — no dead zones */}
        <div className="grid items-stretch gap-10 md:grid-cols-12 md:gap-8">
          <motion.h2
            className="font-display leading-[1.04] text-foreground-dark md:col-span-7"
            style={{ fontSize: 'clamp(38px, 6.4vw, 88px)' }}
            variants={reveal}
          >
            Cuando cae
            <br />
            la noche,
            <br />
            <span className="text-liquid-chrome">Pasto cambia</span>
            <br />
            de cara.
          </motion.h2>

          <motion.div
            className="flex flex-col justify-between gap-8 md:col-span-5"
            variants={reveal}
          >
            <p className="font-body text-sm font-light leading-relaxed tracking-wide text-chrome md:text-base">
              Halloween — Noche Macabra: el perreo más oscuro del año. Una sola
              noche para bajar al Centro de Eventos Andino y no volver a ser el
              mismo.
            </p>

            <dl>
              {ledger.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 py-3"
                  style={{ borderBottom: '1px solid var(--color-border-dark)' }}
                >
                  <dt className="shrink-0 font-heading text-[10px] font-light tracking-[0.4em] text-chrome-dim uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-right font-heading text-xs font-medium tracking-[0.12em] text-foreground-dark uppercase md:text-sm">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
