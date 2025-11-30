import { motion } from 'framer-motion';
import { FaCode, FaShieldAlt, FaBrain, FaRocket, FaLightbulb, FaHeart } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaBrain />,
      title: "AI Engineer",
      description: "Developing intelligent solutions using machine learning, computer vision, and NLP"
    },
    {
      icon: <FaCode />,
      title: "Full-Stack Developer",
      description: "Creating seamless end-to-end applications with modern technologies"
    },
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity Expert",
      description: "Specializing in threat detection, security analysis, and building resilient systems"
    }
  ];

  const values = [
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "Constantly exploring cutting-edge technologies and pushing boundaries"
    },
    {
      icon: <FaLightbulb />,
      title: "Problem Solving",
      description: "Transforming complex challenges into elegant, practical solutions"
    },
    {
      icon: <FaHeart />,
      title: "Impact",
      description: "Building technology that makes a meaningful difference in people's lives"
    }
  ];

  return (
    <section id="about" className="cv-auto bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 py-20 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* Hero Section with Background Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <motion.img 
                src="/assets/About.jpg" 
                alt="Jugad Singh Boparai" 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70 dark:from-gray-950/95 dark:via-gray-950/85 dark:to-gray-950/70" />
              
              {/* Animated accent gradient */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 dark:from-orange-500/20 dark:to-amber-500/20"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 py-20 px-8 md:px-16">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent"
              >
                About Me
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg text-gray-100 max-w-3xl"
              >
                <p className="text-2xl leading-relaxed font-semibold">
                  Hi! I'm <span className="text-cyan-400 dark:text-orange-400">Jugad Singh Boparai</span>, 
                  a technologist at the intersection of{' '}
                  <span className="text-green-400 dark:text-amber-400">Cybersecurity</span>,{' '}
                  <span className="text-blue-400 dark:text-amber-400">Computer Science</span>, and{' '}
                  <span className="text-cyan-400 dark:text-orange-400">Artificial Intelligence</span>.
                </p>
                
                <p className="leading-relaxed text-gray-200">
                 I’m especially passionate about <span className="font-semibold text-cyan-400 dark:text-orange-400">Artificial Intelligence</span> and emerging technologies, and I’d say my biggest strength is <span className="font-semibold">creativity</span>. I love finding unique solutions to challenging problems. I focus on <span className="font-semibold">machine learning, computer vision, and AI-driven applications</span>, combining technical skills with imaginative thinking to build projects that are both innovative and practical.
                </p>

                <p className="leading-relaxed text-gray-200 mt-4">
                Outside of coding, I love <span className="font-semibold">playing and watching football</span> and staying <span className="font-semibold">competitive in chess</span>, always looking for new strategies and challenges. I’m constantly exploring new AI ideas and enjoy creating interactive experiences that make technology exciting and easy to engage with.
                </p>
              </motion.div>

              {/* Decorative accent bar */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 dark:from-orange-400 dark:via-amber-400 dark:to-orange-400 mt-8 rounded-full max-w-md"
              />
            </div>
          </div>
        </motion.div>

        {/* What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">What I Do</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl text-primary dark:text-orange-400 mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 text-center">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">What Drives Me</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary to-secondary dark:from-orange-600 dark:to-amber-700 p-8 rounded-2xl shadow-lg text-white text-center transition-colors duration-500"
              >
                <div className="text-4xl mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">
                  {value.title}
                </h4>
                <p className="leading-relaxed opacity-90">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-2xl font-semibold text-primary dark:text-orange-400 mb-4">
            Let's Build Something Amazing Together!
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Whether you have a project in mind, need consultation, or just want to connect—I'm always 
            excited to collaborate and explore new opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
