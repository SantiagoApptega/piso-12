import type { Artist } from '../../../domain/entities/index.js';

export interface ArtistCardProps {
  artist: Artist;
}

const ROLE_BADGE: Record<Artist['role'], { label: string; classes: string }> = {
  headliner: {
    label: 'Artista Principal',
    classes: 'text-foreground-light border-foreground-light',
  },
  guest: {
    label: 'Artista Invitado',
    classes: 'text-accent border-accent',
  },
  dj: {
    label: 'DJ',
    classes: 'text-foreground-light/50 border-foreground-light/30',
  },
};

export function ArtistCard({ artist }: ArtistCardProps) {
  const badge = ROLE_BADGE[artist.role];
  const isHeadliner = artist.role === 'headliner';

  return (
    <article
      className={`flex flex-col items-center gap-4 ${isHeadliner ? 'col-span-full md:col-span-1' : ''}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-surface-light ${
          isHeadliner
            ? 'w-48 h-48 md:w-64 md:h-64 rounded-full'
            : 'w-32 h-32 md:w-40 md:h-40 rounded-full'
        }`}
        style={{ border: '1px solid var(--color-border-light)' }}
      >
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            width={isHeadliner ? 256 : 160}
            height={isHeadliner ? 256 : 160}
            className="asset-multiply w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-heading font-black text-foreground-light/40 text-3xl md:text-4xl uppercase">
              {artist.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        <h3
          className={`font-heading font-black uppercase tracking-[0.1em] ${
            isHeadliner
              ? 'text-2xl md:text-3xl text-foreground-light'
              : 'text-lg md:text-xl text-foreground-light/80'
          }`}
        >
          {artist.name}
        </h3>

        {/* Role badge */}
        <span
          className={`inline-block mt-2 font-heading text-[10px] tracking-[0.3em] uppercase px-3 py-1 border ${badge.classes}`}
        >
          {badge.label}
        </span>
      </div>
    </article>
  );
}
