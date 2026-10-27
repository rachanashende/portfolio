# Rachana Shende — Portfolio

A single-page personal portfolio built with React, TypeScript, Vite, Tailwind CSS v4 and Motion for React.

It opens with an Apple-inspired, hand-drawn "hello", and includes a red laser-pointer cursor, a cat companion whose eyes follow the cursor, and an interactive project gallery.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Editing content

All personal content lives in `src/data/`. Change these files instead of the components:

| File | What it holds |
| --- | --- |
| `profile.ts` | Name, roles, email, LinkedIn, GitHub, email subject |
| `projects.ts` | The three gallery projects, their details and accent colours |
| `experience.ts` | Timeline entries and their highlight stat |
| `skills.ts` | Skill groups and their Devicon logos |
| `education.ts` | Degree, CGPA, coursework |
| `certifications.ts` | Certification cards |

To add a project, append an entry to `projects.ts`. You also need to give it a `visual`: either reuse one of the three existing illustrations in `src/components/visuals/` or add a new one.

## Contact form

The form never pretends to send anything. It works in one of two modes:

1. **Email-compose fallback (default, no setup).** "Send with Gmail" opens Gmail's composer in a new tab, and "Use my email app" opens the visitor's mail app (`mailto:`). In both cases the recipient, subject and message are already filled in. The visitor still presses Send themselves, and the form says so.
2. **Direct sending (optional).** Messages are delivered to your inbox without leaving the page:
   1. Create a free form at [formspree.io](https://formspree.io) and copy its endpoint (for example `https://formspree.io/f/abcdwxyz`).
   2. Copy `.env.example` to `.env` and set `VITE_CONTACT_FORM_ENDPOINT=<your endpoint>`. On Vercel or Netlify, add it as an environment variable instead.
   3. Rebuild. The button changes to "Send message", and the form shows real success or error messages from the request.

## Deploying

This is a static site. On Vercel, Netlify, Cloudflare Pages or GitHub Pages:

- Build command: `npm run build`
- Output directory: `dist`

Once it has a domain, consider adding an `og:image` (a 1200×630 PNG in `public/`, referenced with an absolute URL in `index.html`) so link previews show an image.

## How it's put together

```
src/
  App.tsx                 page shell, intro handling, deep-link scrolling
  index.css               Tailwind theme tokens (pastel palette), keyframes
  data/                   all content (see above)
  hooks/useMediaQuery.ts  fine-pointer and reduced-motion detection
  components/
    HelloIntro.tsx        the drawn "hello" opening sequence
    Hero.tsx              headline, floating shapes, parallax
    Navbar.tsx            sticky pill nav with active-section highlight
    About / Experience / ProjectGallery / ProjectCard / ProjectDetails
    Skills / Education / Certifications / Contact / Footer
    LaserCursor.tsx       red laser cursor with fading trail
    CatCompanion.tsx      SVG cat with eye tracking, blinking, tail sway
    ScrollProgress.tsx    progress bar + scroll-linked pastel background
    Reveal.tsx            shared scroll-reveal helpers
    visuals/              custom SVG illustrations for each project
```

### Behaviour notes

- **Intro.** It plays once per browser session. It is skipped for reduced-motion users and for deep links such as `/#projects`. Any click, key press or scroll skips it.
- **Laser cursor and eye tracking.** Both turn on only for a mouse or trackpad. Touch devices keep native scrolling and tapping, and the cat switches to a gentle idle animation. The animation loops run only while something is moving.
- **Reduced motion.** The intro and the cursor trail are dropped, and remaining transitions become simple fades.
- **Cat.** It can be hidden with the small "–" button. The choice is remembered in the browser.
- **Project gallery.** You can browse with the arrow buttons, the progress dots, the ← → keys while the gallery is on screen, or by swiping on touch screens. Clicking a card or "Explore project" opens an accessible modal: focus is trapped inside, Esc closes it, and focus returns to where it was.

### Libraries

- **Motion for React.** Drives scroll reveals, the gallery transitions, the modal and the SVG path drawing.
- **Lucide.** Interface icons.
- **Devicon.** Original-colour technology logos, bundled as individual SVG files. Devicon was chosen over Simple Icons because Simple Icons no longer includes the Java logo. Devicon has no Seaborn logo, so `src/assets/seaborn.svg` is a small mark modelled on Seaborn's logo.
- **Geist.** Self-hosted variable font via `@fontsource-variable/geist`.
