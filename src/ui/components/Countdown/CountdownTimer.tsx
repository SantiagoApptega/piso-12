import { useCountdown } from '../../../application/hooks/useCountdown.js';

interface UnitBlockProps {
  value: number;
  label: string;
}

function UnitBlock({ value, label }: UnitBlockProps) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-heading font-black tabular-nums text-foreground-dark text-5xl md:text-7xl lg:text-8xl leading-none">
        {padded}
      </span>
      <span className="font-heading text-[10px] md:text-xs tracking-[0.35em] uppercase text-chrome">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="font-heading font-black text-chrome text-4xl md:text-6xl leading-none self-start mt-2">
      :
    </span>
  );
}

export function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <div
      className="border-y text-foreground-dark bg-void py-12 md:py-16"
      style={{ borderColor: 'var(--color-border-dark)' }}
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
