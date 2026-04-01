# Aditya Kumar — Portfolio

A personal portfolio website built with React, TypeScript, Framer Motion, and Tailwind CSS.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React + TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Bundler | Vite |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Glassmorphism navbar with mobile menu
│   ├── ThemeSwitch.tsx     # Dark / light toggle
│   ├── TiltCard.tsx        # 3D tilt wrapper component
│   └── ...
├── sections/
│   ├── Home.tsx            # Hero section with profile image
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── App.tsx
└── main.tsx
public/
└── aditya3.jpg             # Profile photo
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Features

### Navbar
- Glassmorphism effect on scroll (`backdrop-filter: blur(20px) saturate(180%)`)
- Animated active-pill indicator using Framer Motion `layoutId`
- Mobile slide-out menu as a floating rounded card with staggered item animations
- Hamburger icon swaps with a rotate transition
- Smooth scroll to sections with offset (`-80px`) to account for fixed navbar height

### Hero / Profile Image
- Spinning conic-gradient ring via `animate={{ rotate: 360 }}`
- Gradient border + glow effect beneath the avatar
- Spring-based entrance animation (`scale: 0.7 → 1`)
- `mt-8` spacing to clear the fixed navbar

### Theme
- Dark / light mode via `ThemeSwitch`
- Theme-aware background colors and glow tints

---

## Alignment & Spacing Notes

- **Navbar height:** `h-16` (64px)
- **Scroll offset:** `-80px` used in `scrollToSection` — bump this if sections feel misaligned
- **Hero top spacing:** `mt-8` on the profile image block; add `pt-20` or `pt-24` to the first section wrapper if content hides behind the navbar
- **Section IDs:** `#home`, `#about`, `#experience`, `#projects`, `#contact` — must match `href` values in `navItems`

---

## Customisation

### Swap profile photo
Replace `public/aditya3.jpg` with your own image. Keep the filename or update the `src` in your hero component.

### Add / remove nav links
Edit the `navItems` array in `Navbar.tsx`:

```ts
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  // add more here
];
```

### Change accent colours
The indigo/sky/pink gradient palette is applied via Tailwind utility classes and inline styles. Global colour changes can be made by updating the gradient stops:

```
from-indigo-500 via-sky-400 to-pink-500
```

---

## License

MIT — feel free to fork and make it your own.
