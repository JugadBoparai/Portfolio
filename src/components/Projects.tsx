import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "AI-Powered Threat Detection System",
      description: "Developed a machine learning model to detect and classify cybersecurity threats in real-time, achieving 95% accuracy using advanced NLP techniques.",
      technologies: ["Python", "TensorFlow", "NLP", "Cybersecurity"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#"
    },
    {
      title: "Computer Vision Object Recognition",
      description: "Built a deep learning system for real-time object detection and classification with 98% accuracy on custom datasets.",
      technologies: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#"
    },
    {
      title: "Intelligent Chatbot Platform",
      description: "Created an NLP-based conversational AI that understands context and provides intelligent responses using transformer models.",
      technologies: ["Python", "Transformers", "NLP", "React"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#"
    },
    {
      title: "Full-Stack Portfolio Dashboard",
      description: "Designed and developed a comprehensive admin dashboard with real-time analytics, user management, and data visualization.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-gray-600 text-lg">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <FaGithub /> Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <FaExternalLinkAlt /> Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
