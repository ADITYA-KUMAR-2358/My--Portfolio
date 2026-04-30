"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  year: string;
  tag: string;
  title: string;
  bullets: string[];
}

const TAG_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Secondary School":    { bg: "rgba(251,191,36,0.08)",  text: "#fbbf24", dot: "#fbbf24" },
  "Higher Secondary":    { bg: "rgba(251,191,36,0.08)",  text: "#fbbf24", dot: "#fbbf24" },
  "University · Year 1": { bg: "rgba(99,102,241,0.10)",  text: "#818cf8", dot: "#818cf8" },
  "University · Year 2": { bg: "rgba(56,189,248,0.10)",  text: "#38bdf8", dot: "#38bdf8" },
  "University · Year 3": { bg: "rgba(52,211,153,0.10)",  text: "#34d399", dot: "#34d399" },
};

function TimelineCard({ item, index }: { item: TimelineEntry; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = TAG_COLORS[item.tag] ?? { bg: "rgba(99,102,241,0.10)", text: "#818cf8", dot: "#818cf8" };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-0 relative"
      style={{ paddingTop: index === 0 ? "0" : "2.5rem" }}
    >
      {/* ── Year stamp (left gutter) ── */}
      <div className="hidden md:flex flex-col items-end pr-8 pt-1"
        style={{ width: "110px", flexShrink: 0 }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.2 }}
          className="font-bold tracking-tight tabular-nums"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1rem",
            background: `linear-gradient(135deg, ${color.text}, rgba(148,163,184,0.6))`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {item.year}
        </motion.span>
      </div>

      {/* ── Node ── */}
      <div className="flex flex-col items-center" style={{ width: "28px", flexShrink: 0, marginTop: "2px" }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.1, type: "spring", stiffness: 260, damping: 20 }}
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: "28px", height: "28px",
            background: `radial-gradient(circle at 35% 35%, ${color.dot}33, ${color.dot}11)`,
            border: `1.5px solid ${color.dot}55`,
            boxShadow: hovered ? `0 0 16px ${color.dot}44` : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: color.dot, opacity: 0.9 }} />
        </motion.div>
      </div>

      {/* ── Card ── */}
      <div className="flex-1 ml-5 mb-1">
        {/* Mobile year */}
        <span className="md:hidden text-xs font-bold mb-1 block"
          style={{ fontFamily: "'DM Mono',monospace", color: color.text }}>
          {item.year}
        </span>

        <motion.div
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{ borderColor: hovered ? `${color.dot}30` : "rgba(255,255,255,0.06)" }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Subtle glow on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${color.dot}08, transparent)` }}
          />

          {/* Tag + title */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-widest uppercase"
              style={{
                fontFamily: "'DM Mono',monospace",
                background: color.bg,
                color: color.text,
                border: `1px solid ${color.dot}22`,
              }}>
              {item.tag}
            </span>
          </div>

          <h3 className="font-bold mb-3 leading-snug"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1rem",
              color: "#f1f5f9",
            }}>
            {item.title}
          </h3>

          {/* Divider */}
          <div className="mb-3 h-px" style={{ background: `linear-gradient(90deg, ${color.dot}30, transparent)` }} />

          {/* Bullets */}
          <ul className="space-y-2">
            {item.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <span className="mt-[7px] flex-shrink-0 rounded-full"
                  style={{ width: "5px", height: "5px", background: color.dot, opacity: 0.7 }} />
                <span className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref           = useRef<HTMLDivElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => { if (ref.current) setHeight(ref.current.offsetHeight); };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const lineH   = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineO   = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative" style={{ background: "#080c14" }}>

      {/* top fade */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #080c14, transparent)" }} />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-24">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-3 block"
            style={{ fontFamily: "'DM Mono',monospace", color: "rgba(99,102,241,0.7)" }}>
            Journey so far
          </span>
          <h2 className="font-black leading-none"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              letterSpacing: "-0.02em",
              background: "linear-gradient(135deg, #f1f5f9 30%, rgba(148,163,184,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Experience &amp;<br />Education
          </h2>
        </motion.div>

        {/* ── Cards + line ── */}
        <div ref={ref} className="relative" style={{ paddingLeft: "0" }}>

          {/* Track line (background) */}
          <div
            className="absolute top-0 w-px"
            style={{
              left: "calc(110px + 14px)",
              height,
              background: "rgba(255,255,255,0.05)",
            }}
          />
          {/* track line mobile */}
          <div
            className="md:hidden absolute top-0 w-px"
            style={{
              left: "14px",
              height,
              background: "rgba(255,255,255,0.05)",
            }}
          />

          {/* Animated fill line desktop */}
          <div
            className="hidden md:block absolute top-0 w-px overflow-hidden"
            style={{ left: "calc(110px + 14px)", height }}
          >
            <motion.div style={{ height: lineH, opacity: lineO }}
              className="w-full bg-gradient-to-b from-indigo-500 via-sky-400 to-emerald-400" />
          </div>

          {/* Animated fill line mobile */}
          <div
            className="md:hidden absolute top-0 w-px overflow-hidden"
            style={{ left: "14px", height }}
          >
            <motion.div style={{ height: lineH, opacity: lineO }}
              className="w-full bg-gradient-to-b from-indigo-500 via-sky-400 to-emerald-400" />
          </div>

          {data.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}

        </div>
      </div>
    </div>
  );
};