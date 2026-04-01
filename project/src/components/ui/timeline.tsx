// ─── ui/timeline.tsx ──────────────────────────────────────────────
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  year: string;
  tag: string;
  title: string;
  bullets: string[];
}

/* ── single entry card ── */
function TimelineCard({ item, index }: { item: TimelineEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="flex gap-6 md:gap-10 pt-10 md:pt-16 group"
    >
      {/* ── left: year + dot ── */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-14 md:w-28">
        {/* dot */}
        <div className="sticky top-40 flex flex-col items-center">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center z-10 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              boxShadow: "0 0 16px rgba(99,102,241,0.35)",
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          {/* year label — desktop */}
          <span
            className="hidden md:block mt-3 text-3xl font-black leading-none text-center"
            style={{
              fontFamily: "'Syne', sans-serif",
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {item.year}
          </span>
        </div>
      </div>

      {/* ── right: card ── */}
      <div
        className="flex-1 mb-2 rounded-2xl p-5 md:p-6 transition-shadow duration-300
                   bg-white/60 dark:bg-white/[0.04]
                   border border-black/[0.07] dark:border-white/[0.08]
                   backdrop-blur-sm shadow-sm hover:shadow-md"
      >
        {/* year — mobile */}
        <span
          className="md:hidden inline-block text-lg font-black mb-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            background: "linear-gradient(135deg,#6366f1,#38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {item.year}
        </span>

        {/* tag + title */}
        <div className="mb-4">
          <span
            className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2"
            style={{
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.25)",
              color: "#a5b4fc",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {item.tag}
          </span>
          <h3
            className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-snug"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {item.title}
          </h3>
        </div>

        {/* bullets */}
        <ul className="space-y-2">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6366f1,#38bdf8)" }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── main Timeline ── */
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref          = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const lineHeight  = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#f8fafc] dark:bg-[#080c14] relative overflow-hidden"
    >
      {/* ── background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[110px] bg-indigo-400/[0.06] dark:bg-indigo-600/[0.09]" />
        <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full blur-[100px] bg-sky-400/[0.05]  dark:bg-sky-600/[0.07]" />
      </div>

      {/* ── grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            my journey
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Experience &{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#6366f1,#38bdf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Timeline
            </span>
          </h2>
          <div className="mt-4 w-12 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            From secondary school curiosity to building AI-powered products — here's how I got here.
          </p>
        </motion.div>

        {/* ── entries ── */}
        <div ref={ref} className="relative pl-6 md:pl-0">
          {data.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}

          {/* ── scroll-driven line ── */}
          <div
            style={{ height: `${height}px` }}
            className="absolute left-[17px] md:left-[17px] top-0 w-[2px] overflow-hidden pointer-events-none"
            style={{
              height: `${height}px`,
              background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.12), transparent)",
            }}
          >
            <motion.div
              style={{ height: lineHeight, opacity: lineOpacity }}
              className="absolute inset-x-0 top-0 w-[2px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, #6366f1, #38bdf8, transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};