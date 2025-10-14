import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { motion } from "framer-motion";
import { Cloud, Code, Database, Globe, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: "Frontend", icon: Globe, items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
    { name: "Backend", icon: Database, items: ["Node.js", "Python", "Java", "Express.js"] },
    { name: "Database", icon: Database, items: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"] },
    { name: "Cloud & DevOps", icon: Cloud, items: ["AWS", "Docker", "Git", "Linux"] },
    { name: "Technologies", icon: Code, items: ["IoT", "REST APIs", "GraphQL", "WebSockets"] },
    { name: "Tools", icon: Zap, items: ["VS Code", "Postman", "Figma", "Jira"] },
  ];

  const interests = [
    { name: "Writing Poems", emoji: "✍️" },
    { name: "Reading", emoji: "📚" },
    { name: "Astrophysics", emoji: "🌌" },
    { name: "Football", emoji: "⚽" },
    { name: "Photography", emoji: "📸" },
    { name: "Music", emoji: "🎵" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        {/* Introduction & Quick Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Intro */}
          {loading ? (
            <Box>
              {/* Profile Picture Skeleton */}
              <Skeleton variant="circular" width={120} height={120} sx={{ mb: 3 }} />
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="100%" height={25} />
              <Skeleton variant="text" width="90%" height={25} />
              <Skeleton variant="text" width="95%" height={25} />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col items-start"
            >
              {/* Profile Picture */}
              <img
                src="/aditya2.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-6 shadow-lg border-4 border-blue-500"
              />
             <h3 className="text-xl font-semibold">Passionate Developer & Problem Solver</h3>
<div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
  <p>
    I'm a dedicated software engineering student with a passion for creating innovative digital solutions...
  </p>
  <p>
    With experience in full-stack development, I enjoy working across the entire stack...
  </p>
  <p>
    When I'm not coding, you'll find me exploring the cosmos, writing poetry, or enjoying a game of Football & Supporting FC Barcelona.
  </p>
</div>
            </motion.div>
          )}

          {/* Right: Quick Facts */}
          {loading ? (
            <Box>
              <Skeleton variant="rectangular" width="100%" height={180} />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Facts</h4>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Aspiring Software Engineer</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Full-Stack Developer</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Tech Enthusiast</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>Continuous Learner</li>
                </ul>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
            </motion.div>
          )}
        </div>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <Box key={i} className="p-6">
                    <Skeleton variant="rectangular" width="100%" height={120} />
                  </Box>
                ))
              : skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
                        <skill.icon className="text-white" size={20} />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
          </div>
        </motion.div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Interests & Hobbies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <Skeleton key={i} variant="rounded" width={120} height={40} />
                ))
              : interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    viewport={{ once: true }}
                    className="flex items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-2xl mr-2">{interest.emoji}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {interest.name}
                    </span>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
