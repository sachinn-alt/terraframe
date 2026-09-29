# Product Requirements Document (PRD)
## AI-Powered Impact & Sustainability Media Platform (Terraframe)

**Document Status:** Approved / Production Target  
**Hackathon Track:** Problem Statement 02 – Cloudinary  
**Target Delivery:** High-Fidelity Interactive Web Platform  
**Theme:** Crisp Light Editorial / Clean Institutional Sustainability  

---

## 1. Executive Summary

NGOs, multilateral institutions, environmental foundations, and ESG audit teams generate millions of field photos and video records across reforestation projects, ocean cleanup initiatives, disaster recovery, renewable energy installations, and wildlife conservation. 

Currently, this critical evidence sits disorganized in messaging chats, shared drives, and unindexed cloud buckets. Crucial visual proof lacks verifiable location metadata, tamper-detection, standardized environmental impact scoring, and structured before-and-after timelines.

**Terraframe** is an AI-powered media intelligence platform powered by **Cloudinary**. It ingests raw visual field data, extracts and validates geospatial-temporal signals, classifies environmental impact against UN Sustainable Development Goals (SDGs), automatically pairs baseline and milestone media to quantify environmental change, and produces verifiable impact reports and campaign-ready visual assets.

---

## 2. Target Personas & Use Cases

### 2.1 Field Project Officer ("The Documenter")
* **Role:** Operates in remote or local project sites (e.g., mangrove planting in Sundarbans, solar microgrid in Kenya).
* **Pain Point:** Uploading hundreds of unorganized photos/videos from mobile devices with weak connectivity; struggles to tag project phases manually.
* **Needs:** One-tap bulk upload, automated EXIF/GPS extraction, automatic deduplication, and immediate AI categorisation into the right project milestone.

### 2.2 ESG Auditor & Grant Officer ("The Verifier")
* **Role:** Audits NGO grant compliance and corporate CSR milestones.
* **Pain Point:** Risk of greenwashing, duplicate submissions, stock photo fraud, or lack of measurable progress between grant tranches.
* **Needs:** Verifiable provenance trail, EXIF/camera metadata validation, tamper and synthetic AI generation detection, and rigorous before-and-after comparison with visual delta scoring.

### 2.3 NGO Communications & Campaign Director ("The Storyteller")
* **Role:** Crafts donor updates, public campaign landing pages, and press releases.
* **Pain Point:** Sifting through thousands of raw, poorly framed, or low-lighting field photos to find compelling proof for annual reports.
* **Needs:** Automated smart-cropping, visual enhancement, side-by-side before/after interactive sliders, auto-generated narrative summaries, and instant export for web and social.

---

## 3. Product Vision & Value Propositions

| Pillar | Value Proposition |
| :--- | :--- |
| **Intelligent Media Intake** | Auto-indexes every image/video with GPS geofencing, timestamp chronological sorting, and project tagging powered by Cloudinary. |
| **Environmental Computer Vision** | Recognizes visual signals (canopy density, water turbidity, plastic debris volume, solar PV arrays, sapling health). |
| **Verifiable Before & After** | Computes pixel & feature alignment between historical baselines and current milestones to calculate quantified environmental delta (e.g. +38% canopy cover). |
| **Cloudinary Smart Pipelines** | High-performance dynamic transformations: auto-format (`f_auto`), auto-quality (`q_auto`), smart gravity framing (`g_auto`), watermarking, and side-by-side rendering. |
| **Conversational Semantic Discovery** | Natural-language query interface allowing stakeholders to ask: *"Show me sapling planting in sector 4 with survival tags from August 2025"*. |
| **Automated ESG Reporting** | Compiles verifiable audit-ready PDF/Markdown decks with embedded QR proof codes and tamper-evident asset signatures. |

---

## 4. Key Functional Requirements (FR)

### FR-01: Multi-Asset Field Ingestion & Provenance Preservation
* **FR-1.1:** Direct upload supporting multi-image and video formats (`.jpg`, `.png`, `.webp`, `.mp4`, `.mov`).
* **FR-1.2:** Automatic extraction of embedded EXIF, IPTC, and XMP metadata (GPS coordinates, elevation, timestamp, camera model, shutter speed, ISO).
* **FR-1.3:** Tamper & Integrity Check: Generates SHA-256 asset fingerprint upon upload; checks for potential AI-synthetic generation or re-saved metadata discrepancies.
* **FR-1.4:** Cloudinary Integration: Direct secure upload to Cloudinary with programmatic tag injection (`project_id`, `milestone`, `geo_hash`, `sdg_tag`).

