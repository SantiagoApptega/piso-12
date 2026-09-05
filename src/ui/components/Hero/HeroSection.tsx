import { useEffect, useRef } from 'react';
import { HERO_VIDEO_LOOP_END_SEC, HERO_VIDEO_LOOP_START_SEC } from '../../../lib/constants.js';
import { HeroCanvas } from './HeroCanvas.js';
import { HeroOverlay } from './HeroOverlay.js';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Mobile Safari often ignores HTML autoplay after React mounts; muted + playsInline + programmatic play is required.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;

    const tryPlay = () => {
      void video.play().catch(() => {
        /* Low Power Mode / strict policies — no overlay fix without user gesture */
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    const handleTimeUpdate = () => {
      if (video.currentTime >= HERO_VIDEO_LOOP_END_SEC) {
        video.currentTime = HERO_VIDEO_LOOP_START_SEC;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <header id="hero" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-void">
      {/* Full-bleed: cover fills width + height (may crop sides on narrow portrait) */}
      <video
        ref={videoRef}
        className="hero-bg-video absolute inset-0 z-0 h-full w-full object-cover object-center"
        src="/assets/videos/pitbull_chain.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden="true"
      />

      {/* Three.js chrome spikes — z-[1], sits between video and text overlay */}
      <HeroCanvas />

      {/* Text + CTA overlay — z-10 */}
      <HeroOverlay />
    </header>
  );
}
