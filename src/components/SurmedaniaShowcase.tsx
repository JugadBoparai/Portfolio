import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaMobileAlt, FaDesktop, FaCode, FaRocket } from 'react-icons/fa';
import { SiVite, SiTailwindcss, SiVercel, SiReact, SiNodedotjs } from 'react-icons/si';

const SurmedaniaShowcase = () => {
  const [viewMode, setViewMode] = useState<'both' | 'desktop' | 'mobile'>('both');

  const features = [
    "Multi-language support (EN/NO/PA)",
    "Class registration & calendar system",
    "E-commerce with Vipps payment integration",
    "Admin dashboard with analytics",
    "Responsive design (mobile-first)",
    "Event management & gallery",
    "Google Sheets integration for data",
    "PWA capabilities"
  ];

  const technologies = [
    { name: "React", icon: SiReact },
    { name: "Vite", icon: SiVite },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Vercel", icon: SiVercel },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 md:col-span-2"
    >
      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
        {/* Project Badge */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-orange-500/30 dark:to-amber-500/30 rounded-full border border-primary/30 dark:border-orange-500/30">
            <FaCode className="text-primary dark:text-orange-400" size={16} />
            <span className="text-sm font-semibold text-primary dark:text-orange-400">Built by Me</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30">
            <FaRocket className="text-green-600 dark:text-green-400" size={16} />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Live Production</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-gray-100 transition-colors duration-500">
              Surmedania.com
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mb-3">
              <span className="font-semibold text-gray-800 dark:text-gray-200">Full-Stack Project:</span> I designed and developed this complete dance school platform from scratch, 
              building both the frontend and backend infrastructure. Features include responsive design, 
              multi-language support (EN/NO/PA), class registration system, e-commerce with Vipps payment integration, 
              and a comprehensive admin dashboard with real-time analytics.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Full-stack development • Solo project • Production-ready
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://github.com/jugadboparai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FaGithub /> Code
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://surmedania.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white rounded-lg hover:opacity-90 transition-all duration-300"
            >
              <FaExternalLinkAlt /> Live Site
            </motion.a>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-6 flex flex-wrap gap-3">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-orange-500/20 dark:to-amber-500/20 rounded-lg"
              >
                <Icon className="text-primary dark:text-orange-400" size={18} />
                <span className="text-primary dark:text-orange-400 text-sm font-medium">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="px-6 md:px-8 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('both')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              viewMode === 'both'
                ? 'bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Both Views
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              viewMode === 'desktop'
                ? 'bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaDesktop size={14} /> Desktop
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
              viewMode === 'mobile'
                ? 'bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <FaMobileAlt size={14} /> Mobile
          </button>
        </div>
      </div>

      {/* Screenshot Display */}
      <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          {/* Desktop View */}
          {(viewMode === 'both' || viewMode === 'desktop') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Browser Frame */}
                <div className="bg-white dark:bg-gray-700 rounded-t-lg border border-gray-300 dark:border-gray-600 p-2 shadow-lg">
                  <div className="flex gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                    surmedania.com
                  </div>
                </div>
                {/* Desktop Screenshot */}
                <div className="relative w-full max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-b-lg shadow-2xl overflow-hidden border-x border-b border-gray-300 dark:border-gray-600">
                  <img
                    src="/assets/surmedania-dashboard.png"
                    alt="Surmedania Desktop View"
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Desktop View
                </div>
              </div>
            </motion.div>
          )}

          {/* Mobile View */}
          {(viewMode === 'both' || viewMode === 'mobile') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: viewMode === 'both' ? 0.1 : 0 }}
              className="flex-shrink-0"
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative w-64 md:w-80 mx-auto">
                  {/* Phone Bezel */}
                  <div className="absolute inset-0 bg-black rounded-[2.5rem] p-2 shadow-2xl">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                    <div className="bg-white dark:bg-gray-700 rounded-[2rem] h-full overflow-hidden">
                      {/* Mobile Screenshot - Same image but will appear smaller */}
                      <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-700">
                        <img
                          src="/assets/surmedania-dashboard.png"
                          alt="Surmedania Mobile View"
                          className="w-full h-auto object-cover object-top"
                          loading="lazy"
                        />
                        {/* Mobile view overlay to show it's a mobile-optimized view */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-transparent pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Mobile View
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Features List */}
      <div className="p-6 md:p-8 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">What I Built</h4>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Accomplishments Section */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-orange-500/10 dark:to-amber-500/10 rounded-xl p-6 border border-primary/20 dark:border-orange-500/20">
          <h4 className="text-lg font-bold mb-3 text-gray-800 dark:text-gray-100">Key Accomplishments</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-primary dark:text-orange-400 mb-1">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Full-Stack Development</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary dark:text-orange-400 mb-1">3</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Languages Supported</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary dark:text-orange-400 mb-1">✓</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Production Deployed</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SurmedaniaShowcase;

