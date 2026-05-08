import { useEffect, useRef, useState } from 'react';

function ScrollReveal({
  as: Component = 'div',
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  className = '',
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const classes = [
    className,
    'transition-opacity',
    'duration-700',
    'ease-out',
    isVisible ? 'is-visible' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={elementRef}
      data-reveal={direction}
      className={classes}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
