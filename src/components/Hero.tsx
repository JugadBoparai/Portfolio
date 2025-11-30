import { motion } from 'framer-motion';
import NeuralNetwork from './NeuralNetwork';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-500">
      {/* Neural Network Animation */}
      <NeuralNetwork />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-screen py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 leading-tight"
          >
            <div className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-gray-700 dark:text-gray-400 mb-4">
              Jugad Singh
            </div>
            <div className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-orange-500 dark:to-amber-500 bg-clip-text text-transparent leading-none pb-2">
              Boparai
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-semibold mb-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-orange-500 dark:via-orange-400 dark:to-yellow-500 bg-clip-text text-transparent leading-tight"
          >
            AI Engineer & Machine Learning Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about building intelligent systems that shape the future.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(6, 182, 212, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToAbout}
            className="px-8 sm:px-10 min-h-12 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-orange-500 dark:to-orange-600 text-white text-lg font-semibold rounded-full shadow-xl hover:from-cyan-700 hover:to-blue-700 dark:hover:from-orange-600 dark:hover:to-orange-700 transition-all duration-300"
          >
            Learn About Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-600 dark:text-gray-400"
          >
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
