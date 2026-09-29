# Cloudinary Media Pipeline Integration Guide (CLOUDINARY.md)
## Terraframe — AI-Powered Impact & Sustainability Media Platform

> **Hackathon Track:** Code Cubicle 6 — Problem Statement 02 (Cloudinary Track)  
> **Key Focus:** Deep Programmable Media Pipeline Integration across Image, Video, and Audio.  
> **Core Principle:** Beyond passive asset storage — full dynamic transformations, on-the-fly optimization, cryptographic overlay badges, and multimodal AI analysis.

---

## 1. Executive Summary & Alignment with Hackathon Criteria

In the Cloudinary Founders Q&A session, key judging dimensions were established:
1. **Deep Media Pipeline Integration:** Moving far beyond using Cloudinary as a passive storage bucket to leveraging programmable URL transformations across **Image, Video, and Audio**.
2. **Social Good & Environmental Impact:** Applications addressing environmental monitoring, infrastructure safety, and sustainable development.
3. **Optimized Delivery:** Utilizing modern formats (`WebP`, `AVIF`, `MP4`) and adaptive quality (`f_auto`, `q_auto`) tailored dynamically to device viewports.
4. **Generative AI Features:** Leveraging advanced Cloudinary AI capabilities including `e_gen_restore`, `e_gen_recolor`, and `e_background_removal`.
5. **UI/UX & Developer Tools:** Employing official community packages like `@cloudinary-community/next-cloudinary` (`CldUploadButton`, `CldImage`, `CldVideoPlayer`).

**Terraframe** was purpose-built to satisfy and exceed every one of these criteria.

---

## 2. Complete Cloudinary Transformation Matrix

| Media Modality | Transformation Parameter | Practical Environmental Use Case in Terraframe |
| :--- | :--- | :--- |
| **Universal Delivery** | `f_auto,q_auto` | Delivers optimal formats (AVIF/WebP) and adaptive compression across field tablet, mobile, and desktop views. |
| **Spatial Focal Cropping** | `c_fill,ar_16:9,g_auto` | Automatically frames critical ecological subjects (mangrove root clusters, solar inverters, coral domes) regardless of original camera aspect ratio. |
| **Cryptographic Proof Badge** | `l_text:Arial_18_bold:<PROOF>,co_rgb:FFFFFF,b_rgb:059669EE,p_8,r_6,y_16,x_16,g_south_east` | Inscribes tamper-evident, non-repudiation audit overlays directly onto visual evidence on the fly. |
| **Generative Restoration** | `e_gen_restore` | Restores field captures degraded by sensor noise, camera lens spray, or adverse atmospheric weather conditions. |
| **Generative Recolor** | `e_gen_recolor:prompt_canopy;to-color_059669` | Re-colors specific visual elements (such as vegetation canopy or solar panel surfaces) to highlight vegetative vitality or thermal zones. |
| **Visual Enhancement** | `e_improve` | Automatically balances micro-contrast, exposure, and color saturation in underwater marine or low-sun drone captures. |
| **Subject Isolation** | `e_background_removal` | Extracts isolated specimen subjects (e.g. mangrove sapling or coral branch) for flora/fauna taxonomic catalogs. |
| **Video Aspect Conversion** | `ar_1:1,c_fill,g_auto,e_fade:1000` | Re-formats landscape 16:9 drone surveillance footage into a 1:1 square video with smooth 1-second fade for mobile donor cards. |
| **Video Dynamic Watermark** | `l_text:Arial_24_bold:<TEXT>,g_south_east,y_20,x_20` | Permanently overlays verified field station telemetry across video frames. |
| **Animated WebP Generation** | `f_webp,fl_awebp,so_2.0,du_4` | Extracts a lightweight, looping 4-second preview from high-resolution drone videos for fast gallery scrubbing. |
| **Bio-Acoustic Waveforms** | `fl_waveform,co_rgb:059669,b_rgb:F8FAFC,w_800,h_150` | Renders acoustic waveforms from field audio/video recordings (e.g. bird calls, underwater reef hydrophone audio). |

---

## 3. Architecture & Code Integration

### 3.1 Client-Side Ingestion (`next-cloudinary`)
Terraframe implements the official community package:
```tsx
import { CldUploadButton } from 'next-cloudinary';

<CldUploadButton
  uploadPreset="ml_default"
  options={{
    sources: ['local', 'camera', 'url'],
    folder: 'terraframe/field-evidence',
    tags: ['terraframe', 'environmental-evidence'],
    resourceType: 'auto',
    maxFiles: 5,
  }}
  onSuccess={handleWidgetSuccess}
  className="btn-emerald"
>
  Launch Cloudinary Upload Widget
</CldUploadButton>
```

### 3.2 Server-Side Direct Ingest & SHA-256 Hashing (`/api/upload`)
For programmatic field device intake, `/api/upload` uses the Cloudinary Node.js SDK:
```typescript
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

const uploadStream = cloudinary.uploader.upload_stream(
  {
    folder: `terraframe/${projectId}`,
    tags: ['terraframe', category.toLowerCase()],
    resource_type: 'image',
  },
  (err, res) => {
    // Computes SHA-256 non-repudiation fingerprint
    const shaHash = crypto.createHash('sha256').update(buffer).digest('hex');
  }
);
uploadStream.end(buffer);
```

### 3.3 Dynamic Transformation Helper (`src/lib/cloudinary.ts`)
```typescript
export function buildCloudinaryUrl(
  publicIdOrUrl: string,
  options: TransformationOptions = {},
  resourceType: 'image' | 'video' = 'image'
): string {
  // Composes on-the-fly URL parameters:
  // e.g. https://res.cloudinary.com/terraframe-demo/image/upload/c_fill,ar_16:9,g_auto,f_auto,q_auto,l_text:.../<publicId>
}
```

---

## 4. Multi-Modal Pipelines (Image, Video, Audio)

### A. Image Intelligence
* Field photos captured via drone, multispectral cameras, or handheld mobile devices are uploaded with EXIF metadata preserved.
* The system invokes Gemini Vision and Cloudinary transformations to generate audit cards, side-by-side split comparison sliders, and dynamic watermark badges.

### B. Video Intelligence (Drone & Surveillance)
* Video assets (e.g. `MP4` aerial flyovers of mangrove zones) are ingested.
* Using Cloudinary URL parameters:
  * `getVideoSquareFade(url)` transforms landscape video to square with 1s fade-in.
  * `getVideoWatermarked(url)` embeds field station telemetry.
  * `getVideoAnimatedPreview(url)` creates lightweight animated WebP previews (`so_1.0,du_3`) that eliminate video streaming overhead during gallery browsing.

### C. Audio & Bio-Acoustics
* Ecological restoration projects increasingly rely on soundscape ecology (e.g. coral reef snapping shrimp activity, rainforest bird bio-acoustics).
* Terraframe utilizes Cloudinary's `fl_waveform` flag to automatically generate clean, visual audio spectrograms:
  `https://res.cloudinary.com/<cloud>/video/upload/fl_waveform,co_rgb:059669,b_rgb:F8FAFC,w_800,h_150/<audio>.png`

---

## 5. Fallback & Demonstration Resiliency

To guarantee **100% demo uptime** during hackathon evaluation:
1. **With Cloudinary Credentials (`.env.local`):** The application directly executes live signed uploads, live Cloudinary transformations, and storage.
2. **Without Cloudinary Credentials (Demo Mode):** The application dynamically composes Cloudinary dynamic URL parameters using `res.cloudinary.com/<cloud>/image/fetch/*` and simulated high-resolution field assets, ensuring judges can inspect the live transformation pipeline without needing an active billing account.
