// ─────────────────────────────────────────────────────────────────────────────
// src/components/Contact.tsx
// ─────────────────────────────────────────────────────────────────────────────
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle, ArrowRight, CheckCircle, Github,
  Linkedin, Mail, MapPin, Send,
} from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  DISPOSABLE_DOMAINS, DOMAIN_TYPO_MAP,
  LEGIT_PROVIDERS, RESERVED_DOMAINS, RESERVED_USERNAMES,
} from '../config/emailValidation';

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ── EmailJS ───────────────────────────────────────────────────────────────────
const SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID                 as string;
const TEMPLATE_ID   = import.meta.env.VITE_EMAILJS_TEMPLATE_ID                as string;
const AUTO_REPLY_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID     as string;
const PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY                 as string;

// ── Validation ────────────────────────────────────────────────────────────────
function validateUsername(username: string): string | true {
  const u = username.toLowerCase();
  if (username.length <= 3) return 'Username is too short to be a real address.';
  if (/^(.)\1{3,}$/.test(username)) return 'Username looks like a placeholder.';
  const WALKS = ['qwerty', 'asdf', 'zxcv', 'qwer', 'asdfgh', 'zxcvbn', '1234', 'abcd'];
  for (const w of WALKS) if (u.includes(w)) return 'Username looks like a keyboard walk.';
  if (RESERVED_USERNAMES.has(u)) return `"${username}" is a reserved address. Use your personal email.`;
  if (/^\d+$/.test(username)) return 'Username cannot be all digits.';
  return true;
}

async function validateEmail(email: string): Promise<string | true> {
  const re = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(email)) return 'Enter a valid email address.';
  if ((email.match(/@/g) ?? []).length !== 1) return 'Enter a valid email address.';
  const [username, domain] = email.split('@');
  const d = domain.toLowerCase();
  if (RESERVED_DOMAINS.has(d))   return `"${domain}" is a placeholder domain.`;
  if (DISPOSABLE_DOMAINS.has(d)) return 'Disposable or temporary emails are not allowed.';
  if (DOMAIN_TYPO_MAP[d])        return `Did you mean ${username}@${DOMAIN_TYPO_MAP[d]}?`;
  const uc = validateUsername(username);
  if (uc !== true) return uc;
  if (LEGIT_PROVIDERS.has(d)) return true;
  try {
    const res  = await fetch(`https://dns.google/resolve?name=${d}&type=MX`);
    const data = await res.json();
    if (!data.Answer?.length) return 'This email domain cannot receive emails.';
    return true;
  } catch { return true; }
}

