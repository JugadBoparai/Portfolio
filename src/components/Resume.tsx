import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const Resume = () => {
  const handleDownload = () => {
    // In production, replace this with your actual resume PDF URL
    const link = document.createElement('a');
    link.href = '/JugadBoparaiCV.pdf';
    link.download = 'Jugad_Boparai_CV.pdf';
    link.click();
  };

  return (
    <section id="resume" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary dark:from-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
            Resume
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 transition-colors duration-500">
            Download my resume to learn more about my experience, education, and qualifications.
          </p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg transition-colors duration-500"
          >
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary dark:from-orange-500 dark:to-amber-600 rounded-full flex items-center justify-center transition-colors duration-500">
                <FaDownload className="text-5xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-500">
                Jugad Boparai
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-500">
                Artificial Intelligence | Computer Science | Cybersecurity
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
            >
              <FaDownload />
              Download Resume
            </motion.button>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 transition-colors duration-500">
              PDF Format • Last Updated: October 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
