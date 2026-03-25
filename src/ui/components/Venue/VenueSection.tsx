import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { EVENT } from '../../../domain/constants/index.js';

export function VenueSection() {
  const mapsQuery = encodeURIComponent(`${EVENT.venue}, ${EVENT.venueAddress}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <SectionWrapper id="venue" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Lugar"
          title={EVENT.venue}
          subtitle={EVENT.venueAddress}
          scheme="light"
        />

        {/* Map placeholder */}
        <div
          className="w-full aspect-video bg-surface-light flex items-center justify-center mb-8"
          style={{ border: '1px solid var(--color-border-light)' }}
          aria-label={`Mapa de ${EVENT.venue}`}
        >
          <div className="text-center">
            <p className="font-heading font-black text-lg tracking-widest uppercase text-foreground-light/40 mb-4">
              {EVENT.venue}
            </p>
            <p className="font-body font-light text-sm text-foreground-light/40 mb-6">
              {EVENT.venueAddress}
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-xs tracking-[0.25em] uppercase text-accent hover:text-foreground-light transition-colors duration-200 focus:outline-none focus:underline"
              aria-label={`Ver ${EVENT.venue} en Google Maps`}
            >
              Ver en Google Maps →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailCard label="Fecha" value="25 de Abril, 2026" />
          <DetailCard label="Hora" value="9:00 PM COT" />
          <DetailCard label="Lugar" value={`${EVENT.venue} — Pasto, Nariño`} />
        </div>
      </div>
    </SectionWrapper>
  );
}

interface DetailCardProps {
  label: string;
  value: string;
}

function DetailCard({ label, value }: DetailCardProps) {
  return (
    <div
      className="p-6 bg-background"
      style={{ border: '1px solid var(--color-border-light)' }}
    >
      <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-2">
        {label}
      </p>
      <p className="font-heading font-black text-lg md:text-xl text-foreground-light tracking-wide">
        {value}
      </p>
    </div>
  );
}
