import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { HiOutlineMoon, HiMoon, HiOutlineSun, HiSun } from 'react-icons/hi';

interface VaderToggleProps {
  isDarkMode: boolean;
  onToggle: (skipClouds?: boolean) => void;
}

const VaderToggle = ({ isDarkMode, onToggle }: VaderToggleProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showVaderImage, setShowVaderImage] = useState(false);
  const [showVaderAnimation, setShowVaderAnimation] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [vaderTriggered, setVaderTriggered] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);
  const vaderImageTimerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio('/darth-vader.mp3');
    audioRef.current.volume = 0.4;
  }, []);

  useEffect(() => {
    if (isHovering && !isDarkMode && !vaderTriggered) {
      // Start hover timer
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 5000, 1); // 5 seconds

        if (progress >= 1) {
          clearInterval(interval);
          // Show Vader image when hover is complete
          setShowVaderImage(true);
        }
      }, 50);

      hoverTimerRef.current = interval as unknown as number;
    } else {
      // Reset progress if not hovering, but DON'T hide Vader image if it's already showing
      if (hoverTimerRef.current) {
        clearInterval(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
    }

    return () => {
      if (hoverTimerRef.current) {
        clearInterval(hoverTimerRef.current);
      }
      if (vaderImageTimerRef.current) {
        clearTimeout(vaderImageTimerRef.current);
      }
    };
  }, [isHovering, isDarkMode, vaderTriggered]);

  // Separate effect to auto-hide Vader image after 5 seconds
  useEffect(() => {
    if (showVaderImage) {
      const hideTimer = setTimeout(() => {
        setShowVaderImage(false);
      }, 5000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [showVaderImage]);

  const handleClick = () => {
    // If Vader image is showing and not triggered before, play easter egg
    if (showVaderImage && !vaderTriggered) {
      triggerVaderEasterEgg();
    } else {
      // Normal toggle
      onToggle();
    }
  };

  const triggerVaderEasterEgg = () => {
    // Prevent multiple triggers across loads - mark in localStorage
    try {
      const already = localStorage.getItem('vaderEasterEggTriggered');
      console.log('🎬 Vader Easter Egg triggered! Already triggered:', already);
      if (already === 'true') {
        // If already triggered, just toggle theme normally
        console.log('⚠️ Easter Egg already triggered this session, toggling theme normally');
        onToggle(true);
        return;
      }
      localStorage.setItem('vaderEasterEggTriggered', 'true');
    } catch (e) {
      // localStorage may be blocked; continue anyway
      console.warn('Could not access localStorage for Vader flag', e);
    }

    // Mark as triggered for this page load
    setVaderTriggered(true);

    // Dispatch a global event so a central controller can run the cinematic sequence
    try {
      console.log('🔥 Dispatching vader:activate event');
      window.dispatchEvent(new CustomEvent('vader:activate'));
    } catch (e) {
      console.warn('Could not dispatch vader:activate event', e);
    }

    // Keep the small local visuals here, but defer the heavy audio/3D to the central controller
    setShowVaderAnimation(true);
    setTimeout(() => setShowQuote(true), 800);
    setTimeout(() => setShowQuote(false), 2200);

    // Also toggle theme after the cinematic (kept for compatibility)
    setTimeout(() => {
      onToggle(true); // true = skip clouds
      setShowVaderAnimation(false);
    }, 2500);
  };

  const isMorphed = showVaderImage && !vaderTriggered;

  return (
    <>
      {/* Main Toggle Button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative text-gray-500 dark:text-gray-300 transition-all text-xl p-2 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-6 h-6"
            >
              <HiOutlineSun className="absolute inset-0 text-2xl transition-opacity duration-300 group-hover:opacity-0" />
              <HiSun className="absolute inset-0 text-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ 
                rotate: 0, 
                opacity: 1,
                scale: isMorphed ? 1.1 : 1,
              }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-6 h-6"
            >
              {/* Moon Icon */}
              <motion.div
                animate={{ 
                  opacity: isMorphed ? 0 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <HiOutlineMoon className="text-2xl transition-opacity duration-300 group-hover:opacity-0" />
                <HiMoon className="text-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0" />
              </motion.div>

              {/* Vader Image Morph */}
              {showVaderImage && !vaderTriggered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <img 
                    src="/darth-vader.png" 
                    alt="Vader"
                    className="w-6 h-6 object-contain"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Vader Easter Egg Animation */}
      <AnimatePresence>
        {showVaderAnimation && (
          <>
            {/* Dramatic White Flash (like lightning) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0, 1, 0, 0.8, 0, 1, 0.5, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1.2,
                times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 1],
                ease: "easeInOut",
              }}
              className="fixed inset-0 bg-white pointer-events-none z-[10002]"
            />

            {/* Red warning flash */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 0.7, 0, 0.6, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.3, 0.4, 0.5, 0.7, 1],
              }}
              className="fixed inset-0 bg-red-900 pointer-events-none z-[10001]"
            />

            {/* Darkness creeping in from edges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0, 0.5, 0.8, 0.9, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.2, 0.5, 0.8, 0.95, 1],
              }}
              className="fixed inset-0 pointer-events-none z-[10000]"
              style={{
                background: 'radial-gradient(circle at center, transparent 0%, transparent 20%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,1) 100%)',
              }}
            />

            {/* Intense screen shake */}
            <motion.div
              className="fixed inset-0 pointer-events-none z-[9999]"
              animate={{
                x: [0, -20, 20, -15, 15, -20, 20, -10, 10, -15, 15, 0],
                y: [0, -10, 10, -15, 15, -10, 10, -8, 8, -5, 5, 0],
                rotate: [0, -2, 2, -1.5, 1.5, -2, 2, -1, 1, 0],
              }}
              transition={{
                duration: 1.0,
                delay: 0.4,
                ease: "easeInOut",
              }}
            />

            {/* Vader silhouette - LARGER and more menacing */}
            <motion.div
              initial={{ x: '-120%', opacity: 0, scale: 0.5 }}
              animate={{ 
                x: ['clamp(-120%, 15vw, 80px)', 'clamp(-120%, 15vw, 80px)'],
                opacity: [0, 0, 1, 1, 1, 0],
                scale: [0.5, 0.5, 1.2, 1.2, 1.2, 0.8],
              }}
              transition={{ 
                duration: 2.5,
                times: [0, 0.1, 0.3, 0.7, 0.9, 1],
                ease: "easeOut",
              }}
              className="fixed left-0 top-1/2 -translate-y-1/2 z-[10003] pointer-events-none"
            >
              {/* Vader SVG - MUCH LARGER */}
              <svg
                viewBox="0 0 200 300"
                className="w-64 h-96 drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(255, 0, 0, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 0, 0.5))',
                }}
              >
                {/* Helmet */}
                <path
                  d="M100 50 L70 80 L70 130 L60 160 L60 200 L80 220 L120 220 L140 200 L140 160 L130 130 L130 80 Z"
                  fill="#0a0a0a"
                  stroke="#ff0000"
                  strokeWidth="3"
                />
                {/* Mask line */}
                <path d="M70 130 L130 130" stroke="#ff0000" strokeWidth="4" />
                {/* Eyes - GLOWING RED */}
                <motion.circle 
                  cx="85" 
                  cy="110" 
                  r="10" 
                  fill="#ff0000"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle 
                  cx="115" 
                  cy="110" 
                  r="10" 
                  fill="#ff0000"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Eye glow */}
                <motion.circle 
                  cx="85" 
                  cy="110" 
                  r="15" 
                  fill="#ff0000"
                  opacity="0.3"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                />
                <motion.circle 
                  cx="115" 
                  cy="110" 
                  r="15" 
                  fill="#ff0000"
                  opacity="0.3"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                />
                {/* Breathing apparatus */}
                <path d="M95 150 L105 150 L100 170 Z" fill="#333" stroke="#ff0000" strokeWidth="2" />
                <rect x="90" y="170" width="20" height="30" fill="#1a1a1a" rx="3" stroke="#ff0000" strokeWidth="2" />
                {/* Cape - flowing */}
                <path
                  d="M70 180 L50 280 L150 280 L130 180"
                  fill="#000"
                  opacity="0.9"
                />
              </svg>

              {/* Massive Force push shockwave */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 3, 5],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 right-0 -translate-y-1/2"
              >
                <div className="w-48 h-48 rounded-full border-8 border-red-600" 
                  style={{
                    boxShadow: '0 0 60px rgba(255, 0, 0, 0.8), inset 0 0 60px rgba(255, 0, 0, 0.5)',
                  }}
                />
              </motion.div>

              {/* Multiple Force push rings */}
              {[0, 0.15, 0.3].map((delay, index) => (
                <motion.div
                  key={`ring-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 4],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 + delay,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2"
                >
                  <div className="w-48 h-48 rounded-full border-4 border-red-500" />
                </motion.div>
              ))}

              {/* Force energy particles - MORE and FASTER */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{
                    x: [0, 150 + i * 30],
                    y: [0, (i % 2 === 0 ? 1 : -1) * (30 + i * 8)],
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1.5, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.03,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-red-600 rounded-full"
                  style={{
                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                  }}
                />
              ))}

              {/* Lightning cracks from Vader */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`lightning-${i}`}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleX: [0, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ff0000, transparent)',
                    transformOrigin: 'left',
                    transform: `rotate(${i * 30 - 60}deg)`,
                    boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
                  }}
                />
              ))}
            </motion.div>

            {/* Quote - LARGER and more dramatic */}
            <AnimatePresence>
              {showQuote && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                  }}
                  exit={{ opacity: 0, scale: 1.5, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="fixed top-1/3 left-1/2 -translate-x-1/2 z-[10004] pointer-events-none"
                >
                  <motion.p 
                    className="text-3xl md:text-5xl font-bold text-red-600 drop-shadow-lg text-center px-4"
                    style={{
                      textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4)',
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.1em',
                      fontWeight: 900,
                    }}
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
                        '0 0 30px rgba(255, 0, 0, 1), 0 0 60px rgba(255, 0, 0, 0.8)',
                        '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6)',
                      ],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    "You don't know the power of the dark side"
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VaderToggle;
