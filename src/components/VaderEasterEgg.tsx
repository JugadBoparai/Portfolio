import { useEffect, useState, useRef, lazy, Suspense } from 'react';

/**
 * VaderEasterEgg - Cinematic Darth Vader Easter Egg
 * 
 * Sequence:
 * 1. Page starts shaking
 * 2. Darth Vader enters from the left side
 * 3. Vader uses force to control headings (force waves toward navbar)
 * 4. Shaking stops when control is gained
 * 5. Headings burn
 * 6. Lava storm with debris from headings
 * 7. Millennium Falcon flies by at top
 * 8. Headings restore
 * 9. Dark mode transition
 * 
 * Triggered once per page load via localStorage
 */

const AUDIO_PATH = '/audio/darth-vader.mp3';

// Lazy load heavy 3D scene
const Vader3DScene = lazy(() => import('./Vader3DScene'));
const MillenniumFalcon = lazy(() => import('./MillenniumFalcon'));

export default function VaderEasterEgg() {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'vaderEnter' | 'forceControl' | 'burning' | 'lavaStorm' | 'falcon' | 'restoring' | 'complete'>('idle');
  const [showVader, setShowVader] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [showFalcon, setShowFalcon] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Track theme changes to show/hide test button
  useEffect(() => {
    const checkTheme = () => {
      setIsLightMode(!document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        checkTheme();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    console.log('✅ VaderEasterEgg mounted and listening');
    
    let isCurrentlyRunning = false; // Use local flag to prevent re-render issues
    
    const onActivate = async () => {
      if (isCurrentlyRunning || isRunning) {
        console.log('⚠️ Already running');
        return;
      }
      
      console.log('🎬 Vader Easter Egg ACTIVATED!');
      isCurrentlyRunning = true;
      setIsRunning(true);
      
      // Start Vader breathing audio IMMEDIATELY (before any async operations)
      // This is critical - audio must start in the user interaction context
      try {
        let audio: HTMLAudioElement;
        
        // If audio already exists and is playing, reuse it - don't interrupt it
        if (audioRef.current && !audioRef.current.paused) {
          console.log('🎵 Audio already playing, reusing existing audio');
          audio = audioRef.current;
        } else {
          // Create new audio element (don't clean up old one to avoid AbortError)
          audio = new Audio(AUDIO_PATH);
          audio.loop = true;
          audio.volume = 0.7;
          audio.muted = false;
          
          // Store reference immediately
          audioRef.current = audio;
          
          console.log('🎵 Created new audio element');
        }
        
        // Set up event handlers for debugging (before playing)
        audio.addEventListener('error', (e) => {
          console.error('❌ Audio error event:', e);
          console.error('❌ Audio path:', AUDIO_PATH);
          if (audio.error) {
            console.error('❌ Audio error code:', audio.error.code);
            console.error('❌ Audio error message:', audio.error.message);
          }
        });
        
        audio.addEventListener('loadeddata', () => {
          console.log('🎵 Audio data loaded');
        });
        
        audio.addEventListener('canplay', () => {
          console.log('🎵 Audio can play');
        });
        
        audio.addEventListener('canplaythrough', () => {
          console.log('🎵 Audio can play through - ready');
        });
        
        audio.addEventListener('playing', () => {
          console.log('🎵 ✅ Audio is now PLAYING');
        });
        
        audio.addEventListener('pause', () => {
          console.log('🎵 Audio paused');
        });
        
        audio.addEventListener('volumechange', () => {
          console.log('🎵 Volume changed:', audio.volume, 'muted:', audio.muted);
        });
        
        // CRITICAL: Play immediately while still in user interaction context
        // Play the audio - AbortError is expected if interrupted, so we suppress it
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('🎵 ✅ Audio playing successfully!');
            })
            .catch((error) => {
              // AbortError is normal - it just means play() was interrupted (e.g., by cleanup)
              // This is expected behavior and not a real error
              if (error.name !== 'AbortError') {
                console.error('❌ Audio play failed:', error.name, error.message);
                
                // Retry if audio needs to load (but not if it's an AbortError)
                if (audio.readyState < 2) {
                  audio.addEventListener('canplay', () => {
                    if (audioRef.current === audio && audio.paused) {
                      audio.play()
                        .then(() => console.log('🎵 ✅ Audio playing after load'))
                        .catch((e) => {
                          // Suppress AbortError here too
                          if (e.name !== 'AbortError') {
                            console.error('❌ Audio retry failed:', e);
                          }
                        });
                    }
                  }, { once: true });
                }
              }
            });
        }
        
      } catch (e) {
        console.error('❌ Audio initialization failed:', e);
      }

      try {
        const { default: gsap } = await import('gsap');
        const { burnHeadings, destroyNavbarAsDebris } = await import('./NavbarDestruction');

        // PHASE 1: Page Shake
        console.log('📳 Phase 1: Page Shake');
        setPhase('shaking');
        const body = document.body;
        const shakeTimeline = gsap.timeline({ repeat: -1 });
        shakeTimeline.to(body, {
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-15, 15),
          rotation: () => gsap.utils.random(-3, 3),
          duration: 0.1,
          ease: 'power2.inOut',
        });

        // PHASE 2: Vader Enters (after 1 second of shaking)
        setTimeout(() => {
          console.log('👤 Phase 2: Vader Enters');
          setPhase('vaderEnter');
          setShowVader(true);
        }, 1000);

        // PHASE 3: Force Control (Vader uses force on headings)
        setTimeout(() => {
          console.log('⚡ Phase 3: Force Control');
          setPhase('forceControl');
          // Show force waves toward navbar
          setTimeout(() => createForceWaves(), 100); // Small delay to ensure Vader is rendered
        }, 2500);

        // PHASE 4: Stop Shaking & Burn Headings
        setTimeout(() => {
          console.log('🔥 Phase 4: Stop Shake & Burn Headings');
          setPhase('burning');
          shakeTimeline.kill();
          gsap.set(body, { clearProps: 'all' });
          burnHeadings();
        }, 4000);

        // PHASE 5: Lava Storm with Debris
        setTimeout(() => {
          console.log('🌋 Phase 5: Lava Storm');
          setPhase('lavaStorm');
          setShowScene(true);
          destroyNavbarAsDebris();
        }, 5000);

        // PHASE 6: Millennium Falcon (starts after lava storm)
        setTimeout(() => {
          console.log('🚀 Phase 6: Millennium Falcon');
          setPhase('falcon');
          setShowScene(false); // Hide lava storm when falcon appears
          setShowVader(false); // Hide Vader
          setShowFalcon(true);
        }, 8000);

        // Note: Navbar restoration happens when falcon reaches middle (handled by MillenniumFalcon component)
        // Dark mode transition happens after falcon completes (handled by handleFalconComplete)

      } catch (e) {
        console.error('Animation failed:', e);
        isCurrentlyRunning = false;
        setIsRunning(false);
      }
    };

    // Helper function to create force waves
    const createForceWaves = () => {
      const header = document.querySelector('header');
      if (!header) {
        console.warn('Header not found for force waves');
        return;
      }

      // Find Vader element - it might be the container or the image
      const vaderElement = document.querySelector('.vader-container') as HTMLElement;
      if (!vaderElement) {
        console.warn('Vader element not found for force waves');
        return;
      }

      const vaderRect = vaderElement.getBoundingClientRect();
      const headerRect = header.getBoundingClientRect();

      // Create force wave elements
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const wave = document.createElement('div');
          wave.style.position = 'fixed';
          wave.style.left = `${vaderRect.right - 50}px`;
          wave.style.top = `${vaderRect.top + vaderRect.height / 2}px`;
          wave.style.width = '80px';
          wave.style.height = '80px';
          wave.style.borderRadius = '50%';
          wave.style.border = '4px solid rgba(255, 0, 0, 0.9)';
          wave.style.boxShadow = '0 0 40px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 100, 0, 0.6)';
          wave.style.pointerEvents = 'none';
          wave.style.zIndex = '10001';
          wave.style.transform = 'translate(-50%, -50%)';
          wave.style.background = 'radial-gradient(circle, rgba(255, 0, 0, 0.3) 0%, transparent 70%)';
          document.body.appendChild(wave);

          import('gsap').then(({ default: gsap }) => {
            const targetX = headerRect.left + headerRect.width / 2 - (vaderRect.right - 50);
            gsap.to(wave, {
              x: targetX,
              scale: 4,
              opacity: 0,
              duration: 1.2,
              ease: 'power2.out',
              onComplete: () => wave.remove()
            });
          });
        }, i * 300);
      }
    };

    window.addEventListener('vader:activate', onActivate as EventListener);
    return () => {
      window.removeEventListener('vader:activate', onActivate as EventListener);
      // Don't cleanup audio here - let it play through the sequence
      // Audio will be cleaned up in handleFalconComplete
    };
  }, []); // Empty dependency array - only set up listener once

  const handleFalconComplete = () => {
    console.log('✨ Falcon complete - Fading out audio');
    setShowFalcon(false);
    setPhase('complete');
    
    // Fade out audio after Millennium Falcon completes
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.05);
        } else {
          if (audioRef.current) {
            clearInterval(fadeOut);
            audioRef.current.pause();
            audioRef.current = null;
            console.log('🎵 Audio faded out');
          }
        }
      }, 100);
    }
    
    // Dark mode is already applied by MillenniumFalcon component during flight
    // Just update state and complete
    setIsLightMode(false);
    setIsRunning(false);
    console.log('✅ Easter Egg complete - Welcome to the dark side');
  };

  const handleRestoreNavbar = async () => {
    try {
      console.log('✨ Restoring navbar');
      setPhase('restoring');
      const { restoreNavbar } = await import('./NavbarDestruction');
      await restoreNavbar();
    } catch (e) {
      console.error('Failed to restore navbar:', e);
    }
  };

  return (
    <>
      {/* Dev Test Button - Only show in light mode */}
      {import.meta.env.DEV && isLightMode && (
        <button
          onClick={() => {
            console.log('🔘 Manual trigger');
            localStorage.removeItem('vaderEasterEggTriggered');
            window.dispatchEvent(new CustomEvent('vader:activate'));
          }}
          className="fixed bottom-4 right-4 z-[30000] bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700"
          style={{ fontSize: '14px', fontWeight: 'bold' }}
        >
          🎬 Test Vader
        </button>
      )}
      
      {/* Darth Vader Image - Enters from left side */}
      {showVader && (
        <div 
          className="fixed left-0 bottom-1/4 w-64 h-auto z-[10000] pointer-events-none vader-container"
          style={{
            animation: phase === 'vaderEnter' 
              ? 'vaderEnterFromLeft 1.5s ease-out forwards'
              : phase === 'forceControl'
              ? 'vaderForcePose 2s ease-in-out infinite'
              : 'none',
          }}
        >
          <div className="vader-idle-wrapper">
            <img 
              src="/darthvaderchoke1.png" 
              alt="Darth Vader"
              className="w-full h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 40px rgba(255, 0, 0, 0.5))',
                backgroundColor: 'transparent',
                mixBlendMode: 'normal'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Screen Effects */}
      {showScene && (
        <>
          {/* Red Flash Vignette */}
          <div 
            className="fixed inset-0 z-[9998] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(139, 0, 0, 0.6) 100%)',
              animation: 'vignettePulse 3s ease-in-out infinite'
            }}
          />
        </>
      )}
      
      {/* 3D Scene Overlay - Lava Storm */}
      {showScene && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Suspense fallback={null}>
            <Vader3DScene />
          </Suspense>
        </div>
      )}

      {/* Millennium Falcon */}
      {showFalcon && (
        <Suspense fallback={null}>
          <MillenniumFalcon 
            onComplete={handleFalconComplete}
            onRestoreNavbar={handleRestoreNavbar}
          />
        </Suspense>
      )}
      
      <style>{`
        @keyframes vaderEnterFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-300px) translateY(0) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }
        
        @keyframes vaderForcePose {
          0%, 100% {
            transform: translateX(0) translateY(0) scale(1);
          }
          50% {
            transform: translateX(10px) translateY(-5px) scale(1.05);
          }
        }
        
        @keyframes vignettePulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </>
  );
}
