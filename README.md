# Aditya Kumar — Portfolio

> A performant, fully responsive personal portfolio built with React, TypeScript, Framer Motion, and Tailwind CSS. Features dark/light theming, smooth animations, and an EmailJS-powered contact form.

🔗 **Live:** [adityak.me](https://adityak.me) &nbsp;·&nbsp; 📧 [aditya.kumar23@pcu.edu.in](mailto:aditya.kumar23@pcu.edu.in) &nbsp;·&nbsp; 💼 [LinkedIn](https://www.linkedin.com/in/aditya-kumar-09848b292/) &nbsp;·&nbsp; 🐙 [GitHub](https://github.com/ADITYA-KUMAR-2358)

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 18 + TypeScript               |
| Styling     | Tailwind CSS                        |
| Animations  | Framer Motion                       |
| Icons       | Lucide React                        |
| Bundler     | Vite                                |
| Email       | EmailJS (`@emailjs/browser`)        |
| Forms       | React Hook Form                     |

---

## Features

- **Animated Navbar** — Glassmorphism effect on scroll, active-pill indicator via Framer Motion `layoutId`, mobile hamburger with staggered menu animations and fixed scroll targeting
- **Hero Section** — Spinning conic-gradient avatar ring, particle field canvas, 3D tilt card, typewriter role animation, and stat chips
- **Dark / Light Theme** — System-aware toggle via `ThemeSwitch`, theme-reactive background blobs and glow tints across all sections
- **Contact Form** — EmailJS dual-template system: notifies you and sends an auto-reply to the sender; built with React Hook Form validation
- **Fully Responsive** — Mobile-first layout across all sections, tested on small screens

---

## Project Structure

```
├── public/
│   ├── aditya3.jpg             # Profile photo
│   └── Aditya_resume.pdf       # Downloadable resume
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Glassmorphism navbar + mobile menu
│   │   ├── ThemeSwitch.tsx     # Dark / light toggle
│   │   └── Hero.tsx            # Hero section with particle field + tilt card
│   ├── sections/
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx         # EmailJS contact form
│   ├── App.tsx
│   └── main.tsx
├── .env                        # EmailJS credentials (never commit this)
├── tsconfig.app.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/ADITYA-KUMAR-2358/your-portfolio-repo.git
cd your-portfolio-repo

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=your_auto_reply_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from your [EmailJS dashboard](https://emailjs.com):
- **Service ID** → Email Services tab
- **Template IDs** → Email Templates tab
- **Public Key** → Account → General tab

### EmailJS Template Variables

| Template   | Required variables                                           |
|------------|--------------------------------------------------------------|
| Contact Us | `{{from_name}}` `{{from_email}}` `{{subject}}` `{{message}}` |
| Auto Reply | `{{to_name}}` `{{to_email}}`                                 |

> **Important:** In your Auto Reply template → Content tab → set **To Email** to `{{to_email}}` so replies go to the sender, not you.

---

## Customisation

### Swap profile photo
Replace `public/aditya3.jpg` with your image. Update the `src` in `Hero.tsx` if you rename it.

### Update resume
Replace `public/Aditya_resume.pdf` with your own PDF. Update the filename in the `downloadResume` function in `Hero.tsx`.

### Add / remove nav links
Edit `navItems` in `Navbar.tsx`:

```ts
const navItems = [
  { name: 'Home',    href: '#home'    },
  { name: 'About',   href: '#about'   },
  // add more here — make sure the section id matches the href
];
```

### Change accent colours
The primary palette is indigo + sky + pink. Update gradient stops globally:

```
from-indigo-500 via-sky-400 to-pink-500    // Tailwind classes
linear-gradient(135deg, #6366f1, #38bdf8)  // Inline styles
```

---

## Alignment & Spacing Notes

| Token          | Value                                                       | Purpose                    |
|----------------|-------------------------------------------------------------|----------------------------|
| Navbar height  | `h-16` (64px)                                               | Used as scroll offset ref  |
| Section IDs    | `#home` `#about` `#experience` `#projects` `#contact`       | Must match `href` in `navItems` |
| Hero spacing   | `mt-16` on avatar                                           | Clears fixed navbar        |

---

## Deployment

This project is a standard Vite SPA — deploy to any static host:

- **Vercel** — connect repo, auto-detects Vite, zero config

> Add your `.env` variables in the host's dashboard. Never commit `.env` to the repo.

---

## License

MIT — feel free to fork and adapt for your own portfolio.

---

<p align="center">Built with ☕ and too many late nights by <strong>Aditya Kumar</strong> · <a href="https://adityak.me">adityak.me</a></p>