import { motion } from 'framer-motion';
import {
  COSTUME_CATEGORIES,
  COSTUME_CONTEST_PRIZE,
  TICKET_TIERS,
} from '../../../domain/constants/index.js';

/** Short zone labels for block 02 — tier data stays in domain/constants */
const ZONE_LABELS = ['General', 'VIP', 'Palcos'] as const;

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: HEAVY_EASE } },
} as const;

export function ExperiencesSection() {
  return (
    <section id="experiencias" className="relative overflow-hidden bg-abyss py-16 md:py-24">
      <motion.div
        className="relative mx-auto max-w-6xl px-6 md:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Header */}
        <motion.div className="mb-10 md:mb-14" variants={reveal}>
          <p className="mb-4 font-heading text-[10px] font-light tracking-[0.45em] text-accent uppercase md:text-xs">
            Experiencias
          </p>
          <h2
            className="font-display leading-[1.04] text-foreground-dark"
            style={{ fontSize: 'clamp(34px, 5.6vw, 76px)' }}
          >
            La noche tiene
            <br />
            sus propias reglas.
          </h2>
          <p className="mt-6 max-w-md font-body text-sm font-light leading-relaxed tracking-wide text-chrome">
            No solo vienes a bailar. Esa noche, quién eres es parte del show.
          </p>
        </motion.div>

        {/* Two large blocks — 60 / 40 */}
        <div className="grid gap-4 md:grid-cols-5 md:gap-5">
          {/* Concurso de disfraces — 60% */}
          <motion.article
            className="group relative flex min-h-[440px] flex-col justify-end overflow-hidden p-7 md:col-span-3 md:min-h-[540px] md:p-10"
            style={{ border: '1px solid var(--color-border-dark)' }}
            variants={reveal}
          >
            {/* Violet stage-light background */}
            <div
              className="absolute inset-0 bg-surface-dark transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{
                background:
                  'radial-gradient(ellipse 90% 70% at 15% 0%, rgba(124,58,237,0.16) 0%, rgba(13,13,13,1) 58%), #0D0D0D',
              }}
              aria-hidden="true"
            />
            {/* Giant ghost number */}
            <span
              className="pointer-events-none absolute -top-8 right-2 font-heading font-semibold leading-none text-foreground-dark/[0.05] select-none"
              style={{ fontSize: 'clamp(160px, 24vw, 320px)' }}
              aria-hidden="true"
            >
              01
            </span>

            <div className="relative">
              <p className="mb-3 font-heading text-[10px] font-light tracking-[0.45em] text-accent-secondary uppercase">
                01 — Competencia
              </p>
              <h3
                className="font-heading font-semibold uppercase leading-[0.95] text-foreground-dark"
                style={{ fontSize: 'clamp(34px, 5vw, 60px)' }}
              >
                Concurso
                <br />
                de disfraces
              </h3>
              <p className="mt-4 max-w-sm font-body text-lg font-light text-chrome md:text-xl">
                Tu personaje también entra a competir.
              </p>
              <p className="mt-4 max-w-md font-body text-sm font-light leading-relaxed tracking-wide text-chrome">
                {COSTUME_CONTEST_PRIZE}
              </p>

              <div className="hairline mt-6 mb-4" aria-hidden="true" />
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {COSTUME_CATEGORIES.map((category) => (
                  <li
                    key={category.title}
                    className="font-heading text-[10px] font-light tracking-[0.3em] text-chrome-dim uppercase"
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          {/* Localidades — 40%, whole block links to tickets */}
          <motion.article
            className="relative overflow-hidden md:col-span-2"
            style={{ border: '1px solid var(--color-border-dark)' }}
            variants={reveal}
          >
            <a
              href="#boletas"
              className="group flex min-h-[440px] flex-col justify-end p-7 md:min-h-[540px] md:p-10"
              aria-label="Ver boletas — localidades General, VIP y Palcos"
            >
              {/* Cold chrome background */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{
                  background:
                    'radial-gradient(ellipse 100% 60% at 85% 100%, rgba(200,200,212,0.1) 0%, rgba(8,8,8,1) 60%), #080808',
                }}
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute -top-8 right-2 font-heading font-semibold leading-none text-foreground-dark/[0.05] select-none"
                style={{ fontSize: 'clamp(160px, 24vw, 320px)' }}
                aria-hidden="true"
              >
                02
              </span>

              <div className="relative">
                <p className="mb-5 font-heading text-[10px] font-light tracking-[0.45em] text-chrome-dim uppercase">
                  02 — Localidades
                </p>

                <ul>
                  {ZONE_LABELS.map((label, i) => (
                    <li
                      key={label}
                      className="flex items-baseline justify-between gap-4 py-3"
                      style={{ borderBottom: '1px solid var(--color-border-dark)' }}
                    >
                      <span
                        className="font-heading font-semibold uppercase leading-none text-liquid-chrome"
                        style={{ fontSize: 'clamp(26px, 3.4vw, 40px)' }}
                      >
                        {label}
                      </span>
                      <span className="font-heading text-[9px] font-light tracking-[0.3em] text-chrome-dim uppercase">
                        {TICKET_TIERS[i]?.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-body text-sm font-light leading-relaxed tracking-wide text-chrome">
                  Cada zona es una forma distinta de vivir la noche.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-heading text-xs tracking-[0.3em] text-foreground-dark uppercase transition-colors duration-300 group-hover:text-accent">
                  Ver boletas
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </a>
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}
