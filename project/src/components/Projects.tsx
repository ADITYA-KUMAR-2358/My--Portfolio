import { motion } from 'framer-motion';
import { Award, ExternalLink, GitFork, Github, Star, Users } from 'lucide-react';
import React from 'react';

/* ── data ── */
const projects = [
  {
    title: "NotSoCold",
    description:
      "Chrome Extension automating LinkedIn cold outreach — scrapes recruiter profiles, generates AI-personalized messages via OpenAI GPT API, and bulk-opens role-specific job search URLs.",
    tags: ["JavaScript", "OpenAI API", "Chrome Extension", "Express.js", "Node.js"],
    github: "https://github.com/ADITYA-KUMAR-2358/NotSoCold",
    demo: null,
    accent: "#6366f1",
    stats: { stars: 12, forks: 4, contributors: 1 },
  },
  {
    title: "ASK M.I.R.A.G.E",
    description:
      "Fully offline RAG chatbot using LangChain + LLaMA + FAISS for sub-second semantic search across 100+ page PDFs. 100% on-device processing — zero data sent externally.",
    tags: ["Python", "LangChain", "LLaMA", "FAISS", "Flask", "SentenceTransformer"],
    github: "https://github.com/ADITYA-KUMAR-2358/Ask-Mirage-2.0",
    demo: null,
    accent: "#0ea5e9",
    stats: { stars: 18, forks: 6, contributors: 1 },
  },
  {
    title: "Giggity",
    description:
      "Full-stack real-time chat application on Firebase Realtime Database with bi-directional messaging under 200ms latency, animated UI, session isolation, and Procfile-based cloud deployment.",
    tags: ["JavaScript", "Firebase", "Python", "REST API", "HTML/CSS"],
    github: "https://github.com/ADITYA-KUMAR-2358/Giggity",
    demo: null,
    accent: "#10b981",
    stats: { stars: 9, forks: 3, contributors: 1 },
  },
];

const certificates = [
  {
    title: "Agile with Atlassian Jira",
    issuer: "Coursera",
    description: "Agile Project Management using Jira — sprint planning, backlog grooming, and team workflows.",
    file: "/Coursera Agile Project Management.pdf",
    accent: "#6366f1",
  },
  {
    title: "Blockchain Specialization",
    issuer: "Coursera",
    description: "Blockchain fundamentals, smart contracts, and decentralized application architecture.",
    file: "/Coursera BlockChain All.pdf",
    accent: "#f59e0b",
  },
  {
    title: "Red Hat Application Development",
    issuer: "Red Hat",
    description: "Programming in Java EE (AD183) — enterprise app development on Red Hat platform.",
    file: "/RedHatApplicationDevelopmentIProgramminginJavaEEAD183-RHA-Ver.7.0_Badge20250601-27-dbv5va.pdf",
    accent: "#ef4444",
  },
];

/* ── animation presets ── */
const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

/* ── section header ── */
function SectionHeader({ label, title, highlight, subtitle }: {
  label: string; title: string; highlight: string; subtitle: string;
}) {
  return (
    <motion.div variants={fadeUp} className="mb-12">
      <p className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-3"
        style={{ fontFamily: "'DM Mono', monospace" }}>
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}>
        {title}{" "}
        <span style={{
          background: "linear-gradient(135deg,#6366f1,#38bdf8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          {highlight}
        </span>
      </h2>
      <div className="mt-3 w-10 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">{subtitle}</p>
    </motion.div>
  );
}

/* ── project card ── */
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden
                 bg-white/60 dark:bg-white/[0.04]
                 border border-black/[0.07] dark:border-white/[0.08]
                 backdrop-blur-sm shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* accent top bar */}
      <div className="h-[3px] w-full" style={{ background: project.accent }} />

      {/* number watermark */}
      <span
        className="absolute top-4 right-4 text-5xl font-black leading-none select-none pointer-events-none"
        style={{ color: `${project.accent}14`, fontFamily: "'Syne', sans-serif" }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex flex-col flex-1 p-5 md:p-6 gap-4">
        {/* title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug pr-10"
          style={{ fontFamily: "'Syne', sans-serif" }}>
          {project.title}
        </h3>

        {/* description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 line-clamp-4">
          {project.description}
        </p>

        {/* stats */}
        <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(148,163,184,0.8)', fontFamily: "'DM Mono', monospace" }}>
          <span className="flex items-center gap-1"><Star size={11} />{project.stats.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={11} />{project.stats.forks}</span>
          <span className="flex items-center gap-1"><Users size={11} />{project.stats.contributors}</span>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t}
              className="px-2.5 py-1 rounded-lg text-xs font-medium
                         bg-gray-100/80 dark:bg-white/[0.06]
                         text-gray-600 dark:text-gray-300
                         border border-black/[0.05] dark:border-white/[0.06]">
              {t}
            </span>
          ))}
        </div>

        {/* buttons */}
        <div className="flex gap-2 pt-1">
          {project.github && (
            <motion.a
              href={project.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-150"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: '#e2e8f0',
              }}
            >
              <Github size={14} /> Source Code
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: `linear-gradient(135deg, ${project.accent}, #38bdf8)` }}
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── certificate card ── */
function CertCard({ cert }: { cert: typeof certificates[0] }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex items-start gap-4 p-5 rounded-2xl
                 bg-white/60 dark:bg-white/[0.04]
                 border border-black/[0.07] dark:border-white/[0.08]
                 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* icon */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `${cert.accent}18` }}>
        <Award size={18} style={{ color: cert.accent }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {cert.title}
          </h4>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
            style={{
              background: `${cert.accent}15`,
              border: `1px solid ${cert.accent}30`,
              color: cert.accent,
              fontFamily: "'DM Mono', monospace",
            }}>
            {cert.issuer}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
          {cert.description}
        </p>

        <motion.a
          href={cert.file} target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150"
          style={{ color: cert.accent }}
        >
          <ExternalLink size={12} /> View Certificate
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ── main component ── */
const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 bg-[#f8fafc] dark:bg-[#080c14] overflow-hidden">

      {/* ── background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4  w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-400/[0.07] dark:bg-indigo-600/[0.10]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-400/[0.06]    dark:bg-sky-600/[0.08]" />
      </div>

      {/* ── grid ── */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── page title ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            what I've built
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Projects &{" "}
            <span style={{
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Certificates
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
        </motion.div>

        {/* ── projects ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-20"
        >
          <SectionHeader
            label="featured work"
            title="My"
            highlight="Projects"
            subtitle="Real-world applications I've designed and shipped — from AI-powered tools to full-stack web apps."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </motion.div>

        {/* ── certificates ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SectionHeader
            label="credentials"
            title="My"
            highlight="Certificates"
            subtitle="Professional certifications and course completions that complement my hands-on experience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((c) => <CertCard key={c.title} cert={c} />)}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;