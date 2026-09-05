import { AnimatePresence, motion } from 'framer-motion';
import { useCountdown } from '../../../application/hooks/useCountdown.js';

const HEAVY_EASE = [0.16, 1, 0.3, 1] as const;

interface UnitProps {
  value: number;
  label: string;
}

/* All four units share the same scale — the row fills the full width */
function Unit({ value, label }: UnitProps) {
  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      {/* Clip container so digits slide in/out without overflow */}
      <div className="overflow-hidden" style={{ lineHeight: 0.92 }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            className="block font-heading font-semibold tabular-nums leading-[0.92] text-liquid-chrome"
            style={{ fontSize: 'clamp(56px, 14vw, 190px)' }}
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

function Divider() {
  return (
    <span
      className="mb-6 hidden w-px self-stretch md:block"
      style={{ background: 'var(--color-border-dark)' }}
      aria-hidden="true"
    />
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section id="countdown" className="relative overflow-hidden bg-void py-14 md:py-20">
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
        {/* Header: statement left, technical data right */}
        <motion.div
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: HEAVY_EASE }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            className="font-display leading-[1.05] text-foreground-dark"
            style={{ fontSize: 'clamp(28px, 4.2vw, 54px)' }}
          >
            La noche despierta{' '}
            <span className="font-heading text-[0.45em] font-light tracking-[0.5em] text-chrome-dim uppercase">
              en
            </span>
          </h2>
          <p className="font-heading text-[10px] font-light tracking-[0.35em] text-chrome-dim uppercase md:text-xs">
            31.10.26 · 9:00 PM · C.E. Andino, Pasto
          </p>
        </motion.div>

        <div className="hairline mt-5 mb-8 md:mt-6 md:mb-10" aria-hidden="true" />

        {/* Four equal units spanning the full width */}
        <motion.div
          className="flex items-end justify-between gap-2 md:gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: HEAVY_EASE }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <Unit value={days} label="Días" />
          <Divider />
          <Unit value={hours} label="Horas" />
          <Divider />
          <Unit value={minutes} label="Min" />
          <Divider />
          <Unit value={seconds} label="Seg" />
        </motion.div>
      </div>
    </section>
  );
}
