import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code, Cpu, Download, Gamepad2, Github, Mail, Terminal, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const THEME = {
  dark: {
    bg: "#080c14", text: "#f8fafc", subtext: "#94a3b8", muted: "#64748b",
    accent: "#818cf8", cursor: "#38bdf8",
    primary:   { background: "transparent", border: "1.5px solid rgba(255,255,255,0.18)", color: "#f1f5f9", hoverBg: "rgba(255,255,255,0.07)" },
    secondary: { background: "transparent", border: "1.5px solid rgba(255,255,255,0.10)", color: "#94a3b8", hoverBg: "rgba(255,255,255,0.05)" },
    icon:  { bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" },
    chip:  { bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" },
    badge: { bg: "rgba(99,102,241,0.10)",  border: "1px solid rgba(99,102,241,0.30)",  color: "#a5b4fc" },
    scroll: { border: "#1e293b", dot: "#334155" },
    glow: "rgba(99,102,241,0.30)",
  },
  light: {
    bg: "#f4f6fb", text: "#0f172a", subtext: "#475569", muted: "#94a3b8",
    accent: "#6366f1", cursor: "#6366f1",
    primary:   { background: "transparent", border: "1.5px solid rgba(0,0,0,0.15)", color: "#0f172a", hoverBg: "rgba(0,0,0,0.05)" },
    secondary: { background: "transparent", border: "1.5px solid rgba(0,0,0,0.10)", color: "#475569", hoverBg: "rgba(0,0,0,0.04)" },
    icon:  { bg: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" },
    chip:  { bg: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)" },
    badge: { bg: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.20)", color: "#4f46e5" },
    scroll: { border: "#cbd5e1", dot: "#94a3b8" },
    glow: "rgba(99,102,241,0.15)",
  },
};

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx((c) => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function ParticleField({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const pts = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 55; i++) pts.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.4 + 0.3, dx: (Math.random() - 0.5) * 0.28, dy: (Math.random() - 0.5) * 0.28, o: Math.random() * 0.35 + 0.08 });
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dc = dark ? "148,163,184" : "100,116,139";
      pts.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dc},${p.o})`; ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(99,102,241,${0.08 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [dark]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  return (
    <motion.div ref={ref}
      onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d", perspective: 800 }}
    >{children}</motion.div>
  );
}

function StatChip({ value, label, delay, t }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl backdrop-blur-md"
      style={{ background: t.chip.bg, border: t.chip.border }}
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent font-mono">{value}</span>
      <span className="text-xs mt-0.5 tracking-wide" style={{ color: t.subtext }}>{label}</span>
    </motion.div>
  );
}

function HeroButton({ onClick, children, primary, t }) {
  const s = primary ? t.primary : t.secondary;
  const [hov, setHov] = useState(false);
  return (
    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? s.hoverBg : s.background, border: s.border, color: s.color, transition: "background 0.2s" }}
      className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm backdrop-blur-sm"
    >{children}</motion.button>
  );
}

const Hero = () => {
  const [dark, setDark] = useState(true);

  // sync with ThemeSwitch in Navbar (watches <html> class)
  useEffect(() => {
    const sync = () => setDark(!document.documentElement.classList.contains("light"));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const t = dark ? THEME.dark : THEME.light;
  const role = useTypewriter(["Software Engineer", "Full-Stack Developer", "Open Source Builder", "Problem Solver"]);

  const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/Aditya_resume.pdf"; a.download = "Aditya_Resume.pdf";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const floatingIcons = [
    { icon: Code,     top: "18%", left: "8%",  delay: 0.2 },
    { icon: Terminal, top: "72%", left: "6%",  delay: 0.6 },
    { icon: Cpu,      top: "15%", right: "7%", delay: 1.0 },
    { icon: Github,   top: "68%", right: "8%", delay: 1.4 },
    { icon: Gamepad2, top: "42%", left: "4%",  delay: 0.9 },
    { icon: Zap,      top: "38%", right: "5%", delay: 0.4 },
  ];

  return (
    <motion.section id="home" animate={{ backgroundColor: t.bg }} transition={{ duration: 0.35 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,${dark ? 0.18 : 0.07}), transparent)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 40% at 80% 80%, rgba(56,189,248,${dark ? 0.10 : 0.05}), transparent)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 40% 35% at 20% 70%, rgba(236,72,153,${dark ? 0.08 : 0.03}), transparent)` }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(128,128,128,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(128,128,128,0.07) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      <ParticleField dark={dark} />
      <motion.div animate={{ x: [0, 80, 0], y: [0, -60, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `rgba(99,102,241,${dark ? 0.09 : 0.05})` }} />
      <motion.div animate={{ x: [0, -60, 0], y: [0, 80, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: `rgba(56,189,248,${dark ? 0.07 : 0.04})` }} />

      {/* floating icons */}
      {floatingIcons.map(({ icon: Icon, top, left, right, delay }, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -12, 0] }}
          transition={{ delay, duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute hidden lg:flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-sm"
          style={{ top, left, right, background: t.icon.bg, border: t.icon.border }}
        >
          <Icon size={20} style={{ color: dark ? "rgba(125,211,252,0.6)" : "rgba(99,102,241,0.65)" }} />
        </motion.div>
      ))}

      {/* content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* profile image */}
        <TiltCard>
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    className="relative inline-block mb-6 mt-16"
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute -inset-2 rounded-full"
      style={{
        background: "conic-gradient(from 0deg,#6366f1,#38bdf8,#ec4899,#6366f1)",
        padding: "2px",
        borderRadius: "9999px",
        WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
    <div className="absolute inset-0 rounded-full blur-xl scale-110" style={{ background: t.glow }} />
    <div className="relative w-36 h-36 rounded-full p-[3px] bg-gradient-to-br from-indigo-500 via-sky-400 to-pink-500">
      <div className="w-full h-full rounded-full overflow-hidden" style={{ background: dark ? "#0f172a" : "#f1f5f9" }}>
        <img src="/aditya3.jpg" alt="Aditya Kumar" className="w-full h-full object-cover rounded-full" />
      </div>
    </div>
  </motion.div>
</TiltCard>

        {/* greeting */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-base tracking-[0.2em] uppercase mb-2 font-light"
          style={{ fontFamily: "'DM Mono',monospace", color: t.muted }}
        >Hello, I'm</motion.p>

        {/* name */}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="text-4xl md:text-5xl font-black tracking-tight mb-4 leading-none"
          style={{ fontFamily: "'Syne',sans-serif", color: t.text }}
        >
          Aditya{" "}
          <span style={{ background: "linear-gradient(135deg,#6366f1 0%,#38bdf8 50%,#ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Kumar
          </span>
        </motion.h1>

        {/* ── badge right below the name ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
          style={{ background: t.badge.bg, border: t.badge.border, color: t.badge.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* typewriter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-xl md:text-2xl mb-6 h-9"
          style={{ fontFamily: "'DM Mono',monospace", color: t.subtext }}
        >
          <span style={{ color: t.accent }}>~/</span>
          <span>{role}</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }}
            className="w-0.5 h-6 inline-block" style={{ background: t.cursor }}
          />
        </motion.div>

        {/* description */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.7 }}
          className="text-lg max-w-xl mx-auto leading-relaxed mb-10" style={{ color: t.subtext }}
        >
          B.Tech CSE @ PCU Pune · Building full-stack products, AI-powered tools, and solving{" "}
          <span style={{ color: dark ? "#38bdf8" : "#0284c7", fontWeight: 600 }}>300+ competitive programming</span> challenges.
        </motion.p>

        {/* stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <StatChip value="300+" label="Problems Solved" delay={1.2} t={t} />
          <StatChip value="1352" label="CF Max Rating"   delay={1.3} t={t} />
          <StatChip value="8.65" label="CGPA"            delay={1.4} t={t} />
          <StatChip value="3+"   label="Projects Shipped" delay={1.5} t={t} />
        </motion.div>

        {/* buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <HeroButton onClick={downloadResume} primary t={t}>
            <Download size={17} /> Download Resume
          </HeroButton>
          <HeroButton onClick={scrollToContact} t={t}>
            <Mail size={17} /> Contact Me
          </HeroButton>
        </motion.div>

        {/* scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
          className="mt-16 flex flex-col items-center gap-1 text-xs tracking-widest uppercase" style={{ color: t.muted }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: `1px solid ${t.scroll.border}` }}
          >
            <div className="w-1 h-1.5 rounded-full" style={{ background: t.scroll.dot }} />
          </motion.div>
          scroll
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;