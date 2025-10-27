import { motion } from 'framer-motion';
import { 
  FaPython, 
  FaReact, 
  FaGitAlt, 
  FaDocker,
  FaBrain,
  FaComments,
  FaLightbulb,
  FaUsers
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiPytorch, 
  SiOpencv, 
  SiTypescript,
  SiJavascript,
  SiNodedotjs
} from 'react-icons/si';
import type { ReactElement } from 'react';

interface Skill {
  name: string;
  icon: ReactElement;
  category: 'technical' | 'soft';
}

const Skills = () => {
  const technicalSkills: Skill[] = [
    { name: 'Python', icon: <FaPython />, category: 'technical' },
    { name: 'Machine Learning', icon: <FaBrain />, category: 'technical' },
    { name: 'TensorFlow', icon: <SiTensorflow />, category: 'technical' },
    { name: 'PyTorch', icon: <SiPytorch />, category: 'technical' },
    { name: 'Computer Vision', icon: <SiOpencv />, category: 'technical' },
    { name: 'NLP', icon: <FaComments />, category: 'technical' },
    { name: 'React', icon: <FaReact />, category: 'technical' },
    { name: 'TypeScript', icon: <SiTypescript />, category: 'technical' },
    { name: 'JavaScript', icon: <SiJavascript />, category: 'technical' },
    { name: 'Node.js', icon: <SiNodedotjs />, category: 'technical' },
    { name: 'Git', icon: <FaGitAlt />, category: 'technical' },
    { name: 'Docker', icon: <FaDocker />, category: 'technical' }
  ];

  const softSkills: Skill[] = [
    { name: 'Leadership', icon: <FaUsers />, category: 'soft' },
    { name: 'Critical Thinking', icon: <FaLightbulb />, category: 'soft' },
    { name: 'Communication', icon: <FaComments />, category: 'soft' },
    { name: 'Problem Solving', icon: <FaBrain />, category: 'soft' }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Skills
          </h2>
          <p className="text-gray-600 text-lg">Technologies and expertise I bring to the table</p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Technical Skills */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-3 text-primary flex justify-center">
                    {skill.icon}
                  </div>
                  <p className="text-center font-semibold text-gray-800">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Soft Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="text-5xl mb-3 text-secondary flex justify-center">
                    {skill.icon}
                  </div>
                  <p className="text-center font-semibold text-gray-800">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
