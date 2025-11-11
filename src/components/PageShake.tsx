import { useEffect } from 'react';

/**
 * PageShake
 * - A tiny component that listens for `vader:shake` events and performs a GSAP shake on #root
 * - Included to satisfy modular requirement; the main controller can trigger the event
 */

export default function PageShake() {
  useEffect(() => {
    const handler = async () => {
      try {
        const { gsap } = await import('gsap');
        const root = document.getElementById('root') || document.body;
        gsap.fromTo(
          root,
          { x: 0, y: 0, rotation: 0 },
          {
            x: () => (Math.random() > 0.5 ? -1 : 1) * 16,
            y: () => (Math.random() > 0.5 ? -1 : 1) * 10,
            rotation: () => (Math.random() > 0.5 ? -1 : 1) * 2,
            duration: 0.9,
            repeat: 4,
            yoyo: true,
            ease: 'power2.inOut',
          }
        );
      } catch (e) {
        // gsap not available
      }
    };

    window.addEventListener('vader:shake', handler as EventListener);
    return () => window.removeEventListener('vader:shake', handler as EventListener);
  }, []);

  return null;
}
