import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { ARTISTS } from '../../../domain/constants/index.js';
import type { Artist } from '../../../domain/entities/index.js';

interface HeadlinerCardProps {
  artist: Artist;
}

function HeadlinerCard({ artist }: HeadlinerCardProps) {
  return (
    <article className="relative overflow-hidden border-l-4 border-accent" style={{ aspectRatio: '2/3' }}>
      {artist.imageUrl ? (
        <img
          src={artist.imageUrl}
          alt={artist.name}
          width={600}
          height={900}
          className="absolute inset-0 w-full h-full object-cover asset-multiply"
        />
      ) : (
        <div className="absolute inset-0 bg-surface-light flex items-center justify-center">
          <span className="font-heading font-black text-foreground-light/20 text-8xl uppercase">
            {artist.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground-light/90 to-transparent px-6 pt-16 pb-6">
        <p className="font-heading text-[10px] tracking-[0.4em] uppercase text-accent mb-2">
          Artista Principal
        </p>
        <h3 className="font-heading font-black text-3xl md:text-4xl tracking-[0.06em] uppercase text-background leading-none">
          Ñejo El Broko
        </h3>
      </div>
    </article>
  );
}

interface SupportCardProps {
  artist: Artist;
}

function SupportCard({ artist }: SupportCardProps) {
  const isBadgeAccent = artist.role === 'guest';
  const badgeLabel = artist.role === 'guest' ? 'Artista Invitado' : 'DJ';
  const badgeClass = isBadgeAccent
    ? 'text-accent border-accent'
    : 'text-foreground-light/40 border-foreground-light/20';

  return (
    <article
      className="flex items-center gap-4 p-6 bg-surface-light"
      style={{ border: '1px solid var(--color-border-light)' }}
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-surface-2 flex-shrink-0 overflow-hidden flex items-center justify-center"
        style={{ border: '1px solid var(--color-border-light)' }}
      >
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            width={80}
            height={80}
            className="w-full h-full object-cover asset-multiply"
          />
        ) : (
          <span className="font-heading font-black text-foreground-light/30 text-2xl uppercase">
            {artist.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-heading font-black text-xl tracking-[0.08em] uppercase text-foreground-light mb-1">
          {artist.name}
        </h3>
        <span className={`font-heading text-[10px] tracking-[0.3em] uppercase px-2 py-0.5 border ${badgeClass}`}>
          {badgeLabel}
        </span>
      </div>
    </article>
  );
}

export function LineupSection() {
  const headliner = ARTISTS.find((a) => a.role === 'headliner');
  const support = ARTISTS.filter((a) => a.role !== 'headliner');

  return (
    <SectionWrapper id="lineup" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          label="Lineup"
          title="Artistas"
          subtitle="Una noche que no se repite"
          scheme="light"
        />

        {/* 60/40 grid — stack on mobile, split on md+ */}
        <div className="flex flex-col md:grid md:grid-cols-[3fr_2fr] gap-4 md:gap-6">
          {/* Left 60%: headliner */}
          {headliner && <HeadlinerCard artist={headliner} />}

          {/* Right 40%: support acts stacked */}
          <div className="flex flex-col gap-4">
            {support.map((artist) => (
              <SupportCard key={artist.name} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
