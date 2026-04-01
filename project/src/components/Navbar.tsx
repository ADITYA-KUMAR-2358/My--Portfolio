import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeSwitch from './ThemeSwitch';

const navItems = [
  { name: 'Home',       href: '#home'       },
  { name: 'About',      href: '#about'      },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects',   href: '#projects'   },
  { name: 'Contact',    href: '#contact'    },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('#home');

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      setActive(href);
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(8,12,20,0.88)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <motion.button
              onClick={() => scrollToSection('#home')}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 select-none group"
            >

              {/* name — two-tone */}
              <span style={{ fontFamily: "'Syne', sans-serif" }} className="text-[15px] font-bold">
                <span className="text-white">Aditya</span>
                {' '}
                <span style={{
                  background: 'linear-gradient(135deg,#818cf8,#38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Kumar
                </span>
              </span>
            </motion.button>

            {/* ── Desktop nav links ── */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.href;
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 group"
                    style={{
                      color: isActive ? '#e2e8f0' : 'rgba(148,163,184,0.75)',
                      fontFamily: "'DM Mono', monospace",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#cbd5e1'; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(148,163,184,0.75)'; }}
                  >
                    {/* active sliding pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'rgba(99,102,241,0.15)',
                          border: '1px solid rgba(99,102,241,0.28)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    {/* hover bg — non-active */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                        style={{ background: 'rgba(255,255,255,0.04)' }} />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* ── Right: ThemeSwitch + CTA + hamburger ── */}
            <div className="flex items-center gap-2">
              <ThemeSwitch />

              {/* hamburger */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.9 }}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen
                    ? <motion.span key="x"
                        initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <X size={17} className="text-slate-300" />
                      </motion.span>
                    : <motion.span key="menu"
                        initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Menu size={17} className="text-slate-300" />
                      </motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="md:hidden overflow-hidden"
              style={{
                background: 'rgba(8,12,20,0.97)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="max-w-6xl mx-auto px-5 py-3 space-y-0.5">
                {navItems.map((item, i) => {
                  const isActive = active === item.href;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-[13px] font-medium"
                      style={{
                        background: isActive ? 'rgba(99,102,241,0.12)' : 'transparent',
                        color: isActive ? '#a5b4fc' : 'rgba(148,163,184,0.85)',
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      {item.name}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </motion.button>
                  );
                })}

                {/* mobile hire me */}
                <div className="pt-2 pb-1">
                  <button
                    onClick={() => scrollToSection('#contact')}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#38bdf8)', fontFamily: "'DM Mono', monospace" }}
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* mobile backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.25)' }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;