# Raheel Jamal — Interactive Personal Digital Experience

> **Software Developer • Automation Engineer • AI Integration**  
> ADC Operations Officer at UBL • Computer Science Student at SZABIST University

A premium, interactive digital portfolio engineered with **React 18**, **Three.js WebGL**, and **Framer Motion**. Designed with an 8px grid system, semantic HTML5, accessible keyboard navigation, and deep charcoal/midnight navy aesthetics.

---

## 🌟 Key Architecture & Features

### 1. 3D WebGL Character Integration (`CharacterCanvas.jsx`)
- **Direct GLB Loading Pipeline**: Supports dropping your custom rigged 3D character model directly into `/public/models/raheel-character.glb`.
- **Procedural 3D Rig**: Built-in 3D avatar featuring Raheel Jamal's signature rectangular glasses, styled dark hair, professional black suit, collared shirt, and polished shoes.
- **Cinematic Multi-Point Lighting**: Ambient, directional key light, fill light, and electric rim lighting.
- **Dynamic Interaction**: Subtle idle breathing motion, real-time cursor/pointer head and torso tracking, and perspective mode switching (Facing, Angle, Orbit).
- **Hologram Card Fallback**: Automatic detection for non-WebGL environments or user preference, rendering an interactive 3D perspective-tilt holographic card with your verified photograph.
- **Zero Memory Leaks**: Full disposal of geometries, materials, and WebGL contexts upon unmount.

### 2. Cinematic Boot Experience (`OpeningSequence.jsx`)
- High-tech terminal boot calibration displaying system verification and brand positioning.
- Immediate **Skip Intro [Esc]** button.
- Session persistence (`sessionStorage`) ensures returning visitors are not interrupted.

### 3. Command Palette Quick Navigation (`CommandPalette.jsx`)
- **Ctrl+K / Cmd+K** or header search button opens a keyboard-navigable launcher.
- Rapidly search and jump across all sections, verified projects (FinFlow, JARVIS, Attendance System, etc.), and contact portals.

### 4. Interactive Project Deep Dive Inspector (`ProjectModal.jsx` & `Projects.jsx`)
- Category filtering: *All*, *Software*, *AI & Automation*, *Client Applications*, *Design Engineering*.
- Each project card features an **Architecture & Deep Dive** inspector modal highlighting:
  - Friction / Problem Solved
  - Engineering Solution
  - Architectural Stack & Data Flow
  - Verified Features & Technical Deliverables
  - Direct Live Production link & GitHub Repository inspect link.

### 5. Grounded Technical Capabilities (`Skills.jsx`)
- 4 capability pillars: Software & Systems, AI & Intelligent Automation, Fintech & Banking Operations, and Design Engineering.
- Zero fake percentage meters. Each skill links to practical real-world application notes.

### 6. Interactive Experience & Education Timelines
- Verified industry roles at **UBL (United Bank Limited)** in ADC Operations managing banking operations, international card processing, and transaction monitoring.
- Academic credentials at **SZABIST University** (BS Computer Science), **Madrasa-tul-Madina Dar-ul-Salam** (Hafiz-ul-Quran), and scientific accreditations.

### 7. Interactive Terminal & Contact Console (`Contact.jsx`)
- One-click copy email (`syedraheelshah0318@gmail.com`) with instant toast confirmation.
- Direct WhatsApp consultation link (`+92 311 0338480`).
- Interactive mini terminal supporting commands: `help`, `projects`, `skills`, `experience`, `about`, `contact`, `clear`.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── models/                  # 👈 Drop custom raheel-character.glb here
│   ├── logos/                   # Verified organizational logos (UBL, SZABIST, etc.)
│   ├── finflow-erp-finance-dashboard.webp
│   ├── jarvis-ai-voice-assistant.webp
│   ├── attendance-management-system-dashboard.webp
│   ├── woodart-custom-furniture-website.webp
│   ├── profile.jpg
│   └── index.html               # Semantic SEO and Open Graph metadata
├── src/
│   ├── components/
│   │   ├── OpeningSequence.jsx  # Cinematic boot sequence
│   │   ├── CommandPalette.jsx   # Ctrl+K launcher
│   │   ├── CharacterCanvas.jsx  # Three.js WebGL & 3D Avatar
│   │   ├── Navbar.jsx           # Floating header with section spy
│   │   ├── Hero.jsx             # High-impact identity hero
│   │   ├── About.jsx            # Multi-disciplinary story & banking context
│   │   ├── Approach.jsx         # What I build & engineering philosophy
│   │   ├── Projects.jsx         # Filterable project gallery
│   │   ├── ProjectModal.jsx     # Architectural deep-dive inspector
│   │   ├── Skills.jsx           # 4-pillar capability matrix
│   │   ├── Experience.jsx       # Interactive career timeline
│   │   ├── Education.jsx        # Academic qualifications
│   │   ├── Contact.jsx          # Direct channels & interactive terminal
│   │   ├── Footer.jsx           # Semantic footer
│   │   └── Section.jsx          # Semantic wrapper with 8px grid
│   ├── data/
│   │   └── info.js              # Single source of verified truth
│   ├── App.js                   # Application root
│   ├── index.css                # CSS variables & 8px grid design system
│   └── index.js
├── package.json
└── vercel.json
```

---

## 🚀 How to Add Your Final 3D Character Model

The 3D character pipeline in `CharacterCanvas.jsx` is pre-configured and waiting for your model:

1. Export your optimized character model in `.glb` format.
2. Recommended specs:
   - Polycount: Under 50,000 triangles.
   - Textures: Embedded or DRACO-compressed PBR materials (Roughness, Metalness, Normal).
   - Origin: Pivot centered at ground level (feet at Y = 0).
3. Place the file at:
   ```
   public/models/raheel-character.glb
   ```
4. `CharacterCanvas.jsx` automatically detects the file via a HEAD request and seamlessly switches from the procedural rig to your custom 3D model!

---

## 🛠️ Local Development & Build

```bash
# Install dependencies
npm install

# Run development server
npm start

# Run optimized production build
npm run build
```

---

## 🌐 Deployment (Vercel)

The repository is pre-configured with `vercel.json`:
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "feat: transform portfolio into interactive 3D digital experience"
   git push origin main
   ```
2. Vercel automatically detects Create React App and deploys the production build to your domain (e.g. `https://raheeljamal.vercel.app/`).
