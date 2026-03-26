/** Infinite horizontal text ticker — pure CSS, no JS required at runtime */
const STRIP_TEXT =
  'ÑEJO EL BROKO\u2003·\u2003PASTO\u2003·\u200325 ABRIL\u2003·\u2003Centro de Eventos Andino\u2003·\u2003PISO 12\u2003·\u2003';

// Repeat enough times so the strip always spans wider than any viewport
const SINGLE = STRIP_TEXT.repeat(5);

export function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden bg-void py-3 select-none"
      style={{
        borderTop: '1px solid var(--color-border-dark)',
        borderBottom: '1px solid var(--color-border-dark)',
      }}
      aria-hidden="true"
    >
      {/* Two identical copies — marquee-x translates by -50%, creating a seamless loop */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-x 32s linear infinite' }}
      >
        <span className="font-heading text-[10px] tracking-[0.38em] uppercase text-chrome/45">
          {SINGLE}
        </span>
        <span
          className="font-heading text-[10px] tracking-[0.38em] uppercase text-chrome/45"
          aria-hidden="true"
        >
          {SINGLE}
        </span>
      </div>
    </div>
  );
}
