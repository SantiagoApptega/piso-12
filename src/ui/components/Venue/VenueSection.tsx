import { motion } from 'framer-motion';
import { EVENT } from '../../../domain/constants/index.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: HEAVY_EASE } },
} as const;

function eventDateParts(): { date: string; time: string } {
  const [datePart, timePart] = EVENT.date.split('—').map((s) => s.trim());
  return {
    date: `${datePart} 2026`,
    time: (timePart ?? '').replace(/\s*COT$/, ''),
  };
}

export function VenueSection() {
  const { date, time } = eventDateParts();

  const details: Array<{ label: string; value: string }> = [
    { label: 'Fecha', value: date },
    { label: 'Hora', value: time },
    { label: 'Ciudad', value: 'Pasto, Nariño' },
    { label: 'Edad', value: EVENT.ageRestriction },
  ];

  return (
    <section id="venue" className="relative overflow-hidden bg-abyss py-24 md:py-36">
      <motion.div
        className="relative mx-auto max-w-6xl px-6 md:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Left: stacked venue name + integrated data */}
          <motion.div className="flex flex-col md:col-span-5" variants={reveal}>
            <p className="mb-4 font-heading text-[10px] font-light tracking-[0.45em] text-accent uppercase md:text-xs">
              Lugar
            </p>
            <h2
              className="font-heading font-semibold uppercase leading-[0.94] text-liquid-chrome"
              style={{ fontSize: 'clamp(44px, 6.6vw, 88px)', letterSpacing: '0.01em' }}
            >
              Centro de
              <br />
              Eventos
              <br />
              Andino
            </h2>

            <p className="mt-6 max-w-xs font-body text-sm font-light leading-relaxed tracking-wide text-chrome">
              {EVENT.venueAddress}
            </p>

            {/* Data integrated as a hairline ledger — no cards */}
            <dl className="mt-10 md:mt-auto md:pt-10">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 py-3"
                  style={{ borderBottom: '1px solid var(--color-border-dark)' }}
                >
                  <dt className="font-heading text-[10px] font-light tracking-[0.4em] text-chrome-dim uppercase">
                    {item.label}
                  </dt>
                  <dd className="font-heading text-base font-medium tracking-[0.08em] text-foreground-dark uppercase md:text-lg">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Right: map, dark-treated, tall */}
          <motion.div className="md:col-span-7" variants={reveal}>
            <div
              className="relative h-[320px] w-full overflow-hidden md:h-full md:min-h-[560px]"
              style={{ border: '1px solid var(--color-border-dark)' }}
            >
              <iframe
                src="https://maps.google.com/maps?q=1.216507,-77.28956&z=17&output=embed"
                className="absolute inset-0 h-full w-full"
                style={{
                  border: 0,
                  filter: 'invert(0.92) hue-rotate(180deg) grayscale(0.4) contrast(0.92) brightness(0.92)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${EVENT.venue}, Pasto`}
              />
              {/* Edge fade so the map sinks into the black */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  boxShadow: 'inset 0 0 90px 30px rgba(8,8,8,0.85)',
                }}
                aria-hidden="true"
              />
              <span className="absolute bottom-3 left-3 bg-void/80 px-3 py-1.5 font-heading text-[9px] font-light tracking-[0.4em] text-chrome uppercase">
                1.216507, -77.289560 — Frente a Unicentro
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
