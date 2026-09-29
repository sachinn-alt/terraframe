# Terraframe — AI-Powered Impact & Sustainability Media Platform

> **Live Demo:** [**https://terraframe-kappa.vercel.app**](https://terraframe-kappa.vercel.app/)  
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

## 🛠️ Documentation Suite

* [**CLOUDINARY.md**](./CLOUDINARY.md): **Deep Cloudinary Media Pipeline Integration Guide** (Image, Video, Audio, Generative AI).
* [**PRD.md**](./PRD.md): Product Requirements Document, user personas, functional requirements.
* [**TRD.md**](./TRD.md): Technical Requirements Document, system architecture, data models, Cloudinary integration.
* [**DESIGN.md**](./DESIGN.md): Light theme design system, color tokens, typography, component guidelines.
* [**AGENTS.md**](./AGENTS.md): Multi-agent pipeline specifications, autonomous roles, and orchestration.
* [**LLM.md**](./LLM.md): LLM multimodal prompts, JSON schemas, provider fallbacks.

---

## 🏆 Cloudinary Hackathon Challenge Alignment (Founders Q&A)

Terraframe is engineered specifically to address every priority emphasized in the Cloudinary Founders Q&A:

1. **Beyond Storage — Programmable Media Pipeline:** Rather than treating Cloudinary as static storage, Terraframe executes real-time URL transformations (`f_auto, q_auto`, `c_fill, g_auto`, `l_text` watermark overlays).
2. **Multi-Modal Pipelines (Image, Video, Audio):**
   * **Image:** Dynamic smart focal crops, proof watermark badges, and side-by-side delta calculations.
   * **Video:** Transforms 16:9 drone surveillance into 1:1 square video with subject auto-tracking and 1-second fade (`ar_1:1,c_fill,g_auto,e_fade:1000`), plus animated WebP preview generation (`fl_awebp`).
   * **Audio / Bio-Acoustics:** Renders acoustic soundscape waveforms (`fl_waveform`) from field audio and hydrophone feeds.
3. **Generative AI Functions:** Implements `e_gen_restore`, `e_gen_recolor` (e.g. canopy chlorophyll health recoloring), `e_improve`, and `e_background_removal`.
4. **Social Good / Environmental Impact:** Focuses on UN Sustainable Development Goals (SDG 6, 7, 13, 14, 15) across global ecological projects—the explicit preferred direction highlighted by Cloudinary organizers.
5. **Developer Community Tools:** Powered by `@cloudinary-community/next-cloudinary` (`CldUploadButton`), Cloudinary Node.js SDK (v2), and Next.js 15 App Router.

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
