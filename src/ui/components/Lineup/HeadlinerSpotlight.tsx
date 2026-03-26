import { motion } from 'framer-motion';
import type { HeadlinerSpotlightProps } from './HeadlinerSpotlight.types.js';

export function HeadlinerSpotlight({ artist }: HeadlinerSpotlightProps) {
  return (
    <article
      className="relative w-full overflow-hidden bg-background"
      aria-label={artist.name}
    >
      <h2 className="sr-only">{artist.name}</h2>
      {artist.imageUrl ? (
        /* Ken Burns slow zoom — image subtly grows over ~25s, premium editorial feel */
        <motion.img
          src={artist.imageUrl}
          alt={artist.name}
          width={1200}
          height={1800}
          className="block h-auto w-full max-w-none object-contain object-center asset-multiply"
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.07 }}
          transition={{ duration: 25, ease: 'linear' }}
        />
      ) : (
        <div className="flex min-h-48 w-full items-center justify-center bg-void">
          <span className="font-heading text-8xl font-black text-foreground-dark/20 uppercase">
            {artist.name.charAt(0)}
          </span>
        </div>
      )}
    </article>
  );
}
