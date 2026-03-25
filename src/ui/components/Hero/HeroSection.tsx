import { HeroCanvas } from './HeroCanvas.js';
import { HeroOverlay } from './HeroOverlay.js';

export function HeroSection() {
  return (
    <header className="relative w-full h-screen min-h-[600px] overflow-hidden bg-void">
      {/* Video background — z-0 */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/assets/videos/pitbull_chain.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Three.js particles — z-[1], opacity-40 set on canvas div */}
      <HeroCanvas />

      {/* Text + CTA overlay — z-10 */}
      <HeroOverlay />
    </header>
  );
}