// ── Static data ───────────────────────────────────────────────────────────────
const INFO = [
  { icon: Mail,   label: 'Email',    value: 'aditya.kumar23@pcu.edu.in', href: 'mailto:aditya.kumar23@pcu.edu.in' },
  { icon: MapPin, label: 'Location', value: 'Pune, Maharashtra · India', href: '#' },
];
const SOCIALS = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/ADITYA-KUMAR-2358' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aditya-kumar-09848b292/' },
];

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label, id, error, hint, children,
}: {
  label: string; id: string; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase
                     text-slate-400 dark:text-slate-500
                     group-focus-within:text-indigo-500 transition-colors duration-200"
        >
          {label}
        </label>
        {hint && <span className="text-[10px] text-slate-400 dark:text-slate-600">{hint}</span>}
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[11px] text-red-400 flex items-center gap-1.5 overflow-hidden"
          >
            <AlertCircle size={10} className="flex-shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Shared input class ────────────────────────────────────────────────────────
const inputCls = [
  'w-full px-4 py-3 rounded-xl text-sm font-medium',
  'bg-white dark:bg-white/[0.03]',
  'border border-slate-200 dark:border-white/[0.07]',
  'text-slate-800 dark:text-slate-100',
  'placeholder:text-slate-300 dark:placeholder:text-slate-600',
  'focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400/60',
  'hover:border-slate-300 dark:hover:border-white/[0.12]',
  'transition-all duration-200 shadow-sm',
].join(' ');

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset, watch } =
    useForm<FormData>();

  const msgLen = watch('message')?.length ?? 0;

  // FAULT 6 — debug logs added
  const onSubmit = async (data: FormData) => {
    console.log('ONSUBMIT FIRED', data);

    setStatus('sending');
    try {
      console.log('SENDING MAIN EMAIL...');
      const r1 = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        { publicKey: PUBLIC_KEY },
      );
      console.log('Main email response:', r1);

      const r2 = await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_ID,
        { to_name: data.name, to_email: data.email },
        { publicKey: PUBLIC_KEY },
      );
      console.log('Auto-reply response:', r2);

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: unknown) {
      // FAULT 6 — detailed catch logging
      console.error('EMAILJS FULL ERROR:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-16 sm:py-20 lg:py-28
                 bg-slate-50 dark:bg-[#070b12] overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.05] dark:bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] dark:bg-violet-600/[0.06] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.018] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-indigo-500/50" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-indigo-500 dark:text-indigo-400">
              Contact
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's build something{' '}
            <span className="relative inline-block">
              <span style={{
                background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#38bdf8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                together.
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full origin-left"
                style={{ background: 'linear-gradient(90deg,#6366f1,#38bdf8)' }}
              />
            </span>
          </h2>
          <p className="mt-5 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Open to internships, collaborations, or just a conversation about tech, poetry, or astrophysics.
          </p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 lg:gap-10 items-start">

          {/* LEFT PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* Availability pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-emerald-50 dark:bg-emerald-900/20
                            border border-emerald-200 dark:border-emerald-800/40 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 tracking-wide uppercase">
                Available for opportunities
              </span>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-3">
              {INFO.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl
                             bg-white dark:bg-white/[0.03]
                             border border-slate-100 dark:border-white/[0.06]
                             shadow-sm hover:shadow-md
                             hover:border-indigo-200 dark:hover:border-indigo-500/20
                             transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                      {item.value}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-1">
              <p className="text-[10px] tracking-[0.18em] uppercase font-semibold text-slate-400 dark:text-slate-600 mb-3">
                Find me on
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                               bg-white dark:bg-white/[0.04]
                               border border-slate-200 dark:border-white/[0.07]
                               text-slate-600 dark:text-slate-300
                               hover:border-indigo-300 dark:hover:border-indigo-500/30
                               hover:text-indigo-600 dark:hover:text-indigo-400
                               shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <s.icon size={15} /> {s.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="p-4 rounded-2xl
                            bg-gradient-to-br from-indigo-50 to-violet-50
                            dark:from-indigo-500/[0.07] dark:to-violet-500/[0.07]
                            border border-indigo-100 dark:border-indigo-500/10">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                💬 I typically reply within{' '}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">24 hours</span>.
                For urgent matters, reach out on LinkedIn.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl overflow-hidden
                            bg-white dark:bg-white/[0.025]
                            border border-slate-200 dark:border-white/[0.07]
                            shadow-xl shadow-slate-200/50 dark:shadow-black/20">

              {/* Form header */}
              <div className="px-6 sm:px-8 py-5
                              border-b border-slate-100 dark:border-white/[0.05]
                              bg-slate-50/80 dark:bg-white/[0.02]
                              flex items-center justify-between">
                <div>
                  <h3
                    className="text-base font-bold text-slate-800 dark:text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Send a Message
                  </h3>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 tracking-wide">
                    All fields are required
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/70 hover:bg-red-400 transition-colors cursor-default" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70 hover:bg-amber-400 transition-colors cursor-default" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/70 hover:bg-emerald-400 transition-colors cursor-default" />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5" noValidate>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" id="name" error={errors.name?.message}>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      id="name" type="text" placeholder="Aditya Kumar"
                      autoComplete="name" className={inputCls}
                    />
                  </Field>

                  {/* FAULT 1 — pure validator, no state mutation inside validate */}
                  <Field label="Email Address" id="email" error={errors.email?.message}>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        validate: async (v) => {
                          const result = await validateEmail(v);
                          return result === true ? true : result;
                        },
                      })}
                      id="email" type="email" placeholder="you@example.com"
                      autoComplete="email" className={inputCls}
                    />
                  </Field>
                </div>

                {/* Subject */}
                <Field label="Subject" id="subject" error={errors.subject?.message}>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    id="subject" type="text"
                    placeholder="Internship opportunity · Collaboration · Just saying hi"
                    className={inputCls}
                  />
                </Field>

                {/* Message */}
                <Field
                  label="Message" id="message"
                  error={errors.message?.message}
                  hint={`${msgLen} / 20 min`}
                >
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'At least 20 characters' },
                    })}
                    id="message" rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    className={inputCls + ' resize-none leading-relaxed'}
                  />
                </Field>

                {/* Submit button — FAULT 2: disabled only on sending status */}
                <div className="pt-1 space-y-3">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status === 'idle' ? { scale: 1.015 } : {}}
                    whileTap={status === 'idle' ? { scale: 0.985 } : {}}
                    className="relative w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white
                               overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed
                               transition-all duration-300
                               focus-visible:outline-none focus-visible:ring-2
                               focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    style={{
                      background:
                        status === 'success' ? 'linear-gradient(135deg,#10b981,#059669)' :
                        status === 'error'   ? 'linear-gradient(135deg,#ef4444,#dc2626)' :
                                              'linear-gradient(135deg,#6366f1,#7c3aed,#38bdf8)',
                      boxShadow:
                        status === 'idle'
                          ? '0 4px 24px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
                          : '0 4px 16px rgba(0,0,0,0.15)',
                    }}
                  >
                    {status === 'idle' && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '200%' }}
                        transition={{ duration: 0.55 }}
                      />
                    )}
                    <span className="relative flex items-center justify-center gap-2">
                      <AnimatePresence mode="wait">
                        {status === 'idle' && (
                          <motion.span key="i"
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                            className="flex items-center gap-2">
                            <Send size={15} /> Send Message
                          </motion.span>
                        )}
                        {status === 'sending' && (
                          <motion.span key="s"
                            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                            className="flex items-center gap-2">
                            <motion.span animate={{ rotate: 360 }}
                              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              className="block w-4 h-4 rounded-full border-2 border-white/40 border-t-white" />
                            Sending…
                          </motion.span>
                        )}
                        {status === 'success' && (
                          <motion.span key="ok"
                            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2">
                            <CheckCircle size={15} /> Message Sent!
                          </motion.span>
                        )}
                        {status === 'error' && (
                          <motion.span key="e"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2">
                            <AlertCircle size={15} /> Failed — Try Again
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.button>

                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-600">
                    Your information is never shared with third parties.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;