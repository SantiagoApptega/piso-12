import { EVENT } from '../../../domain/constants/index.js';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-void py-16 px-6"
      style={{ borderTop: '1px solid var(--color-border-dark)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo placeholder */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-heading font-black text-2xl tracking-[0.2em] uppercase text-foreground-dark">
              Piso 12
            </span>
            <span className="font-body font-light text-xs text-chrome tracking-widest uppercase">
              Perreo
            </span>
          </div>

          {/* Event details */}
          <div className="text-center">
            <p className="font-heading font-black text-sm tracking-[0.15em] uppercase text-foreground-dark mb-1">
              {EVENT.name}
            </p>
            <p className="font-body font-light text-xs text-chrome">
              {EVENT.date} · {EVENT.venue}
            </p>
          </div>

          {/* Contact */}
          <nav aria-label="Contacto">
            <ul className="flex flex-col items-center md:items-end gap-2">
              {EVENT.contacts.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="font-body text-sm text-chrome hover:text-foreground-dark transition-colors duration-200 focus:outline-none focus:underline"
                    aria-label={`Llamar al ${phone}`}
                  >
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={EVENT.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-heading text-xs tracking-[0.25em] uppercase text-accent hover:text-foreground-dark transition-colors duration-200 focus:outline-none focus:underline mt-2 inline-block"
                  aria-label="Comprar boletas en mundoboletos.com"
                >
                  mundoboletos.com
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border-dark)' }}
        >
          <p className="font-body font-light text-xs text-chrome">
            © {currentYear} {EVENT.presenter}. Todos los derechos reservados.
          </p>
          <p className="font-body font-light text-xs text-chrome">
            Pasto, Nariño — Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
