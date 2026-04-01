import { motion } from "framer-motion";
import {
  Cloud, Code, Database, Globe,
  GraduationCap,
  Heart,
  MapPin,
  Trophy,
  Zap,
} from "lucide-react";

/* ── skill data ── */
const skills = [
  { name: "Frontend",      icon: Globe,    color: "#6366f1", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
  { name: "Backend",       icon: Database, color: "#0ea5e9", items: ["Node.js", "Python", "Java", "Express.js"] },
  { name: "Database",      icon: Database, color: "#10b981", items: ["MySQL", "MongoDB", "PostgreSQL", "Firebase"] },
  { name: "Cloud & DevOps",icon: Cloud,    color: "#f59e0b", items: ["AWS", "Docker", "Git", "Linux"] },
  { name: "Technologies",  icon: Code,     color: "#ec4899", items: ["IoT", "REST APIs", "GraphQL", "WebSockets"] },
  { name: "Tools",         icon: Zap,      color: "#8b5cf6", items: ["VS Code", "Postman", "Figma", "Jira"] },
];

const interests = [
  { name: "Writing Poems", emoji: "✍️" },
  { name: "Reading",       emoji: "📚" },
  { name: "Astrophysics",  emoji: "🌌" },
  { name: "Football",      emoji: "⚽" },
  { name: "Photography",   emoji: "📸" },
  { name: "Music",         emoji: "🎵" },
];

const facts = [
  { icon: GraduationCap, label: "B.Tech CSE @ PCU Pune",         color: "#6366f1" },
  { icon: Trophy,        label: "Codeforces Pupil · Rating 1352", color: "#f59e0b" },
  { icon: MapPin,        label: "Gorakhpur → Pune, India",        color: "#10b981" },
  { icon: Heart,         label: "FC Barcelona fan · Poet · Stargazer", color: "#ec4899" },
];

/* ── animation helpers ── */
const fadeUp  = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } };

/* ── SkillCard ── */
function SkillCard({ skill, index }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl p-5 overflow-hidden
                 bg-white/60 dark:bg-white/[0.04]
                 border border-black/[0.07] dark:border-white/[0.08]
                 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* accent top-line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: skill.color }}
      />

      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${skill.color}18` }}>
          <skill.icon size={18} style={{ color: skill.color }} />
        </div>
        <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 tracking-wide">
          {skill.name}
        </h4>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-lg text-xs font-medium
                       bg-gray-100/80 dark:bg-white/[0.06]
                       text-gray-600 dark:text-gray-300
                       border border-black/[0.05] dark:border-white/[0.06]"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── InterestPill ── */
function InterestPill({ interest, index }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
      className="flex items-center gap-2 px-4 py-2.5 rounded-full
                 bg-white/70 dark:bg-white/[0.05]
                 border border-black/[0.07] dark:border-white/[0.08]
                 backdrop-blur-sm shadow-sm cursor-default select-none"
    >
      <span className="text-xl leading-none">{interest.emoji}</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {interest.name}
      </span>
    </motion.div>
  );
}

/* ── Main About ── */
const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-[#f8fafc] dark:bg-[#080c14] overflow-hidden"
    >
      {/* ── subtle background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-400/[0.07] dark:bg-indigo-600/[0.10]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-400/[0.06] dark:bg-sky-600/[0.08]" />
      </div>

      {/* ── grid overlay ── */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section title ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}>
            get to know me
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            About <span style={{
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>Me</span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
        </motion.div>

        {/* ── Bio + Facts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20 items-start">

          {/* Left bio — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-6"
          >
            {/* profile row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="relative flex-shrink-0 self-start sm:self-auto">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden
                                ring-2 ring-indigo-500/40 shadow-lg">
                  <img src="/aditya.jpg" alt="Aditya Kumar"
                    className="w-full h-full object-cover" />
                </div>
                {/* online dot */}
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#080c14]" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Passionate Developer &amp; Problem Solver
                </h3>
                <p className="text-sm text-indigo-500 dark:text-indigo-400 mt-1 font-medium"
                  style={{ fontFamily: "'DM Mono', monospace" }}>
                  B.Tech CSE · PCU Pune · 2023–Present
                </p>
              </div>
            </div>

            {/* paragraphs */}
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
              <p>
                I'm a dedicated software engineering student with a passion for creating
                innovative digital solutions. My journey in tech started with curiosity
                and has grown into a deep commitment to building things that matter.
              </p>
              <p>
                With experience across the full stack — from crafting pixel-perfect UIs
                to architecting scalable backends and AI-powered pipelines — I thrive on
                solving hard problems end-to-end.
              </p>
              <p>
                When I'm not coding, you'll find me exploring the cosmos, writing poetry,
                or cheering for{" "}
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">FC Barcelona</span>{" "}
                on match day.
              </p>
            </div>

            {/* stat row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { val: "300+", lbl: "Problems" },
                { val: "1352", lbl: "CF Rating" },
                { val: "8.65", lbl: "CGPA" },
              ].map(({ val, lbl }) => (
                <div key={lbl}
                  className="flex flex-col items-center py-3 rounded-xl
                             bg-white/70 dark:bg-white/[0.04]
                             border border-black/[0.06] dark:border-white/[0.07]
                             backdrop-blur-sm">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent font-mono">
                    {val}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{lbl}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right quick facts — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl overflow-hidden
                            bg-white/70 dark:bg-white/[0.04]
                            border border-black/[0.07] dark:border-white/[0.08]
                            backdrop-blur-sm shadow-sm">
              <div className="px-6 pt-6 pb-2 border-b border-black/[0.05] dark:border-white/[0.06]">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide"
                  style={{ fontFamily: "'Syne', sans-serif" }}>
                  Quick Facts
                </h4>
              </div>
              <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.05]">
                {facts.map(({ icon: Icon, label, color }) => (
                  <li key={label} className="flex items-center gap-3 px-6 py-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18` }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 leading-snug">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* availability badge */}
              <div className="px-6 py-4 border-t border-black/[0.04] dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Open to internships &amp; opportunities
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Technical Skills ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              what I work with
            </p>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Technical Skills
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ── Interests ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-2"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              beyond the keyboard
            </p>
            <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Interests &amp; Hobbies
            </h3>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3">
            {interests.map((interest, i) => (
              <InterestPill key={interest.name} interest={interest} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;