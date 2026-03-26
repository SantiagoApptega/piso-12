import type { TicketTier } from '../../../domain/entities/index.js';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

export interface TicketCardProps {
  tier: TicketTier;
  isFeatured?: boolean;
}

export function TicketCard({ tier, isFeatured = false }: TicketCardProps) {
  return (
    <article
      className={`relative flex flex-col p-8 transition-all duration-200 ${
        isFeatured
          ? 'bg-surface-light ring-1 ring-foreground-light/20 scale-[1.02]'
          : 'bg-background'
      }`}
      style={{ border: isFeatured ? undefined : '1px solid var(--color-border-light)' }}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground font-heading text-[10px] tracking-[0.3em] uppercase px-4 py-1">
          Popular
        </span>
      )}

      <h3 className="font-heading font-black text-2xl tracking-[0.08em] uppercase text-foreground-light mb-1">
        {tier.name}
      </h3>

      <p className="font-body font-light text-sm text-foreground-light/50 mb-8 tracking-wide">
        {tier.zone}
      </p>

      <div className="flex flex-col gap-4 mb-8 flex-1">
        <PriceLine label="Lanzamiento" price={tier.pricing.launch} isHighlighted />
        <PriceLine label="Preventa" price={tier.pricing.preventa} />
        <PriceLine label="Precio lleno" price={tier.pricing.full} />
      </div>

      <Button
        href={EVENT.ticketUrl}
        target="_blank"
        variant={isFeatured ? 'primary' : 'secondary'}
        size="md"
        scheme="light"
        className="w-full"
        aria-label={`Comprar boleta ${tier.name} — ${tier.zone}`}
      >
        Comprar
      </Button>
    </article>
  );
}

interface PriceLineProps {
  label: string;
  price: string;
  isHighlighted?: boolean;
}

function splitPriceDisplay(price: string): { main: string; suffix: string | null } {
  const i = price.indexOf('+');
  if (i === -1) return { main: price, suffix: null };
  return { main: price.slice(0, i), suffix: price.slice(i) };
}

function PriceLine({ label, price, isHighlighted = false }: PriceLineProps) {
  const { main, suffix } = splitPriceDisplay(price);
  const valueTone = isHighlighted ? 'text-foreground-light' : 'text-foreground-light/50';

  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3">
      <span
        className={`shrink-0 font-heading text-xs tracking-[0.2em] uppercase ${
          isHighlighted ? 'text-foreground-light/80' : 'text-foreground-light/50'
        }`}
      >
        {label}
      </span>
      <span
        className={`inline-flex min-w-0 max-w-full flex-wrap items-baseline justify-end gap-x-1 text-right ${valueTone}`}
      >
        <span className="font-heading text-base leading-none font-black tabular-nums md:text-lg">{main}</span>
        {suffix ? (
          <span className="font-body text-[11px] font-medium leading-none opacity-75 md:text-xs">{suffix}</span>
        ) : null}
      </span>
    </div>
  );
}
