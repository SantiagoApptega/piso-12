import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { EVENT } from '../../../domain/constants/index.js';

export function VenueSection() {
  return (
    <SectionWrapper id="venue" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Lugar"
          title={EVENT.venue}
          subtitle={EVENT.venueAddress}
          scheme="light"
        />

        {/* Google Maps embed */}
        <div className="w-full mb-8 overflow-hidden" style={{ border: '1px solid var(--color-border-light)' }}>
          <iframe
            src="https://maps.google.com/maps?q=1.216507,-77.28956&z=17&output=embed"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'grayscale(20%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Centro de Eventos Andino, Pasto"
          />
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
