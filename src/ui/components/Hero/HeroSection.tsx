import { useEffect, useRef } from 'react';
import { HERO_VIDEO_LOOP_END_SEC, HERO_VIDEO_LOOP_START_SEC } from '../../../lib/constants.js';
import { HeroOverlay } from './HeroOverlay.js';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= HERO_VIDEO_LOOP_END_SEC) {
        video.currentTime = HERO_VIDEO_LOOP_START_SEC;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  return (
    <header className="relative h-[50vh] w-full overflow-hidden bg-void md:h-screen">
      {/* Full-bleed: cover fills width + height (may crop sides on narrow portrait) */}
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        src="/assets/videos/pitbull_chain.mp4"
        autoPlay
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Text + CTA overlay — z-10 */}
      <HeroOverlay />
    </header>
  );
}
