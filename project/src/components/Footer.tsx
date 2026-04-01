import { motion } from 'framer-motion';
import { ArrowUp, Github, Heart, Instagram, Linkedin, Mail } from 'lucide-react';
import React from 'react';

const socialLinks = [
  { icon: Github,    href: "https://github.com/ADITYA-KUMAR-2358",                label: "GitHub",    color: "#f1f5f9" },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/aditya-kumar-09848b292/", label: "LinkedIn",  color: "#38bdf8" },
  { icon: Instagram, href: "https://instagram.com/bezaar_adi",                    label: "Instagram", color: "#ec4899" },
  { icon: Mail,      href: "mailto:aditya.kumar23@pcu.edu.in",                    label: "Email",     color: "#10b981" },
];

const quickLinks = [
  { name: 'Home',       href: '#home'       },
  { name: 'About',      href: '#about'      },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Contact',    href: '#contact'    },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#05080f' }}
    >
      {/* ── top border gradient ── */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(56,189,248,0.5), transparent)' }}
      />

      {/* ── background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full blur-[100px] bg-indigo-600/[0.06]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[250px] rounded-full blur-[90px]  bg-sky-600/[0.05]" />
      </div>

      {/* ── grid overlay ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-0">

        {/* ── main grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >

          {/* brand — 5 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-5">
            {/* logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#6366f1,#38bdf8)' }}>
                A
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
                Aditya Kumar
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(148,163,184,0.75)' }}>
              B.Tech CSE student · Full-stack developer · Competitive programmer.
              Building things that matter, one commit at a time.
            </p>

            {/* social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors duration-150"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(148,163,184,0.7)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = s.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.7)')}
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* availability badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
              style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.20)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* quick links — 3 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-5"
              style={{ color: 'rgba(148,163,184,0.5)', fontFamily: "'DM Mono', monospace" }}>
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: 4 }}
                    className="text-sm transition-colors duration-150 flex items-center gap-2 group"
                    style={{ color: 'rgba(148,163,184,0.7)', fontFamily: "'DM Mono', monospace" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#e2e8f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(148,163,184,0.7)')}
                  >
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* contact — 4 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-4">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold mb-5"
              style={{ color: 'rgba(148,163,184,0.5)', fontFamily: "'DM Mono', monospace" }}>
              Get In Touch
            </h4>

            <p className="text-sm mb-5" style={{ color: 'rgba(148,163,184,0.7)' }}>
              Got a project, opportunity, or just want to say hi? My inbox is always open.
            </p>

            <motion.a
              href="mailto:aditya.kumar23@pcu.edu.in"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#38bdf8)', boxShadow: '0 0 16px rgba(99,102,241,0.25)' }}
            >
              <Mail size={15} />
              Say Hello
            </motion.a>

            
          </motion.div>
        </motion.div>

        {/* ── bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs flex items-center gap-1.5"
            style={{ color: 'rgba(100,116,139,0.7)', fontFamily: "'DM Mono', monospace" }}
          >
            © {year} Aditya Kumar · Built with
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-red-500 inline-flex"
            >
              <Heart size={12} fill="currentColor" />
            </motion.span>
            &amp; and lots of coffee
          </motion.p>

          {/* scroll to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.93 }}
            aria-label="Scroll to top"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-150"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(148,163,184,0.7)',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <ArrowUp size={13} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;