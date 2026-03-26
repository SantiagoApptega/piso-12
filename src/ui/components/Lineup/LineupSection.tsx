import { motion } from 'framer-motion';
import { ARTISTS } from '../../../domain/constants/index.js';
import type { Artist } from '../../../domain/entities/index.js';
import { LINEUP_ARTIST_PLACEHOLDER_IMAGE } from '../../../lib/constants.js';
import { HeadlinerSpotlight } from './HeadlinerSpotlight.js';
import { SectionHeading } from '../shared/SectionHeading.js';
import { SectionWrapper } from '../shared/SectionWrapper.js';

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

function GuestCard({ artist }: { artist: Artist }) {
  const isGuest = artist.role === 'guest';
  const imageSrc = artist.imageUrl ?? LINEUP_ARTIST_PLACEHOLDER_IMAGE;

  return (
    <motion.article
      className="relative overflow-hidden"
      style={{ aspectRatio: '4/5' }}
      whileHover={{ scale: 1.04, y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
    </motion.article>
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

        {/* Staggered card grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {support.map((artist) => (
            <motion.div key={artist.name} variants={cardVariants}>
              <GuestCard artist={artist} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
