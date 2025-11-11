import { useEffect, useState } from 'react';

interface MillenniumFalconProps {
  onComplete: () => void;
  onRestoreNavbar: () => void;
}

/**
 * MillenniumFalcon
 * Flies across the top of the screen in hyperspace with dark mode following behind
 */
export default function MillenniumFalcon({ onComplete, onRestoreNavbar }: MillenniumFalconProps) {
  const [isFlying, setIsFlying] = useState(false);
  const [falconPosition, setFalconPosition] = useState(0); // 0 to 100 (percentage across screen)

  useEffect(() => {
    // Start flying animation
    setIsFlying(true);
    
    // Animate falcon position for dark mode transition tracking
    const startTime = Date.now();
    const duration = 4000; // 4 seconds for smooth transition
    let animationFrameId: number;
    
    // Apply dark mode transition that follows the falcon
    const applyDarkModeTransition = (progress: number, position: number) => {
      // Create a gradient mask that follows the falcon
      // Everything behind the falcon (to the left) becomes dark
      // The dark zone extends further behind for a smoother transition
      const darkStart = Math.max(0, position - 50); // Dark mode starts 50% behind falcon
      const darkMid = Math.max(0, position - 30); // Mid transition point
      const darkEnd = Math.max(0, position - 10); // Full dark mode 10% behind falcon
      
      // Apply CSS custom properties for the transition (updated in real-time)
      document.documentElement.style.setProperty('--dark-mode-progress', `${progress}`);
      document.documentElement.style.setProperty('--falcon-position', `${position}%`);
      document.documentElement.style.setProperty('--dark-start', `${darkStart}%`);
      document.documentElement.style.setProperty('--dark-mid', `${darkMid}%`);
      document.documentElement.style.setProperty('--dark-end', `${darkEnd}%`);
      
      // Gradually apply dark mode class when falcon is well into flight
      // Start applying dark mode class at 25% progress for smooth transition
      if (progress > 0.25 && position > 25) {
        if (!document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }
    };
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const position = progress * 100;
      setFalconPosition(position);
      
      // Apply dark mode progressively as falcon moves
      // Dark mode starts appearing when falcon is at 15% across screen
      if (position > 15) {
        const darkProgress = Math.min((position - 15) / 70, 1); // 15% to 85% = dark transition
        applyDarkModeTransition(darkProgress, position);
      }
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);

    // Restore navbar when falcon reaches middle of screen
    const restoreTimer = setTimeout(() => {
      onRestoreNavbar();
    }, 2000); // Restore at 50% through animation

    // Complete animation when falcon exits
    const completeTimer = setTimeout(() => {
      // Ensure dark mode is fully applied
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsFlying(false);
      onComplete();
    }, duration);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      clearTimeout(restoreTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, onRestoreNavbar]);

  if (!isFlying) return null;

  return (
    <>
      {/* Hyperspace Tunnel - Star streaks */}
      <div
        className="fixed inset-0 z-[19998] pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      >
        {/* Star streaks */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 2) % 100}%`,
              top: `${10 + (i * 3) % 80}%`,
              animation: `starStreak ${1 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.6 + Math.random() * 0.4,
              boxShadow: '0 0 4px white, 0 0 8px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Hyperspace Tunnel Effect - Radial streaks centered on falcon */}
      <div
        className="fixed inset-0 z-[19997] pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 200vw 60vh at ${falconPosition}% 15%,
            transparent 0%,
            rgba(59, 130, 246, 0.15) 20%,
            rgba(147, 197, 253, 0.25) 30%,
            rgba(59, 130, 246, 0.35) 40%,
            transparent 55%
          )`,
          animation: 'hyperspacePulse 0.5s ease-in-out infinite',
        }}
      />

      {/* Dark Mode Transition Layer - Smooth gradient that follows behind falcon */}
      {/* This creates the visual effect of darkness following the falcon */}
      <div
        className="fixed inset-0 z-[19996] pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(17, 24, 39, 0) calc(var(--dark-start, 0%) - 15%),
            rgba(17, 24, 39, 0.3) var(--dark-start, 0%),
            rgba(17, 24, 39, 0.5) calc(var(--dark-mid, 0%) - 5%),
            rgba(17, 24, 39, 0.7) var(--dark-mid, 0%),
            rgba(17, 24, 39, 0.85) calc(var(--dark-end, 0%) - 3%),
            rgba(17, 24, 39, 0.95) var(--dark-end, 0%),
            rgba(17, 24, 39, 1) calc(var(--dark-end, 0%) + 5%),
            rgba(17, 24, 39, 1) 100%
          )`,
          mixBlendMode: 'normal',
          willChange: 'background',
          transition: 'none', // No transition - update instantly for smooth motion
        }}
      />
      
      {/* Additional dark overlay for smoother transition */}
      <div
        className="fixed inset-0 z-[19995] pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 120vw 100vh at calc(var(--dark-end, 0%) + 10%) 50%,
            transparent 0%,
            rgba(0, 0, 0, 0.2) 40%,
            rgba(0, 0, 0, 0.5) 60%,
            rgba(0, 0, 0, 0.8) 80%,
            rgba(0, 0, 0, 1) 100%
          )`,
          mixBlendMode: 'multiply',
          opacity: 0.7,
        }}
      />

      {/* Light speed streaks radiating from falcon */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * 360;
        const distance = 200 + (i % 3) * 100;
        return (
          <div
            key={`streak-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${falconPosition}%`,
              top: '15%',
              width: '2px',
              height: `${distance}px`,
              background: `linear-gradient(
                to bottom,
                rgba(147, 197, 253, 0.9) 0%,
                rgba(59, 130, 246, 0.6) 50%,
                transparent 100%
              )`,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transformOrigin: 'top center',
              opacity: 0.7,
              zIndex: 19995,
              filter: 'blur(1px)',
              animation: `streakPulse ${0.5 + Math.random() * 0.5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        );
      })}

      {/* Millennium Falcon - AI Generated Video */}
      <div
        className="fixed top-10 left-0 z-[20000] pointer-events-none"
        style={{
          transform: `translateX(calc(${falconPosition}vw - 150px)) translateY(0)`,
          width: '200px',
          height: '140px',
          transition: 'transform 0.05s linear',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(100, 150, 255, 1)) drop-shadow(0 0 60px rgba(59, 130, 246, 0.8))',
          }}
        >
          <source src="/video/Create_a_short_202511111506_b6cxm.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hyperspace Warp Streaks - Behind falcon with motion blur effect */}
      <div
        className="fixed top-0 left-0 z-[19999] pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          background: `radial-gradient(
            ellipse 150vw 60vh at ${falconPosition}% 15%,
            transparent 0%,
            rgba(59, 130, 246, 0.4) 20%,
            rgba(147, 197, 253, 0.6) 30%,
            rgba(59, 130, 246, 0.8) 40%,
            transparent 60%
          )`,
          mixBlendMode: 'screen',
          animation: 'hyperspaceWarp 0.3s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes starStreak {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200px) translateY(100px) scale(3);
            opacity: 0;
          }
        }
        
        @keyframes hyperspacePulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @keyframes hyperspaceWarp {
          0%, 100% {
            opacity: 0.5;
            filter: blur(20px);
          }
          50% {
            opacity: 0.9;
            filter: blur(30px);
          }
        }
        
        @keyframes streakPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) scaleY(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--angle, 0deg)) scaleY(1.5);
          }
        }
        
        /* Smooth dark mode transition for body */
        body {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
      `}</style>
    </>
  );
}
