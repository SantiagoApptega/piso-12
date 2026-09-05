import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COUNT = 200;

// #E85D04 (pumpkin orange) and #7C3AED (eerie violet), normalized
const PALETTE = [
  [232 / 255, 93 / 255, 4 / 255],
  [124 / 255, 58 / 255, 237 / 255],
] as const;

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // If WebGL is unavailable (old device / blocked context), skip particles
    // silently instead of crashing the whole hero island.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 50);
    camera.position.set(0, 0, 5);

    // World-space bounds at z=0 for this camera setup
    const halfH = 5 * Math.tan((55 / 2) * (Math.PI / 180)); // ≈ 2.68
    const halfW = halfH * (w / h);

    // TypedArrays kept in scope so we mutate them each frame (no casting needed)
    const positions    = new Float32Array(COUNT * 3);
    const colors       = new Float32Array(COUNT * 3);
    const velY         = new Float32Array(COUNT);
    const velX         = new Float32Array(COUNT);
    const baseBright   = new Float32Array(COUNT);
    const flickPhase   = new Float32Array(COUNT);
    const flickSpeed   = new Float32Array(COUNT);
    const baseR        = new Float32Array(COUNT);
    const baseG        = new Float32Array(COUNT);
    const baseB        = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * halfW * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * halfH * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const [pr, pg, pb] = PALETTE[i % 2];
      baseR[i] = pr;
      baseG[i] = pg;
      baseB[i] = pb;

      baseBright[i]  = 0.30 + Math.random() * 0.70;   // 0.30 – 1.00
      colors[i * 3]     = baseR[i] * baseBright[i];
      colors[i * 3 + 1] = baseG[i] * baseBright[i];
      colors[i * 3 + 2] = baseB[i] * baseBright[i];

      velY[i]       = 0.004 + Math.random() * 0.007;  // very slow rise
      velX[i]       = (Math.random() - 0.5) * 0.0025; // gentle horizontal drift
      flickPhase[i] = Math.random() * Math.PI * 2;
      flickSpeed[i] = 0.4 + Math.random() * 1.2;      // slow, varied flicker
    }

    const posAttr = new THREE.BufferAttribute(positions, 3);
    const colAttr = new THREE.BufferAttribute(colors, 3);

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', posAttr);
    geo.setAttribute('color', colAttr);

    const mat = new THREE.PointsMaterial({
      size: 0.052,          // tiny — barely visible individually, beautiful as a field
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(geo, mat));

    let animId: number;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.016;

      for (let i = 0; i < COUNT; i++) {
        positions[i * 3]     += velX[i];
        positions[i * 3 + 1] += velY[i];

        // Reset to bottom when particle exits the top
        if (positions[i * 3 + 1] > halfH + 0.5) {
          positions[i * 3 + 1] = -halfH - 0.5;
          positions[i * 3]     = (Math.random() - 0.5) * halfW * 2;
        }

        // Slow brightness flicker: 70% base + 30% sine
        const flicker = 0.70 + 0.30 * Math.sin(t * flickSpeed[i] + flickPhase[i]);
        const b = baseBright[i] * flicker;
        colors[i * 3]     = baseR[i] * b;
        colors[i * 3 + 1] = baseG[i] * b;
        colors[i * 3 + 2] = baseB[i] * b;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
