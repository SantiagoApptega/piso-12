import { useState, useEffect } from 'react';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

/** Multi-layer halo so light text reads on chrome / bright video */
const SHADOW_DISPLAY = {
  textShadow:
    '0 0 2px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 4px 28px rgba(0,0,0,0.75), 0 8px 48px rgba(0,0,0,0.55)',
} as const;

const SHADOW_HEADING = {
  textShadow:
    '0 0 2px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.88), 0 4px 20px rgba(0,0,0,0.7)',
} as const;

const SHADOW_DETAIL = {
  textShadow:
    '0 0 1px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,0.95), 0 2px 14px rgba(0,0,0,0.85), 0 4px 24px rgba(0,0,0,0.65)',
} as const;

function heroDateShort(): string {
  return EVENT.date.split('—')[0]?.trim() ?? EVENT.date;
}

export function HeroOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
      {/* Viñeta global suave pero visible */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background:
            'radial-gradient(ellipse 92% 78% at 50% 48%, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 48%, transparent 68%)',
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-1 w-full max-w-4xl ${
          isVisible ? 'fade-in-hero pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Halo ancho */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(178vw,1040px)] max-w-[1040px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(96vh, 820px)',
            background:
              'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.36) 38%, rgba(0,0,0,0.18) 54%, rgba(0,0,0,0.07) 68%, transparent 86%)',
            filter: 'blur(48px)',
          }}
          aria-hidden="true"
        />
        {/* Núcleo */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(142vw,820px)] max-w-[820px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(84vh, 680px)',
            background:
              'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.78) 16%, rgba(0,0,0,0.52) 32%, rgba(0,0,0,0.26) 48%, rgba(0,0,0,0.1) 62%, transparent 82%)',
            filter: 'blur(24px)',
          }}
          aria-hidden="true"
        />
        {/* Refuerzo superior */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 z-0 w-[min(120vw,700px)] max-w-[700px] -translate-x-1/2 -translate-y-1/2"
          style={{
            height: 'min(64vh, 520px)',
            background:
              'radial-gradient(ellipse 10% 100% at 50% 42%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 40%, transparent 72%)',
            filter: 'blur(18px)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-1 px-2">
          <p
            className="mb-4 font-heading text-xs tracking-[0.3em] text-chrome uppercase md:text-sm"
            style={SHADOW_DETAIL}
          >
            {EVENT.presenter} presenta
          </p>

          <h1
            className="font-display text-foreground-dark italic leading-none"
            style={{ fontSize: 'clamp(72px, 17vw, 200px)', ...SHADOW_DISPLAY }}
          >
            Ñejo
          </h1>

          <p
            className="font-heading font-black tracking-[0.2em] text-foreground-dark uppercase leading-none"
            style={{ fontSize: 'clamp(20px, 5vw, 56px)', ...SHADOW_HEADING }}
          >
            El Broko
          </p>

          <div
            className="mt-6 space-y-1 text-center font-body text-xs font-light tracking-[0.25em] text-chrome uppercase md:text-sm"
            style={SHADOW_DETAIL}
          >
            <p className="leading-snug">Pasto - {heroDateShort()}</p>
            <p className="leading-snug">{EVENT.venueShort}</p>
          </div>

          <div className="mt-10">
            <Button
              href={EVENT.ticketUrl}
              target="_blank"
              variant="primary"
              size="lg"
              scheme="dark"
              aria-label="Comprar boletas para Ñejo El Broko en Pasto"
            >
              Comprar boletas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
