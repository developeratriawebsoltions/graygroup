"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const BUILDINGS = Array.from({ length: 38 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 38,
  z: -(Math.random() * 28 + 4),
  width: Math.random() * 1.4 + 0.4,
  depth: Math.random() * 1.4 + 0.4,
  height: Math.random() * 9 + 1.5,
  speed: Math.random() * 0.12 + 0.04,
  phase: Math.random() * Math.PI * 2,
}));

function Building({
  x, z, width, depth, height, speed, phase, reduced,
}: (typeof BUILDINGS)[0] & { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced || !ref.current) return;
    ref.current.position.y =
      Math.sin(clock.getElapsedTime() * speed + phase) * 0.18;
  });

  return (
    <mesh ref={ref} position={[x, height / 2 - 2, z]} castShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color="#1a1a2e"
        emissive="#9b8060"
        emissiveIntensity={0.06}
        roughness={0.7}
        metalness={0.4}
        transparent
        opacity={0.72}
      />
    </mesh>
  );
}

function Windows({ x, z, width, depth, height }: (typeof BUILDINGS)[0]) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const cols = Math.floor(width * 2.5);
    const rows = Math.floor(height * 1.8);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (Math.random() > 0.45) {
          pts.push([
            x - width / 2 + (c / cols) * width + 0.1,
            height / 2 - 2 - height / 2 + (r / rows) * height + 0.3,
            z + depth / 2 + 0.01,
          ]);
        }
      }
    }
    return pts;
  }, [x, z, width, depth, height]);

  return (
    <>
      {points.map(([px, py, pz], i) => (
        <mesh key={i} position={[px, py, pz]}>
          <planeGeometry args={[0.12, 0.18]} />
          <meshStandardMaterial
            color="#f7f4ee"
            emissive="#c8b89a"
            emissiveIntensity={Math.random() * 0.8 + 0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </>
  );
}

function Scene({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (reduced || !groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.04) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 5]} intensity={0.6} color="#c8b89a" />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#9b8060" />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -10]}>
        <planeGeometry args={[60, 50]} />
        <meshStandardMaterial color="#0d0d1a" roughness={1} />
      </mesh>

      {BUILDINGS.map((b) => (
        <group key={b.id}>
          <Building {...b} reduced={reduced} />
          <Windows {...b} />
        </group>
      ))}
    </group>
  );
}

export function CityBackground() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 4, 14], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Scene reduced={reduced} />
      </Canvas>
    </div>
  );
}
