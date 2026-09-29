# Design System & UI/UX Specification (DESIGN.md)
## Terraframe — Impact & Sustainability Media Platform

**Design Philosophy:** Crisp Editorial & Institutional Sustainability  
**Color Mode:** **Strict Light Theme Only** (No dark purple/black "AI slop" gradients)  
**Aesthetic Benchmarks:** Financial Times Climate Tracker, Bloomberg Green, National Geographic Explorer, Stripe Press  

---

## 1. Core Visual Directives

### 1.1 The Anti-"AI Slop" Pledge
* **No Black/Purple Neon Gradients:** Most AI hackathon projects rely on dark mode with glowing purple/magenta blurred radial backgrounds. Terraframe rejects this entirely.
* **Institutional Credibility:** Built to look like a multi-million-dollar NGO/Government audit platform used by the UN, WWF, or institutional ESG funds.
* **Clarity Over Gimmicks:** High contrast, legible typography, crisp architectural borders, and generous white space.

---

## 2. Color Palette & Design Tokens

### 2.1 Color Tokens (Tailwind & CSS Variables)

```css
:root {
  /* Canvas & Backgrounds */
  --bg-primary: #FFFFFF;             /* Pure White - Main Content Cards & Modals */
  --bg-secondary: #F8FAFC;           /* Slate 50 - Page Canvas Background */
  --bg-subtle: #F1F5F9;              /* Slate 100 - Secondary Wells & Toolbars */
  --bg-elevated: #FFFFFF;

  /* Typography & Readability */
  --text-primary: #0F172A;           /* Slate 900 - Primary Headings, High Contrast */
  --text-secondary: #475569;         /* Slate 600 - Body & Supporting Descriptions */
  --text-muted: #94A3B8;             /* Slate 400 - Captions, Placeholders */

  /* Sustainability Emerald Accent (Life, Flora, Verification) */
  --emerald-900: #064E3B;
  --emerald-700: #047857;
  --emerald-600: #059669;            /* Primary Action & Verified Badge */
  --emerald-500: #10B981;
  --emerald-50:  #ECFDF5;            /* Tinted badges & active pill states */

  /* Earth / Field Ocre Accent (Ground, Soil, Caution) */
  --earth-600: #D97706;              /* Amber 600 - Milestones in Progress */
  --earth-50:  #FFFBEB;              /* Amber 50 - Warning/Attention Badges */

  /* Hydro / Atmosphere Sky Accent (Water, Climate, Ocean) */
  --sky-600: #0284C7;                /* Sky 600 - Marine & Clean Water Projects */
  --sky-50:  #F0F9FF;

  /* Architectural Borders & Dividers */
  --border-subtle: #E2E8F0;          /* Slate 200 - Clean crisp separation */
  --border-hover:  #CBD5E1;          /* Slate 300 - Interactive card hovers */
  --border-focus:  #059669;          /* Emerald 600 - Active input rings */

  /* Functional Status */
  --status-verified: #059669;
  --status-pending:  #D97706;
  --status-flagged:  #DC2626;
}
```

---

## 3. Typography & Hierarchy

* **Primary Font Family:** `Inter`, `Plus Jakarta Sans`, or system `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`.
* **Font Weights:**
  * **Bold (700):** Main metrics, Hero headlines, Key KPI numbers.
  * **Semi-Bold (600):** Card titles, Section headers, Button text.
  * **Medium (500):** Navigation items, Filter pills, Meta labels.
  * **Regular (400):** Body prose, EXIF telemetry lines, audit notes.

### Type Scale
* **Display H1:** `text-3xl font-bold tracking-tight text-slate-900` (Hero Project Title)
* **Section H2:** `text-xl font-semibold text-slate-900`
* **Card Title H3:** `text-base font-semibold text-slate-800`
* **Body:** `text-sm font-normal text-slate-600 leading-relaxed`
* **Micro / Telemetry:** `text-xs font-mono text-slate-500 uppercase tracking-wider`

---

## 4. Key Component Design Specifications

### 4.1 Global Header & Navigation
* Clean white bar (`bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40`).
* Left: Platform Brandmark — Terraframe leaf badge in emerald green with bold slate typography.
* Center: Navigation links (`Dashboard`, `Projects`, `Evidence Gallery`, `Before/After Studio`, `Impact Reports`).
* Right: Cloudinary Status Indicator (Green live pulse), Global Search trigger (`⌘K`), and "+ Ingest Field Media" primary emerald button.

### 4.2 KPI Stat Cards
* White card with clean 1px border (`border border-slate-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow`).
* Delicate top accent border (2px emerald or sky) indicating project category.
* Big crisp metric figure (e.g. `1,420` Verified Assets, `+42.8%` Net Canopy Delta, `12` Field Locations).
* Supporting trend badge in soft green pill (`bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-medium`).

### 4.3 Interactive Before / After Split Slider
* Smooth horizontal comparison container with absolute side-by-side layering.
* Left side: Baseline "Before" asset with date badge (`Before: March 14, 2024 - 18% Canopy`).
* Right side: Milestone "After" asset (`After: August 28, 2025 - 64% Canopy`).
* Center Handle: Crisp white circular pill with double vertical dividers and smooth touch/mouse drag tracking.
* Bottom Overlay: Quantified delta chip (`+255% Forest Density Recovered`) and Cloudinary dynamic watermark preview toggle.

### 4.4 Media Evidence Card
* Visual presentation:
  * Aspect ratio 4:3 image with Cloudinary smart cropping (`c_fill,g_auto,f_auto,q_auto`).
  * Top Left: Verified cryptographic badge (`Verified EXIF & SHA-256`).
  * Top Right: SDG Tag Pill (e.g., `SDG 15 Life on Land` in official SDG color accents).
  * Body: Title, project name, location badge with pin icon, and captured timestamp.
  * AI Detection Tags: Small pills showing recognized visual objects (e.g. `Mangrove Rhizophora`, `Salinity Sensor`, `Tidal Trench`).
  * Footer: Cloudinary URL link and quick action menu (Inspect, Compare, Generate Story).

### 4.5 Ingest & Upload Modal
* Clean drag-and-drop dropzone with dashed border (`border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/50 rounded-xl`).
* File preview list displaying extracted EXIF data live:
  * Camera Model & Lens
  * Captured Date & Time
  * Detected GPS Coordinates with mini location name lookup
* One-click upload button with real-time Cloudinary transmission progress bar.

### 4.6 ESG Audit & Story Export Modal
* Clean print/export layout preview.
* Toggleable sections:
  * Executive Overview
  * Geospatial Distribution Map
  * Before-and-After Verified Comparatives
  * Methodology & Cryptographic Hashes Table
* Actions: "Download Audit PDF", "Copy Public Verifiable Link", "Export High-Res Cloudinary Pack".

---

## 5. Micro-Interactions & Transitions

* **Button States:** Smooth scaling and background shifts (`transition-all duration-150 active:scale-[0.98]`).
* **Card Hover:** Subtle elevation (`shadow-sm hover:shadow-md hover:border-slate-300 transition-all`).
* **Loading Skeletons:** Soft pulsing light-gray rectangles (`bg-slate-200/70 animate-pulse rounded-md`) avoiding harsh spinners.
* **Badge Glows:** Minimalist soft ring accents (`ring-1 ring-inset ring-emerald-600/20`) instead of blur glows.
