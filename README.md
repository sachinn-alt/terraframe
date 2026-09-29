# Terraframe AI — Impact & Sustainability Media Platform

> **Live Production URL:** [https://terraframe-kappa.vercel.app](https://terraframe-kappa.vercel.app/)  
> **GitHub Repository:** [https://github.com/sachinn-alt/terraframe](https://github.com/sachinn-alt/terraframe)  
> **Hackathon Track:** Code Cubicle 6 — Problem Statement 02 (Cloudinary Track)  
> **Mission:** Transforming unindexed field photos and drone videos into cryptographically signed proof, measurable before-and-after environmental timelines, and institutional ESG audit reports powered by Cloudinary.

---

## 🌍 The Problem

NGOs, governments, and sustainability trusts invest billions into environmental projects—mangrove restoration in the Sundarbans, microgrids in the Atacama, and coral nurseries in Bali. However, field evidence remains locked in unstructured WhatsApp groups and cloud folders without:
* **Verifiable Provenance:** No tamper-proof timestamping or geographic non-repudiation.
* **Measurable Progress:** Before-and-after timelines are manual guesswork without coordinate-matched visual delta analysis.
* **Audit-Grade Reporting:** Corporate donors and ESG auditors demand verifiable proof to eliminate greenwashing risks.

---

## ⚡ The Terraframe Solution

Terraframe establishes an autonomous multi-agent pipeline and programmable Cloudinary media engine that ingests, verifies, and analyzes raw field photos and sensor video:

```
[ Field Drone / Camera Upload ]
               │
               ▼
┌─────────────────────────────────┐
│ 1. Telemetry & Ingestion Agent  │ ──► SHA-256 Fingerprint & Binary EXIF Coordinates
└─────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 2. Cloudinary Dynamic Media CDN │ ──► Dynamic URL Transformations, Watermarking & Recolor
└─────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 3. Multimodal Vision & Signals  │ ──► Gemini 2.0 / 1.5 Flash UN SDG & Object Quantification
└─────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 4. Spatial-Temporal Alignment   │ ──► Haversine Coordinate Pairing & Multi-View Before/After
└─────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ 5. Audit & ESG Storyteller      │ ──► One-Click Printable Compliance Certificate & Audit Deck
└─────────────────────────────────┘
```

---

## 🎨 Design System: The Wise Style System

Built strictly following the **Wise Style Reference** ("deep moss with lime voltage"):
* **Colors:**
  * **Forest Ink (`#163300`):** Dominant brand dark for navigation, headlines, filled pills, and dark inverted sections.
  * **Lime Voltage (`#9fe870`):** Functional punctuation used exclusively on primary CTA fills, active tab segments, and highlights.
  * **Linen Mist (`#e2f6d5`):** Soft pale green wash for status tags and highlight panels.
  * **Fog (`#e8ebe6`):** Card surfaces, dividers, and KPI containers.
  * **Obsidian (`#0e0f0c`) & Charcoal (`#454745`):** Ultra-high contrast display text and warm readable body copy.
  * **Paper (`#ffffff`):** Clean page canvas.
* **Typography:**
  * **Wise Sans Display:** Ultra-heavy (weight 900), tightly tracked (`-0.035em`), block-letter display headlines shouted across the hero.
  * **Inter (Google Fonts):** Weights 400 to 700 for UI controls, data tables, and dense labels.
* **Shapes:**
  * **9999px Pills:** Buttons, navigation segments, status tags, and range slider controls.
  * **10px Radii:** Standard cards, form inputs, and image preview containers.
  * **28px Radii:** Inverted Forest Ink dark section cards.
* **Cadence:** Clean alternation between Paper/Fog light canvas and inverted Forest Ink dark sections with zero decorative blur or generic gradients.

---

## ☁️ Deep Cloudinary Programmable Media Capabilities

Terraframe does not treat Cloudinary as dumb blob storage. It executes real-time URL-based transformations across modalities:

### 1. Dynamic Proof Watermarking & Non-Repudiation
```
/upload/l_text:Arial_18_bold:TERRAFRAME_VERIFIED%20%E2%80%A2%20SHA-256%3Ae7b8a4f9,g_south_east,x_24,y_24,co_rgb:ffffff,b_rgb:163300_90/f_auto,q_auto/v1/...
```
Embeds cryptographic SHA-256 hashes, coordinate stamps, and non-repudiation badges dynamically into the image buffer.

### 2. Generative AI Recolor & Chlorophyll Health Analysis (`e_gen_recolor`)
```
/upload/e_gen_recolor:prompt_canopy;to-color_9fe870/f_auto,q_auto/v1/...
```
Allows auditors to dynamically adjust chlorophyll target colors or isolate vegetation canopy foliage.

### 3. Generative AI Sensor Denoise & Artifact Restoration (`e_gen_restore`, `e_improve`)
```
/upload/e_gen_restore/f_auto,q_auto/v1/...
```
Repairs harsh sun glare, sensor grain, and low-light field drone footage taken in remote mangrove and reef areas.

### 4. Smart Subject Gravity Framing (`c_fill,ar_16:9,g_auto`)
```
/upload/c_fill,ar_16:9,g_auto/f_auto,q_auto/v1/...
```
Automatically tracks the primary environmental subject (coral micro-polyp, mangrove seedling, solar inverter) across responsive viewports.

### 5. Square Video Auto-Tracking with 1-Second Fade (`ar_1:1,c_fill,g_auto,e_fade:1000`)
Transforms horizontal 16:9 field drone video into social-ready 1:1 square media with smooth fade-in and auto-subject framing.

### 6. Bio-Acoustic Frequency Waveforms (`fl_waveform`)
```
/upload/fl_waveform,co_rgb:163300,w_800,h_150/v1/...
```
Extracts visual frequency waveforms from field bio-acoustic hydrophones and rainforest audio recordings to detect chainsaw intrusions or coral acoustic health.

### 7. Official Next-Cloudinary Dynamic Upload Widget (`next-cloudinary v6`)
Direct unsigned and signed intake powered by `CldUploadButton` with dynamic folder routing (`/terraframe/projects/:id/:year/`) and automated tagging.

---

## 🛠️ Key Platform Features

1. **Multi-View Before & After Verification Studio:**
   * **Split Slider:** Accessible horizontal scrubber with custom 9999px circular handle.
   * **Side-by-Side Dual View:** Synchronized comparison cards showing baseline and milestone metrics.
   * **Opacity Dissolve:** Real-time morphological fader blending between baseline and milestone.
   * **Delta Change Heatmap:** Simulated high-contrast green highlight isolating newly grown vegetation or installed solar infrastructure.
2. **5-Column Wise Country Project Directory Grid:**
   * Signature circular flag thumbnails (56px, 1000px radius) for India, Chile, Indonesia, Kenya, and Costa Rica.
   * Filter the evidence repository with hover underline transitions.
3. **Cryptographic Anti-Fraud & Tamper Resilience Simulator:**
   * Interactive tester inside the asset modal that simulates flipping EXIF coordinates or metadata bits.
   * Triggers an immediate `🚨 CRITICAL FRAUD ALERT: Checksum Mismatch` proving non-repudiation resilience.
4. **Live Cloudinary Recipe Inspector & Playground:**
   * Interactive parameter tuner: live recolor prompt input, hex color selector, custom watermark text, and 1-click copy for developers.
5. **One-Click Audit-Grade ESG PDF / Printable Certificate:**
   * Formal institutional certificate layout with non-repudiation seals, UN SDG badges, Cloudinary verification hashes, and print-to-PDF formatting.
6. **Mobile Field Proof QR Scanner Modal:**
   * Interactive mobile scanner viewfinder decoding provenance hashes directly from the floating QR badge.

---

## 🚀 Setup & Local Development

### Prerequisites
* Node.js 18+ or 20+
* Cloudinary Account (Cloud Name & Upload Preset)
* Google Gemini API Key (optional, deterministic fallback included)

### Installation
```bash
# Clone the repository
git clone https://github.com/sachinn-alt/terraframe.git
cd terraframe

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

### Environment Configuration (`.env.local`)
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=terraframe
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default

# Optional: Google Gemini Vision API for live multimodal intake
GEMINI_API_KEY=your_gemini_api_key
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to explore the platform.

### Production Build
```bash
npm run build
npm run start
```

---

## 📄 Documentation Index
* [`AGENTS.md`](./AGENTS.md): Autonomous multi-agent pipeline specifications and execution runner.
* [`CLOUDINARY.md`](./CLOUDINARY.md): Complete Cloudinary URL transformation cookbook.
* [`PRD.md`](./PRD.md): Product Requirements Document and problem statement alignment.
* [`TRD.md`](./TRD.md): Technical Requirements Document and data models.
* [`DESIGN.md`](./DESIGN.md): Design system tokens and Wise style reference.

---

## ⚖️ License
MIT License. Built for the **Cloudinary Developer Challenge (Code Cubicle 6)**.
