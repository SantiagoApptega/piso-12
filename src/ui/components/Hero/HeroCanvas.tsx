import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COUNT = 200;

// #EEEEF5 normalized
const BASE_R = 238 / 255;
const BASE_G = 238 / 255;
const BASE_B = 245 / 255;

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
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

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * halfW * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * halfH * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

      baseBright[i]  = 0.30 + Math.random() * 0.70;   // 0.30 – 1.00
      colors[i * 3]     = BASE_R * baseBright[i];
      colors[i * 3 + 1] = BASE_G * baseBright[i];
      colors[i * 3 + 2] = BASE_B * baseBright[i];

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
        colors[i * 3]     = BASE_R * b;
        colors[i * 3 + 1] = BASE_G * b;
        colors[i * 3 + 2] = BASE_B * b;
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
