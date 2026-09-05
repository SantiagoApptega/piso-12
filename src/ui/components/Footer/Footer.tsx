import { EVENT } from '../../../domain/constants/index.js';
import { PASSTIX_CREDIT_URL } from '../../../lib/constants.js';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-void px-6 pt-14 pb-10 md:px-10 md:pt-16 md:pb-12">
      <div className="mx-auto max-w-6xl">
        {/* Producers — text only, centered */}
        <div className="flex flex-col items-center gap-6">
          <p className="font-heading text-[10px] font-light tracking-[0.45em] text-chrome-dim uppercase">
            {EVENT.coProducers.join(' · ')} · {EVENT.presenter}
          </p>

          <nav aria-label="Contacto">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {EVENT.contacts.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="font-body text-xs font-light tracking-wide text-chrome transition-colors duration-200 hover:text-foreground-dark focus:outline-none focus-visible:underline"
                    aria-label={`Llamar al ${phone}`}
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="hairline mt-10 md:mt-12" aria-hidden="true" />

        {/* Legal line */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="font-body text-[11px] font-light tracking-wide text-chrome-dim">
            © {currentYear} — Todos los derechos reservados · Pasto, Nariño — Colombia ·{' '}
            {EVENT.ageRestriction}
          </p>
          <p className="font-heading text-[9px] font-light tracking-[0.4em] text-chrome-dim/70 uppercase">
            Desarrollado por{' '}
            <a
              href={PASSTIX_CREDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chrome transition-colors duration-200 hover:text-foreground-dark focus:outline-none focus-visible:underline"
            >
              PASSTIX
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
