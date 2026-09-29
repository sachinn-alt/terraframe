# Terraframe — AI-Powered Impact & Sustainability Media Platform

> **Hackathon:** Code Cubicle 6 — Problem Statement 02 (Cloudinary Track)  
> **Mission:** Transforming raw field photos and videos from environmental initiatives into verified evidence, measurable impact, and compelling visual stories.

---

## 🌍 The Problem

NGOs, governments, and sustainability organizations generate terabytes of unorganized photos and videos from field projects—reforestation sites, clean water initiatives, coastal cleanups, and renewable microgrids.

Without automated intelligence:
* Evidence sits locked in chat groups and unindexed drives.
* Visual proof lacks verifiable location and tamper-detection metadata.
* Measuring tangible change over time (before-and-after) is manual and guesswork.
* Donors and auditors demand verified transparency to prevent greenwashing.

---

## ⚡ The Terraframe Solution

**Terraframe** leverages **Cloudinary** and multimodal AI to build an end-to-end media intelligence workflow:

1. **Intelligent Field Ingestion:** Preserves camera EXIF, GPS telemetry, device fingerprints, and SHA-256 tamper-proof hashes.
2. **Cloudinary Dynamic Media Engine:** Automatic format/quality optimization (`f_auto, q_auto`), smart focal cropping (`c_fill, g_auto`), and real-time cryptographic proof watermarking.
3. **Multimodal Environmental Vision:** Detects visible ecological signals, quantifies restoration assets (e.g. sapling counts, solar PV density), and maps assets to UN Sustainable Development Goals (SDGs).
4. **Interactive Before & After Studio:** Pairs baseline and milestone media to quantify environmental deltas with smooth split-screen sliders and difference analysis.
5. **Geospatial & Timeline Hub:** Visualizes media across global project coordinates with interactive mapping and timeline scrubbers.
6. **Automated ESG Story & Report Generator:** Compiles audit-grade PDF/Markdown impact reports and donor campaign assets in one click.

---

## 🎨 Design Philosophy: Anti-"AI Slop" Light Theme

Unlike typical AI projects with dark backgrounds and generic purple/black neon gradients, Terraframe features an **editorial light theme**:
* Crisp white card surfaces (`#FFFFFF`) with warm slate canvas (`#F8FAFC`).
* High-contrast slate typography (`#0F172A` / `#475569`) engineered for institutional trust.
* Fresh sustainability emerald (`#059669`) and earth ochre accents.
* Designed to feel like a high-end environmental intelligence platform used by the UN, WWF, or institutional ESG auditors.

---

## 🛠️ Documentation Quick Links

* [**PRD.md**](./PRD.md): Product Requirements Document, user personas, functional requirements.
* [**TRD.md**](./TRD.md): Technical Requirements Document, system architecture, data models, Cloudinary integration.
* [**DESIGN.md**](./DESIGN.md): Light theme design system, color tokens, typography, component guidelines.
* [**AGENTS.md**](./AGENTS.md): Multi-agent pipeline specifications, autonomous roles, and orchestration.
* [**LLM.md**](./LLM.md): LLM multimodal prompts, JSON schemas, provider fallbacks.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the platform.
