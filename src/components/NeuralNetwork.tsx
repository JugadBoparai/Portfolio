import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmallScreen = window.innerWidth < 640; // Tailwind sm breakpoint

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize nodes
    const nodeCount = prefersReducedMotion ? 16 : (isSmallScreen ? 24 : (window.innerWidth < 1024 ? 40 : 50));
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    }));

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Touch move handler (for mobile)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Pause animation when tab not visible
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && animationRef.current === null) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas || !isVisible) {
        animationRef.current = null;
        return;
      }

      // Clear canvas with fade effect
      ctx.fillStyle = isDarkMode 
        ? 'rgba(17, 24, 39, 0.1)' 
        : 'rgba(248, 250, 252, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Mouse interaction - attract nodes to mouse
        if (!prefersReducedMotion) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const radius = isSmallScreen ? 140 : 200;
          if (dist < radius) {
            const force = (radius - dist) / radius;
            const factor = isSmallScreen ? 0.015 : 0.02;
            node.vx += (dx / dist) * force * factor;
            node.vy += (dy / dist) * force * factor;
          }
        }

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Damping
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Draw connections to nearby nodes (lighter on mobile/reduced motion)
        if (!prefersReducedMotion) {
          const maxDistance = isSmallScreen ? 110 : 150;
          const maxOpacity = isSmallScreen ? 0.35 : 0.5;
          const lineWidth = isSmallScreen ? 0.4 : 0.5;
          nodes.forEach((otherNode, j) => {
            if (i >= j) return;

            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * maxOpacity;
              const gradient = ctx.createLinearGradient(
                node.x, node.y, otherNode.x, otherNode.y
              );

              if (isDarkMode) {
                gradient.addColorStop(0, `rgba(251, 146, 60, ${opacity})`);
                gradient.addColorStop(1, `rgba(251, 191, 36, ${opacity})`);
              } else {
                gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
                gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`);
              }

              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          });
        }

        // Draw node with glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 4
        );
        
        if (isDarkMode) {
          gradient.addColorStop(0, 'rgba(251, 146, 60, 0.8)'); // orange core
          gradient.addColorStop(0.5, 'rgba(251, 146, 60, 0.4)');
          gradient.addColorStop(1, 'rgba(251, 146, 60, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)'); // cyan core
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)');
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = isDarkMode 
          ? 'rgba(251, 146, 60, 1)' 
          : 'rgba(6, 182, 212, 1)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // If user prefers reduced motion, draw one static frame; else animate
    if (prefersReducedMotion) {
      animate();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default NeuralNetwork;
