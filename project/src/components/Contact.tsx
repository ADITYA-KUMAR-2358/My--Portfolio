import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/* ── animation presets ── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ── input field wrapper ── */
function Field({
  label, id, error, children,
}: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-red-500 flex items-center gap-1 mt-0.5"
          >
            <AlertCircle size={11} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── shared input classes ── */
const inputCls = `
  w-full px-4 py-3 rounded-xl text-sm
  bg-white/70 dark:bg-white/[0.04]
  border border-black/[0.08] dark:border-white/[0.09]
  text-gray-900 dark:text-gray-100
  placeholder:text-gray-400 dark:placeholder:text-gray-600
  focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60
  transition-all duration-200 backdrop-blur-sm
`.trim();

/* ── contact info cards ── */
const contactInfo = [
  { icon: Mail,   label: "Email",    value: "aditya.kumar23@pcu.edu.in", href: "mailto:aditya.kumar23@pcu.edu.in", color: "#6366f1" },
  { icon: Phone,  label: "Phone",    value: "+91 76520 96658",           href: "tel:+917652096658",               color: "#0ea5e9" },
  { icon: MapPin, label: "Location", value: "Pune, Maharashtra · India", href: "#",                               color: "#10b981" },
];

const socialLinks = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/ADITYA-KUMAR-2358",                color: "#f1f5f9" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-kumar-09848b292/", color: "#38bdf8" },
];

/* ── main component ── */
const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID, TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        PUBLIC_KEY,
      );
      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-[#f8fafc] dark:bg-[#080c14] overflow-hidden"
    >
      {/* ── background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-400/[0.07] dark:bg-indigo-600/[0.10]" />
        <div className="absolute bottom-0 left-1/4  w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-400/[0.06]    dark:bg-sky-600/[0.08]" />
        <div className="absolute top-1/2  left-0    w-[300px] h-[300px] rounded-full blur-[90px]  bg-pink-400/[0.04]   dark:bg-pink-600/[0.06]" />
      </div>

      {/* ── grid ── */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── section title ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p
            className="text-xs tracking-[0.25em] uppercase font-medium text-indigo-500 dark:text-indigo-400 mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            say hello
          </p>
          <h2
            className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Get In{' '}
            <span style={{
              background: "linear-gradient(135deg,#6366f1,#38bdf8)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Touch
            </span>
          </h2>
          <div className="mt-4 mx-auto w-12 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-sky-400" />
          <p className="mt-6 text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-[15px] leading-relaxed">
            Open to internships, collaborations, or just a chat about tech, poetry, or astrophysics.
          </p>
        </motion.div>

        {/* ── grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── left panel (2 cols) ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* header */}
            <motion.div variants={fadeUp}>
              <h3
                className="text-2xl font-black text-gray-900 dark:text-white mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Let's Connect
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                I usually respond within 24 hours.
              </p>
            </motion.div>

            {/* contact cards */}
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                variants={fadeUp}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}
                className="flex items-center gap-4 p-4 rounded-2xl
                           bg-white/70 dark:bg-white/[0.04]
                           border border-black/[0.07] dark:border-white/[0.08]
                           backdrop-blur-sm shadow-sm hover:shadow-md
                           transition-shadow duration-200 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}18` }}
                >
                  <info.icon size={17} style={{ color: info.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5"
                    style={{ fontFamily: "'DM Mono', monospace" }}>
                    {info.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* social links */}
            <motion.div variants={fadeUp} className="pt-2">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 tracking-widest uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}>
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                               bg-white/70 dark:bg-white/[0.05]
                               border border-black/[0.07] dark:border-white/[0.09]
                               text-gray-700 dark:text-gray-300
                               backdrop-blur-sm shadow-sm hover:shadow-md
                               transition-shadow duration-200"
                  >
                    <s.icon size={16} />
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* availability card */}
            <motion.div
              variants={fadeUp}
              className="mt-auto p-5 rounded-2xl
                         bg-gradient-to-br from-indigo-500/10 to-sky-500/10
                         border border-indigo-500/20 dark:border-indigo-500/15
                         backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide"
                  style={{ fontFamily: "'DM Mono', monospace" }}>
                  Available now
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Currently open to <span className="text-indigo-500 dark:text-indigo-400 font-semibold">internships</span>,{' '}
                <span className="text-sky-500 dark:text-sky-400 font-semibold">freelance work</span>, and exciting collaborations.
              </p>
            </motion.div>
          </motion.div>

          {/* ── right: form (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl overflow-hidden
                            bg-white/70 dark:bg-white/[0.04]
                            border border-black/[0.07] dark:border-white/[0.08]
                            backdrop-blur-sm shadow-sm">

              {/* form header bar */}
              <div className="px-6 sm:px-8 py-5 border-b border-black/[0.05] dark:border-white/[0.06]
                              flex items-center justify-between">
                <div>
                  <h4
                    className="text-base font-bold text-gray-900 dark:text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Send a Message
                  </h4>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5"
                    style={{ fontFamily: "'DM Mono', monospace" }}>
                    All fields required
                  </p>
                </div>
                {/* traffic light dots */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
                {/* name + email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" id="name" error={errors.name?.message}>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      id="name" type="text" placeholder="Aditya Kumar"
                      className={inputCls}
                    />
                  </Field>

                  <Field label="Email Address" id="email" error={errors.email?.message}>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                      })}
                      id="email" type="email" placeholder="you@example.com"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Subject" id="subject" error={errors.subject?.message}>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    id="subject" type="text" placeholder="Internship opportunity / Collaboration / Just saying hi"
                    className={inputCls}
                  />
                </Field>

                <Field label="Message" id="message" error={errors.message?.message}>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                    id="message" rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                  className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-sm
                             text-white overflow-hidden
                             disabled:opacity-60 disabled:cursor-not-allowed
                             transition-opacity duration-200"
                  style={{
                    background: status === 'success'
                      ? "linear-gradient(135deg,#10b981,#059669)"
                      : status === 'error'
                      ? "linear-gradient(135deg,#ef4444,#dc2626)"
                      : "linear-gradient(135deg,#6366f1,#38bdf8)",
                    boxShadow: "0 0 20px rgba(99,102,241,0.25)",
                  }}
                >
                  {/* shimmer */}
                  {status === 'idle' && (
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.45 }}
                    />
                  )}

                  <span className="relative flex items-center justify-center gap-2">
                    <AnimatePresence mode="wait">
                      {status === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2">
                          <Send size={16} /> Send Message
                        </motion.span>
                      )}
                      {status === 'sending' && (
                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2">
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                          />
                          Sending…
                        </motion.span>
                      )}
                      {status === 'success' && (
                        <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2">
                          <CheckCircle size={16} /> Message Sent!
                        </motion.span>
                      )}
                      {status === 'error' && (
                        <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-2">
                          <AlertCircle size={16} /> Failed — Try Again
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;