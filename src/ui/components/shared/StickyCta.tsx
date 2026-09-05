import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EVENT } from '../../../domain/constants/index.js';

/** Mobile-only buy bar — slides in once the user leaves the hero,
 *  and hides again when the final CTA / footer (with their own buttons) are on screen */
export function StickyCta() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isNearEnd, setIsNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const endTargets = [
      document.getElementById('final-cta'),
      document.querySelector('footer'),
    ].filter((el): el is Element => el !== null);

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        });
        setIsNearEnd(intersecting.size > 0);
      },
      { threshold: 0.2 }
    );
    endTargets.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const isVisible = isPastHero && !isNearEnd;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href={EVENT.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Comprar boletas para Halloween en Pasto"
            className="flex min-h-[52px] items-center justify-between bg-accent px-6 font-heading text-sm tracking-[0.25em] text-accent-foreground uppercase shadow-[0_-8px_40px_rgba(5,5,5,0.9)]"
          >
            <span>Comprar boletas</span>
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
