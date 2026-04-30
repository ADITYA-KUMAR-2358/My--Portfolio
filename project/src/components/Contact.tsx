import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

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

const inputCls = `
  w-full px-4 py-3 rounded-xl text-sm
  bg-white/70 dark:bg-white/[0.04]
  border border-black/[0.08] dark:border-white/[0.09]
  text-gray-900 dark:text-gray-100
  placeholder:text-gray-400 dark:placeholder:text-gray-600
  focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60
  transition-all duration-200 backdrop-blur-sm
`.trim();

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "aditya.kumar23@pcu.edu.in", href: "mailto:aditya.kumar23@pcu.edu.in", color: "#6366f1" },
  { icon: MapPin, label: "Location", value: "Pune, Maharashtra · India", href: "#",                               color: "#10b981" },
];

const socialLinks = [
  { icon: Github,   label: "GitHub",   href: "https://github.com/ADITYA-KUMAR-2358",                color: "#f1f5f9" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-kumar-09848b292/", color: "#38bdf8" },
];

/* ── EmailJS config ── */
const SERVICE_ID    = import.meta.env.VITE_EMAILJS_SERVICE_ID    as string;
const TEMPLATE_ID   = import.meta.env.VITE_EMAILJS_TEMPLATE_ID   as string;
const AUTO_REPLY_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID as string;
const PUBLIC_KEY    = import.meta.env.VITE_EMAILJS_PUBLIC_KEY    as string;

/* ────────────────────────────────────────────────────────────────
   LAYER 2 — Disposable domain blocklist (300+ domains)
   ──────────────────────────────────────────────────────────────── */
const TRULY_DISPOSABLE = new Set([
  'mailinator.com','guerrillamail.com','tempmail.com','throwaway.email',
  'yopmail.com','trashmail.com','trashmail.me','trashmail.net','trashmail.io',
  'dispostable.com','fakeinbox.com','maildrop.cc','discard.email',
  'temp-mail.org','throwam.com','getairmail.com','filzmail.com',
  'spamgourmet.com','spamhereplease.com','mailnesia.com','mailnull.com',
  'sharklasers.com','guerrillamail.info','guerrillamail.biz','spam4.me',
  'owlpic.com','spamgourmet.net','spamgourmet.org','trashmail.at',
  'mailnull.com','trashmail.me','spamgourmet.com','yopmail.fr',
  'cool.fr.nf','jetable.fr.nf','nospam.ze.tc','nomail.xl.cx',
  'mega.zik.dj','speed.1s.fr','courriel.fr.nf','moncourrier.fr.nf',
  'monemail.fr.nf','monmail.fr.nf','tempinbox.com','tempr.email',
  'discard.email','spamgourmet.net','spamgourmet.org','trashmail.at',
  'trashmail.io','throwam.com','mailscrap.com','spamfree24.org',
  'spamfree24.de','spamfree24.eu','spamfree24.info','spamfree24.net',
  'gamil.com','gmial.com','gmaik.com','gmail.co','gmai.com','gmali.com',
  'lala@lala.com','mailcatch.com','maildrop.cc','mailforspam.com','mailinator.com',
  'spamfree.eu','tempail.com','throwam.com','tempomail.fr',
  'temporaryemail.net','temporaryforwarding.com','temporaryinbox.com',
  'thanksnospam.info','thisisnotmyrealemail.com','trashdevil.com',
  'trashdevil.de','trashemail.de','trashmail.de','trashmail.me',
  'trashmail.net','trashmail.org','trashmail.xyz','trbvm.com',
  'trmailbox.com','turual.com','twinmail.de','tyldd.com',
  'uggsrock.com','umail.net','uroid.com','us.af','venompen.com',
  'veryrealemail.com','vidchart.com','viditag.com','viewcastmedia.com',
  'vidchart.com','vpn.st','vubby.com','walala.org','wegwerfmail.de',
  'wegwerfmail.net','wegwerfmail.org','wetrainbayarea.com','wilemail.com',
  'willhackforfood.biz','willselfdestruct.com','wmail.cf','wronghead.com',
  'wuzupmail.net','xagloo.com','xemaps.com','xents.com','xmaily.com',
  'xoxy.net','xyzfree.net','yapped.net','yep.it','yert.ye.vc',
  'yogamaven.com','yopmail.pp.ua','ypmail.webarnak.fr.eu.org',
  'yuurok.com','z1p.biz','za.com','zehnminuten.de','zehnminutenmail.de',
  'zetmail.com','zippymail.info','zoemail.net','zoemail.org',
  'zomg.info','zxcv.com','zxcvbnm.com','zzz.com',
  // Additional burners
  '10minutemail.com','10minutemail.net','10minutemail.org','10minutemail.de',
  '20minutemail.com','20minutemail.it','20minutemail.net',
  '33mail.com','anonymbox.com','antichef.com','antichef.net',
  'binkmail.com','bio-muesli.net','bobmail.info','bodhi.lawlita.com',
  'bofthew.com','boxformail.in','brefmail.com','brennendesreich.de',
  'broadbandninja.com','byom.de','casualdx.com','ce.mintemail.com',
  'chammy.info','cheatmail.de','chewiemail.com','chickenkiller.com',
  'chielo.com','childsavetrust.org','chogmail.com','choicemail1.com',
  'clixser.com','cmail.net','cmail.org','coldemail.info','lala@lala.com',
  'cool.fr.nf','correo.blogos.net','cosmorph.com','courriel.fr.nf',
  'courrieltemporaire.com','crapmail.org','cust.in','cuvox.de',
  'd3p.co.uk','dacoolest.com','dandikmail.com','dayrep.com',
  'dcemail.com','deadaddress.com','deadletter.ga','deagot.com',
  'dealja.com','digitalsanctuary.com','dingbone.com','disposableaddress.com',
  'disposableemailaddresses.com','disposableinbox.com','dispose.it',
  'dispostable.com','dodgeit.com','dodgit.com','donemail.ru',
  'dontreg.com','dontsendmespam.de','drdrb.com','drdrb.net',
  'dropcake.de','dspwebservices.com','e4ward.com','easytrashmail.com',
  'einrot.com','einrot.de','emailgo.de','emailias.com','emaillime.com',
  'emailmiser.com','emailsensei.com','emailtemporario.com.br','emailwarden.com',
  'emailx.at.hm','emailxfer.com','emkei.cz','emkei.ga',
  'evopo.com','explodemail.com','express.net.ua','eyepaste.com',
  'fakeinformation.com','fantasymail.de','fastacura.com','fastchevy.com',
  'fastchrysler.com','fastkawasaki.com','fastmazda.com','fastmitsubishi.com',
  'fastnissan.com','fastsubaru.com','fastsuzuki.com','fasttoyota.com',
  'fastyamaha.com','fightallspam.com','fiifke.de','filzmail.com',
  'flyspam.com','fr33mail.info','frapmail.com','free-email.cf',
  'freemail.ms','freeplumpervideos.com','fuckingduh.com','fudgerub.com',
  'fux0ringduh.com','fylmanager.com',
]);

/* ────────────────────────────────────────────────────────────────
   LAYER 3 — IANA-reserved / developer placeholder domains
   ──────────────────────────────────────────────────────────────── */
const RESERVED_DOMAINS = new Set([
  // IANA officially reserved per RFC 2606 / RFC 6761
  'example.com','example.net','example.org','example.edu',
  'test.com','test.net','test.org','test.edu',
  'invalid','invalid.com','invalid.net','invalid.org',
  'localhost','localhost.com','localhost.localdomain',
  // Common developer placeholders that technically resolve but are never real inboxes
  'domain.com','email.com','fake.com','noemail.com',
  'none.com','no-reply.com','noreply.com','not-real.com',
  'notreal.com','placeholder.com','sample.com','temp.com',
  'temporary.com','user.com','yourdomain.com','yourname.com',
  'xyz.com','abc.com','foo.com','bar.com','foobar.com',
  'baz.com','qux.com','quux.com','corge.com','grault.com',
  'garply.com','waldo.com','fred.com','plugh.com','xyzzy.com',
  'thud.com','spam.com','nospam.com','antispam.com','lala.com',
  // Single-label (never valid per RFC)
  'localhost','local','intranet','internal','corp','lan',
]);

/* ────────────────────────────────────────────────────────────────
   LAYER 4 — Common domain typo corrections
   ──────────────────────────────────────────────────────────────── */
const DOMAIN_TYPO_MAP: Record<string, string> = {
  // Gmail
  'gmial.com': 'gmail.com', 'gmaik.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmai.com': 'gmail.com', 'gmali.com': 'gmail.com', 'gmal.com': 'gmail.com',
  'gmail.con': 'gmail.com', 'gmeil.com': 'gmail.com', 'gmaill.com': 'gmail.com',
  'gmailc.om': 'gmail.com', 'gmailcom': 'gmail.com', 'gmaul.com': 'gmail.com','gamil.com': 'gemail.com',
  // Hotmail
  'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmai.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com', 'hotmall.com': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'homail.com': 'hotmail.com', 'hotamil.com': 'hotmail.com',
  // Yahoo
  'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
  'yahho.com': 'yahoo.com', 'yahoi.com': 'yahoo.com', 'yaho0.com': 'yahoo.com',
  'yahooo.in': 'yahoo.in', 'yaho.in': 'yahoo.in',
  // Outlook
  'outloook.com': 'outlook.com', 'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com',
  'outlook.co': 'outlook.com', 'outlookk.com': 'outlook.com', 'outloock.com': 'outlook.com',
  // iCloud
  'iclould.com': 'icloud.com', 'icloud.co': 'icloud.com', 'icoud.com': 'icloud.com',
  // Proton
  'protonmial.com': 'protonmail.com', 'protonmal.com': 'protonmail.com',
  'prtonmail.com': 'protonmail.com', 'protonmail.co': 'protonmail.com',
};

/* ────────────────────────────────────────────────────────────────
   LAYER 5 — Username heuristics
   ──────────────────────────────────────────────────────────────── */
const RESERVED_USERNAMES = new Set([
  'admin','administrator','root','test','user','noreply','no-reply',
  'info','support','help','hello','contact','mail','email',
  'webmaster','postmaster','abuse','security','privacy','legal',
  'sales','marketing','billing','account','accounts','service',
  'services','jobs','career','careers','team','staff',
  // Generic placeholder names
  'john','jane','foo','bar','baz','qux','asdf','qwerty',
  'sample','example','placeholder','demo','guest',
]);

function validateUsername(username: string): string | true {
  const u = username.toLowerCase();

  // Too short (≤3 chars)
  if (username.length <= 3) return 'Username is too short to be a real address.';

  // All same character repeated (e.g. aaaa, 1111)
  if (/^(.)\1{3,}$/.test(username)) return 'Username looks like a placeholder — please use your real email.';

  // Keyboard walks (common ones)
  const KEYBOARD_WALKS = ['qwerty','asdf','zxcv','qwer','asdfgh','zxcvbn','1234','abcd','aaaa','bbbb'];
  for (const walk of KEYBOARD_WALKS) {
    if (u.includes(walk)) return 'Username looks like a keyboard walk — please use your real email.';
  }

  // Reserved/generic usernames
  if (RESERVED_USERNAMES.has(u)) return `"${username}" is a reserved/generic address. Please use your personal email.`;

  // Only digits
  if (/^\d+$/.test(username)) return 'Username cannot be all digits.';

  return true;
}

/* ────────────────────────────────────────────────────────────────
   LAYER 6 — Known legit providers (skip MX for speed)
   ──────────────────────────────────────────────────────────────── */
const LEGIT_PROVIDERS = new Set([
  'gmail.com','yahoo.com','outlook.com','hotmail.com','icloud.com',
  'protonmail.com','proton.me','live.com','msn.com','aol.com',
  'zoho.com','mail.com','gmx.com','yandex.com','tutanota.com',
  'yahoo.in','rediffmail.com',
]);

/* ────────────────────────────────────────────────────────────────
   Master email validator — all 6 layers
   ──────────────────────────────────────────────────────────────── */
async function validateEmail(email: string): Promise<string | true> {
  // LAYER 1 — Strict RFC-compliant regex
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return 'Enter a valid email address.';

  // Must have exactly one @
  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) return 'Enter a valid email address.';

  const [username, domain] = email.split('@');
  const domainLower = domain.toLowerCase();

  // LAYER 3 — Reserved / IANA placeholder domains (before disposable check — faster fail)
  if (RESERVED_DOMAINS.has(domainLower)) {
    return `"${domain}" is a reserved/placeholder domain and cannot receive emails.`;
  }

  // LAYER 2 — Disposable blocklist
  if (TRULY_DISPOSABLE.has(domainLower)) {
    return 'Disposable or temporary emails are not allowed.';
  }

  // LAYER 4 — Typo suggestion
  if (DOMAIN_TYPO_MAP[domainLower]) {
    const suggestion = DOMAIN_TYPO_MAP[domainLower];
    return `Did you mean ${username}@${suggestion}?`;
  }

  // LAYER 5 — Username heuristics
  const usernameCheck = validateUsername(username);
  if (usernameCheck !== true) return usernameCheck;

  // LAYER 6 — MX lookup (skip for known legit providers)
  if (LEGIT_PROVIDERS.has(domainLower)) return true;

  try {
    const res = await fetch(`https://dns.google/resolve?name=${domainLower}&type=MX`);
    const data = await res.json();
    if (!data.Answer || data.Answer.length === 0) {
      return 'This email domain cannot receive emails. Please use a valid address.';
    }
    return true;
  } catch {
    return true; // Fail open — don't block if API is unreachable
  }
}

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      // 1. Notify you
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  data.name,
          from_email: data.email,
          subject:    data.subject,
          message:    data.message,
        },
        { publicKey: PUBLIC_KEY },
      );

      // 2. Auto-reply to sender
      await emailjs.send(
        SERVICE_ID,
        AUTO_REPLY_ID,
        {
          to_name:  data.name,
          to_email: data.email,
        },
        { publicKey: PUBLIC_KEY },
      );

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('EmailJS error:', err?.text ?? err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-[#f8fafc] dark:bg-[#080c14] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-indigo-400/[0.07] dark:bg-indigo-600/[0.10]" />
        <div className="absolute bottom-0 left-1/4  w-[400px] h-[400px] rounded-full blur-[100px] bg-sky-400/[0.06]    dark:bg-sky-600/[0.08]" />
        <div className="absolute top-1/2  left-0    w-[300px] h-[300px] rounded-full blur-[90px]  bg-pink-400/[0.04]   dark:bg-pink-600/[0.06]" />
      </div>

      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(99,102,241,1) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ── Left panel ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
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

          {/* ── Right: form ── */}
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
                <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" id="name" error={errors.name?.message}>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      id="name" type="text" placeholder="Aditya Kumar"
                      className={inputCls}
                    />
                  </Field>

                  {/* ── Email field with all 6 validation layers + checking indicator ── */}
                  <Field label="Email Address" id="email" error={errors.email?.message}>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        validate: async (value) => {
                          setCheckingEmail(true);
                          const result = await validateEmail(value);
                          setCheckingEmail(false);
                          return result === true ? true : result;
                        },
                      })}
                      id="email" type="email" placeholder="you@example.com"
                      className={inputCls}
                    />
                    <AnimatePresence>
                      {checkingEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-indigo-400 flex items-center gap-1.5 mt-0.5"
                          style={{ fontFamily: "'DM Mono', monospace" }}
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block w-3 h-3 border border-indigo-400 border-t-transparent rounded-full"
                          />
                          Verifying email…
                        </motion.p>
                      )}
                    </AnimatePresence>
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

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || checkingEmail}
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