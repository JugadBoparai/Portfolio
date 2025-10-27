import { motion } from 'framer-motion';
import { FaCode, FaShieldAlt, FaBrain, FaRocket, FaLightbulb, FaHeart } from 'react-icons/fa';

const About = () => {
  const highlights = [
    {
      icon: <FaShieldAlt />,
      title: "Cybersecurity Expert",
      description: "Specializing in threat detection, security analysis, and building resilient systems"
    },
    {
      icon: <FaBrain />,
      title: "AI Enthusiast",
      description: "Developing intelligent solutions using machine learning, computer vision, and NLP"
    },
    {
      icon: <FaCode />,
      title: "Full-Stack Developer",
      description: "Creating seamless end-to-end applications with modern technologies"
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
    <section id="about" className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Me
          </h2>
          
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary p-1"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">JB</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-700"
          >
            <p className="text-xl leading-relaxed">
              Hi! I'm <span className="font-bold text-primary">Jugad Singh Boparai</span>, 
              a passionate technologist at the intersection of <span className="font-semibold text-secondary">Cybersecurity</span>, 
              <span className="font-semibold text-secondary"> Computer Science</span>, and 
              <span className="font-semibold text-secondary"> Artificial Intelligence</span>.
            </p>
            
            <p className="leading-relaxed">
              My journey in technology began with a simple curiosity about how things work—from the code that powers our applications 
              to the security mechanisms that protect them. Today, I channel that curiosity into building innovative solutions 
              that bridge the gap between cutting-edge AI and robust security practices.
            </p>

            <p className="leading-relaxed">
              I believe in the power of technology to transform lives and solve real-world problems. Whether it's developing 
              intelligent systems that can understand and process human language, creating secure applications that protect sensitive data, 
              or building computer vision models that can see and interpret the world around us—I'm driven by the impact these 
              technologies can have.
            </p>

            <p className="leading-relaxed">
              Beyond the code, I'm an avid learner who thrives on staying ahead of the curve in this rapidly evolving field. 
              I enjoy collaborating with other passionate individuals, sharing knowledge, and contributing to projects that push 
              the boundaries of what's possible.
            </p>
          </motion.div>
        </motion.div>

        {/* What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">What I Do</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">
                  {highlight.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800 text-center">
                  {highlight.title}
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
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
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">What Drives Me</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl shadow-lg text-white text-center"
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
          <p className="text-2xl font-semibold text-primary mb-4">
            Let's Build Something Amazing Together!
          </p>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you have a project in mind, need consultation, or just want to connect—I'm always 
            excited to collaborate and explore new opportunities.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
