# Saad Maqbool — Portfolio Website

A 3D interactive portfolio website built with **Three.js**, **HTML5**, **CSS3**, and **Vanilla JavaScript**.

## ✨ Features

- 🌌 Animated 3D background (floating particles, wireframe shapes, glowing rings) via Three.js
- 🖱️ Custom cursor with hover effects
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎞️ Smooth reveal animations on scroll
- 📊 Animated skill bars and stat counters
- 💌 Contact form with success feedback
- ⚡ Zero dependencies (no build tools needed)

## 🚀 Run Locally

No build step required. Just open the project:

**Option 1 — VS Code Live Server (recommended):**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

**Option 2 — Python HTTP server:**
```bash
cd saadmaqbooldev-portfolio
python -m http.server 8000
# Open http://localhost:8000
```

**Option 3 — Node.js:**
```bash
npx serve .
```

> ⚠️ Don't open `index.html` directly as a file (`file://`) — Three.js and fonts need a local server.

## 📁 Project Structure

```
saadmaqbooldev-portfolio/
├── index.html          # Main HTML
├── css/
│   └── style.css       # All styles
├── js/
│   ├── three-scene.js  # Three.js 3D background
│   └── main.js         # UI interactions & animations
└── README.md
```

## 🌐 Deploy to GitHub Pages

1. Push this repo to GitHub as `saadmaqbooldev`
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://saadmaqbooldev.github.io/saadmaqbooldev-portfolio/`

## 🛠️ Customisation

- **Colors:** Edit CSS variables in `css/style.css` under `:root`
- **Projects:** Update the project cards in `index.html` (search for `project-card`)
- **Stats:** Update `data-target` values on `.stat-num` elements
- **3D Scene:** Tweak particle count, shape positions, and colors in `js/three-scene.js`

## 📄 License

MIT — feel free to use and customise.
