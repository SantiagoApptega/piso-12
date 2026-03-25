import { SectionWrapper } from '../shared/SectionWrapper.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { ArtistCard } from './ArtistCard.js';
import { ARTISTS } from '../../../domain/constants/index.js';

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

        {headliner && (
          <div className="flex justify-center mb-16">
            <ArtistCard artist={headliner} />
          </div>
        )}

        <div
          className="w-full h-px mb-16"
          style={{ background: 'var(--color-border-light)' }}
          aria-hidden="true"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {support.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
