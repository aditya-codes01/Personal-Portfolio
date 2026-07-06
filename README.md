# Personal-Portfolio
# Aditya Sinha — Developer Portfolio

> **Live at:** `index.html` — open directly in any browser, no build step needed.

A single-page portfolio showcasing four engineering domains: Embedded Systems, AI & Computer Vision, Railway Infrastructure, and Data Analytics. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, no build tools.

---

## Project Structure

```
portfolio/
│
├── index.html          # Entry point — semantic HTML, all content
│
├── css/
│   └── style.css       # Full stylesheet (14 documented sections)
│
├── js/
│   ├── circuit.js      # PCB circuit-board canvas background
│   ├── radar.js        # Animated hexagonal skill radar chart
│   └── animations.js   # Typewriter, counters, scroll reveal, card glow
│
└── README.md
```

---

## Features

| Feature | File | Description |
|---|---|---|
| PCB circuit background | `js/circuit.js` | 55 floating nodes connected by L-shaped traces (PCB-style routing), mouse-reactive glow |
| Typewriter hero | `js/animations.js` | Cycles 5 role titles with realistic type/delete cadence |
| Live stat counters | `js/animations.js` | Animate from 0 to target on page load |
| Scroll reveal | `js/animations.js` | IntersectionObserver — fade + lift on scroll, staggered cascade |
| Skill bars | `js/animations.js` | Triggered on reveal, animated via CSS transition |
| Skill radar chart | `js/radar.js` | Canvas-drawn hexagonal chart, animates from zero on visibility |
| Project card glow | `js/animations.js` | Radial gradient follows mouse inside each card |
| Clickable certifications | `index.html` | All 5 certs link to verified credential URLs |

---

## Tech Stack

```
HTML5        Semantic markup, ARIA labels, Open Graph meta tags
CSS3         Custom properties, Grid, Flexbox, @keyframes, clamp()
JavaScript   Vanilla ES6+, Canvas API, IntersectionObserver, IIFEs
Fonts        Orbitron · Space Mono · Inter (Google Fonts)
```

No npm. No webpack. No React. Just the platform.

---

## Design System

All design tokens live in `:root` inside `css/style.css`:

```css
--black:   #050810   /* page background        */
--cyan:    #00F5FF   /* primary accent          */
--purple:  #7B2FBE   /* secondary accent        */
--amber:   #FF6B00   /* railway domain color    */
--green:   #00FF88   /* IoT / data domain color */
--white:   #E8EDF5   /* body text               */
--muted:   #6B7B99   /* secondary text          */
```

Fonts:
- **Orbitron** — display / headings (technical identity)
- **Space Mono** — labels, tags, nav links (code terminal energy)
- **Inter** — body copy (readability)

---

## Sections

1. **Hero** — Name, typewriter role, description, CTA buttons, live stats
2. **Domains** — 4 domain cards (Embedded · AI/CV · Railway · Data)
3. **Experience** — Signal-trace timeline: L&T EDRC → CICE → JIIT
4. **Projects** — OvercrowdX · IoT Smart Home · RefriGenius · Gesture AV
5. **Skills** — Radar chart + animated bar grid across 4 categories
6. **Certifications** — 5 verified credential cards with live links
7. **Contact** — Email · LinkedIn · Phone

---

## Verified Credential Links

| Certification | Issuer | URL |
|---|---|---|
| Microsoft Technology Associate | Microsoft | https://www.cert.devtown.in/verify/1NAA8B |
| Python and Artificial Intelligence | DevTown | https://www.cert.devtown.in/verify/1NAA8B |
| DSA in C++ | Scaler | https://moonshot.scaler.com/s/sl/zWcrxV-fkL |
| Radar Software Kit | NXP India | https://drive.google.com/file/d/1cSIdUP4Fjr5KI1l276rPFDzMxWu0zBis/view |
| IEEE WCET | IEEE | https://drive.google.com/file/d/11Dk7x6SpXLFd3OJngZayKxme_UOn2zkM/view |

---

## How to Run

**Local:**
```bash
# Just open the file
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

**With a local server (optional, for stricter CORS environments):**
```bash
# Python 3
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

**GitHub Pages:**
1. Push the repo to GitHub
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`
3. Site publishes at `https://<username>.github.io/<repo-name>/`

---

## Contact

**Aditya Sinha**
- Email: sinha.adityaa03@gmail.com
- LinkedIn: [linkedin.com/in/aditya-sinha-7aa932268](http://www.linkedin.com/in/aditya-sinha-7aa932268)
- Phone: +91-8829874103
- Location: Ghaziabad, UP, India

---

*Built with vanilla web technologies. No frameworks harmed.*
