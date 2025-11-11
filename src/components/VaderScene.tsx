import React from 'react';

/**
 * VaderScene
 * - Creates a cinematic Force wave effect with expanding energy rings and particles
 * - Pure CSS animations for maximum performance
 * - No physics engine needed - elegant and lightweight
 */

export default function VaderScene() {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      {/* Darth Vader silhouette appears */}
      <VaderSilhouette />
      <ForceWaveEffect />
    </div>
  );
}

function VaderSilhouette() {
  return (
    <div
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
      style={{
        animation: 'vaderEnter 1.5s ease-out forwards',
      }}
    >
      {/* Large imposing Vader SVG */}
      <svg
        viewBox="0 0 200 400"
        className="w-64 h-96 md:w-80 md:h-[30rem]"
        style={{
          filter: 'drop-shadow(0 0 60px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 120px rgba(255, 0, 0, 0.6))',
        }}
      >
        {/* Helmet */}
        <path
          d="M100 60 L65 95 L65 160 L55 200 L55 250 L80 275 L120 275 L145 250 L145 200 L135 160 L135 95 Z"
          fill="#0a0a0a"
          stroke="#ff0000"
          strokeWidth="4"
        />
        {/* Mask horizontal line */}
        <path d="M65 160 L135 160" stroke="#ff0000" strokeWidth="6" />
        
        {/* Glowing Red Eyes */}
        <circle cx="85" cy="135" r="12" fill="#ff0000" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="115" cy="135" r="12" fill="#ff0000" opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Eye glow aura */}
        <circle cx="85" cy="135" r="20" fill="#ff0000" opacity="0.3">
          <animate attributeName="r" values="18;24;18" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="115" cy="135" r="20" fill="#ff0000" opacity="0.3">
          <animate attributeName="r" values="18;24;18" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Breathing apparatus */}
        <path d="M95 185 L105 185 L100 205 Z" fill="#333" stroke="#ff0000" strokeWidth="3" />
        <rect x="88" y="205" width="24" height="40" fill="#1a1a1a" rx="4" stroke="#ff0000" strokeWidth="3" />
        
        {/* Chest panel details */}
        <rect x="70" y="280" width="60" height="80" fill="#1a1a1a" stroke="#ff0000" strokeWidth="3" rx="3" />
        <rect x="78" y="290" width="44" height="8" fill="#333" stroke="#ff0000" strokeWidth="1" />
        <rect x="78" y="305" width="44" height="8" fill="#333" stroke="#ff0000" strokeWidth="1" />
        <rect x="78" y="320" width="44" height="8" fill="#333" stroke="#ff0000" strokeWidth="1" />
        
        {/* Cape */}
        <path
          d="M65 250 L40 380 L160 380 L135 250"
          fill="#000"
          opacity="0.95"
        />
        
        {/* Extended hand reaching out (Force gesture) */}
        <g style={{ animation: 'forceGesture 2s ease-in-out infinite' }}>
          <path
            d="M145 200 L180 180 L185 185 L190 185 L195 180"
            stroke="#0a0a0a"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="195" cy="180" r="6" fill="#0a0a0a" />
        </g>
      </svg>
      
      <style>{`
        @keyframes vaderEnter {
          0% {
            transform: translateX(-120%) translateY(-50%);
            opacity: 0;
          }
          100% {
            transform: translateX(0) translateY(-50%);
            opacity: 1;
          }
        }
        
        @keyframes forceGesture {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(10px) rotate(-5deg);
          }
        }
      `}</style>
    </div>
  );
}

function ForceWaveEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Dark Side energy vortex */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(139, 0, 0, 0.4) 0%, transparent 70%)',
          animation: 'vortexPulse 2.5s ease-out forwards',
          filter: 'blur(20px)',
        }}
      />
      
      {/* Multiple expanding Force rings - more intense for finale */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '150px',
            height: '150px',
            border: `${4 - i * 0.3}px solid rgba(220, 38, 38, ${0.8 - i * 0.08})`,
            borderRadius: '50%',
            animation: `forceRing 2.5s ease-out ${i * 0.12}s forwards`,
            boxShadow: '0 0 40px rgba(220, 38, 38, 0.6), inset 0 0 40px rgba(220, 38, 38, 0.4)',
          }}
        />
      ))}
      
      {/* Force lightning/energy streaks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * 360;
        return (
          <div
            key={`streak-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: '4px',
              height: '80px',
              background: 'linear-gradient(180deg, rgba(220, 38, 38, 0.9) 0%, transparent 100%)',
              transformOrigin: 'top center',
              transform: `rotate(${angle}deg) translateY(-100px)`,
              animation: `lightningStreak 1.2s ease-out ${i * 0.05}s forwards`,
              boxShadow: '0 0 15px rgba(220, 38, 38, 0.8)',
            }}
          />
        );
      })}
      
      {/* Explosive particles */}
      {[...Array(40)].map((_, i) => {
        const angle = (i / 40) * Math.PI * 2;
        const speed = 1 + Math.random() * 0.5;
        return (
          <div
            key={`particle-${i}`}
            className="absolute left-1/2 top-1/2"
            style={{
              width: '6px',
              height: '6px',
              background: i % 3 === 0 ? 'rgba(255, 100, 100, 0.95)' : 'rgba(220, 38, 38, 0.9)',
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(220, 38, 38, 0.9)',
              animation: `particleBurst 1.8s ease-out ${i * 0.02}s forwards`,
              '--angle': `${angle}rad`,
              '--speed': speed,
            } as React.CSSProperties}
          />
        );
      })}
      
      <style>{`
        @keyframes vortexPulse {
          0% {
            width: 200px;
            height: 200px;
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
          }
          30% {
            opacity: 1;
          }
          100% {
            width: 800px;
            height: 800px;
            opacity: 0;
            -webkit-transform: scale(1);
            transform: scale(1);
          }
        }
        
        @keyframes forceRing {
          0% {
            width: 150px;
            height: 150px;
            opacity: 1;
            -webkit-transform: translate(-50%, -50%) scale(1);
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            width: 1400px;
            height: 1400px;
            opacity: 0;
            -webkit-transform: translate(-50%, -50%) scale(1.2);
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        
        @keyframes lightningStreak {
          0% {
            height: 0px;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            height: 200px;
            opacity: 0;
          }
        }
        
        @keyframes particleBurst {
          0% {
            -webkit-transform: translate(-50%, -50%) scale(0);
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            -webkit-transform: translate(
              calc(-50% + cos(var(--angle)) * calc(var(--speed) * 400px)),
              calc(-50% + sin(var(--angle)) * calc(var(--speed) * 400px))
            ) scale(0);
            transform: translate(
              calc(-50% + cos(var(--angle)) * calc(var(--speed) * 400px)),
              calc(-50% + sin(var(--angle)) * calc(var(--speed) * 400px))
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
