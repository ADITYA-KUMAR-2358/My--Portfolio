// ─────────────────────────────────────────────────────────────────────────────
// src/config/emailValidation.ts
// Central config for all email validation layers.
// Add more lists by importing them below and spreading into the Sets.
// ─────────────────────────────────────────────────────────────────────────────

import { SPAM_DOMAIN_LIST } from './lists/spamDomainList';

// ── Add more lists here ───────────────────────────────────────────────────────
// import { myExtraList } from './lists/myExtraList';
// ─────────────────────────────────────────────────────────────────────────────

export const DISPOSABLE_DOMAINS: ReadonlySet<string> = new Set([
  ...SPAM_DOMAIN_LIST,
  // ...myExtraList,   ← spread more lists here
]);

export const RESERVED_DOMAINS: ReadonlySet<string> = new Set([
  // IANA reserved (RFC 2606 / RFC 6761)
  'example.com', 'example.net', 'example.org', 'example.edu',
  'test.com', 'test.net', 'test.org', 'test.edu',
  'invalid', 'invalid.com', 'localhost', 'localhost.com',
  // Common developer placeholders
  'domain.com', 'fake.com', 'noemail.com', 'none.com',
  'placeholder.com', 'sample.com', 'temp.com', 'temporary.com',
  'xyz.com', 'abc.com', 'foo.com', 'bar.com', 'foobar.com',
  'spam.com', 'nospam.com', 'lala.com', 'yourdomain.com',
]);

export const DOMAIN_TYPO_MAP: Readonly<Record<string, string>> = {
  // Gmail
  'gmial.com': 'gmail.com',  'gmaik.com': 'gmail.com',  'gmail.co': 'gmail.com',
  'gmai.com':  'gmail.com',  'gmali.com': 'gmail.com',  'gmal.com': 'gmail.com',
  'gmail.con': 'gmail.com',  'gmeil.com': 'gmail.com',  'gmaill.com': 'gmail.com',
  'gamil.com': 'gmail.com',  'gmaul.com': 'gmail.com',
  // Hotmail
  'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmai.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com', 'hotmall.com': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'homail.com': 'hotmail.com',  'hotamil.com': 'hotmail.com',
  // Yahoo
  'yaho.com': 'yahoo.com',  'yahooo.com': 'yahoo.com',  'yahoo.co': 'yahoo.com',
  'yahho.com': 'yahoo.com', 'yahoi.com':  'yahoo.com',  'yaho0.com': 'yahoo.com',
  'yahooo.in': 'yahoo.in',  'yaho.in':   'yahoo.in',
  // Outlook
  'outloook.com': 'outlook.com', 'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com',
  'outlook.co':   'outlook.com', 'outlookk.com': 'outlook.com',
  // iCloud
  'iclould.com': 'icloud.com', 'icloud.co': 'icloud.com', 'icoud.com': 'icloud.com',
  // Proton
  'protonmial.com': 'protonmail.com', 'protonmal.com': 'protonmail.com',
  'prtonmail.com':  'protonmail.com', 'protonmail.co': 'protonmail.com',
};

export const RESERVED_USERNAMES: ReadonlySet<string> = new Set([
  'admin', 'administrator', 'root', 'test', 'user', 'noreply', 'no-reply',
  'info', 'support', 'help', 'hello', 'contact', 'mail', 'email',
  'webmaster', 'postmaster', 'abuse', 'security', 'privacy', 'legal',
  'sales', 'marketing', 'billing', 'account', 'accounts', 'service',
  'john', 'jane', 'foo', 'bar', 'baz', 'qux', 'asdf', 'qwerty',
  'sample', 'example', 'placeholder', 'demo', 'guest',
  // ── Add more reserved usernames here ─────────────────────────────────────
]);

export const LEGIT_PROVIDERS: ReadonlySet<string> = new Set([
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'protonmail.com', 'proton.me', 'live.com', 'msn.com', 'aol.com',
  'zoho.com', 'mail.com', 'gmx.com', 'yandex.com', 'tutanota.com',
  'yahoo.in', 'rediffmail.com',
]);