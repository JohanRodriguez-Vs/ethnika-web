import { useMemo } from 'react';

function AnimatedBackground({ particleCount = 14 }) {
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, index) => {
      const size = 8 + ((index * 7) % 20);
      const top = (index * 17) % 100;
      const left = (index * 23) % 100;
      const delay = (index % 6) * 0.6;
      const duration = 6 + (index % 5) * 1.5;

      return {
        id: index,
        size,
        top,
        left,
        delay,
        duration,
        opacity: 0.12 + (index % 4) * 0.05,
      };
    });
  }, [particleCount]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-hide overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-primary-100" />

      <div className="absolute -left-20 top-[-120px] h-80 w-80 rounded-full bg-accent-gold/12 blur-3xl" />
      <div className="absolute right-[-120px] top-[15%] h-96 w-96 rounded-full bg-primary-900/8 blur-3xl" />
      <div className="absolute bottom-[-140px] left-[25%] h-96 w-96 rounded-full bg-earth-400/12 blur-3xl" />

      <div className="absolute inset-0 bg-grid-soft opacity-60" />

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full bg-accent-gold floating-soft"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedBackground;
