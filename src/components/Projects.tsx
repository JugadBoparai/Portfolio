import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import AppShowcase from './AppShowcase';

type Category = 'Enterprise Solutions' | 'Full-Stack Applications' | 'AI & ML';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  category: Category[];
  isShowcase?: boolean;
  appUrl?: string;
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const buildSrcSet = (url: string) => {
    const widths = [480, 768, 1024, 1280];
    return widths
      .map((w) => url.replace(/w=\d+/, `w=${w}`))
      .join(', ');
  };

  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px';

  const categories: Category[] = ['Enterprise Solutions', 'Full-Stack Applications', 'AI & ML'];

  const projects: Project[] = [
    {
      title: "Kassi.no",
      description: "Advanced POS system with comprehensive business management features, payment processing, inventory management, and real-time analytics. Built as a complete enterprise solution similar to Favrit.",
      technologies: ["React", "TypeScript", "Node.js", "Payment Integration", "POS System"],
      image: "/assets/surmedania-dashboard.png",
      github: "https://github.com/jugadboparai",
      demo: "https://kassi.no",
      category: ['Enterprise Solutions'],
      isShowcase: true,
      appUrl: "https://kassi.no"
    },
    {
      title: "Surmedania.com",
      description: "A responsive dance school website featuring class sign-ups, user account functions, and integrated merch payments",
      technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      image: "/assets/surmedania-dashboard.png",
      github: "https://github.com/jugadboparai",
      demo: "https://surmedania.com",
      category: ['Full-Stack Applications'],
      isShowcase: true,
      appUrl: "https://surmedania.com"
    },
    {
      title: "AI-Powered Threat Detection System",
      description: "Developed a machine learning model to detect and classify cybersecurity threats in real-time, achieving 95% accuracy using advanced NLP techniques.",
      technologies: ["Python", "TensorFlow", "NLP", "Cybersecurity"],
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#",
      category: ['AI & ML']
    },
    {
      title: "Computer Vision Object Recognition",
      description: "Built a deep learning system for real-time object detection and classification with 98% accuracy on custom datasets.",
      technologies: ["Python", "PyTorch", "OpenCV", "Computer Vision"],
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#",
      category: ['AI & ML']
    },
    {
      title: "Intelligent Chatbot Platform",
      description: "Created an NLP-based conversational AI that understands context and provides intelligent responses using transformer models.",
      technologies: ["Python", "Transformers", "NLP", "React"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#",
      category: ['AI & ML']
    },
    {
      title: "Full-Stack Portfolio Dashboard",
      description: "Designed and developed a comprehensive admin dashboard with real-time analytics, user management, and data visualization.",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/jugadboparai",
      demo: "#",
      category: ['Full-Stack Applications']
    }
  ];

  const filteredProjects = activeCategory 
    ? projects.filter(project => project.category.includes(activeCategory))
    : [];

  return (
    <section id="projects" className="cv-auto py-6 sm:py-8 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-primary to-secondary dark:from-orange-400 dark:to-amber-500 bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base transition-colors duration-500 mb-4">Some of my recent work</p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white shadow-md scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {!activeCategory && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <span>Please select a category to view projects.</span>
            </div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto">
          {/* Showcase Projects */}
          {filteredProjects.filter(p => p.isShowcase).length > 0 && (
            <div className="mb-8 space-y-8">
              {filteredProjects
                .filter(project => project.isShowcase)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                          {project.title}
                        </h3>
                        <div className="flex gap-2 flex-shrink-0 ml-4">
                          {project.github && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
                            >
                              <FaGithub />
                            </motion.a>
                          )}
                          {project.demo && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-2.5 py-1 text-xs bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white rounded-md hover:opacity-90 transition-all duration-300"
                            >
                              <FaExternalLinkAlt />
                            </motion.a>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-orange-500/20 dark:to-amber-500/20 text-primary dark:text-orange-400 text-xs rounded-md font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                    {project.appUrl && (
                      <div className="-mx-4 -mb-4">
                        <AppShowcase 
                          appUrl={project.appUrl}
                          desktopLabel="Desktop View"
                          mobileLabel="Mobile View"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          )}

          {/* Regular project cards */}
          {filteredProjects.filter(p => !p.isShowcase).length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredProjects
                .filter(project => !project.isShowcase)
                .map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  srcSet={buildSrcSet(project.image)}
                  sizes={sizes}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-500">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-orange-500/20 dark:to-amber-500/20 text-primary dark:text-orange-400 text-sm rounded-full font-medium transition-colors duration-500"
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
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
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
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary dark:from-orange-500 dark:to-amber-600 text-white rounded-lg hover:opacity-90 transition-all duration-300"
                    >
                      <FaExternalLinkAlt /> Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
