import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 dark:bg-[#0b1020] text-white py-8 transition-colors duration-500"
    >
      <div className="container mx-auto px-6 text-center">
        <p className="flex items-center justify-center gap-2 text-gray-400 dark:text-gray-500 transition-colors duration-500">
          Made with <FaHeart className="text-red-500" /> by Jugad Boparai
        </p>
        <p className="text-gray-500 dark:text-gray-600 text-sm mt-2 transition-colors duration-500">
          © {currentYear} All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
