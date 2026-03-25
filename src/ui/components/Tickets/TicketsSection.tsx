import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { TicketCard } from './TicketCard.js';
import { TICKET_TIERS } from '../../../domain/constants/index.js';

export function TicketsSection() {
  return (
    <SectionWrapper id="boletas" className="py-24 md:py-32 px-6 bg-surface-light">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Boletas"
          title="Elige tu experiencia"
          subtitle="Todas las boletas disponibles en mundoboletos.com"
          scheme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TICKET_TIERS.map((tier, index) => (
            <TicketCard key={tier.name} tier={tier} isFeatured={index === 1} />
          ))}
        </div>

        <p className="text-center font-body font-light text-xs text-foreground-light/50 mt-8 tracking-wide">
          Precios incluyen cargo por servicio. Sujetos a disponibilidad.
        </p>
      </div>
    </SectionWrapper>
  );
}
