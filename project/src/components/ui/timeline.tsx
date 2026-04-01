"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  year: string;
  tag: string;
  title: string;
  bullets: string[];
}

/* ── card ── */
function TimelineCard({ item, index }: { item: TimelineEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="flex gap-6 md:gap-10 pt-10 md:pt-14"
    >
      {/* left */}
      <div className="relative flex flex-col items-center w-14 md:w-28">
        <div className="sticky top-40 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              boxShadow: "0 0 12px rgba(99,102,241,0.3)"
            }}>
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </div>

          <span className="hidden md:block mt-3 text-2xl font-bold bg-gradient-to-r from-indigo-500 to-sky-400 bg-clip-text text-transparent">
            {item.year}
          </span>
        </div>
      </div>

      {/* right */}
      <div className="flex-1 rounded-xl p-5 bg-white/60 dark:bg-white/5 border border-white/10 backdrop-blur-sm">
        <span className="md:hidden font-bold text-indigo-400">
          {item.year}
        </span>

        <div className="mb-3">
          <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-full">
            {item.tag}
          </span>

          <h3 className="font-semibold mt-2">
            {item.title}
          </h3>
        </div>

        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── main ── */
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // 🔥 FIX: dynamic height
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) setHeight(ref.current.offsetHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className="relative bg-[#080c14] py-24">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-4xl font-bold mb-12 text-white">
          Experience Timeline
        </h2>

        <div ref={ref} className="relative">

          {data.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}

          {/* 🔥 FIXED LINE */}
          <div
            className="absolute top-0 left-[22px] md:left-[56px] w-[2px]"
            style={{
              height,
              background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.15), transparent)",
            }}
          >
            <motion.div
              style={{ height: lineHeight, opacity: lineOpacity }}
              className="absolute top-0 w-full"
            >
              <div className="w-full h-full bg-gradient-to-b from-indigo-500 via-sky-400 to-transparent" />
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};