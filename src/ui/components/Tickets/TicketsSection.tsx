import { motion } from 'framer-motion';
import type { TicketTier } from '../../../domain/entities/index.js';
import { EVENT, TICKET_TIERS } from '../../../domain/constants/index.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

const reveal = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: HEAVY_EASE } },
} as const;

function splitPriceDisplay(price: string): { main: string; suffix: string | null } {
  const i = price.indexOf('+');
  if (i === -1) return { main: price, suffix: null };
  return { main: price.slice(0, i), suffix: price.slice(i) };
}

function PriceValue({ price, size }: { price: string; size: 'lg' | 'sm' }) {
  const { main, suffix } = splitPriceDisplay(price);
  return (
    <span className="inline-flex flex-wrap items-baseline justify-end gap-x-1">
      <span
        className={`font-heading font-semibold tabular-nums leading-none ${
          size === 'lg' ? 'text-2xl md:text-4xl' : 'text-sm'
        }`}
      >
        {main}
      </span>
      {suffix ? (
        <span
          className={`font-body font-light leading-none opacity-70 ${
            size === 'lg' ? 'text-[11px] md:text-xs' : 'text-[10px]'
          }`}
        >
          {suffix}
        </span>
      ) : null}
    </span>
  );
}

/** One access level — the whole row is the buy link */
function TierRow({ tier, index }: { tier: TicketTier; index: number }) {
  return (
    <motion.li variants={reveal}>
      <a
        href={EVENT.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Comprar boleta ${tier.name} — ${tier.zone}`}
        className="group relative block overflow-hidden py-8 transition-colors duration-300 md:py-10"
        style={{ borderBottom: '1px solid var(--color-border-dark)' }}
      >
        {/* Accent bar that grows on hover */}
        <span
          className="absolute top-0 bottom-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-y-100"
          aria-hidden="true"
        />
        {/* Row light-up */}
        <span
          className="absolute inset-0 bg-surface-dark opacity-0 transition-opacity duration-300 group-hover:opacity-60"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-5 px-1 md:grid-cols-12 md:gap-6 md:px-5">
          {/* Name + zone */}
          <div className="md:col-span-6">
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-[10px] font-light tabular-nums tracking-[0.35em] text-chrome-dim md:text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3
                className="font-heading font-semibold uppercase leading-none text-foreground-dark transition-colors duration-300"
                style={{ fontSize: 'clamp(26px, 4.6vw, 52px)', letterSpacing: '0.02em' }}
              >
                {tier.name}
              </h3>
            </div>
            <p className="mt-2 pl-8 font-heading text-[10px] font-light tracking-[0.35em] text-chrome uppercase md:pl-10 md:text-xs">
              {tier.zone}
            </p>
          </div>

          {/* Prices — launch dominant, other phases as micro data */}
          <div className="flex items-end justify-between gap-6 pl-8 md:col-span-4 md:flex-col md:items-end md:gap-2 md:pl-0">
            <div className="text-left text-foreground-dark md:text-right">
              <p className="mb-1 font-heading text-[9px] font-light tracking-[0.4em] text-accent uppercase">
                Lanzamiento
              </p>
              <PriceValue price={tier.pricing.launch} size="lg" />
            </div>
            <div className="space-y-1 text-right text-chrome-dim">
              <p className="font-body text-[11px] font-light tracking-wide">
                Preventa <PriceValue price={tier.pricing.preventa} size="sm" />
              </p>
              <p className="font-body text-[11px] font-light tracking-wide">
                Full <PriceValue price={tier.pricing.full} size="sm" />
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pl-8 md:col-span-2 md:pl-0 md:text-right">
            <span className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-chrome-dim px-5 font-heading text-xs tracking-[0.3em] text-foreground-dark uppercase transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground md:w-auto">
              Comprar
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </a>
    </motion.li>
  );
}

export function TicketsSection() {
  return (
    <section id="boletas" className="relative overflow-hidden bg-void py-16 md:py-24">
      {/* Warm pool of light behind the rows — the only warm zone of the page */}
      <div
        className="pointer-events-none absolute top-[10%] left-[-25%] h-[70%] w-[60%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(232,93,4,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-6xl px-6 md:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div className="mb-8 md:mb-12" variants={reveal}>
          <p className="mb-4 font-heading text-[10px] font-light tracking-[0.45em] text-accent uppercase md:text-xs">
            Boletas
          </p>
          <h2
            className="font-display leading-[1.04] text-foreground-dark"
            style={{ fontSize: 'clamp(34px, 5.6vw, 76px)' }}
          >
            Elige cómo
            <br />
            vivir la noche.
          </h2>
        </motion.div>

        <motion.ul
          className="relative"
          style={{ borderTop: '1px solid var(--color-border-dark)' }}
          variants={reveal}
        >
          {TICKET_TIERS.map((tier, index) => (
            <TierRow key={tier.name} tier={tier} index={index} />
          ))}
        </motion.ul>

        <motion.p
          className="mt-8 font-body text-xs font-light tracking-wide text-chrome-dim"
          variants={reveal}
        >
          Precios incluyen cargo por servicio. Sujetos a disponibilidad.
        </motion.p>
      </motion.div>
    </section>
  );
}
