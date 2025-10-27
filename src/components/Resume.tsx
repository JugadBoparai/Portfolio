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
    <section id="resume" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resume
          </h2>
          
          <p className="text-gray-600 text-lg mb-8">
            Download my resume to learn more about my experience, education, and qualifications.
          </p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-12 shadow-lg"
          >
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <FaDownload className="text-5xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Jugad Boparai
              </h3>
              <p className="text-gray-600 mb-6">
                Cybersecurity | Computer Science | AI Specialist
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-3"
            >
              <FaDownload />
              Download Resume
            </motion.button>

            <p className="text-sm text-gray-500 mt-6">
              PDF Format • Last Updated: October 2025
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
