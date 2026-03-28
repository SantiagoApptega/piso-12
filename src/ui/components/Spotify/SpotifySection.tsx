import { SPOTIFY_PLAYLIST_EMBED_URL } from '../../../lib/constants.js';
import { SectionWrapper } from '../shared/SectionWrapper.js';

export function SpotifySection() {
  return (
    <SectionWrapper
      id="playlist"
      className="bg-void pt-8 pb-16 md:pt-10 md:pb-16"
    >
      <div
        className="flex flex-col items-center gap-6 px-6"
        style={{ borderTop: '1px solid var(--color-border-dark)' }}
      >
        <p className="font-heading tracking-[0.35em] text-chrome-dim text-xs text-center uppercase pt-6 md:pt-8">
          Escucha lo mejor de Ñejo
        </p>
        <iframe
          title="Spotify playlist — Ñejo El Broko"
          src={SPOTIFY_PLAYLIST_EMBED_URL}
          height="152"
          frameBorder={0}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{
            borderRadius: '12px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35), 0 0 1px rgba(200,200,212,0.15)',
          }}
        />
      </div>
    </SectionWrapper>
  );
}
