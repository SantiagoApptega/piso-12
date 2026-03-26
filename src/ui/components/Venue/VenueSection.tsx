import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { EVENT } from '../../../domain/constants/index.js';

export function VenueSection() {
  return (
    <SectionWrapper id="venue" className="bg-background px-6 py-12 md:py-16">
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
            title={`${EVENT.venue}, Pasto`}
          />
        </div>

        <div className="grid grid-cols-2 items-stretch gap-3 md:grid-cols-4 md:gap-4 lg:gap-6">
          <DetailCard label="Fecha" value="25 de Abril, 2026" />
          <DetailCard label="Hora" value="9:00 PM" />
          <DetailCard label="Lugar" value={EVENT.venueShort} />
          <DetailCard label="Edad" value={EVENT.ageRestriction} />
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
      className="flex h-full flex-col bg-background px-3 py-3 md:px-4 md:py-4"
      style={{ border: '1px solid var(--color-border-light)' }}
    >
      <p className="mb-1 shrink-0 font-heading text-[10px] tracking-[0.28em] text-accent uppercase md:text-xs md:tracking-[0.3em]">
        {label}
      </p>
      <p className="font-heading text-base font-black leading-tight tracking-wide text-foreground-light text-balance md:text-lg">
        {value}
      </p>
    </div>
  );
}
