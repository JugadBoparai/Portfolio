import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface CloudTransitionProps {
  isDarkMode: boolean;
  skipClouds?: boolean;
}

/**
 * CloudTransition Component
 * 
 * Displays a subtle cloud animation when transitioning to dark mode.
 * The cloud drifts from left to right across the screen during the transition.
 * 
 * @param isDarkMode - Boolean indicating if dark mode is active
 */
const CloudTransition = ({ isDarkMode, skipClouds = false }: CloudTransitionProps) => {
  const [showCloud, setShowCloud] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const isInitialMount = useRef(true);
  const previousDarkMode = useRef<boolean | null>(null);
  const [cloudsShownThisLoad, setCloudsShownThisLoad] = useState(false);

  useEffect(() => {
    // On initial mount, just record the current state and don't show clouds
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousDarkMode.current = isDarkMode;
      return;
    }

    // Skip cloud animation if flag is set (Vader easter egg)
    if (skipClouds) {
      previousDarkMode.current = isDarkMode;
      return;
    }

    // Skip if clouds have already been shown this page load
    if (cloudsShownThisLoad) {
      previousDarkMode.current = isDarkMode;
      return;
    }

    // Only trigger cloud animation when switching FROM light TO dark (user action only)
    // previousDarkMode.current must be explicitly false (light mode), not null or true
    const isUserTransitioningToDark = previousDarkMode.current === false && isDarkMode === true;
    
    if (isUserTransitioningToDark) {
      setShowCloud(true);
      setCloudsShownThisLoad(true);
      
      // Increment key to force animation restart
      setAnimationKey(prev => prev + 1);
      
      // Hide cloud after animation completes (4 seconds)
      const timer = setTimeout(() => {
        setShowCloud(false);
      }, 4000);

      previousDarkMode.current = isDarkMode;
      return () => clearTimeout(timer);
    }
    
    // Update previous state for next comparison
    previousDarkMode.current = isDarkMode;
  }, [isDarkMode, skipClouds, cloudsShownThisLoad]);

  return (
    <AnimatePresence mode="wait">
      {showCloud && (
        <>
          {/* Main large cloud - top position */}
          <motion.div
            key={`cloud-1-${animationKey}`}
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ 
              x: '110vw',
              opacity: [0, 0.8, 0.8, 0]
            }}
            exit={{ x: '110vw', opacity: 0 }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              opacity: {
                times: [0, 0.15, 0.85, 1],
                duration: 4
              }
            }}
            className="fixed top-[15%] left-0 pointer-events-none z-[100]"
            aria-hidden="true"
          >
            <svg
              width="350"
              height="140"
              viewBox="0 0 350 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Large cloud body */}
              <circle cx="70" cy="70" r="45" fill="#4B5563" opacity="0.7" />
              <circle cx="120" cy="65" r="50" fill="#4B5563" opacity="0.7" />
              <circle cx="170" cy="70" r="45" fill="#4B5563" opacity="0.7" />
              <circle cx="220" cy="68" r="42" fill="#4B5563" opacity="0.7" />
              <circle cx="265" cy="72" r="38" fill="#4B5563" opacity="0.7" />
              
              <circle cx="100" cy="75" r="35" fill="#6B7280" opacity="0.5" />
              <circle cx="190" cy="75" r="35" fill="#6B7280" opacity="0.5" />
              
              <circle cx="90" cy="55" r="25" fill="#9CA3AF" opacity="0.4" />
              <circle cx="210" cy="58" r="28" fill="#9CA3AF" opacity="0.4" />
            </svg>
          </motion.div>

          {/* Second large cloud - middle position */}
          <motion.div
            key={`cloud-2-${animationKey}`}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '110vw',
              opacity: [0, 0.7, 0.7, 0]
            }}
            exit={{ x: '110vw', opacity: 0 }}
            transition={{
              duration: 4.5,
              ease: 'easeInOut',
              delay: 0.3,
              opacity: {
                times: [0, 0.15, 0.85, 1],
                duration: 4.5
              }
            }}
            className="fixed top-[35%] left-0 pointer-events-none z-[100]"
            aria-hidden="true"
          >
            <svg
              width="300"
              height="120"
              viewBox="0 0 300 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl"
            >
              <circle cx="60" cy="60" r="38" fill="#4B5563" opacity="0.6" />
              <circle cx="105" cy="55" r="42" fill="#4B5563" opacity="0.6" />
              <circle cx="150" cy="60" r="38" fill="#4B5563" opacity="0.6" />
              <circle cx="195" cy="58" r="36" fill="#4B5563" opacity="0.6" />
              <circle cx="235" cy="62" r="32" fill="#4B5563" opacity="0.6" />
              
              <circle cx="85" cy="65" r="30" fill="#6B7280" opacity="0.4" />
              <circle cx="170" cy="65" r="30" fill="#6B7280" opacity="0.4" />
              
              <circle cx="75" cy="48" r="20" fill="#9CA3AF" opacity="0.3" />
              <circle cx="185" cy="50" r="22" fill="#9CA3AF" opacity="0.3" />
            </svg>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CloudTransition;
