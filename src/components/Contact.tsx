import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formDataObj = new FormData(e.currentTarget);
    formDataObj.append("access_key", "8f51ccbf-de45-4666-a273-c9c3617a0baf");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();

      if (data.success) {
        setStatus('✅ Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('❌ Something went wrong. Please try again or email me directly.');
      }
    } catch (error) {
      setStatus('❌ Network error. Please try again or email me directly at Jugadboparai@gmail.com');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 7000);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-secondary dark:from-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg transition-colors duration-500">
            Let's connect and discuss how we can work together
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 transition-colors duration-500">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-500">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, 
                creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-6">
              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                href="mailto:Jugadboparai@gmail.com"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 rounded-lg flex items-center justify-center text-white text-2xl transition-colors duration-500">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-500">Email</p>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">Jugadboparai@gmail.com</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                href="https://linkedin.com/in/jugad-singh-boparai-145646264"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 rounded-lg flex items-center justify-center text-white text-2xl transition-colors duration-500">
                  <FaLinkedin />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-500">LinkedIn</p>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">linkedin.com/in/jugad-singh-boparai-145646264</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                href="https://github.com/jugadboparai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-500"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 rounded-lg flex items-center justify-center text-white text-2xl transition-colors duration-500">
                  <FaGithub />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-500">GitHub</p>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-500">github.com/jugadboparai</p>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6 transition-colors duration-500">
              {/* Honeypot field for spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 transition-colors duration-500">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-orange-500 transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 transition-colors duration-500">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-orange-500 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-semibold mb-2 transition-colors duration-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-orange-500 transition-all duration-300 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center font-semibold ${
                    status.includes('✅') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {status}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
