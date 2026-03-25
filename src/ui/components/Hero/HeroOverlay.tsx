import { useState, useEffect } from 'react';
import { Button } from '../shared/Button.js';
import { EVENT } from '../../../domain/constants/index.js';

export function HeroOverlay() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
      {/* Sparkle top-right */}
      <span
        className="asset-screen absolute top-12 right-8 md:top-16 md:right-16 w-12 h-12 md:w-20 md:h-20 text-chrome select-none"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* Sparkle bottom-left */}
      <span
        className="asset-screen absolute bottom-24 left-8 md:bottom-32 md:left-16 w-8 h-8 md:w-14 md:h-14 text-chrome select-none"
        aria-hidden="true"
      >
        ✦
      </span>

      {/* Content block — hidden until 2s, then fade-in-hero animation */}
      <div className={isVisible ? 'fade-in-hero pointer-events-auto' : 'opacity-0 pointer-events-none'}>
        <p className="font-heading text-xs md:text-sm tracking-[0.3em] uppercase text-chrome mb-4">
          {EVENT.presenter} presenta
        </p>

        <h1
          className="font-display italic text-foreground-dark leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 200px)' }}
        >
          Ñejo
        </h1>

        <p
          className="font-heading font-black text-foreground-dark tracking-[0.2em] uppercase leading-none"
          style={{ fontSize: 'clamp(20px, 5vw, 56px)' }}
        >
          El Broko
        </p>

        <p className="font-body font-light tracking-[0.25em] uppercase text-chrome mt-6 text-xs md:text-sm">
          25 de Abril · {EVENT.venue} · Pasto
        </p>

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
  );
}
