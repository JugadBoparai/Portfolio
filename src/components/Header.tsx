import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import CloudTransition from './CloudTransition';
import VaderToggle from './VaderToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [skipClouds, setSkipClouds] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Check for saved theme preference, default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = (skipCloudsAnimation = false) => {
    const newDarkMode = !isDarkMode;
    
    if (skipCloudsAnimation) {
      // Instant theme change for Vader (no clouds, no delay)
      // Set skip flag FIRST before changing isDarkMode
      setSkipClouds(true);
      
      // Use setTimeout to ensure skipClouds is set before isDarkMode changes
      setTimeout(() => {
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          const meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute('content', '#0b1020');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          const meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute('content', '#ffffff');
        }
        setIsDarkMode(newDarkMode);
        
        // Reset flag after animation would have completed
        setTimeout(() => setSkipClouds(false), 200);
      }, 0);
    } else {
      // Normal toggle with clouds - ensure skipClouds is false
      setSkipClouds(false);
      setIsDarkMode(newDarkMode);
      
      setTimeout(() => {
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          const meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute('content', '#0b1020');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          const meta = document.querySelector('meta[name="theme-color"]');
          if (meta) meta.setAttribute('content', '#ffffff');
        }
      }, 300);
    }
  };

  useEffect(() => {
    // Set home as active when at top of page
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    // Create intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['about', 'projects', 'skills', 'resume', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = ['About', 'Projects', 'Skills', 'Resume', 'Contact'];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = (document.activeElement as HTMLElement) || null;
      const container = menuRef.current;
      if (!container) return;

      const getFocusable = () =>
        Array.from(container.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

      const focusables = getFocusable();
      if (focusables.length) focusables[0].focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          setIsOpen(false);
          return;
        }
        if (e.key === 'Tab') {
          const items = getFocusable();
          if (!items.length) return;
          const first = items[0];
          const last = items[items.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
      // restore focus to the menu button when menu closes
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      } else if (prevFocusRef.current) {
        prevFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Cloud transition animation for dark mode */}
      <CloudTransition isDarkMode={isDarkMode} skipClouds={skipClouds} />
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 backdrop-blur-md z-50"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'transparent',
          boxShadow: 'none',
          borderBottom: 'none',
          border: 'none',
          outline: 'none',
      }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="relative cursor-pointer"
            aria-label="Scroll to top"
          >
            <Logo isActive={activeSection === 'home'} />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                onClick={() => scrollToSection(item)}
                className={`transition-colors font-medium ${
                  activeSection === item.toLowerCase()
                    ? 'text-cyan-500 dark:text-orange-500'
                    : 'text-gray-500 hover:text-cyan-400 dark:text-gray-300 dark:hover:text-orange-400'
                }`}
              >
                {item}
              </motion.button>
            ))}
            
            {/* Theme Toggle Button with Vader Easter Egg */}
            <VaderToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <VaderToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            <button
              id="mobile-menu-button"
              ref={menuButtonRef}
              className="text-gray-500 dark:text-gray-300 text-2xl min-h-12 px-3"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4"
            id="mobile-menu"
            role="menu"
            ref={menuRef}
          >
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                role="menuitem"
                className={`w-full text-left min-h-12 px-4 flex items-center transition-colors ${
                  activeSection === item.toLowerCase()
                    ? 'text-cyan-500 font-semibold dark:text-orange-500'
                    : 'text-gray-700 hover:text-cyan-600 dark:text-gray-200 dark:hover:text-orange-400'
                }`}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
    </>
  );
};

export default Header;
