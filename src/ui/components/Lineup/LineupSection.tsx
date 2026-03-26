import { ARTISTS } from '../../../domain/constants/index.js';
import type { Artist } from '../../../domain/entities/index.js';
import { LINEUP_ARTIST_PLACEHOLDER_IMAGE } from '../../../lib/constants.js';
import { HeadlinerSpotlight } from './HeadlinerSpotlight.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { SectionWrapper } from '../shared/SectionWrapper.js';

function GuestCard({ artist }: { artist: Artist }) {
  const isGuest = artist.role === 'guest';
  const imageSrc = artist.imageUrl ?? LINEUP_ARTIST_PLACEHOLDER_IMAGE;

  return (
    <article
      className="relative overflow-hidden"
      style={{ aspectRatio: '4/5' }}
    >
      <img
        src={imageSrc}
        alt={artist.name}
        width={400}
        height={500}
        className="absolute inset-0 h-full w-full object-cover asset-multiply"
      />

      {isGuest && (
        <div className="absolute top-3 right-3 bg-accent px-2 py-1 font-heading text-[9px] leading-none tracking-[0.2em] text-accent-foreground uppercase">
          Artista Invitado
        </div>
      )}

      <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-void/90 to-transparent px-3 pt-10 pb-3">
        <h3 className="font-heading text-sm font-black tracking-[0.06em] text-foreground-dark uppercase leading-none md:text-base">
          {artist.name}
        </h3>
        <p className="font-heading mt-1 text-[9px] tracking-[0.25em] text-chrome uppercase">
          {isGuest ? 'Artista Invitado' : 'DJ'}
        </p>
      </div>
    </article>
  );
}

export function LineupSection() {
  const headliner = ARTISTS.find((a) => a.role === 'headliner');
  const support = ARTISTS.filter((a) => a.role !== 'headliner');

  return (
    <SectionWrapper id="lineup" className="bg-background px-0 pb-10 md:pb-14">
      {headliner ? <HeadlinerSpotlight artist={headliner} /> : null}

      <div className="mx-auto max-w-5xl px-6 pt-8 md:pt-10">
        <SectionHeading
          label="Lineup"
          title="Artistas"
          scheme="light"
          as="h3"
          className="mb-6 md:mb-8"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {support.map((artist) => (
            <GuestCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