### FR-02: AI Visual Understanding & SDG Alignment Engine
* **FR-2.1:** Automated scene description and domain classification (Reforestation, Clean Water, Waste Management, Renewable Infrastructure, Marine Restoration).
* **FR-2.2:** Mapping of visual signals to UN Sustainable Development Goals (e.g., SDG 6 Clean Water, SDG 13 Climate Action, SDG 14 Life Below Water, SDG 15 Life on Land).
* **FR-2.3:** Object & Feature Extraction: Quantified counting of recognizable environmental assets (saplings, solar modules, clean-up bags, wildlife species indicators).
* **FR-2.4:** Confidence scoring for all AI predictions with human-in-the-loop review flag for low-confidence tags (<75%).

### FR-03: Temporal Milestone Matching & Before/After Comparison
* **FR-3.1:** Spatial-temporal pairing: Clusters media taken within proximate GPS coordinates (< 50m radius) across different timestamps.
* **FR-3.2:** Interactive Comparison Modes:
  * Interactive drag-and-swipe Before/After split slider.
  * Side-by-side synchronised zoom & pan viewer.
  * Difference heatmap overlay showing areas of positive ecological growth or physical change.
* **FR-3.3:** Quantified Delta Computation: Visual calculation of progress (e.g., bare ground $\to$ vegetative canopy, debris field $\to$ remediated coastline).

### FR-04: Cloudinary Dynamic Transformation & Visual Polish
* **FR-4.1:** Automated asset optimization (`f_auto,q_auto`) for instantaneous load across field or office bandwidths.
* **FR-4.2:** Smart focal cropping (`c_fill,g_auto,ar_16:9` / `ar_1:1`) for social media, executive summaries, and presentation decks.
* **FR-4.3:** Dynamic Proof Watermarking: Overlays verified GPS coordinates, project milestone badge, and timestamp directly onto assets on-the-fly via Cloudinary transformation URLs.
* **FR-4.4:** Video Processing: Automatic thumbnail generation, preview GIF compilation, and video transcription/chaptering for field interviews.

### FR-05: Centralized Project & Evidence Hub
* **FR-5.1:** Project Overview Dashboard: High-level KPI cards (Total Media Assets Verified, Surface Area Restored, Active Field Projects, Verified SDG Count).
* **FR-5.2:** Dual View Media Explorer:
  * **Visual Gallery View:** Filterable by project, SDG, date range, verified status, and visual tags.
  * **Geospatial Map View:** Interactive map plotting assets with clustering, thumbnail popups, and route tracking.
* **FR-5.3:** Asset Detail Drawer: Complete metadata breakdown, EXIF inspector, raw Cloudinary URLs, transformation presets, and audit logs.

### FR-06: Natural Language Semantic Discovery
* **FR-6.1:** Free-form search bar with instant semantic matching across titles, AI descriptions, visual objects, locations, and milestones.
* **FR-6.2:** Quick filter chips (e.g., *"Before/After Pairs"*, *"High Ecological Delta"*, *"Needs Audit"*, *"SDG 15"*).
* **FR-6.3:** Structured result grouping with relevance scoring and highlighted matching terms.

### FR-07: Impact Reporting & Export Engine
* **FR-7.1:** One-click ESG & Grant Report Generator: Synthesizes selected project media into a formatted executive summary.
* **FR-7.2:** Export formats: Downloadable audit summary, presentation-ready comparison cards, and embeddable public transparency widget.
* **FR-7.3:** Public Share Link: Tokenized read-only link for donors and auditors to review evidence without platform login.

---

## 5. Non-Functional Requirements (NFR)

* **NFR-01 (Design & Aesthetics):** Strict Clean Light Theme. White/warm-tinted cards (`#FFFFFF`, `#F8FAFC`), rich slate typography (`#0F172A`), deep emerald (`#059669`) and earth-toned accents. **Zero dark purple/black neon AI slop.**
* **NFR-02 (Performance):** Initial dashboard load < 1.2s; image transformation URLs render with sub-second Cloudinary CDN response times.
* **NFR-03 (Reliability & Fallbacks):** Resilient offline-ready mock datasets and deterministic fallbacks for AI/Cloudinary APIs in case of missing keys or network limits.
* **NFR-04 (Traceability):** Immutable original image preservation—transformations are strictly non-destructive URL-driven parameters.
* **NFR-05 (Accessibility):** WCAG 2.1 AA compliant color contrast ratios across all text and badge elements.

---

## 6. Success Metrics & Demonstration Benchmarks

1. **Ingest-to-Insight Time:** Under 5 seconds from raw upload to complete EXIF extraction, AI scene description, and SDG mapping.
2. **Before/After Alignment Accuracy:** Sub-millimeter visual precision on interactive split slider with clearly highlighted delta metrics.
3. **Cloudinary Pipeline Utilization:** Demonstration of at least 5 distinct Cloudinary capabilities (Smart Ingestion, Auto-Format/Quality, AI Auto-Tagging, Dynamic Watermarking, and Generative/Split Fill).
4. **Judge Wow Factor:** Clean, institutional-grade UI looking like a real $10M enterprise climate/NGO platform rather than an AI experiment.
