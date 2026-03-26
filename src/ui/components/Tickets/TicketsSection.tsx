import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { TicketCard } from './TicketCard.js';
import { TICKET_TIERS } from '../../../domain/constants/index.js';

export function TicketsSection() {
  return (
    <SectionWrapper id="boletas" className="bg-surface-light px-6 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Boletas"
          title="Elige tu experiencia"
          subtitle="El tiempo que se va ya no regresa"
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
