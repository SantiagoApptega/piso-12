import type { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  scheme?: 'dark' | 'light';
  isDisabled?: boolean;
  target?: '_blank' | '_self';
  rel?: string;
  className?: string;
  'aria-label'?: string;
}

const VARIANT_CLASSES: Record<
  NonNullable<ButtonProps['variant']>,
  Record<NonNullable<ButtonProps['scheme']>, string>
> = {
  primary: {
    dark: 'bg-accent text-accent-foreground hover:opacity-90 focus:ring-accent active:scale-95',
    light: 'bg-accent text-accent-foreground hover:opacity-90 focus:ring-accent active:scale-95',
  },
  secondary: {
    dark: 'border border-chrome text-foreground-dark hover:border-foreground-dark hover:text-foreground-dark focus:ring-chrome active:scale-95',
    light: 'border border-foreground-light/30 text-foreground-light hover:border-foreground-light focus:ring-foreground-light/30 active:scale-95',
  },
  ghost: {
    dark: 'text-chrome hover:text-foreground-dark focus:ring-chrome active:scale-95',
    light: 'text-foreground-light/60 hover:text-foreground-light focus:ring-foreground-light/30 active:scale-95',
  },
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm tracking-widest',
  md: 'px-8 py-3 text-sm tracking-[0.2em]',
  lg: 'px-12 py-4 text-base tracking-[0.25em]',
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  scheme = 'dark',
  isDisabled = false,
  target,
  rel,
  className = '',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const ringOffset =
    scheme === 'dark' ? 'focus:ring-offset-void' : 'focus:ring-offset-background';

  const baseClasses = `inline-flex items-center justify-center font-heading font-700 uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringOffset} disabled:opacity-40 disabled:pointer-events-none min-h-[44px]`;

  const classes = [
    baseClasses,
    VARIANT_CLASSES[variant][scheme],
    SIZE_CLASSES[size],
    className,
  ].join(' ');

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
