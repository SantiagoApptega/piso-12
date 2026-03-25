export interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  scheme?: 'dark' | 'light';
}

export function SectionHeading({
  label,
  title,
  subtitle,
  as: Tag = 'h2',
  align = 'center',
  scheme = 'light',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  const titleClass =
    scheme === 'dark' ? 'text-foreground-dark' : 'text-foreground-light';
  const subtitleClass = scheme === 'dark' ? 'text-chrome' : 'text-foreground-light/60';

  return (
    <div className={`mb-12 ${alignClass}`}>
      {label && (
        <p className="font-heading text-xs tracking-[0.4em] uppercase text-accent mb-3">
          {label}
        </p>
      )}
      <Tag
        className={`font-heading font-black text-4xl md:text-5xl lg:text-6xl tracking-[0.05em] uppercase ${titleClass}`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className={`font-body font-light text-base mt-4 max-w-xl mx-auto ${subtitleClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
