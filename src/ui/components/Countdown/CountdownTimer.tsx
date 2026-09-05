import { AnimatePresence, motion } from 'framer-motion';
import { useCountdown } from '../../../application/hooks/useCountdown.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

interface UnitProps {
  value: number;
  label: string;
  /** Days read bigger — the row is intentionally asymmetric */
  isPrimary?: boolean;
}

function Unit({ value, label, isPrimary = false }: UnitProps) {
  const padded = String(value).padStart(2, '0');
  const sizeStyle = {
    fontSize: isPrimary ? 'clamp(64px, 17vw, 200px)' : 'clamp(44px, 11vw, 132px)',
  } as const;

  return (
    <div className={`flex flex-col ${isPrimary ? 'items-start' : 'items-start'}`}>
      {/* Clip container so digits slide in/out without overflow */}
      <div className="overflow-hidden" style={{ lineHeight: 0.92 }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            className="block font-heading font-semibold tabular-nums leading-[0.92] text-liquid-chrome"
            style={sizeStyle}
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.35, ease: HEAVY_EASE }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 font-heading text-[9px] font-light tracking-[0.45em] text-chrome-dim uppercase md:mt-3 md:text-[11px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section id="countdown" className="relative overflow-hidden bg-void py-24 md:py-36">
      {/* Faint violet pool of light, bottom-right — separates the section without borders */}
      <div
        className="pointer-events-none absolute right-[-20%] bottom-[-40%] h-[70%] w-[70%]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-6">
          {/* Serif statement, left */}
          <motion.h2
            className="font-display text-foreground-dark leading-[1.02]"
            style={{ fontSize: 'clamp(36px, 6vw, 76px)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: HEAVY_EASE }}
            viewport={{ once: true, margin: '-60px' }}
          >
            La noche
            <br />
            despierta
            <br />
            <span className="text-chrome-dim font-heading text-[0.4em] font-light tracking-[0.6em] uppercase align-middle">
              en
            </span>
          </motion.h2>

          {/* The days — dominant figure, breathing alone */}
          <motion.div
            className="flex justify-start md:justify-end"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: HEAVY_EASE }}
            viewport={{ once: true, margin: '-60px' }}
          >
            <Unit value={days} label="Días" isPrimary />
          </motion.div>
        </div>

        <div className="hairline mt-10 md:mt-14" aria-hidden="true" />

        {/* Secondary row — hours / minutes / seconds as texture */}
        <motion.div
          className="mt-8 flex items-end justify-between gap-4 md:mt-10 md:justify-end md:gap-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.28, ease: HEAVY_EASE }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <p className="hidden max-w-[220px] pb-2 font-body text-xs font-light leading-relaxed tracking-wide text-chrome-dim md:block">
            31.10.26 — 9:00 PM.
            <br />
            Centro de Eventos Andino, Pasto.
          </p>
          <Unit value={hours} label="Horas" />
          <Unit value={minutes} label="Min" />
          <Unit value={seconds} label="Seg" />
        </motion.div>
      </div>
    </section>
  );
}
