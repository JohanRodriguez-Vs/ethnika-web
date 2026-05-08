import { useEffect, useMemo, useRef, useState } from 'react';

function AnimatedCounter({
  value = 0,
  start = 0,
  duration = 1600,
  decimals = 0,
  prefix = '',
  suffix = '',
  locale = 'es-CO',
  once = true,
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const node = counterRef.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplayValue(value);
      setHasStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setHasStarted(false);
            setDisplayValue(start);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, start, once]);

  useEffect(() => {
    if (!hasStarted) return undefined;

    const from = Number(start);
    const to = Number(value);
    const totalChange = to - from;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    let frameId;
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      const nextValue = from + totalChange * eased;

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted, start, value, duration]);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [locale, decimals]
  );

  const formatted = `${prefix}${formatter.format(displayValue)}${suffix}`;

  return (
    <span
      ref={counterRef}
      className={className}
      aria-live="polite"
      aria-label={`${prefix}${value}${suffix}`}
    >
      {formatted}
    </span>
  );
}

export default AnimatedCounter;
