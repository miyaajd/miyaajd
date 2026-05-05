"use client";

import { useMemo } from "react";

const PARTICLE_COUNT = 84;

export default function CelebrationParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        id: index,
        angle: (360 / PARTICLE_COUNT) * index,
        distance: 220 + (index % 10) * 34,
        delay: (index % 12) * 0.012,
        shape: index % 3,
      })),
    [],
  );

  return (
    <div className="celebration-particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={
            {
              "--particle-angle": `${particle.angle}deg`,
              "--particle-distance": `${particle.distance}px`,
              "--particle-delay": `${particle.delay}s`,
              "--particle-shape": particle.shape,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
