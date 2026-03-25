import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SPIKE_COUNT = 80;

interface Spike {
  mesh: THREE.Mesh;
  rotSpeed: THREE.Vector3;
}

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer — alpha: true so video background shows through
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(3, 5, 3);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x444444, 0.5);
    scene.add(ambientLight);

    // Shared geometry + material for all spikes
    const geometry = new THREE.ConeGeometry(0.015, 0.12, 4);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8c8d4,
      metalness: 1,
      roughness: 0.1,
    });

    // Build 80 spikes distributed in a wide sphere
    const spikes: Spike[] = [];
    for (let i = 0; i < SPIKE_COUNT; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      // Uniform spherical distribution, radius 2–12
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 10;
      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // Random initial orientation
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008
      );

      spikes.push({ mesh, rotSpeed });
      scene.add(mesh);
    }

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      scene.rotation.y += 0.00005;
      for (const { mesh, rotSpeed } of spikes) {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      spikes.forEach(({ mesh }) => scene.remove(mesh));
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-[1] opacity-40"
      aria-hidden="true"
    />
  );
}
