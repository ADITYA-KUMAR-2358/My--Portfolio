import { motion, useInView } from "framer-motion";
import { Github, Heart, Instagram, Linkedin, } from "lucide-react";
import { useEffect, useRef } from "react";

const T = {
  bg:      "#080c14",
  text:    "#f8fafc",
  subtext: "#94a3b8",
  muted:   "#64748b",
  chip:  { bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" },
};

function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let id: number;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 28 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      r: Math.random() * 1.1 + 0.3,
      dx: (Math.random() - .5) * .2, dy: (Math.random() - .5) * .2,
      o: Math.random() * .2 + .05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > c.width)  p.dx *= -1;
        if (p.y < 0 || p.y > c.height) p.dy *= -1;
      });
      for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 85) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${.05*(1-d/85)})`; ctx.lineWidth = .5; ctx.stroke();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

const socials = [
  { icon: Github,    href: "https://github.com/ADITYA-KUMAR-2358",                label: "GitHub"    },
  { icon: Linkedin,  href: "https://www.linkedin.com/in/aditya-kumar-09848b292/", label: "LinkedIn"  },
  { icon: Instagram, href: "https://instagram.com/bezaar_adi",                    label: "Instagram" },
];

const navLinks = [
  { name: "Home",       href: "#home"       },
  { name: "About",      href: "#about"      },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects"   },
  { name: "Contact",    href: "#contact"    },
];

const MARQUEE = ["Full-Stack Dev", "·", "Competitive Programmer", "·", "Open Source", "·", "B.Tech CSE @PCET", "·", "Tech Enthusiast", "·", "Problem Solver", "·"];

const Footer = () => {
  const year   = new Date().getFullYear();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: T.bg }}>

      {/* grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(128,128,128,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.07) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(99,102,241,0.09),transparent)" }} />

      <ParticleField />

      {/* top hairline */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(56,189,248,0.5),transparent)" }} />

      {/* ── Ghost name + marquee ── */}
      <div className="relative z-10 pt-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4 mb-5"
        >
          <h2
            className="font-black leading-none select-none"
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "clamp(2.8rem, 11vw, 8.5rem)",
              background: "linear-gradient(135deg,rgba(241,245,249,0.10) 0%,rgba(241,245,249,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Aditya Kumar
          </h2>
        </motion.div>

        {/* marquee */}
        <div className="relative w-full overflow-hidden py-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="text-[10px] font-medium tracking-[0.18em] uppercase"
                style={{
                  fontFamily: "'DM Mono',monospace",
                  color: item === "·" ? "rgba(99,102,241,0.55)" : T.muted,
                }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── CTA row (no Say Hello button) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-7"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-sm" style={{ color: T.subtext }}>
            Got a project or opportunity? My inbox is open.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.20)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-xs font-medium text-emerald-400 whitespace-nowrap" style={{ fontFamily: "'DM Mono',monospace" }}>
              Open to opportunities
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-5 flex flex-col gap-4"
      >
        {/* Nav + socials: stacked on mobile, side-by-side on sm+ */}
        <div className="flex flex-col gap-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>

          <nav className="flex flex-wrap gap-1.5">
            {navLinks.map(link => (
              <motion.button key={link.name} onClick={() => scrollTo(link.href)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 whitespace-nowrap"
                style={{ color: T.muted, fontFamily: "'DM Mono',monospace", background: T.chip.bg, border: T.chip.border }}
                onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = T.chip.bg; }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {socials.map(s => (
              <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.1 }} whileTap={{ scale: 0.92 }}
                aria-label={s.label}
                className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 flex-shrink-0"
                style={{ background: T.chip.bg, border: T.chip.border, color: T.muted }}
                onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = T.chip.bg; }}
              >
                <s.icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom: copyright stacked above back-to-top on mobile, side-by-side on sm+ */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

          <div
            className="flex items-center gap-1 whitespace-nowrap overflow-hidden"
            style={{ color: T.muted, fontFamily: "'DM Mono',monospace", fontSize: "0.65rem", minWidth: 0 }}
          >
            <span>© {year} Aditya&nbsp;Kumar&nbsp;·&nbsp;made&nbsp;with&nbsp;lots&nbsp;of</span>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.3, repeat: Infinity }}
              className="inline-block text-red-500 flex-shrink-0"
            >
              <Heart size={9} fill="currentColor" style={{ verticalAlign: "middle" }} />
            </motion.span>
            <span>&amp;&nbsp;coffee</span>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-150 self-start sm:self-auto flex-shrink-0 whitespace-nowrap"
            style={{ background: T.chip.bg, border: T.chip.border, color: T.muted, fontFamily: "'DM Mono',monospace" }}
            onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.background = "rgba(99,102,241,0.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = T.chip.bg; }}
          >
            ↑ back to top
          </motion.button>

        </div>
      </motion.div>

    </footer>
  );
};

export default Footer;