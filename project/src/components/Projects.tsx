import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Github, Star, Users } from 'lucide-react';
import React from 'react';

const Projects: React.FC = () => {
  const projects = [
    // 🔹 Projects Section
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard. Features include user authentication, shopping cart, order tracking, and responsive design.",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 42, forks: 18, contributors: 3 },
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking. Built with modern technologies for optimal performance.",
      image:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 28, forks: 12, contributors: 2 },
    },
    {
      title: "IoT Weather Station",
      description:
        "Smart weather monitoring system with IoT sensors, real-time data visualization, and mobile app integration. Collects environmental data and provides weather predictions.",
      image:
        "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Python", "Arduino", "InfluxDB", "Grafana", "React"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 35, forks: 22, contributors: 1 },
    },
    {
      title: "AI Chat Application",
      description:
        "Intelligent chat application with AI-powered responses, natural language processing, and real-time messaging. Features include conversation history and personalized responses.",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "OpenAI API", "Socket.io", "Express", "MongoDB"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 56, forks: 31, contributors: 4 },
    },
    {
      title: "Portfolio Website",
      description:
        "Modern, responsive portfolio website with smooth animations, dark mode support, and optimized performance. Showcases projects and professional experience effectively.",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 19, forks: 8, contributors: 1 },
    },
    {
      title: "Expense Tracker",
      description:
        "Comprehensive expense tracking application with budget management, category-wise analysis, and financial insights. Helps users manage their finances effectively.",
      image:
        "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React Native", "Firebase", "Chart.js", "Expo"],
      github: "https://github.com",
      demo: "https://example.com",
      stats: { stars: 24, forks: 15, contributors: 2 },
    },

    // 🔹 Certificates Section
  
    {
      title: "Agile with Atlassian Jira Project Management",
      description:
        "Alternate issued certificate for Agile Project Management course using Jira.",
      file: "/Coursera Agile Project Management.pdf",
    },
    {
      title: "Blockchain Specialization Certificate",
      description:
        "Certificate of completion for Blockchain specialization as part of CSE B.Tech program.",
      file: "/Coursera BlockChain All.pdf",
    },
    {
      title: "Red Hat Training Certificate",
      description:
        "Certification for completing Red Hat training.",
      file: "/RedHatApplicationDevelopmentIProgramminginJavaEEAD183-RHA-Ver.7.0_Badge20250601-27-dbv5va.pdf",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects and certificates that showcase
              my skills and achievements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* ✅ Image only for projects */}
                {project.image && (
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* ✅ Show project stats & tech stack only for projects */}
                  {project.stats && (
                    <>
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork size={14} />
                          <span>{project.stats.forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{project.stats.contributors}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ✅ Buttons for project / certificate */}
                  <div className="flex gap-3">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gray-900 dark:bg-gray-700 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </motion.a>
                    )}
                    {project.file && (
                      <motion.a
                        href={project.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={16} />
                        View Certificate
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
