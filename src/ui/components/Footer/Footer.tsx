import { EVENT } from '../../../domain/constants/index.js';
import { PASSTIX_CREDIT_URL } from '../../../lib/constants.js';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-void px-6 py-10 md:py-12"
      style={{ borderTop: '1px solid var(--color-border-dark)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <img
              src="/assets/brand/logo-chrome.png"
              alt="Piso 12 Perreo"
              width={360}
              height={140}
              className="asset-screen h-auto w-[min(220px,78vw)] max-w-full object-contain object-left md:w-[260px]"
            />
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
            </ul>
          </nav>
        </div>

        <div
          className="mt-8 flex flex-col items-center gap-6 pt-4"
          style={{ borderTop: '1px solid var(--color-border-dark)' }}
        >
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center font-body text-xs font-light text-chrome md:text-left">
              © {currentYear} . Todos los derechos reservados.
            </p>
            <p className="text-center font-body text-xs font-light text-chrome md:text-right">
              Pasto, Nariño — Colombia
            </p>
          </div>
          <p className="text-center font-body text-[10px] font-light tracking-[0.28em] text-chrome/55 uppercase">
            Desarrollado por{' '}
            <span className="font-heading text-chrome">PASSTIX</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
