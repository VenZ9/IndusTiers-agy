# IndusTiers-agy (IndusGames Redesign)

A modernized, high-performance redesign of the **IndusGames** (formerly IndusTiers) competitive Bedrock Minecraft minigame server landing page.

## ✨ Highlights & Redesign Details

- **Radically Redesigned UI/UX**:
  - Cosmic dark-first visual direction with refined neon accents (indigo, cyan, violet) and dot-grid canvas styling.
  - **Floating Dock Navigation** replacing traditional bulky top navigation headers with smooth scroll spying and active section highlighting.
  - **Split-screen Hero** featuring an interactive live server status card with individual IP/port copy chips and quick actions.
  - **Asymmetric Bento Grid** showcase for gamemodes (FFA, Duels, Bedfight, Bedwars, Skywars) with dynamic hover states and tag badges.
  - **Interactive Rules Accordion** with clean categorization and an escalated punishment visual pipeline.
  - **Animated Metric Counters** triggered with IntersectionObserver as users scroll into the community section.
- **Improved Performance & Accessibility**:
  - Zero heavy frontend framework dependencies. Lightweight vanilla HTML5, CSS3, and modern JavaScript.
  - Full keyboard accessibility and focus rings (`:focus-visible`).
  - Zero layout shift (CLS) & FOUC-preventing inline theme state initialization.
  - Seamless dark/light theme switching with `localStorage` memory and OS system preference fallback.
  - Resilient copy-to-clipboard functionality with asynchronous Clipboard API and fallback handling.

## 📂 Project Structure

```text
IndusTiers-agy/
├── assets/
│   └── logo.png
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
└── README.md
```

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or serve via any static HTTP server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node / npx
npx serve .
```

## 🌐 Community & Links

- **Discord**: [Join Discord](https://discord.gg/yXB3zfjewb)
- **Tiers Portal**: [industiers.vercel.app](https://industiers.vercel.app)
- **Server IP**: `indusgames.mine.bz` | **Port**: `25567`
