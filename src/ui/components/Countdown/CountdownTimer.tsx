import { AnimatePresence, motion } from 'framer-motion';
import { useCountdown } from '../../../application/hooks/useCountdown.js';

interface UnitBlockProps {
  value: number;
  label: string;
}

function UnitBlock({ value, label }: UnitBlockProps) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Clip container so numbers slide in/out without overflow */}
      <div className="overflow-hidden" style={{ lineHeight: 1 }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={padded}
            className="font-heading font-black tabular-nums text-foreground-dark text-5xl md:text-7xl lg:text-8xl leading-none block"
            initial={{ y: '-60%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '60%', opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-heading text-[10px] md:text-xs tracking-[0.35em] uppercase text-chrome">
        {label}
      </span>
    </div>
  );
}

/** Separator that breathes in sync with the seconds ticking */
function Separator() {
  return (
    <motion.span
      className="font-heading font-black text-chrome text-4xl md:text-6xl leading-none self-start mt-2"
      animate={{ opacity: [1, 0.15, 1] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: 0.1,
      }}
    >
      :
    </motion.span>
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div
      className="border-t border-b text-foreground-dark bg-void py-12 md:py-16"
      style={{
        borderTopColor: 'var(--color-border-dark)',
        borderBottomColor: 'rgba(200,200,212,0.25)',
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <p className="font-heading text-xs tracking-[0.4em] uppercase text-accent text-center mb-8">
          Cuenta regresiva
        </p>
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <UnitBlock value={days} label="Días" />
          <Separator />
          <UnitBlock value={hours} label="Horas" />
          <Separator />
          <UnitBlock value={minutes} label="Minutos" />
          <Separator />
          <UnitBlock value={seconds} label="Segundos" />
        </div>
      </div>
    </div>
  );
}
